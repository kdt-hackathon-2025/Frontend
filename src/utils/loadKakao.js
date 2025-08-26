export function loadKakao(appKey) {
  return new Promise((resolve, reject) => {
    // 이미 로드됨
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => resolve(window.kakao))
      return
    }

    if (!appKey) {
      reject(new Error('[Kakao] Missing appKey (VITE_KAKAO_JS_KEY)'))
      return
    }

    // 이미 삽입된 스크립트가 있으면 재사용
    const EXISTING_ID = 'kakao-sdk'
    const prev = document.getElementById(EXISTING_ID)
    if (prev) {
      prev.addEventListener('load', () => {
        window.kakao.maps.load(() => resolve(window.kakao))
      })
      prev.addEventListener('error', (e) => reject(e))
      return
    }

    const s = document.createElement('script')
    s.id = EXISTING_ID
    s.async = true
    // services 라이브러리 + autoload=false 로딩
    s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`
    s.onload = () => {
      try {
        window.kakao.maps.load(() => resolve(window.kakao))
      } catch (err) {
        reject(err)
      }
    }
    s.onerror = (e) => {
      console.error('[Kakao] SDK load failed. Check domain settings / AdBlock / key.')
      reject(e)
    }
    document.head.appendChild(s)
  })
}
