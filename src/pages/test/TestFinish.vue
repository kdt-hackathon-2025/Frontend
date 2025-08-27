<template>
  <div class="relative h-full">
    <!-- 헤더: 로고 + 진행바 -->
    <header class="absolute inset-x-0 top-0 px-6 pt-[40px] flex flex-col items-center gap-3">
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
          <div class="h-[2px] bg-[#20C27F]"></div>

          <span
            class="grid place-items-center w-5 h-5 rounded-full border-2 border-[#20C27F] bg-[#20C27F]"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
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
      <div class="pt-[278px] text-center">
        <!-- 축하 아이콘 -->
        <img :src="qf" alt="축하" class="w-[56px] h-[56px] mx-auto" />

        <!-- 안내 문구 -->
        <p class="mt-6 font-[Pretendard] text-[20px] font-normal leading-[40px] text-[#333]">
          테스트가 완료되었습니다 !
        </p>
        <p class="mt-4 font-[Pretendard] text-[20px] font-normal leading-[40px] text-[#333]">
          이제 <span class="text-[#03C473] font-medium">슬기로운 은퇴생활</span>에서
        </p>
        <p class="font-[Pretendard] text-[20px] font-normal leading-[40px] text-[#333]">
          당신만을 위한 맞춤 정보를 확인해보세요
        </p>
      </div>

      <!-- 시작하기 버튼 -->
      <footer class="absolute bottom-10 inset-x-6">
        <button
          type="button"
          class="w-full h-14 rounded-full bg-[#03C473] text-white flex items-center justify-between px-6 text-[22px] font-bold leading-[22px] font-[Pretendard]"
          @click="start"
        >
          <span class="flex-1 text-center">시작하기</span>
          <span>→</span>
        </button>
      </footer>
    </main>
  </div>
</template>

<script setup>
import logo from '@/assets/image/logo.png'
import qf from '@/assets/image/qf.png'
import { useRouter } from 'vue-router'

const router = useRouter()
const start = () => {
  router.push('/')
}
</script>
