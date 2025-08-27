<template>
  <div
    class="mx-auto w-full max-w-[375px] min-h-dvh grid [grid-template-rows:1fr_auto] box-border bg-[#fbfbfb] py-10 px-5"
  >
    <div class="flex flex-col items-center justify-center text-center">
      <div class="w-[95px] h-[93px] shrink-0 mb-4 [aspect-ratio:95/93]">
        <img :src="logo" alt="슬기로운 은퇴생활 로고" class="w-full h-full object-contain" />
      </div>
      <div
        class="w-full max-w-[343px] h-[167px] shrink-0 mx-auto text-center font-regular text-[16px] leading-[2] text-black"
      >
        <p class="m-0 mb-2">
          <span class="text-[#03c473] font-medium">라이프스타일·선호 환경·경력</span>에 대한
        </p>
        <p class="m-0 mb-2">간단한 10문항 테스트를 완료하고</p>
        <p class="m-0">나에게 딱 맞는 지역과 일자리를 추천 받아보세요!</p>
      </div>
    </div>

    <div class="flex flex-col items-center gap-3 mx-auto mb-[60px]">
      <RouterLink
        to="/q1"
        class="w-[295px] h-[50px] rounded-full flex items-center justify-center font-semibold no-underline transition-all duration-200 text-[20px] leading-none bg-[#03c473] text-white hover:bg-[#00b569]"
      >
        테스트 진행하기 <span class="text-[18px] leading-none ml-2">→</span>
      </RouterLink>

      <RouterLink
        to="/home"
        class="w-[295px] h-[50px] rounded-full border-2 border-[#E2E2E2] bg-white flex items-center justify-center font-semibold no-underline transition-all duration-200 text-[20px] leading-none text-[#4b4b4b] hover:bg-[#d5d5d5]"
      >
        건너뛰기 <span class="text-[18px] leading-none ml-2">→</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/image/logo.png'
</script>
