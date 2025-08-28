<script setup>
import { ref, computed } from 'vue'
import JobsMap from '@/components/JobsMap.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goDetail = (id) => {
  router.push({ name: 'job-detail', params: { id } })
}
const total = 27

const jobs = ref([
  {
    id: 1,
    title: '발달장애인 방과후 활동교사 전담인력',
    company: '청소년 발달장애인 방과후활동센터 꿈드림',
    location: '강원특별자치도 원주시 남원로 647',
    workHour: '주 5일 | 14:00 ~ 18:00 (협의 가능)',
  },
  {
    id: 2,
    title: '청춘마당 주간보호센터 사회복지사 채용',
    company: '청춘마당 노인주간보호센터',
    location: '강원특별자치도 원주시 봉산로 162-2',
    workHour: '주 5일 | 09:00 ~ 18:00',
  },
  {
    id: 3,
    title: '재가센터 사회복지사 채용',
    company: '휴망문요양재가센터',
    location: '강원특별자치도 원주시 봉산로 117',
    workHour: '주 5일 | 09:00 ~ 18:00',
  },
  {
    id: 4,
    title: '귀래 요양원 사회복지사 모집',
    company: '통나무집요양원',
    location: '강원특별자치도 원주시 귀래면 부귀로 1575',
    workHour: '주 5일 | 09:00 ~ 18:00',
  },
  {
    id: 5,
    title: '주간 요양보호사 채용',
    company: '노블레스요양원',
    location: '강원특별자치도 원주시 옥겹들길 55',
    workHour: '주 5일 | 09:00 ~ 18:00',
  },
])

/* ---------- 필터 모달 상태/모델 ---------- */
const showFilter = ref(false)

const startTime = ref('09:00')
const endTime = ref('16:00')

const days = ['월', '화', '수', '목', '금', '토', '일']
const pickedDays = ref(['월'])
const toggleDay = (d) =>
  (pickedDays.value = pickedDays.value.includes(d)
    ? pickedDays.value.filter((x) => x !== d)
    : [...pickedDays.value, d])

const jobCategory = ref('')
const SAL_MIN = 0
const SAL_MAX = 5000
const SAL_STEP = 50
const salaryMin = ref(0) // 최소 연봉(만원)
const salaryMax = ref(2500) // 최대 연봉(만원)

const onMinChange = () => {
  if (salaryMin.value > salaryMax.value - SAL_STEP) {
    salaryMin.value = salaryMax.value - SAL_STEP
  }
}
const onMaxChange = () => {
  if (salaryMax.value < salaryMin.value + SAL_STEP) {
    salaryMax.value = salaryMin.value + SAL_STEP
  }
}

const minPercent = computed(() => ((salaryMin.value - SAL_MIN) / (SAL_MAX - SAL_MIN)) * 100)
const maxPercent = computed(() => ((salaryMax.value - SAL_MIN) / (SAL_MAX - SAL_MIN)) * 100)
const fmtPay = (n) => `${n.toLocaleString()}만원`

/* 초기화 / 적용 / 취소 */
const resetFilter = () => {
  startTime.value = '09:00'
  endTime.value = '16:00'
  pickedDays.value = ['월']
  jobCategory.value = ''
  salaryMin.value = 0
  salaryMax.value = 2500
}
const applyFilter = () => {
  // TODO: 실제 필터링 로직 연결
  showFilter.value = false
}
const cancelFilter = () => (showFilter.value = false)
</script>

<template>
  <!--  페이지 루트 컨테이너(오버레이 기준) -->
  <div class="w-[375px] h-[812px] mx-auto bg-white relative">
    <!-- 헤더 -->
    <header class="relative h-[70px] bg-white">
      <!-- 뒤로가기 아이콘 (SVG)로 대체함 -->
      <button
        class="absolute left-4 top-1/2 -translate-y-1/2 w-[30px] h-[30px] flex items-center justify-center flex-shrink-0"
        @click="$router.back()"
        aria-label="뒤로가기"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          class="w-[30px] h-[30px]"
        >
          <g clip-path="url(#clip0_677_1614)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.3661 14.1162C10.1317 14.3506 10.0001 14.6685 10.0001 15C10.0001 15.3314 10.1317 15.6493 10.3661 15.8837L17.4373 22.955C17.5526 23.0744 17.6906 23.1696 17.8431 23.2351C17.9956 23.3006 18.1596 23.3351 18.3256 23.3365C18.4915 23.338 18.6561 23.3064 18.8098 23.2435C18.9634 23.1807 19.1029 23.0878 19.2203 22.9705C19.3377 22.8531 19.4305 22.7135 19.4933 22.5599C19.5562 22.4063 19.5878 22.2417 19.5864 22.0757C19.5849 21.9098 19.5505 21.7457 19.4849 21.5932C19.4194 21.4407 19.3242 21.3028 19.2048 21.1875L13.0173 15L19.2048 8.81248C19.4325 8.57673 19.5585 8.26098 19.5557 7.93323C19.5528 7.60548 19.4213 7.29197 19.1896 7.06021C18.9578 6.82845 18.6443 6.69699 18.3166 6.69414C17.9888 6.69129 17.6731 6.81728 17.4373 7.04498L10.3661 14.1162Z"
              fill="#333333"
            />
          </g>
          <defs>
            <clipPath id="clip0_677_1614">
              <rect width="30" height="30" fill="white" transform="matrix(-1 0 0 1 30 0)" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <!-- 제목 -->
      <h1
        class="absolute top-[23px] left-[58px] w-[92px] h-[24px] text-[20px] font-semibold leading-[1] text-[#1E1E1E] font-[Pretendard]"
      >
        일자리 조회
      </h1>

      <!-- 필터 아이콘 (SVG)코드로 대체함 -->
      <button
        class="absolute left-[318px] top-[30px] w-[25px] h-[5px] flex-shrink-0 flex items-center justify-center"
        @click="showFilter = true"
        aria-label="필터 열기"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          class="w-[25px] h-[25px]"
        >
          <path
            d="M22.9168 3.125H2.0835L10.4168 12.9792V19.7917L14.5835 21.875V12.9792L22.9168 3.125Z"
            stroke="#1E1E1E"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </header>

    <!-- 본문 -->
    <div class="content-wrap relative">
      <!-- 지도 -->
      <section class="px-5">
        <div
          class="w-[335px] h-[153px] aspect-[331/153] flex-shrink-0 rounded-[16px] border border-[#E2E2E2] bg-[url('/images/map-placeholder.png')] bg-cover bg-no-repeat bg-center overflow-hidden"
        >
          <JobsMap :jobs="jobs" />
        </div>
      </section>

      <!-- 섹션 타이틀 -->
      <section class="px-6 mt-5 mb-2 flex items-baseline justify-between">
        <h2 class="text-[15px] font-semibold text-[#1E1E1E] font-[Pretendard]">추천 일자리</h2>
        <span class="text-[13px] text-gray-500">{{ total }}개</span>
      </section>

      <!-- 카드 리스트 -->
      <main class="px-4 space-y-3 pb-24">
        <article
          v-for="job in jobs"
          :key="job.id"
          class="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm cursor-pointer hover:shadow-md transition"
          @click="goDetail(job.id)"
        >
          <!-- 제목 -->
          <h3
            class="text-[18px] font-bold text-gray-900 leading-tight truncate whitespace-nowrap overflow-hidden"
          >
            {{ job.title }}
          </h3>

          <!-- 회사명 -->
          <p class="text-[15px] font-normal text-[#3D4352] mb-[12px] leading-normal">
            {{ job.company }}
          </p>

          <!-- 상세정보 -->
          <ul class="space-y-[6px] text-[14px] text-[#333] font-normal">
            <li class="flex items-center gap-2 leading-normal">
              <!-- 주소 아이콘 -->
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none">
                <path
                  d="M7.5 8.75C8.87875 8.75 10 7.62875 10 6.25C10 4.87125 8.87875 3.75 7.5 3.75C6.12125 3.75 5 4.87125 5 6.25C5 7.62875 6.12125 8.75 7.5 8.75ZM7.5 5C8.18938 5 8.75 5.56063 8.75 6.25C8.75 6.93938 8.18938 7.5 7.5 7.5C6.81063 7.5 6.25 6.93938 6.25 6.25C6.25 5.56063 6.81063 5 7.5 5Z"
                  fill="#333"
                />
                <path
                  d="M7.13756 13.6338C7.24341 13.7091 7.37012 13.7496 7.50006 13.7496C7.63 13.7496 7.7567 13.7091 7.86256 13.6338C8.05256 13.4994 12.5182 10.275 12.5001 6.25C12.5001 3.49313 10.2569 1.25 7.50006 1.25C4.74318 1.25 2.50006 3.49312 2.50006 6.24688C2.48193 10.275 6.94756 13.4994 7.13756 13.6338ZM7.50006 2.5C9.56818 2.5 11.2501 4.18188 11.2501 6.25313C11.2632 9.02688 8.50756 11.5175 7.50006 12.3344C6.49318 11.5169 3.73693 9.02563 3.75006 6.25C3.75006 4.18188 5.43193 2.5 7.50006 2.5Z"
                  fill="#333"
                />
              </svg>
              <span>{{ job.location }}</span>
            </li>

            <li class="flex items-center gap-2 leading-normal">
              <!-- 근무시간 아이콘 -->
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none">
                <path
                  d="M6.50016 10.8335C7.64943 10.8335 8.75163 10.3769 9.56429 9.56429C10.3769 8.75163 10.8335 7.64943 10.8335 6.50016C10.8335 5.35089 10.3769 4.24869 9.56429 3.43603C8.75163 2.62338 7.64943 2.16683 6.50016 2.16683C5.35089 2.16683 4.24869 2.62338 3.43603 3.43603C2.62338 4.24869 2.16683 5.35089 2.16683 6.50016C2.16683 7.64943 2.62338 8.75163 3.43603 9.56429C4.24869 10.3769 5.35089 10.8335 6.50016 10.8335ZM6.50016 1.0835C7.21149 1.0835 7.91585 1.2236 8.57303 1.49582C9.23021 1.76803 9.82734 2.16702 10.3303 2.67C10.8333 3.17298 11.2323 3.77011 11.5045 4.42729C11.7767 5.08447 11.9168 5.78884 11.9168 6.50016C11.9168 7.93675 11.3461 9.3145 10.3303 10.3303C9.3145 11.3461 7.93675 11.9168 6.50016 11.9168C3.50475 11.9168 1.0835 9.47933 1.0835 6.50016C1.0835 5.06357 1.65418 3.68582 2.67 2.67C3.68582 1.65418 5.06357 1.0835 6.50016 1.0835ZM6.771 3.79183V6.63558L9.2085 8.08183L8.80225 8.74808L5.9585 7.04183V3.79183H6.771Z"
                  fill="#333"
                />
              </svg>
              <span>{{ job.workHour }}</span>
            </li>
          </ul>
        </article>
      </main>

      <!-- (필요 시) 페이지네이션 -->
      <footer class="px-4 pb-5 flex items-center justify-between"></footer>
    </div>

    <!--  오버레이/필터 패널 -->
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showFilter" class="absolute inset-0 z-[2000]">
        <!-- 앱 박스 흐려짐 -->
        <div class="absolute inset-0 bg-black/35" @click="cancelFilter"></div>

        <Transition
          enter-active-class="duration-250 ease-out"
          enter-from-class="-translate-y-full"
          enter-to-class="translate-y-0"
          leave-active-class="duration-200 ease-in"
          leave-from-class="translate-y-0"
          leave-to-class="-translate-y-full"
        >
          <div
            v-if="showFilter"
            class="absolute top-0 left-0 right-0 mx-auto max-w-[375px] w-full bg-white rounded-b-2xl shadow-[0_6px_20px_rgba(0,0,0,0.12)] p-4"
          >
            <!-- 필터 내용 (그대로) -->
            <!-- 근무 시간 -->
            <div class="mb-3">
              <div class="text-[13px] font-semibold mb-1">근무 시간</div>
              <div class="flex items-center gap-2">
                <input
                  v-model="startTime"
                  type="time"
                  class="h-9 w-32 rounded-md border border-gray-300 px-2 text-[13px]"
                />
                <span class="text-gray-500">~</span>
                <input
                  v-model="endTime"
                  type="time"
                  class="h-9 w-32 rounded-md border border-gray-300 px-2 text-[13px]"
                />
              </div>
            </div>

            <!-- 근무 요일 -->
            <div class="mb-3">
              <div class="text-[13px] font-semibold mb-1">근무 요일</div>
              <div class="flex items-center gap-2">
                <button
                  v-for="d in days"
                  :key="d"
                  type="button"
                  class="h-8 px-3 rounded-full border text-[13px]"
                  :class="
                    pickedDays.includes(d)
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-700 border-gray-300'
                  "
                  @click="toggleDay(d)"
                >
                  {{ d }}
                </button>
              </div>
            </div>

            <!-- 희망 직무 -->
            <div class="mb-3">
              <div class="text-[13px] font-semibold mb-1">희망 직무</div>
              <select
                v-model="jobCategory"
                class="h-9 w-full rounded-md border border-gray-300 px-3 text-[13px]"
              >
                <option value="">희망 직무 선택</option>
                <option>생산관리</option>
                <option>영업관리</option>
                <option>설비관리</option>
                <option>품질관리</option>
              </select>
            </div>

            <!-- 희망 연봉 (듀얼 슬라이더) -->
            <div class="mb-1">
              <div class="text-[13px] font-semibold mb-2">희망 연봉</div>

              <div class="relative h-8 select-none">
                <div
                  class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 rounded bg-gray-300"
                />
                <div
                  class="absolute top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded"
                  :style="{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }"
                />
                <input
                  type="range"
                  :min="SAL_MIN"
                  :max="SAL_MAX"
                  :step="SAL_STEP"
                  v-model.number="salaryMin"
                  @input="onMinChange"
                  class="range-dual absolute inset-0 w-full bg-transparent"
                />
                <input
                  type="range"
                  :min="SAL_MIN"
                  :max="SAL_MAX"
                  :step="SAL_STEP"
                  v-model.number="salaryMax"
                  @input="onMaxChange"
                  class="range-dual absolute inset-0 w-full bg-transparent"
                />
              </div>

              <div class="flex justify-between text-[12px] text-gray-600 mt-2">
                <span>{{ fmtPay(salaryMin) }}</span>
                <span>{{ fmtPay(salaryMax) }}</span>
              </div>
            </div>

            <!-- 버튼 -->
            <div class="mt-4 mb-1 flex items-center justify-between gap-2">
              <button
                class="h-10 px-4 rounded-md border border-gray-300 text-gray-700 text-[14px]"
                @click="resetFilter"
              >
                초기화
              </button>
              <button
                class="h-10 px-5 rounded-md bg-green-500 text-white font-semibold text-[14px]"
                @click="applyFilter"
              >
                적용
              </button>
              <button
                class="h-10 px-4 rounded-md bg-gray-200 text-gray-700 text-[14px]"
                @click="cancelFilter"
              >
                취소
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style>
.range-dual {
  -webkit-appearance: none;
  appearance: none;
  pointer-events: none;
  background: transparent;
  height: 28px; /* 클릭 영역 */
}
.range-dual::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  pointer-events: auto;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: #22c55e;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.5);
  cursor: pointer;
}
.range-dual::-moz-range-thumb {
  pointer-events: auto;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: #22c55e;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.5);
  cursor: pointer;
}
.range-dual::-moz-range-track {
  background: transparent;
}
</style>
