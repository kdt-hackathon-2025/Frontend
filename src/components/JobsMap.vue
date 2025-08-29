<script setup>
import { onMounted, ref, watch, onBeforeUnmount, nextTick } from 'vue'
import { loadKakao } from '@/utils/loadKakao'

const props = defineProps({
  jobs: { type: Array, default: () => [] },
  width: { type: Number, default: 0 }, // 부모에서 내려주는 실제 폭
})

const mapEl = ref(null)
let kakao, map, geocoder
let markers = []
let infoWindows = []
let ro // ResizeObserver

const APP_KEY = import.meta.env.VITE_KAKAO_JS_KEY
console.log('[DEBUG] VITE_KAKAO_JS_KEY =', APP_KEY)

function setContainerWidth() {
  // 부모가 보장한 width 적용 (px)
  if (mapEl.value && props.width > 0) {
    mapEl.value.style.width = `${props.width}px`
  }
}

onMounted(async () => {
  try {
    kakao = await loadKakao(APP_KEY)
    console.log('[DEBUG] Kakao SDK loaded:', !!kakao)

    await nextTick()

    setContainerWidth()
    const rect = mapEl.value.getBoundingClientRect()
    console.log('[DEBUG] mapEl size (before create):', rect.width, rect.height)

    map = new kakao.maps.Map(mapEl.value, {
      center: new kakao.maps.LatLng(37.5665, 126.978),
      level: 7,
    })
    console.log('[DEBUG] Map created:', map)

    geocoder = new kakao.maps.services.Geocoder()
    console.log('[DEBUG] Geocoder created:', geocoder)

    // 생성 직후 한번 강제 리레이아웃
    map.relayout()
    map.setCenter(new kakao.maps.LatLng(37.5665, 126.978))

    // 컨테이너 크기 변경 감지 (안정성 보강)
    ro = new ResizeObserver(() => {
      if (map) map.relayout()
    })
    ro.observe(mapEl.value)

    renderMarkers()
  } catch (e) {
    console.error('[DEBUG] Kakao load error:', e)
  }
})

// 부모에서 width 바뀌면 바로 반영 + relayout
watch(
  () => props.width,
  () => {
    if (!mapEl.value) return
    setContainerWidth()
    if (map) map.relayout()
  },
  { immediate: true },
)

watch(() => props.jobs, renderMarkers, { deep: true })

function clearMap() {
  markers.forEach((m) => m.setMap(null))
  markers = []
  infoWindows.forEach((iw) => iw.close())
  infoWindows = []
}

function renderMarkers() {
  if (!map || !geocoder) return
  clearMap()

  const bounds = new kakao.maps.LatLngBounds()

  props.jobs.forEach((job) => {
    if (!job.location) return
    geocoder.addressSearch(job.location, (result, status) => {
      if (status !== kakao.maps.services.Status.OK) return

      const { x, y } = result[0]
      const pos = new kakao.maps.LatLng(y, x)
      const marker = new kakao.maps.Marker({ position: pos })
      marker.setMap(map)
      markers.push(marker)
      bounds.extend(pos)

      const iwContent = `
        <div style="padding:6px 10px; font-size:12px;">
          <div style="font-weight:700; margin-bottom:4px;">${escapeHtml(job.title)}</div>
          <div style="color:#666;">${escapeHtml(job.company || '')}</div>
        </div>`
      const iw = new kakao.maps.InfoWindow({ content: iwContent, removable: true })
      infoWindows.push(iw)

      kakao.maps.event.addListener(marker, 'click', () => {
        infoWindows.forEach((w) => w.close())
        iw.open(map, marker)
      })

      map.setBounds(bounds)
      map.relayout() // 마커 추가 후에도 보강
    })
  })
}

function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

onBeforeUnmount(() => {
  clearMap()
  if (ro && mapEl.value) ro.unobserve(mapEl.value)
  ro = null
  map = null
})
</script>

<template>
  <div ref="mapEl" class="block w-full h-full"></div>
</template>
