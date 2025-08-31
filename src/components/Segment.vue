<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: [String, null], default: null }, // 'low' | 'mid' | 'high' | null
  lowLabel: { type: String, default: '하' },
  midLabel: { type: String, default: '중' },
  highLabel: { type: String, default: '상' },
})
const emit = defineEmits(['update:modelValue'])

const v = ref(props.modelValue)
watch(
  () => props.modelValue,
  (nv) => (v.value = nv),
)

function set(val) {
  v.value = val
  emit('update:modelValue', val)
}
</script>

<template>
  <div
    class="relative inline-grid grid-cols-3 rounded-full border border-[#E2E2E2] overflow-hidden text-[14px] font-semibold select-none bg-white"
    style="height: 32px"
  >
    <!-- 구분선 2개 -->
    <span
      class="absolute top-0 bottom-0 w-px bg-[#E2E2E2] pointer-events-none"
      style="left: calc(100% / 3)"
    ></span>
    <span
      class="absolute top-0 bottom-0 w-px bg-[#E2E2E2] pointer-events-none"
      style="left: calc(200% / 3)"
    ></span>

    <!-- 하 -->
    <button
      type="button"
      class="relative h-full px-4 leading-none text-[#475067] flex justify-center items-center cursor-pointer"
      @click="set('low')"
    >
      <!-- 활성 하이라이트 -->
      <span
        v-if="v === 'low'"
        class="absolute bg-[#E9F6EF] ring-1 ring-inset ring-[#4AA982]"
        style="inset: -1px; border-radius: 9999px 0 0 9999px"
      ></span>
      <span class="relative z-10 text-current" :class="v === 'low' ? 'text-[#4AA982]' : ''">
        {{ lowLabel }}
      </span>
    </button>

    <!-- 중 -->
    <button
      type="button"
      class="relative h-full px-4 text-[#475067] flex justify-center items-center cursor-pointer"
      @click="set('mid')"
    >
      <span
        v-if="v === 'mid'"
        class="absolute bg-[#E9F6EF] ring-1 ring-inset ring-[#4AA982]"
        style="inset: -1px"
      ></span>
      <span class="relative z-10" :class="v === 'mid' ? 'text-[#4AA982]' : ''">
        {{ midLabel }}
      </span>
    </button>

    <!-- 상 -->
    <button
      type="button"
      class="relative h-full px-4 flex justify-center items-center text-[#475067] cursor-pointer"
      @click="set('high')"
    >
      <span
        v-if="v === 'high'"
        class="absolute bg-[#E9F6EF] ring-1 ring-inset ring-[#4AA982]"
        style="inset: -1px; border-radius: 0 9999px 9999px 0"
      ></span>
      <span class="relative z-10" :class="v === 'high' ? 'text-[#4AA982]' : ''">
        {{ highLabel }}
      </span>
    </button>
  </div>
</template>
