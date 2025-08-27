<template>
  <div
    class="mx-auto w-[375px] h-[812px] grid [grid-template-rows:1fr_auto] box-border bg-[#fbfbfb] p-5"
  >
    <!-- 중앙 로고/타이틀 -->
    <div class="flex flex-col items-center justify-center h-full">
      <div class="w-[93px] h-[98px] rounded-full grid place-items-center">
        <img :src="logo" alt="슬기로운 은퇴생활 로고" class="w-full h-full object-contain" />
      </div>
      <h1
        class="text-[#1E975A] text-center font-[SB_AggroOTF] text-[24px] font-normal leading-[48px]"
      >
        슬기로운 은퇴생활
      </h1>
    </div>

    <!-- 하단 액션 -->
    <div class="flex justify-center gap-3 mb-[100px] max-w-[460px] w-full px-5 mx-auto">
      <RouterLink
        to="/login"
        class="flex-1 max-w-[220px] h-12 rounded-full grid place-items-center no-underline text-center font-semibold text-[24px] leading-none bg-[#03c473] text-white"
      >
        로그인
      </RouterLink>

      <RouterLink
        to="/signup"
        class="flex-1 max-w-[220px] h-12 rounded-full grid place-items-center no-underline text-center font-semibold text-[24px] leading-none bg-[#e5fef4] text-[#03c473] border-2 border-[#03c473]"
      >
        회원가입
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/image/logo.png'
</script>
