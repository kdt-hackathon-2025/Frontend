<template>
  <div class="relative h-full">
    <header class="absolute inset-x-0 top-0 px-6 pt-[40px] flex flex-col items-center gap-3">
      <div class="w-[55px] h-[54px] shrink-0 [aspect-ratio:55/54]">
        <img :src="logo" alt="logo" class="w-full h-full object-contain" />
      </div>

      <div class="w-full max-w-[327px] mx-auto">
        <div class="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center px-2">
          <span
            class="grid place-items-center w-5 h-5 p-0.5 rounded-full border-2 border-[#20C27F] bg-[#20C27F]"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
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
          <span class="justify-self-center">지역</span>
          <span></span>
          <span class="justify-self-center">일자리</span>
          <span></span>
          <span class="justify-self-center">완료</span>
        </div>
      </div>
    </header>

    <main class="px-6">
      <div class="pt-[198px] text-center">
        <h2 class="text-[20px] font-semibold leading-[40px] text-[#1E1E1E]">Q2. 자연 환경</h2>
        <p
          class="mt-[20px] text-center font-[Pretendard] text-[16px] font-medium leading-[32px] text-[#333]"
        >
          주변 자연 환경으로 가장 선호하는 곳은?
        </p>
      </div>

      <section class="mt-6 space-y-3 flex flex-col items-center">
        <button
          type="button"
          class="relative w-[335px] h-[79px] flex items-center rounded-[10px] transition"
          :class="
            isSelected('beach')
              ? 'border-2 border-[#4AA982] bg-[#E5FEF4] text-[#116C4A]'
              : 'border border-[#E2E2E2] bg-white text-[#3D4352]'
          "
          @click="select('beach')"
        >
          <img
            :src="q21"
            alt="바닷가 어촌"
            class="absolute left-[30px] top-1/2 -translate-y-1/2 w-6 h-6 object-contain"
          />
          <div
            class="absolute left-[91px] top-1/2 -translate-y-1/2 font-[Inter] text-[20px] font-medium leading-normal"
          >
            바닷가 · 어촌
          </div>
        </button>

        <button
          type="button"
          class="relative w-[335px] h-[79px] flex items-center rounded-[10px] transition"
          :class="
            isSelected('mountain')
              ? 'border-2 border-[#4AA982] bg-[#E5FEF4] text-[#116C4A]'
              : 'border border-[#E2E2E2] bg-white text-[#3D4352]'
          "
          @click="select('mountain')"
        >
          <img
            :src="q22"
            alt="산 계곡"
            class="absolute left-[30px] top-1/2 -translate-y-1/2 w-6 h-6 object-contain"
          />
          <div
            class="absolute left-[91px] top-1/2 -translate-y-1/2 font-[Inter] text-[20px] font-medium leading-normal"
          >
            산 · 계곡
          </div>
        </button>

        <button
          type="button"
          class="relative w-[335px] h-[79px] flex items-center rounded-[10px] transition"
          :class="
            isSelected('field')
              ? 'border-2 border-[#4AA982] bg-[#E5FEF4] text-[#116C4A]'
              : 'border border-[#E2E2E2] bg-white text-[#3D4352]'
          "
          @click="select('field')"
        >
          <img
            :src="q23"
            alt="들판 논밭"
            class="absolute left-[30px] top-1/2 -translate-y-1/2 w-6 h-6 object-contain"
          />
          <div
            class="absolute left-[91px] top-1/2 -translate-y-1/2 font-[Inter] text-[20px] font-medium leading-normal"
          >
            들판 · 논밭
          </div>
        </button>

        <button
          type="button"
          class="relative w-[335px] h-[79px] flex items-center rounded-[10px] transition"
          :class="
            isSelected('city')
              ? 'border-2 border-[#4AA982] bg-[#E5FEF4] text-[#116C4A]'
              : 'border border-[#E2E2E2] bg-white text-[#3D4352]'
          "
          @click="select('city')"
        >
          <img
            :src="q24"
            alt="도시 환경"
            class="absolute left-[30px] top-1/2 -translate-y-1/2 w-6 h-6 object-contain"
          />
          <div
            class="absolute left-[91px] top-1/2 -translate-y-1/2 font-[Inter] text-[20px] font-medium leading-normal"
          >
            도시 환경
          </div>
        </button>
      </section>

      <footer class="absolute bottom-10 inset-x-6 flex items-center justify-between gap-3">
        <RouterLink
          to="/q1"
          class="flex-1 h-12 rounded-full border-2 border-[#E2E2E2] bg-white flex items-center justify-between px-6 text-[22px] font-bold leading-[22px] text-[#7D7D7D] no-underline font-[Pretendard]"
        >
          <span>←</span>
          <span class="flex-1 text-center">이전</span>
        </RouterLink>

        <button
          type="button"
          class="flex-1 h-12 rounded-full bg-[#03C473] text-white flex items-center justify-between px-6 text-[22px] font-bold leading-[22px] no-underline font-[Pretendard] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!selected"
          @click="goNext"
        >
          <span class="flex-1 text-center">다음</span>
          <span>→</span>
        </button>
      </footer>
    </main>
  </div>
</template>

<script setup>
import logo from '@/assets/image/logo.png'
import q21 from '@/assets/image/q21.png'
import q22 from '@/assets/image/q22.png'
import q23 from '@/assets/image/q23.png'
import q24 from '@/assets/image/q24.png'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selected = ref(null)
const select = (key) => (selected.value = key)
const isSelected = (key) => selected.value === key

const goNext = () => {
  if (!selected.value) return
  router.push('/q3')
}
</script>
