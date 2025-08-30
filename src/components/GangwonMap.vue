<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import mapSvg from '@/assets/10_전국지도_나눔.svg?raw'

const props = defineProps({
  height: { type: Number, default: 360 },
  selected: { type: String, default: '' },
  defaultFill: { type: String, default: '#E0FFD9' },
  hoverFill: { type: String, default: '#CEFFC7' },
  highlight: { type: String, default: '#10B981' },
  stroke: { type: String, default: '#A2A2A2' },
})

const emit = defineEmits<{
  (e: 'update:selected', v: string): void
  (e: 'select', payload: { key: string; name: string }): void
}>()

const wrap = ref<HTMLDivElement | null>(null)
let regions: SVGGraphicsElement[] = []

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
function highlightRegionText(el: SVGGraphicsElement, color: string) {
  const svg = el.ownerSVGElement
  if (!svg) return
  const rb = el.getBBox()
  const texts = Array.from(svg.querySelectorAll('text'))
  for (const t of texts) {
    const tb = (t as SVGGraphicsElement).getBBox()
    const cx = tb.x + tb.width / 2
    const cy = tb.y + tb.height / 2
    if (cx >= rb.x && cx <= rb.x + rb.width && cy >= rb.y && cy <= rb.y + rb.height) {
      ;(t as SVGTextElement).style.fill = color
    }
  }
}

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
    // 텍스트 중심점이 도형의 바운딩박스 안에 있으면 그 텍스트를 이름으로 사용
    if (cx >= rb.x && cx <= rb.x + rb.width && cy >= rb.y && cy <= rb.y + rb.height) {
      const s = (t.textContent || '').trim()
      if (s) return s
    }
  }
  return ''
}

onMounted(async () => {
  await nextTick()
  if (!wrap.value) return

  wrap.value.innerHTML = mapSvg
  const svg = wrap.value.querySelector('svg') as SVGSVGElement | null
  if (!svg) return

  // 배경 path만 흰색 고정 & 클릭 불가
  const bg = svg.querySelector('#path20') as SVGPathElement | null
  if (bg) {
    bg.style.fill = '#FFFFFF'
    bg.style.stroke = 'none'
    bg.style.pointerEvents = 'none'
  }

  // 크기 설정
  svg.removeAttribute('width')
  svg.removeAttribute('height')
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  svg.style.width = '100%'
  svg.style.height = '100%'
  svg.style.display = 'block'

  const all = Array.from(svg.querySelectorAll('path, polygon')) as SVGGraphicsElement[]
  regions = all.filter((el) => el.id !== 'path20')

  regions.forEach((el) => {
    el.dataset.key = keyOf(el)
    el.classList.add('gw-region')
    el.style.cursor = 'pointer'
    el.style.fill = props.defaultFill
    el.style.stroke = props.stroke
    el.style.strokeWidth = '1'

    el.addEventListener('mouseenter', () => {
      const active = props.selected && el.dataset.key === props.selected
      if (!active) el.style.fill = props.hoverFill
    })
    el.addEventListener('mouseleave', () => {
      const active = props.selected && el.dataset.key === props.selected
      el.style.fill = active ? props.highlight : props.defaultFill
    })
    el.addEventListener('click', () => {
      // reset
      regions.forEach((r) => {
        r.classList.remove('gw-pulse')
        r.style.fill = props.defaultFill
        r.style.filter = 'none'
        r.style.stroke = props.stroke
        r.style.strokeWidth = '1'
        r.style.transform = 'scale(1)'
      })
      // apply
      el.classList.add('gw-pulse')
      el.style.fill = props.highlight
      el.style.stroke = SELECTED_STROKE
      el.style.strokeWidth = String(SELECTED_STROKE_WIDTH)
      el.style.filter = SELECTED_GLOW

      const key = el.dataset.key || ''
      const name = getReadableName(el) || key
      emit('update:selected', key)
      emit('select', { key, name })
    })
    if (props.selected) {
      const el = regions.find((r) => r.dataset.key === props.selected)
      if (el) {
        el.style.fill = props.highlight
        el.style.stroke = SELECTED_STROKE
        el.style.strokeWidth = String(SELECTED_STROKE_WIDTH)
        el.style.filter = SELECTED_GLOW
      }
    }
  })
})

watch(
  () => props.selected,
  (key) => {
    regions.forEach((r) => {
      const active = key && r.dataset.key === key
      r.style.fill = active ? props.highlight : props.defaultFill
      r.style.stroke = active ? SELECTED_STROKE : props.stroke
      r.style.strokeWidth = active ? String(SELECTED_STROKE_WIDTH) : '1'
      r.style.filter = active ? SELECTED_GLOW : 'none'
    })
  },
)
</script>

<template>
  <div
    class="w-full flex items-center justify-center overflow-hidden"
    :style="{ height: `${height}px` }"
  >
    <div ref="wrap" class="w-full h-full"></div>
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
  0% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.06);
  }
  100% {
    transform: scale(1);
  }
}
.gw-pulse {
  animation: gw-pulse 0.45s ease;
}
:deep(svg rect) {
  fill: transparent !important;
  stroke: none !important;
}
</style>
