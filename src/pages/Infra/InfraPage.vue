<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import BasicHeader from '../../components/BasicHeader.vue';

const router = useRouter()

const tags = ['편의', '의료', '교육', '문화', '관광']
const activeTag = ref('의료')

const places = [
  { id: 1,  name: '원주세브란스기독병원',  addr: '원주시 일산로 20 (일산동)',   lat: 37.339900, lng: 127.933200 },
  { id: 2,  name: '강원특별자치도 원주의료원', addr: '원주시 서원대로 387 (개운동)', lat: 37.344100, lng: 127.922800 },
  { id: 3,  name: '원주프라임병원',        addr: '원주시 남원로 556 (개운동)',   lat: 37.336200, lng: 127.938700 },
  { id: 4,  name: '본베스트병원',          addr: '원주시 능라도길 51 (무실동)',   lat: 37.348500, lng: 127.940600 },
  { id: 5,  name: '무실정형외과의원',      addr: '원주시 무실동',              lat: 37.327700, lng: 127.945300 },
  { id: 6,  name: '명륜내과의원',          addr: '원주시 명륜동',              lat: 37.358900, lng: 127.914700 },
  { id: 7,  name: '단구성모의원',          addr: '원주시 단구동',              lat: 37.346200, lng: 127.940000 },
  { id: 8,  name: '태장연합의원',          addr: '원주시 태장동',              lat: 37.331900, lng: 127.936300 },
  { id: 9,  name: '학성신경외과의원',      addr: '원주시 학성동',              lat: 37.355300, lng: 127.911000 },
  { id: 10, name: '단계재활의원',          addr: '원주시 단계동',              lat: 37.318500, lng: 127.948900 },
  { id: 11, name: '반곡관설연세의원',      addr: '원주시 반곡관설동',          lat: 37.362000, lng: 127.923800 },
  { id: 12, name: '우산소아청소년과',      addr: '원주시 우산동',              lat: 37.335600, lng: 127.953700 },
  { id: 13, name: '문막중앙의원',          addr: '원주시 문막읍',              lat: 37.351100, lng: 127.919400 },
  { id: 14, name: '판부삼성의원',          addr: '원주시 판부면',              lat: 37.367700, lng: 127.950900 },
  { id: 15, name: '기업도시정형외과',      addr: '원주시 지정면',              lat: 37.314400, lng: 127.908100 },
  { id: 16, name: '봉산한의원',            addr: '원주시 봉산동',              lat: 37.342800, lng: 127.942400 },
  { id: 17, name: '혁신메디컬센터',        addr: '원주시 반곡관설동',          lat: 37.325000, lng: 127.916800 },
  { id: 18, name: '원주하나이비인후과',    addr: '원주시 단구동',              lat: 37.359800, lng: 127.947500 },
  { id: 19, name: '중앙안과의원',          addr: '원주시 중앙동',              lat: 37.330300, lng: 127.921700 },
  { id: 20, name: '원주튼튼정형외과',      addr: '원주시 무실동',              lat: 37.353500, lng: 127.940800 },

]

const mapEl = ref(null)
let map = null
let infoWindow = null
let markers = []

function loadKakaoSdk(appKey) {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => resolve(window.kakao))
      return
    }
    const existing = document.getElementById('kakao-sdk')
    if (existing) {
      existing.addEventListener('load', () => {
        if (window.kakao && window.kakao.maps) resolve(window.kakao)
        else reject(new Error('kakao.maps not available after load'))
      }, { once: true })
      existing.addEventListener('error', (e) => reject(e), { once: true })
      return
    }
    const params = new URLSearchParams({
      appkey: appKey,
      autoload: 'false',
      libraries: 'services' // 지오코더 사용
    })
    const script = document.createElement('script')
    script.id = 'kakao-sdk'
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?${params.toString()}`
    script.async = true
    script.onload = () => {
      if (!(window.kakao && window.kakao.maps)) {
        reject(new Error('kakao.maps missing after script load'))
        return
      }
      window.kakao.maps.load(() => resolve(window.kakao))
    }
    script.onerror = (e) => reject(e)
    document.head.appendChild(script)
  })
}

// 주소 → 좌표 Promise 래퍼
function geocode(geocoder, address, kakao) {
  return new Promise((resolve) => {
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result[0]) {
        resolve(new kakao.maps.LatLng(result[0].y, result[0].x))
      } else {
        console.warn('[Geocode 실패]', address, status)
        resolve(null)
      }
    })
  })
}

function clearMarkers() {
  markers.forEach(m => m.setMap(null))
  markers = []
  if (infoWindow) infoWindow.close()
}

async function renderMarkers(kakao) {
  if (!map) return
  clearMarkers()

  const geocoder = new kakao.maps.services.Geocoder()
  infoWindow = infoWindow || new kakao.maps.InfoWindow({ zIndex: 1 })

  const bounds = new kakao.maps.LatLngBounds()

  // 순차 지오코딩(소량일 때 안정적)
  for (const p of places) {
    const pos = await geocode(geocoder, p.addr, kakao)
    if (!pos) continue

    const marker = new kakao.maps.Marker({ position: pos })
    marker.setMap(map)

    kakao.maps.event.addListener(marker, 'click', () => {
      const html = `
        <div style="padding:8px 10px; font-size:12px;">
          <div style="font-weight:600; margin-bottom:4px;">${p.name}</div>
          <div>${p.addr}</div>
        </div>`
      infoWindow.setContent(html)
      infoWindow.open(map, marker)
    })

    markers.push(marker)
    bounds.extend(pos)
  }

  if (!bounds.isEmpty()) {
    map.setBounds(bounds, 20, 20, 20, 20) // 여백(px)
  }
}

onMounted(async () => {
  const appKey = import.meta.env.VITE_KAKAO_JS_KEY
  if (!appKey) {
    console.error('VITE_KAKAO_JS_KEY 미설정')
    return
  }
  const kakao = await loadKakaoSdk(appKey)
  if (!mapEl.value) return

  // 초기 위치 : 강원도 원주
  const INIT_WONJU = new kakao.maps.LatLng(37.3399, 127.9332) // 원주 중심 근처
  map = new kakao.maps.Map(mapEl.value, {
    center: INIT_WONJU,
    level: 6,
  })
  await renderMarkers(kakao)
})

onBeforeUnmount(() => {
  clearMarkers()
  map = null
  infoWindow = null
})

const pages = [1, 2, 3, 4, 5]
const currentPage = ref(1)

const prev = () => {
  if (currentPage.value > 1) currentPage.value--
}
const next = () => {
  if (currentPage.value < pages[pages.length - 1]) currentPage.value++
}
function goDetail() {
  router.push('/infraDetail')
}
</script>

<template>
  <div class="infra-page">
    <BasicHeader type="icon" title="슬기로운 은퇴생활" />

    <div class="container" ref="mapEl"></div>

    <div class="list-count">총 31개</div>

    <div class="tag-container">
      <button
        v-for="t in tags"
        :key="t"
        :class="['tag', { active: activeTag === t }]"
        @click="activeTag = t"
      >
        {{ t }}
      </button>
    </div>

    <div class="list-container">
      <div v-for="p in places" :key="p.id" class="place-card" @click="goDetail">
        <div class="place-title">{{ p.name }}</div>
        <img class="place-pin" src="/src/assets/image/infra-pin-black.svg" alt="핀 아이콘" />
        <div class="place-addr">{{ p.addr }}</div>
      </div>
    </div>

    <div class="pagination-bar" role="pagination" aria-label="pagination">
      <button class="nav-arrow left" :disabled="currentPage===1" @click="prev" aria-label="이전 페이지">
        <img src="/src/assets/image/arrow_left.png" alt="왼쪽 화살표">
      </button>

      <div class="pages">
        <button
          v-for="n in pages"
          :key="n"
          :class="['page', { active: currentPage === n }]"
          @click="currentPage = n"
          :aria-current="currentPage===n ? 'page' : undefined"
        >
          {{ n }}
        </button>
      </div>

      <button class="nav-arrow right" :disabled="currentPage===pages[pages.length-1]" @click="next" aria-label="다음 페이지">
        <img src="/src/assets/image/arrow_right.png" alt="오른쪽 화살표">
      </button>
    </div>
  </div>
</template>

<style>
* {
  font-family: Pretendard;
}
.infra-page{
  background-color: #FBFBFB;
  position: relative;
}
.container {
  background-color: #03C473;
  width: 19.4375rem;
  margin: 0 auto;
  height: 13.25rem;
  border-radius: 0.9375rem;
  background-color: grey;
  overflow: hidden;

}
.list-count {
  position: absolute;
  right: 2.25rem;

  margin-top: 0.75rem;
  font-family: Inter;
  font-size: 14px;
  color: #7D7D7D;
  font-weight: 400;
}
.tag-container {
  position: relative;
  margin: 2.5rem auto 1rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.tag {
  display: flex;
  width: 3.60319rem;
  height: 1.75rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 624.9375rem;
  border: 1px solid #E2E2E2;
  background: #FFF;
  color: #6B6B6B;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}

.tag.active {
  background: #03C473;
  border-color: #03C473;
  color: #FFF;
}

.list-container{
  width: 20.9375rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.place-card{
  position: relative;
  width: 20.9375rem;
  height: 5.5625rem;
  background: #FFF;
  border-radius: 0.75rem;
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.25));
  overflow: hidden;
}

.place-title{
  position: absolute;
  top: 1rem;
  left: 1.25rem;
  width: 14.125rem;
  height: 1.5rem;
  color: #333;
  font-family: Inter, sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.place-pin{
  position: absolute;
  top: 3.25rem;
  left: 1.25rem;
  width: 1rem;
  height: 1rem;
  object-fit: contain;
}

.place-addr{
  position: absolute;
  top: 3.25rem;
  left: 2.5rem;
  width: 16.9375rem;
  height: 1.0625rem;
  color: #3D4352;
  font-family: Inter, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.0625rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pagination-bar{
  width: 23.4375rem;
  margin: 20px auto 5rem;
  position: relative;
  display: flex;
  grid-template-columns: 24px 1fr 24px;
  justify-content: center;
  align-items: center;
  padding: 0 2.25rem;
}

.pages{
  min-width: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.page{
  width: 2.125rem;
  height: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #1E1E1E;
  font: 600 16px/1 Inter;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.page.active{
  background: #03C473;
  color: #FFF;
}

.nav-arrow{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem; height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
.nav-arrow.left  { justify-self: start; }
.nav-arrow.right { justify-self: end;   }

.nav-arrow:disabled{
  opacity: 0.35;
  cursor: default;
}

</style>
