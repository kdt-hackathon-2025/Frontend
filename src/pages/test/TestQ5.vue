<template>
  <div class="relative h-full">
    <!-- 헤더: 로고 + 진행바 -->
    <header class="absolute inset-x-0 top-0 px-6 pt-[40px] flex flex-col items-center gap-3">
      <div class="w-[55px] h-[54px] shrink-0 [aspect-ratio:55/54]">
        <img :src="logo" alt="logo" class="w-full h-full object-contain" />
      </div>

      <div class="w-full max-w-[327px] mx-auto">
        <!-- 진행바: 1,2 완료 / 3 현재 -->
        <div class="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center px-2">
          <!-- 1 done -->
          <span
            class="grid place-items-center w-5 h-5 rounded-full border-2 border-[#20C27F] bg-[#20C27F]"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
          </span>
          <div class="h-[2px] bg-[#20C27F]"></div>
          <!-- 2 done -->
          <span
            class="grid place-items-center w-5 h-5 rounded-full border-2 border-[#20C27F] bg-[#20C27F]"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
          </span>
          <div class="h-[2px] bg-[#D1D5DB]"></div>
          <!-- 3 current -->
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
          <span class="justify-self-center ml-8">일자리</span><span></span>
          <span class="justify-self-center">시작하기</span>
        </div>
      </div>
    </header>

    <!-- 본문 -->
    <main class="px-6">
      <div class="pt-[198px] text-center">
        <h2 class="text-[20px] font-semibold leading-[40px] text-[#1E1E1E]">
          Q10. 희망 직무를 선택하세요.
        </h2>
      </div>

      <section class="mt-6 space-y-4">
        <!-- 카드 1 -->
        <div
          class="rounded-[12px] border border-[#E7E9EE] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="text-[#3D4352] text-[18px] font-semibold">초·중·고 교사</div>
            <div class="text-[#3D4352] text-[15px] font-semibold">30년</div>
          </div>
          <div class="mt-1 flex items-center justify-between">
            <div class="text-[#8A92A6] text-[14px]">전문·특수직</div>
            <button
              type="button"
              class="h-8 px-3 rounded-full bg-[#03C473] text-white text-[14px] font-semibold"
            >
              경력 추가
            </button>
          </div>
        </div>

        <!-- 카드 2 -->
        <div
          class="rounded-[12px] border border-[#E7E9EE] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="text-[#3D4352] text-[18px] font-semibold">사회복지·요양보호·자원봉사</div>
            <div class="text-[#3D4352] text-[15px] font-semibold">신입</div>
          </div>
          <div class="mt-1 flex items-center justify-between">
            <div class="text-[#8A92A6] text-[14px]">전문·특수직</div>
            <button
              type="button"
              class="h-8 px-3 rounded-full bg-[#03C473] text-white text-[14px] font-semibold"
            >
              경력 추가
            </button>
          </div>
        </div>

        <!-- 추가 버튼 (비활성 느낌) -->
        <button
          type="button"
          class="w-full h-[56px] rounded-[12px] border border-[#E7E9EE] bg-white grid grid-cols-[24px_1fr] items-center gap-2 px-4 text-left text-[#8A92A6]"
        >
          <span class="grid place-items-center w-6 h-6 rounded-full border border-[#C8CDD7]"
            >＋</span
          >
          <span class="text-[16px] font-medium">희망 직무 추가하기</span>
        </button>
      </section>

      <!-- 푸터 -->
      <footer class="absolute bottom-10 inset-x-6 flex items-center justify-between gap-3">
        <RouterLink
          to="/q4"
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
import { useRouter } from 'vue-router'

const router = useRouter()
const goNext = () => {
  router.push('/finish')
}
</script>
