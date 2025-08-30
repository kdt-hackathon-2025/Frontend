<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GangwonMap from '@/components/GangwonMap.vue'
import jobThumb1 from '@/assets/image/일자리1.png'
import jobThumb2 from '@/assets/image/일자리2.png'

const router = useRouter()

// 지도에서 선택된 시/군 이름
const selectedRegion = ref<string | null>(null)

const regionNameMap: Record<string, string> = {
  path24: '철원',
  path146: '철원',
  path28: '화천',
  path144: '화천',
  path36: '양구',
  path124: '양구',
  path64: '고성',
  path122: '고성',
  path52: '인제',
  path142: '인제',
  path68: '속초',
  path126: '속초',
  path32: '춘천',
  path148: '춘천',
  path76: '양양',
  path128: '양양',
  path40: '홍천',
  path150: '홍천',
  path104: '강릉',
  path130: '강릉',
  path100: '평창',
  path140: '평창',
  path44: '횡성',
  path152: '횡성',
  path48: '원주',
  path154: '원주',
  path108: '정선',
  path138: '정선',
  path96: '영월',
  path156: '영월',
  path112: '동해',
  path132: '동해',
  path120: '삼척',
  path134: '삼척',
  path136: '태백',
  path116: '태백',
  path20: ' ',
}
// 카드 타이틀
const regionName = computed(() =>
  selectedRegion.value
    ? `강원도 ${regionNameMap[selectedRegion.value] ?? selectedRegion.value}`
    : '강원도',
)

// 썸네일 스타일
const thumb1Style = computed(() => ({
  width: '219px',
  height: '128px',
  flexShrink: '0',
  aspectRatio: '142 / 83',
  background: `url(${jobThumb1}) lightgray 50% / cover no-repeat`,
}))
const thumb2Style = computed(() => ({
  width: '84px',
  height: '128px',
  flexShrink: '0',
  aspectRatio: '21 / 32',
  background: `url(${jobThumb2}) lightgray 50% / cover no-repeat`,
}))
const regionParam = computed(() =>
  selectedRegion.value ? (regionNameMap[selectedRegion.value] ?? selectedRegion.value) : '',
)
const openRegionJobs = () => {
  router.push({
    path: '/jobs',
    query: regionParam.value ? { region: regionParam.value } : {},
  })
}
</script>

<template>
  <div class="w-[375px] min-h-[812px] mx-auto bg-white">
    <header class="text-[#FBFBFB] flex w-[375px] h-[76px] items-center">
      <img src="/src/assets/image/logo.png" alt="" class="w-[35px] ml-[20px]" />
      <p class="text-[#1E1E1E] font-['Aggravo'] text-xl font-light ml-[14px]">지역 · 일자리</p>

      <!-- 필터 아이콘 (SVG)코드로 대체함 -->
      <button
        class="absolute left-[318px] top-[30px] w-[25px] h-[5px] flex-shrink-0 flex items-center justify-center"
        aria-label="필터 열기"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          class="w-[25px] h-[25px]"
        >
          <path
            d="M22.9168 3.125H2.0835L10.4168 12.9792V19.7917L14.5835 21.875V12.9792L22.9168 3.125Z"
            stroke="#1E1E1E"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </header>

    <main class="px-4 pb-8">
      <section class="px-1 mt-3 map-naked">
       <GangwonMap v-model:selected="selectedRegion" :height="260" :offset-x="-10" />
      </section>

      <section class="mt-5 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-4 pt-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <img src="/src/assets/image/GangWonLogo.png" alt="강원도로고" />
            </div>
            <h2 class="text-[16px] font-semibold text-gray-900">{{ regionName }}</h2>
          </div>

          <button class="text-[12px] text-gray-600 flex items-center gap-1" @click="openRegionJobs">
            지역 일자리 보기
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="#6B7280"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <!-- 썸네일 -->
        <div class="px-4 mt-3 flex gap-2">
          <div :style="thumb1Style"></div>
          <div :style="thumb2Style"></div>
        </div>

        <!-- 키워드 칩 -->
        <div class="px-4 pb-3 pt-2 space-y-2">
          <div class="flex items-center gap-2 flex-nowrap">
            <div
              class="h-[34px] w-[191px] rounded-[10px] bg-[#03C473] flex items-center justify-center"
            >
              <span
                class="px-2 whitespace-nowrap text-[#FBFBFB] text-[14px] font-semibold leading-none"
              >
                종합병원과 응급의료센터 보유
              </span>
            </div>
            <span class="chip-gray">계곡</span>
            <span class="chip-gray">산림</span>
          </div>

          <div class="flex items-center gap-2 flex-nowrap">
            <div
              class="h-[34px] w-[137px] rounded-[10px] bg-[#03C473] flex items-center justify-center"
            >
              <span
                class="px-2 whitespace-nowrap text-[#FBFBFB] text-[14px] font-semibold leading-none"
              >
                도내 관광객 방문 1위
              </span>
            </div>
            <span class="chip-gray">오크밸리</span>
            <span class="chip-gray">치악산</span>
          </div>
        </div>

        <!-- 도트(슬라이드 인디케이터) -->
        <div class="pb-4 flex items-center justify-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
        </div>
      </section>
    </main>
  </div>
</template>
<style scoped>
.chip-green {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  border-radius: 10px;
  background: #03c473;
  flex-shrink: 0;
}
.chip-green-text {
  white-space: nowrap;
  color: #fbfbfb;
  text-align: center;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
}

.chip-gray {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  padding: 0 12px;
  border-radius: 9999px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.header-pret :deep(h1),
.header-pret :deep(h2),
.header-pret :deep(.title),
.header-pret :deep([data-title]),
.header-pret :deep(p) {
  color: #1e1e1e !important;
  font-family:
    'Pretendard',
    'Pretendard Variable',
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif !important;
  font-size: 20px !important;
  font-style: normal !important;
  font-weight: 600 !important;
  line-height: 1 !important;
}

.header-pret.is-regular :deep(h1),
.header-pret.is-regular :deep(h2),
.header-pret.is-regular :deep(.title),
.header-pret.is-regular :deep([data-title]),
.header-pret.is-regular :deep(p) {
  font-weight: 400 !important;
}

/* GangwonMap 내부(섀도/보더/배경) 싹 비우기 */
.map-naked :deep(div),
.map-naked :deep(svg),
.map-naked :deep(canvas),
.map-naked :deep(img) {
  border: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  background: transparent !important;
  border-radius: 0 !important;
}

.map-naked :deep(svg rect) {
  stroke: none !important;
  fill: transparent !important;
}

:deep(svg rect) { fill: transparent !important; stroke: none !important; }
</style>
