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
          <span class="justify-self-center">지역</span><span></span>
          <span class="justify-self-center">일자리</span><span></span>
          <span class="justify-self-center">완료</span>
        </div>
      </div>
    </header>

    <main class="px-6">
      <div class="pt-[198px] text-center">
        <h2 class="text-[20px] font-semibold leading-[40px] text-[#1E1E1E]">Q3. 지역 인프라</h2>
        <p class="mt-[20px] font-[Pretendard] text-[16px] font-medium leading-[24px] text-[#333]">
          편의/여가/의료/교통에 대한 중요도를 선택해주세요.
        </p>
      </div>

      <section class="mt-6 space-y-4">
        <div
          class="flex items-center justify-between gap-3 rounded-[12px] border border-[#E2E2E2] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
        >
          <div class="flex items-center gap-3 min-w-0">
            <img :src="q31" alt="대형 마트" class="w-8 h-8 object-contain shrink-0" />
            <div class="min-w-0">
              <div
                class="font-[Inter] text-[18px] font-semibold leading-normal text-[#3D4352] break-keep truncate"
              >
                대형 마트 수
              </div>
              <div
                class="mt-0.5 font-[Inter] text-[14px] font-normal leading-normal text-[#333] break-keep truncate"
              >
                대형 종합소매업 수
              </div>
            </div>
          </div>
          <InfraSeg3
            class="shrink-0"
            :model-value="levels.mart"
            @update:modelValue="(v) => setLevel('mart', v)"
          />
        </div>

        <div
          class="flex items-center justify-between gap-3 rounded-[12px] border border-[#E2E2E2] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
        >
          <div class="flex items-center gap-3 min-w-0">
            <img :src="q32" alt="문화시설" class="w-8 h-8 object-contain shrink-0" />
            <div class="min-w-0">
              <div
                class="font-[Inter] text-[18px] font-semibold leading-normal text-[#3D4352] break-keep truncate"
              >
                문화시설 수
              </div>
              <div
                class="mt-0.5 font-[Inter] text-[14px] font-normal leading-normal text-[#333] break-keep truncate"
              >
                영화관, 박물관, 식물원 등
              </div>
            </div>
          </div>
          <InfraSeg3
            class="shrink-0"
            :model-value="levels.culture"
            @update:modelValue="(v) => setLevel('culture', v)"
          />
        </div>

        <div
          class="flex items-center justify-between gap-3 rounded-[12px] border border-[#E2E2E2] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
        >
          <div class="flex items-center gap-3 min-w-0">
            <img :src="q33" alt="병원" class="w-8 h-8 object-contain shrink-0" />
            <div class="min-w-0">
              <div
                class="font-[Inter] text-[18px] font-semibold leading-normal text-[#3D4352] break-keep truncate"
              >
                병원 수
              </div>
              <div
                class="mt-0.5 font-[Inter] text-[14px] font-normal leading-normal text-[#333] break-keep truncate"
              >
                행정구역별 병원 수
              </div>
            </div>
          </div>
          <InfraSeg3
            class="shrink-0"
            :model-value="levels.hospital"
            @update:modelValue="(v) => setLevel('hospital', v)"
          />
        </div>

        <div
          class="flex items-center justify-between gap-3 rounded-[12px] border border-[#E2E2E2] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
        >
          <div class="flex items-center gap-3 min-w-0">
            <img :src="q34" alt="대중교통" class="w-8 h-8 object-contain shrink-0" />
            <div class="min-w-0">
              <div
                class="font-[Inter] text-[18px] font-semibold leading-normal text-[#3D4352] break-keep truncate"
              >
                대중교통 시설 수
              </div>
              <div
                class="mt-0.5 font-[Inter] text-[14px] font-normal leading-normal text-[#333] break-keep truncate"
              >
                정류장 및 도시철도역 수
              </div>
            </div>
          </div>
          <InfraSeg3
            class="shrink-0"
            :model-value="levels.transit"
            @update:modelValue="(v) => setLevel('transit', v)"
          />
        </div>
      </section>

      <footer class="absolute bottom-10 inset-x-6 flex items-center justify-between gap-3">
        <RouterLink
          to="/q2"
          class="flex-1 h-12 rounded-full border-2 border-[#E2E2E2] bg-white flex items-center justify-between px-6 text-[22px] font-bold leading-[22px] text-[#7D7D7D] no-underline font-[Pretendard]"
        >
          <span>←</span><span class="flex-1 text-center">이전</span>
        </RouterLink>
        <button
          type="button"
          class="flex-1 h-12 rounded-full bg-[#03C473] text-white flex items-center justify-between px-6 text-[22px] font-bold leading-[22px] no-underline font-[Pretendard] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isAllSelected"
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
import q31 from '@/assets/image/q31.png'
import q32 from '@/assets/image/q32.png'
import q33 from '@/assets/image/q33.png'
import q34 from '@/assets/image/q34.png'
import { computed, reactive, defineComponent, h } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const levels = reactive({
  mart: null,
  culture: null,
  hospital: null,
  transit: null,
})

const isAllSelected = computed(
  () => levels.mart && levels.culture && levels.hospital && levels.transit,
)
const setLevel = (key, value) => (levels[key] = value)

const goNext = () => {
  if (!isAllSelected.value) return
  router.push('/q4')
}

const InfraSeg3 = defineComponent({
  name: 'InfraSeg3',
  props: { modelValue: { type: String, default: null } },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const opts = [
      { key: 'low', label: '하' },
      { key: 'mid', label: '중' },
      { key: 'high', label: '상' },
    ]
    const wrapperClass =
      'flex items-center rounded-full h-[34px] w-[97px] overflow-hidden border border-[#E2E2E2] bg-white'
    const baseSeg =
      'relative flex-1 h-full grid place-items-center text-[14px] font-[Inter] font-medium leading-none select-none'
    const activeBase = 'bg-[#E5FEF4] text-[#116C4A] border border-[#4AA982] z-10'
    const activeRadius = (i) =>
      i === 0
        ? 'rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[0] rounded-br-[0]'
        : i === 1
          ? 'rounded-none rounded-tl-[0] rounded-tr-[0] rounded-br-[0] rounded-bl-[0]'
          : 'rounded-tr-[20px] rounded-br-[20px] rounded-tl-[0] rounded-bl-[0]'
    return () =>
      h(
        'div',
        { class: [wrapperClass, attrs.class].filter(Boolean).join(' ') },
        opts.map((o, i) => {
          const isActive = props.modelValue === o.key
          const segCls = [
            baseSeg,
            isActive ? [activeBase, activeRadius(i)].join(' ') : 'bg-transparent text-[#3D4352]',
            !isActive && i !== 0 ? 'border-l border-[#E2E2E2]' : '',
          ].join(' ')
          return h(
            'button',
            { type: 'button', class: segCls, onClick: () => emit('update:modelValue', o.key) },
            o.label,
          )
        }),
      )
  },
})
</script>
