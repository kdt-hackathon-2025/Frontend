<script setup>
import { onMounted, ref } from 'vue'
import BasicHeader from '../../components/BasicHeader.vue'

const mapEl = ref(null)
const lat = 37.3399
const lng = 127.9332

function loadKakaoSdk(appKey) {
  return new Promise((resolve, reject) => {
    // 이미 로드
    if (window.kakao && window.kakao.maps) {
      console.log('[Kakao] maps already loaded')
      window.kakao.maps.load(() => resolve(window.kakao))
      return
    }

    // 기존 스크립트가 있다면 상태 체크
    const existing = document.getElementById('kakao-sdk')
    if (existing) {
      console.log('[Kakao] script exists, waiting...')
      existing.addEventListener('load', () => {
        if (window.kakao && window.kakao.maps) {
          resolve(window.kakao)
        } else {
          reject(new Error('kakao.maps not available after load'))
        }
      }, { once: true })
      existing.addEventListener('error', (e) => reject(e), { once: true })
      return
    }

    // SDK URL (필요 시 libraries 추가)
    const params = new URLSearchParams({
      appkey: appKey,
      autoload: 'false',
      libraries: 'services'   // 지오코더/장소검색 쓰면 유용, 불필요하면 빼도 됨
    })
    const src = `https://dapi.kakao.com/v2/maps/sdk.js?${params.toString()}`
    console.log('[Kakao] injecting script:', src.replace(appKey, '***' + appKey.slice(-6)))

    const script = document.createElement('script')
    script.id = 'kakao-sdk'
    script.src = src
    script.async = true
    script.onload = () => {
      console.log('[Kakao] script loaded')
      if (!(window.kakao && window.kakao.maps)) {
        reject(new Error('kakao.maps missing after script load'))
        return
      }
      window.kakao.maps.load(() => resolve(window.kakao))
    }
    script.onerror = (e) => {
      console.error('[Kakao] script onerror:', e)
      reject(e)
    }
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  const origin = window.location.origin
  console.log('[Kakao] origin:', origin)

  const appKey = import.meta.env.VITE_KAKAO_JS_KEY
  console.log('[Kakao] env key tail:', appKey ? appKey.slice(-6) : appKey)

  if (!appKey) {
    console.error('VITE_KAKAO_JS_KEY 미설정: .env.local 확인 + dev 서버 재시작 필요')
    return
  }

  try {
    const kakao = await loadKakaoSdk(appKey)
    if (!mapEl.value) return

    const center = new kakao.maps.LatLng(lat, lng)
    const map = new kakao.maps.Map(mapEl.value, { center, level: 3 })
    new kakao.maps.Marker({ position: center, map })
  } catch (err) {
    console.error(
      'Kakao SDK 로드 실패. 점검 리스트:\n' +
      '1) JavaScript 키인지 (REST 키 X)\n' +
      '2) 플랫폼 Web 도메인에 현재 origin(포트 포함) 등록\n' +
      '3) index.html CSP로 외부 스크립트 차단 여부\n' +
      '4) AdBlock/네트워크 차단\n' +
      '5) .env.local 위치/접두사(VITE_)/서버 재시작',
      err
    )
  }
})
</script>

<template>
  <div class="infra-detail">
    <BasicHeader type="back" title="상세 정보" />

    <div class="title">원주세브란스기독병원</div>
    <div class="location">
      <div ref="mapEl" class="map-box"></div>
      <!-- <img src="/src/assets/image/infra_location_img.png" alt="지도"> -->
    </div>

    <div class="description">
      <div class="desc-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M11.25 5.83301C11.25 9.91634 6 13.4163 6 13.4163C6 13.4163 0.75 9.91634 0.75 5.83301C0.75 4.44062 1.30312 3.10526 2.28769 2.1207C3.27226 1.13613 4.60761 0.583008 6 0.583008C7.39239 0.583008 8.72774 1.13613 9.71231 2.1207C10.6969 3.10526 11.25 4.44062 11.25 5.83301Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 7.58301C6.9665 7.58301 7.75 6.79951 7.75 5.83301C7.75 4.86651 6.9665 4.08301 6 4.08301C5.0335 4.08301 4.25 4.86651 4.25 5.83301C4.25 6.79951 5.0335 7.58301 6 7.58301Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        <p class="text">강원특별자치도 원주시 일산로 20 (일산동)</p>
      </div>
      <div class="desc-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M12.8333 9.87038V11.6204C12.834 11.7828 12.8007 11.9436 12.7356 12.0925C12.6705 12.2414 12.5751 12.375 12.4554 12.4848C12.3357 12.5946 12.1943 12.6782 12.0404 12.7303C11.8865 12.7823 11.7235 12.8017 11.5617 12.787C9.76665 12.592 8.04242 11.9786 6.5275 10.9962C5.11807 10.1006 3.92311 8.90565 3.0275 7.49622C2.04166 5.97442 1.42814 4.2418 1.23667 2.43872C1.22209 2.2774 1.24126 2.11483 1.29296 1.96133C1.34466 1.80783 1.42775 1.66678 1.53695 1.54716C1.64615 1.42754 1.77905 1.33196 1.92721 1.26652C2.07537 1.20108 2.23553 1.1672 2.3975 1.16705H4.1475C4.4306 1.16426 4.70505 1.26451 4.9197 1.44911C5.13434 1.63371 5.27455 1.89006 5.31417 2.17038C5.38803 2.73042 5.52501 3.28031 5.7225 3.80955C5.80099 4.01834 5.81797 4.24525 5.77145 4.4634C5.72492 4.68154 5.61684 4.88178 5.46 5.04038L4.71917 5.78122C5.54958 7.24162 6.75877 8.45081 8.21917 9.28122L8.96 8.54038C9.1186 8.38355 9.31884 8.27546 9.53699 8.22894C9.75513 8.18241 9.98205 8.1994 10.1908 8.27788C10.7201 8.47537 11.27 8.61235 11.83 8.68622C12.1134 8.72619 12.3722 8.86892 12.5571 9.08725C12.7421 9.30559 12.8404 9.5843 12.8333 9.87038Z" fill="#D9D9D9" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="text">033-741-0114</p>
      </div>
      <div class="desc-item multiline">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M6.99984 3.50033V7.00033L9.33317 8.16699M12.8332 7.00033C12.8332 10.222 10.2215 12.8337 6.99984 12.8337C3.77818 12.8337 1.1665 10.222 1.1665 7.00033C1.1665 3.77866 3.77818 1.16699 6.99984 1.16699C10.2215 1.16699 12.8332 3.77866 12.8332 7.00033Z" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="text">
          월~금 08:30 - 17:30<br />
          토, 일 정기휴무 <br />
          연휴 중 응급진료 24시간
        </p>
      </div>
    </div>

    <div class="title2">사진 보기</div>
    <div class="pictures">
      <div class="carousel">
        <figure class="card card--lg">
          <img src="../../assets/image/infra_img1.png" alt="병원 전경 1" />
        </figure>

        <figure class="card card--lg">
          <img src="/src/assets/image/infra_img2.png" alt="병원 전경 2" />
        </figure>

        <figure class="card card--lg">
          <img src="/src/assets/image/infra_img1.png" alt="병원 전경 3" />
        </figure>
      </div>
    </div>
  </div>
</template>

<style>
* {
  font-family: Pretendard;
}
.title {
  width: 11.5rem;
  height: 1.5rem;
  margin-left: 2rem;
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
}
.location {
  width: 19.4375rem;
  height: 13.25rem;
  margin-top: 0.75rem;
  margin-left: 2rem;
  border-radius: 0.9375rem;
  background-color: grey;
  overflow: hidden;
  background: #eee; /* 로딩 전 빈 배경 */
}
/* ✅ 지도 엘리먼트가 꽉 차도록 */
.location .map-box { width: 100%; height: 100%; }

.description {
  width: 20.9375rem;
  margin: 1rem auto 0;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  border-radius: 1rem;
  background: #FFF;
  box-shadow: 1px 1px 2px rgba(0,0,0,0.25);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
}
.desc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
}
.desc-item.multiline {
  align-items: flex-start;
}
.desc-item.multiline svg {
  margin-top: 3px;
}
.desc-item.multiline .text {
  line-height: 1.5;
}
.title2 {
  margin-top: 1.25rem;
  margin-left: 1.5rem;

  color: var(--, #333);
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.pictures {
  display: flex;
  width: 20.9375rem;
  height: 10rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 0.75rem auto 5rem;
}

.pictures .carousel{
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.pictures .card{
  flex: 0 0 auto;
  width: 14rem;
  height: 10rem;
  border-radius: 1rem;
  overflow: hidden;
}
.pictures .card img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
