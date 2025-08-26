<script setup>
import { ref, computed } from 'vue'
import JobsMap from '@/components/JobsMap.vue'
const total = 27

const jobs = ref([
  {
    id: 1,
    title: '스마트팜 생산관리 팀장 채용',
    company: '농업회사 법인 플랜티팜 주식회사',
    location: '전라남도 나주시 덕산길 172',
    workHour: '주 5일 | 09:00 ~ 18:00',
    career: '경력 7년 | 학력 무관',
    salary: '연봉 4,000만원 이상',
  },
  {
    id: 2,
    title: '레미콘 영업관리 직원 구인(팀장급)',
    company: '(주) 강동레미콘제이에스',
    location: '전라남도 장성군 서삼면 봉암로',
    workHour: '주 5일 | 08:00 ~ 18:00',
    career: '경력 10년 | 학력 무관',
    salary: '연봉 5,000만원 이상',
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
  <!-- ✅ 페이지 루트 컨테이너(오버레이 기준) -->
  <div class="w-[440px] h-[956px] mx-auto bg-white overflow-hidden relative">
    <!-- 헤더 -->
    <header class="flex items-center justify-between px-4 py-3">
      <button>
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="text-xl text-gray-700" />
      </button>
      <h1 class="text-lg font-bold">추천 공고</h1>
      <button @click="showFilter = true">
        <font-awesome-icon :icon="['fas', 'filter']" class="text-xl text-gray-600" />
      </button>
    </header>

    <!-- 본문 -->
    <div class="content-wrap relative">
      <!-- 지도 -->
      <section class="px-4">
        <div class="h-40 w-full rounded-xl overflow-hidden border border-gray-200">
          <JobsMap :jobs="jobs" />
        </div>
      </section>

      <!-- 섹션 타이틀 -->
      <section class="px-4 mt-3 mb-2 flex items-baseline justify-between">
        <h2 class="text-[15px] font-extrabold text-gray-900">추천 일자리</h2>
        <span class="text-[13px] text-gray-500">{{ total }}개</span>
      </section>

      <!-- 카드 리스트 -->
      <main class="px-4 space-y-3 pb-24">
        <article
          v-for="job in jobs"
          :key="job.id"
          class="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
        >
          <!-- 상세로 이동 -->
          <RouterLink :to="{ name: 'job-detail', params: { id: job.id } }" class="block">
            <!-- ✅ 제목은 한 번만 -->
            <h3 class="text-[17px] font-extrabold text-gray-900 leading-tight">
              {{ job.title }}
            </h3>

            <p class="text-[13px] text-gray-500 mt-1">
              {{ job.company }}
            </p>

            <ul class="mt-2 space-y-1.5 text-[13px] text-gray-700">
              <li class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'location-dot']" class="text-gray-400" />
                <span>{{ job.location }}</span>
              </li>
              <li class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'clock']" class="text-gray-400" />
                <span>{{ job.workHour }}</span>
              </li>
              <li class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'briefcase']" class="text-gray-400" />
                <span>{{ job.career }}</span>
              </li>
              <li class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'money-bill-wave']" class="text-gray-400" />
                <span>{{ job.salary }}</span>
              </li>
            </ul>
          </RouterLink>
        </article>
      </main>

      <!-- (필요 시) 페이지네이션 -->
      <footer class="px-4 pb-5 flex items-center justify-between"></footer>
    </div>

    <!-- ✅ 오버레이/필터 패널: content-wrap 바깥(루트 바로 아래) -->
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showFilter" class="absolute inset-0 z-[2000]">
        <!-- 앱 박스(440x956) 전체 딤: 하단 네비도 함께 흐려짐 -->
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
            class="absolute top-0 left-0 right-0 mx-auto max-w-[440px] w-full bg-white rounded-b-2xl shadow-[0_6px_20px_rgba(0,0,0,0.12)] p-4"
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
  pointer-events: none; /* 트랙 클릭 방지, 핸들만 잡히게 */
  background: transparent;
  height: 28px; /* 클릭 영역 */
}
.range-dual::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  pointer-events: auto; /* 엄지는 드래그 가능 */
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: #22c55e; /* green-500 */
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
