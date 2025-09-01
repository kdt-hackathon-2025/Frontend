<!-- src/pages/TestQ4.vue -->
<template>
  <div class="bg-[#FBFBFB] relative min-h-full">
    <!-- 헤더 -->
    <header class="absolute inset-x-0 top-0 px-6 pt-[40px] flex flex-col items-center gap-3 z-0">
      <div class="w-[55px] h-[54px] shrink-0 [aspect-ratio:55/54]">
        <img :src="logo" alt="logo" class="w-full h-full object-contain" />
      </div>

      <div class="w-full max-w-[327px] mx-auto">
        <div class="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center px-2">
          <span
            class="grid place-items-center w-5 h-5 rounded-full border-2 border-[#20C27F] bg-[#20C27F]"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
          </span>
          <div class="h-[2px] bg-[#20C27F]"></div>
          <span
            class="grid place-items-center w-5 h-5 rounded-full border-2 border-[#20C27F] bg-[#20C27F]"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
          </span>
          <div class="h-[2px] bg-[#20C27F]/30"></div>
          <span
            class="grid place-items-center w-5 h-5 rounded-full border-2 border-[#20C27F] bg-white"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[#20C27F]"></span>
          </span>
        </div>

        <div
          class="mt-1 grid grid-cols-[auto_1fr_auto_1fr_auto] items-start px-1 text-[16px] font-medium leading-[16px] tracking-[0.5px] text-[#6F6F6F] font-[Lato]"
        >
          <span class="justify-self-center">지역</span><span></span>
          <span class="justify-self-center">일자리</span><span></span>
          <span class="justify-self-center">완료</span>
        </div>
      </div>
    </header>

    <!-- 본문 -->
    <main class="px-6 z-10">
      <div class="pt-[198px] text-center">
        <h2 class="text-[20px] font-semibold leading-[40px] text-[#1E1E1E]">
          Q10. 희망 직무를 선택하세요.
        </h2>
      </div>

      <section class="mt-6">
        <!-- 초기 -->
        <button
          v-if="view === 'idle'"
          type="button"
          class="w-full h-[56px] rounded-[12px] border border-[#E7E9EE] bg-white flex items-center justify-center gap-2 px-4 text-[#8A92A6]"
          @click="view = 'category'"
        >
          <span class="grid place-items-center w-6 h-6 rounded-full border border-[#C8CDD7]"
            >＋</span
          >
          <span class="text-[16px] font-medium">희망 직무 추가하기</span>
        </button>

        <!-- 대분류 -->
        <div
          v-else-if="view === 'category'"
          class="mx-auto w-[321px] rounded-[10px] border border-[#E2E2E2] bg-white p-1 relative z-20"
        >
          <ul class="divide-y divide-[#E2E2E2]">
            <li v-for="name in categories" :key="name">
              <button
                type="button"
                class="w-full flex items-center justify-between py-1 px-2 cursor-pointer"
                @click="name === '전문·특수직' ? (view = 'special') : null"
              >
                <span class="font-[Pretendard] text-[15px] leading-[30px] text-[#333] text-left">{{
                  name
                }}</span>
                <img :src="arrowDown" alt="" class="w-4 h-4 shrink-0 opacity-80" />
              </button>
            </li>
          </ul>
        </div>

        <!-- 전문·특수직 세부 -->
        <div
          v-else-if="view === 'special'"
          class="mx-auto w-[321px] rounded-[10px] border border-[#E2E2E2] bg-white p-1 relative z-20"
        >
          <ul class="divide-y divide-[#E2E2E2]">
            <li v-for="item in specialities" :key="item.key">
              <button
                type="button"
                class="w-full text-left py-1 px-2 font-[Pretendard] text-[15px] leading-[30px] text-[#333] cursor-pointer"
                @click="onSelectSpecial(item)"
              >
                {{ item.label }}
              </button>
            </li>
          </ul>
        </div>
      </section>

      <footer
        v-if="view === 'idle'"
        class="absolute bottom-10 inset-x-6 flex items-center justify-between gap-3"
      >
        <RouterLink
          to="/q3"
          class="flex-1 h-12 rounded-full border-2 border-[#E2E2E2] bg-white flex items-center justify-between px-6 text-[22px] font-bold leading-[22px] text-[#7D7D7D] no-underline font-[Pretendard]"
        >
          <span>←</span><span class="flex-1 text-center">이전</span>
        </RouterLink>
        <button
          type="button"
          class="flex-1 h-12 rounded-full bg-[#03C473] text-white flex items-center justify-between px-6 text-[22px] font-bold leading-[22px] no-underline font-[Pretendard]"
          @click="goNext"
        >
          <span class="flex-1 text-center">다음</span><span>→</span>
        </button>
      </footer>
    </main>
  </div>
</template>

<script setup>
import logo from '@/assets/image/logo.png'
import arrowDown from '@/assets/image/arrow_down.png'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const view = ref('idle')

const categories = [
  '경영·사무',
  '마케팅·광고·홍보',
  '무역·유통',
  '생산·제조',
  '영업·고객상담',
  'IT·인터넷',
  '연구개발·설계',
  '금융',
  '디자인',
  '미디어',
  '건설',
  '전문·특수직',
]

// 전문·특수직 항목을 객체로 정의
const specialities = [
  { label: '리서치·시장조사', key: 'research' },
  { label: '외국어·번역·통역', key: 'lang' },
  { label: '법률·특허·상표', key: 'law' },
  { label: '회계·세무·CPA·CFA', key: 'account' },
  { label: '보안·경비·경호', key: 'security' },
  { label: '보건·의료', key: 'medical' },
  { label: '초·중·고 교사', key: 'teacher' },
  { label: '교육개발·기획', key: 'edu-plan' },
  { label: '외국어·자격증·기술강사', key: 'lecturer' },
  { label: '사회복지·요양보호·자원봉사', key: 'welfare' },
  { label: '승무원·숙박 여행 서비스', key: 'travel' },
  { label: '음식 서비스', key: 'food' },
]

// Q41에서 돌아왔을 때 바로 펼친 상태로
onMounted(() => {
  if (route.query.open === 'category') view.value = 'category'
  if (route.query.focus === 'special') view.value = 'special'
})

const goNext = () => {
  router.push('/q5')
}

// key 기반 라우팅
const onSelectSpecial = (item) => {
  if (item.key === 'teacher') {
    router.push('/q41')
  } else if (item.key === 'welfare') {
    router.push('/q5')
  }
}
</script>
