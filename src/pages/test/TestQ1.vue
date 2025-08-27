<template>
  <div class="relative h-full">
    <header class="absolute inset-x-0 top-0 px-6 pt-[40px] flex flex-col items-center gap-3">
      <div class="w-[55px] h-[54px] shrink-0 [aspect-ratio:55/54]">
        <img :src="logo" alt="logo" class="w-full h-full object-contain" />
      </div>

      <div class="w-full max-w-[327px] mx-auto">
        <div class="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center px-2">
          <span
            class="grid place-items-center w-5 h-5 p-0.5 rounded-full border-2 border-[#20C27F] bg-white"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[#20C27F]"></span>
          </span>
          <div class="h-[2px] bg-[#20C27F]/30"></div>
          <span
            class="grid place-items-center w-5 h-5 p-0.5 rounded-full border-2 border-[#20C27F] bg-white"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[#20C27F]"></span>
          </span>
          <div class="h-[2px] bg-[#20C27F]/30"></div>
          <span
            class="grid place-items-center w-5 h-5 p-0.5 rounded-full border-2 border-[#20C27F] bg-white"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[#20C27F]"></span>
          </span>
        </div>
        <div
          class="mt-1 grid grid-cols-[auto_1fr_auto_1fr_auto] items-start px-1 text-[16px] font-medium leading-[16px] tracking-[0.5px] text-[#6F6F6F] font-[Lato]"
        >
          <span class="justify-self-center">지역</span> <span></span>
          <span class="justify-self-center ml-8">일자리</span> <span></span>
          <span class="justify-self-center">시작하기</span>
        </div>
      </div>
    </header>

    <main class="px-6">
      <div class="pt-[198px] text-center">
        <h2 class="text-[20px] font-semibold leading-[40px] text-[#1E1E1E]">Q1. 생활 환경</h2>
        <p
          class="mt-[20px] text-center font-[Pretendard] text-[16px] font-medium leading-[32px] text-[#333]"
        >
          어떤 규모·인프라의 지역에서 살고 싶으신가요?
        </p>
      </div>

      <section class="mt-6 space-y-3">
        <button
          type="button"
          class="w-full text-left rounded-[10px] border p-4 transition shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          :class="
            isSelected('mid')
              ? 'border-2 border-[#4AA982] bg-[#E5FEF4] text-[#116C4A]'
              : 'border-[#E7E9EE] bg-white text-[#111]'
          "
          @click="select('mid')"
        >
          <div
            class="font-semibold text-[18px]"
            :class="isSelected('mid') ? 'text-[#116C4A]' : 'text-[#111]'"
          >
            중소도시형
          </div>
          <div class="mt-1 text-sm" :class="isSelected('mid') ? 'text-[#20A36F]' : 'text-[#666]'">
            인구 10~30만, 생활 인프라 충분
          </div>
        </button>

        <button
          type="button"
          class="w-full text-left rounded-[10px] border p-4 transition shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          :class="
            isSelected('small')
              ? 'border-2 border-[#4AA982] bg-[#E5FEF4] text-[#116C4A]'
              : 'border-[#E7E9EE] bg-white text-[#111]'
          "
          @click="select('small')"
        >
          <div
            class="font-semibold text-[18px]"
            :class="isSelected('small') ? 'text-[#116C4A]' : 'text-[#111]'"
          >
            소도시 · 읍내형
          </div>
          <div class="mt-1 text-sm" :class="isSelected('small') ? 'text-[#20A36F]' : 'text-[#666]'">
            인구 1만 이하, 자연 친화적 환경
          </div>
        </button>

        <button
          type="button"
          class="w-full text-left rounded-[10px] border p-4 transition shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          :class="
            isSelected('rural')
              ? 'border-2 border-[#4AA982] bg-[#E5FEF4] text-[#116C4A]'
              : 'border-[#E7E9EE] bg-white text-[#111]'
          "
          @click="select('rural')"
        >
          <div
            class="font-semibold text-[18px]"
            :class="isSelected('rural') ? 'text-[#116C4A]' : 'text-[#111]'"
          >
            전원마을형
          </div>
          <div class="mt-1 text-sm" :class="isSelected('rural') ? 'text-[#20A36F]' : 'text-[#666]'">
            인구 1~10만, 자연 접근 용이
          </div>
        </button>
      </section>

      <footer class="absolute bottom-10 inset-x-6 flex items-center justify-between gap-3">
        <RouterLink
          to="/intro"
          class="flex-1 h-12 rounded-full border-2 border-[#E2E2E2] bg-white flex items-center justify-between px-6 text-[22px] font-bold leading-[22px] text-[#7D7D7D] no-underline font-[Pretendard]"
        >
          <span>←</span> <span class="flex-1 text-center">이전</span>
        </RouterLink>

        <button
          type="button"
          class="flex-1 h-12 rounded-full bg-[#03C473] text-white flex items-center justify-between px-6 text-[22px] font-bold leading-[22px] no-underline font-[Pretendard] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!selected"
          @click="goNext"
        >
          <span class="flex-1 text-center">다음</span> <span>→</span>
        </button>
      </footer>
    </main>
  </div>
</template>

<script setup>
import logo from '@/assets/image/logo.png'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selected = ref(null)
const select = (key) => (selected.value = key)
const isSelected = (key) => selected.value === key

const goNext = () => {
  if (!selected.value) return
  router.push('/q2')
}
</script>
