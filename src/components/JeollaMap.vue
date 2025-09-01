<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import mapSvg from '@/assets/JeollaMapSvg.svg?raw'

const props = defineProps({
  height: { type: Number, default: 360 },
  selected: { type: String, default: '' },         // 외부 동기화 필요 시만 사용
  defaultFill: { type: String, default: '#E5FEF4' },
  hoverFill: { type: String, default: '#00C473' },
  highlight: { type: String, default: '#00C473' }, // 진한 초록
  stroke: { type: String, default: '#696969' },

  /** 외부 v-model과 선택을 동기화할지 (기본: 안 함) */
  syncSelected: { type: Boolean, default: false },
  /** 클릭 시 부모에 select 이벤트까지 보낼지 (기본: 안 함) */
  emitSelect: { type: Boolean, default: false },
})

const emit = defineEmits<{
  (e: 'update:selected', v: string): void
  (e: 'select', payload: { key: string; name: string }): void
}>()

const wrap = ref<HTMLDivElement | null>(null)

/** 루트 지역들(g[id] 또는 path/polygon 자체) */
let regions: SVGGraphicsElement[] = []
/** 현재 선택된 루트 엘리먼트 참조 (키 비교 대신 참조 비교로 안정화) */
let selectedEl: SVGGraphicsElement | null = null

const SELECTED_STROKE = '#34D399'
const SELECTED_STROKE_WIDTH = 3
const SELECTED_GLOW = 'drop-shadow(0 0 12px rgba(0,0,0,.4))'

const keyOf = (el: Element) =>
  el.id ||
  el.getAttribute('data-name') ||
  el.getAttribute('name') ||
  el.getAttribute('title') ||
  el.getAttribute('aria-label') ||
  ''

function getReadableName(el: SVGGraphicsElement): string {
  const attrName =
    el.getAttribute('data-name') ||
    el.getAttribute('name') ||
    el.getAttribute('title') ||
    el.getAttribute('aria-label')
  if (attrName) return attrName

  const svg = el.ownerSVGElement
  if (!svg) return ''

  const rb = el.getBBox()
  const texts = Array.from(svg.querySelectorAll('text'))
  for (const t of texts) {
    const tb = (t as SVGGraphicsElement).getBBox()
    const cx = tb.x + tb.width / 2
    const cy = tb.y + tb.height / 2
    if (cx >= rb.x && cx <= rb.x + rb.width && cy >= rb.y && cy <= rb.y + rb.height) {
      const s = (t.textContent || '').trim()
      if (s) return s
    }
  }
  return ''
}

/** 전체 reset + 하나만 선택 스타일 적용 (루트 + 자식 path/polygon 모두 반영) */
function styleSelect(el: SVGGraphicsElement) {
  // reset
  regions.forEach((r) => {
    r.classList.remove('gw-pulse')
    r.style.fill = props.defaultFill
    r.style.filter = 'none'
    r.style.stroke = props.stroke
    r.style.strokeWidth = '1'
    r.style.transform = 'scale(1)'

    r.querySelectorAll('path, polygon').forEach((c) => {
      const cg = c as SVGGraphicsElement
      cg.style.fill = props.defaultFill
      cg.style.stroke = props.stroke
      cg.style.strokeWidth = '1'
      cg.style.filter = 'none'
    })
  })

  // apply
  el.classList.add('gw-pulse')
  el.style.fill = props.highlight
  el.style.stroke = SELECTED_STROKE
  el.style.strokeWidth = String(SELECTED_STROKE_WIDTH)
  el.style.filter = SELECTED_GLOW

  el.querySelectorAll('path, polygon').forEach((c) => {
    const cg = c as SVGGraphicsElement
    cg.style.fill = props.highlight
    cg.style.stroke = SELECTED_STROKE
    cg.style.strokeWidth = String(SELECTED_STROKE_WIDTH)
    cg.style.filter = SELECTED_GLOW
  })
}

/** 선택 적용: 기본은 부모로 emit 안 함 */
function applySelection(el: SVGGraphicsElement, silent = false) {
  styleSelect(el)
  selectedEl = el

  const key = el.dataset.key || ''
  const name = getReadableName(el) || key

  if (props.syncSelected && !silent) {
    emit('update:selected', key)
  }
  if (props.emitSelect && !silent) {
    emit('select', { key, name })
  }
}

onMounted(async () => {
  await nextTick()
  if (!wrap.value) return

  wrap.value.innerHTML = mapSvg
  const svg = wrap.value.querySelector('svg') as SVGSVGElement | null
  if (!svg) return

  // 배경 path 고정
  const bg = svg.querySelector('#path20') as SVGPathElement | null
  if (bg) {
    bg.style.fill = '#FFFFFF'
    bg.style.stroke = 'none'
    bg.style.pointerEvents = 'none'
  }

  // 크기/정렬 (GangwonMap과 동일한 스케일 느낌)
  svg.removeAttribute('width')
  svg.removeAttribute('height')
  svg.setAttribute('preserveAspectRatio', 'xMaxYMid meet')
  svg.style.width = '120%'
  svg.style.height = '120%'
  svg.style.display = 'block'

  // 루트 지역 수집: path/polygon의 최상위 g[id]를 루트로, 없으면 자기 자신
  const raw = Array.from(svg.querySelectorAll('path, polygon')) as SVGGraphicsElement[]
  const roots = new Set<SVGGraphicsElement>()
  for (const el of raw) {
    const root = (el.closest('g[id]') as SVGGraphicsElement) ?? el
    if (root.id === 'path20') continue
    roots.add(root)
  }
  regions = Array.from(roots)

  // 루트에만 키/이벤트 바인딩
  regions.forEach((el) => {
    el.dataset.key = keyOf(el)
    el.classList.add('gw-region')
    el.style.cursor = 'pointer'
    el.style.fill = props.defaultFill
    el.style.stroke = props.stroke
    el.style.strokeWidth = '1'

    el.addEventListener('mouseenter', () => {
      const active = selectedEl === el
      if (!active) el.style.fill = props.hoverFill
    })

    el.addEventListener('mouseleave', () => {
      const active = selectedEl === el
      el.style.fill = active ? props.highlight : props.defaultFill
    })

    el.addEventListener('click', () => {
      applySelection(el /* silent=false */)
    })
  })

  const target = regions[8] // ✅ 전주시
  if (target) applySelection(target, /* silent */ true)

})

/** 외부 selected와 정말 동기화가 필요할 때만 반영 */
if (props.syncSelected) {
  watch(
    () => props.selected,
    (key) => {
      const el = regions.find((r) => r.dataset.key === key)
      if (el) applySelection(el, /* silent */ true)
      else {
        // 외부에서 비워졌을 때 초기화
        selectedEl = null
        regions.forEach((r) => {
          r.classList.remove('gw-pulse')
          r.style.fill = props.defaultFill
          r.style.filter = 'none'
          r.style.stroke = props.stroke
          r.style.strokeWidth = '1'
        })
      }
    },
  )
}
</script>

<template>
  <div
    class="w-full flex items-center justify-start overflow-hidden"
    :style="{ height: `${height}px` }"
  >
    <!-- 위치 보정은 GangwonMap과 동일하게 -->
    <div ref="wrap" class="w-full h-full" style="margin-left: -20%; margin-top: -30%;"></div>
  </div>
</template>

<style scoped>
.gw-region {
  transition:
    fill 0.18s ease,
    stroke 0.18s ease,
    stroke-width 0.18s ease,
    filter 0.25s ease,
    transform 0.25s ease;
  transform-box: fill-box;
  transform-origin: center;
}
@keyframes gw-pulse {
  0% { transform: scale(1); }
  60% { transform: scale(1.06); }
  100% { transform: scale(1); }
}
.gw-pulse {
  animation: gw-pulse 0.45s ease;
}
:deep(svg rect) { /* 배경 캔버스가 영역을 가리지 않도록 */
  fill: transparent !important;
  stroke: none !important;
}
/* 텍스트가 hover/leave 이벤트를 흔들지 않게 */
:deep(svg text) {
  pointer-events: none;
}
</style>
