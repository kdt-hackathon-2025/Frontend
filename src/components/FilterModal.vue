<template>
  <teleport to="body">
    <div class="w-[375px] bg-zinc-800/70 fixed inset-0 mx-auto z-[1000]" v-if="isOpen">
      <!-- 흰 화면 -->
      <div
        class="fixed inset-0 z-50 flex flex-col bg-[#FBFBFB] h-[630px] w-[375px] mx-auto py-[24px]"
      >
        <!-- 헤더 -->
        <div class="h-20 flex items-center px-[24px]">
          <h2 class="text-[20px] font-semibold text-[#1E1E1E]">지역 선호도 설정</h2>
        </div>

        <!-- 박스 -->
        <div class="px-[24px] flex flex-col gap-[8px] mt-[16px]">
          <div
            class="w-[328px] h-16 bg-white rounded-[10px] border border-[#E2E2E2] px-[12px] relative flex items-center justify-between"
            v-for="it in items"
            :key="it.key"
          >
            <!-- 아이콘, 제목, 설명 -->
            <div class="flex items-center h-full gap-[12px]">
              <img class="w-8 h-8" :src="it.icon" />
              <div class="text[#1E1E1E]">
                <p class="font-semibold">{{ it.title }}</p>
                <p class="text-[12px]">{{ it.desc }}</p>
              </div>
            </div>
            <!-- 하, 중, 상 버튼 부분 -->
            <div class="w-[110px] shrink-0">
              <Segment v-model="prefs[it.key]" />
            </div>
          </div>
        </div>
        <!-- 밑에 세 개 버튼 -->
        <div class="px-[24px] my-[16px] flex justify-between">
          <div class="flex items-center gap-[8px] cursor-pointer" type="button" @click="resetAll">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13.75 4.75C12.6978 2.53 10.4027 1 7.75 1C6.86358 1 5.98583 1.17459 5.16689 1.51381C4.34794 1.85303 3.60382 2.35023 2.97703 2.97703C2.35023 3.60382 1.85303 4.34794 1.51381 5.16689C1.17459 5.98583 1 6.86358 1 7.75C1 8.63642 1.17459 9.51417 1.51381 10.3331C1.85303 11.1521 2.35023 11.8962 2.97703 12.523C3.60382 13.1498 4.34794 13.647 5.16689 13.9862C5.98583 14.3254 6.86358 14.5 7.75 14.5C9.54021 14.5 11.2571 13.7888 12.523 12.523C13.7888 11.2571 14.5 9.54021 14.5 7.75M14.5 1V5.5H10"
                stroke="#475067"
                stroke-width="2"
              />
            </svg>
            <button class="cursor-pointer text-[16px]">초기화</button>
          </div>
          <div class="flex gap-[8px]">
            <button
              class="cursor-pointer rounded-[10px] bg-[#03C473] px-[24px] py-[4px] text-[#FBFBFB] font-semibold"
              @click="apply"
            >
              적용
            </button>
            <button
              class="cursor-pointer rounded-[10px] px-[24px] py-[4px] border border-[#E2E2E2] font-semibold text-[#898989]"
              @click="cancel"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import forest from '@/assets/image/녹지.png'
import landPrice from '@/assets/image/공시지가.png'
import mart from '@/assets/image/mart.png'
import culture from '@/assets/image/문화시설.png'
import medical from '@/assets/image/의료시설.png'
import population from '@/assets/image/인구.png'
import transit from '@/assets/image/대중교통.png'
import Segment from './Segment.vue'

//v-model 제어
const props = defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'apply'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const items = [
  { key: 'forest', title: '녹지비율', desc: '행정구역별 면적대비 산림율', icon: forest },
  { key: 'landPrice', title: '공시지가', desc: '주거용 토지의 단위면적당 가격', icon: landPrice },
  { key: 'mart', title: '대형 마트 수', desc: '대형 종합소매업 수', icon: mart },
  { key: 'culture', title: '문화시설 수', desc: '극장, 영화관, 박물관, 식물원 등', icon: culture },
  { key: 'medical', title: '의료시설 수', desc: '행정구역별 종합병원 및 병원 수', icon: medical },
  { key: 'population', title: '인구 수', desc: '지역 별 인구 규모', icon: population },
  { key: 'transit', title: '대중교통 시설 수', desc: '버스정류장 및 도시철도역 수', icon: transit },
]

// 선택 상태
const prefs = ref({
  forest: null,
  landPrice: null,
  mart: null,
  culture: null,
  medical: null,
  population: null,
  transit: null,
})

// 하나라도 선택됐는지 체크
const hasAnySelection = computed(() => Object.values(prefs.value).some((v) => v))

//초기화 버튼
function resetAll() {
  Object.keys(prefs.value).forEach((k) => (prefs.value[k] = null))
}

//적용 버튼
function apply() {
  if (!hasAnySelection.value) return
  emit('apply', { ...prefs.value })
  isOpen.value = false
}

//취소 버튼
function cancel() {
  isOpen.value = false
}
</script>

<style scoped>
* {
  font-family: Pretendard;
}
</style>
