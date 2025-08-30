<!-- src/pages/Jobs/JobDetailPage.vue -->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import JobsMap from '@/components/JobsMap.vue'

const route = useRoute()

const id = computed(() => Number(route.params.id))

// 데모 데이터 (실서비스에선 API/상태관리로 대체)
const JOBS = [
  {
    id: 1,
    title: '발달장애인 방과후 활동교사 전담인력',
    company: '청소년 발달장애인 방과후활동센터 꿈드림',
    address: '강원특별자치도 원주시 남원로 647',
    tags: ['정규직', '경력', '학력 무관'],
    wage: '시급 10,030원',
    time: '09:00 ~ 18:00',
    days: '주 5일',
    personnel: '1명',
    duties: ['발달 장애인 일과후 활동 지원 및', '기획된 프로그램 진행·운영'],
    plus: ['육아(출산 6개월 이하) 우대', '워드프로세서'],
    buses: '115, 112, 100, 111',
    station: '왕곡면행정복지센터 하차',
    industry: '기타 전문 서비스업',
    founded: '2023년',
    headcount: '—',
    revenue: '—',
    about:
      '청소년 발달장애인 방과후활동센터는 관공서, 학교 및 지역사회와 연계하여 다양한 프로그램을 운영합니다. 안전과 신뢰를 최우선으로 이용자 중심의 서비스를 제공합니다.',
  },
]

// 라우트 id에 맞는 공고 (없으면 첫 번째)
const job = computed(() => JOBS.find((j) => j.id === id.value) || JOBS[0])

const onApply = () => {
  // TODO: 지원 로직 연결
  alert('지원하기 ')
}
</script>

<template>
  <!-- 앱 프레임 (375x812 기준) -->
  <div class="w-[375px] min-h-[812px] mx-auto bg-white relative">
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
        일자리 상세
      </h1>

      <!-- 필터 아이콘 (SVG)코드로 대체함 -->
    </header>

    <!-- 스크롤 영역 -->
    <main class="px-4 pb-24 space-y-3">
      <!-- 상단 카드 -->
      <section
        class="w-[335px] h-[153px] flex-shrink-0 rounded-[16px] bg-white shadow-[1px_1px_4px_rgba(0,0,0,0.25)] mx-auto p-4"
      >
        <!-- 제목 -->
        <h2 class="text-[16px] font-extrabold text-[#333] leading-snug">
          {{ job.title }}
        </h2>

        <!-- 회사명 -->
        <p class="text-[12px] text-[#3D4352] mt-1">{{ job.company }}</p>

        <!-- 주소 -->
        <div class="flex items-center gap-2 mt-2 text-[12px] text-[#555]">
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
          <span>{{ job.address }}</span>
        </div>

        <!-- 태그 -->
        <div class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="t in job.tags"
            :key="t"
            class="flex justify-center items-center flex-shrink-0 w-[67px] h-[32px] px-[2px] py-[7px] rounded-[10px] text-center font-semibold"
            :class="
              t === '정규직'
                ? 'bg-[#03C473] text-white text-[14px] font-semibold'
                : 'bg-[#E5E8EF] text-[#3D4352] text-[14px] font-semibold font-[Inter]'
            "
          >
            {{ t }}
          </span>
        </div>
      </section>

      <!-- 근무 조건 -->
      <section
        class="w-[335px] h-auto flex-shrink-0 rounded-[12px] bg-white shadow-[1px_1px_4px_rgba(0,0,0,0.25)] mx-auto p-3"
      >
        <!-- 근무 조건 라벨 -->
        <h3 class="text-[16px] font-bold text-[#333] font-[Inter] leading-normal mb-2">
          근무 조건
        </h3>

        <!-- 위쪽 : 급여 + 근무시간 -->
        <div class="grid grid-cols-2 ms-2 gap-2">
          <!-- 급여 -->
          <div class="flex items-start gap-1 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              class="w-[14px] h-[14px] flex-shrink-0 fill-[#333]"
            >
              <path
                d="M8 0C12.4182 0 16 2.686 16 6V10C16 13.314 12.4182 16 8 16C3.66036 16 0.128 13.409 0.00363636 10.177L0 10V6C0 2.686 3.58182 0 8 0ZM8 12C5.29455 12 2.90182 10.992 1.45455 9.45V10C1.45455 11.882 4.27855 14 8 14C11.6436 14 14.4276 11.97 14.5418 10.118L14.5455 10L14.5462 9.45C13.0989 10.992 10.7062 12 8 12ZM8 2C4.27855 2 1.45455 4.118 1.45455 6C1.45455 7.882 4.27855 10 8 10C11.7215 10 14.5455 7.882 14.5455 6C14.5455 4.118 11.7215 2 8 2Z"
              />
            </svg>
            <div>
              <div class="text-[12px]">급여</div>
              <div class="mt-0.5 font-semibold text-[13px] text-gray-800">{{ job.wage }}</div>
            </div>
          </div>

          <!-- 근무시간 -->
          <div class="flex items-start gap-1 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              class="w-[14px] h-[14px] flex-shrink-0 fill-[#333]"
            >
              <path
                d="M8 14.4C9.69739 14.4 11.3253 13.7257 12.5255 12.5255C13.7257 11.3253 14.4 9.69739 14.4 8C14.4 6.30261 13.7257 4.67475 12.5255 3.47452C11.3253 2.27428 9.69739 1.6 8 1.6C6.30261 1.6 4.67475 2.27428 3.47452 3.47452C2.27428 4.67475 1.6 6.30261 1.6 8C1.6 9.69739 2.27428 11.3253 3.47452 12.5255C4.67475 13.7257 6.30261 14.4 8 14.4ZM8 0C9.05058 0 10.0909 0.206926 11.0615 0.608964C12.0321 1.011 12.914 1.60028 13.6569 2.34315C14.3997 3.08601 14.989 3.96793 15.391 4.93853C15.7931 5.90914 16 6.94943 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C3.576 16 0 12.4 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0ZM8.4 4V8.2L12 10.336L11.4 11.32L7.2 8.8V4H8.4Z"
              />
            </svg>
            <div>
              <div class="text-[12px]">근무시간</div>
              <div class="mt-0.5 font-semibold text-[13px] text-gray-800">{{ job.time }}</div>
            </div>
          </div>
        </div>

        <!-- 구분선 -->
        <div class="h-px bg-gray-200 my-2"></div>

        <!-- 아래쪽 : 근무일 + 모집인원 -->
        <div class="grid grid-cols-2 ms-2 gap-2">
          <!-- 근무일 -->
          <div class="flex items-start gap-1 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 18 18"
              fill="none"
              class="w-[14px] h-[14px] flex-shrink-0"
            >
              <path
                d="M1 6.62162H17M4.75863 2.72973V1M13.2158 2.72973V1M13.8 2.72973H4.2C3.35131 2.72973 2.53737 3.04865 1.93726 3.61633C1.33714 4.184 1 4.95394 1 5.75676V13.973C1 14.7758 1.33714 15.5457 1.93726 16.1134C2.53737 16.6811 3.35131 17 4.2 17H13.8C14.6487 17 15.4626 16.6811 16.0627 16.1134C16.6629 15.5457 17 14.7758 17 13.973V5.75676C17 4.95394 16.6629 4.184 16.0627 3.61633C15.4626 3.04865 14.6487 2.72973 13.8 2.72973Z"
                stroke="#333333"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>
              <div class="text-[12px]">근무일</div>
              <div class="mt-0.5 font-semibold text-[13px] text-gray-800">{{ job.days }}</div>
            </div>
          </div>

          <!-- 모집인원 -->
          <div class="flex items-start gap-1 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              class="w-[14px] h-[14.5px] flex-shrink-0 fill-[#333]"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 7.98666C8.86356 7.98666 10.5583 8.49055 11.8051 9.20064C12.4273 9.55495 12.9593 9.97316 13.3436 10.4277C13.7216 10.8742 14 11.4086 14 11.98C14 12.5935 13.6803 13.0771 13.2199 13.422C12.7843 13.7487 12.2096 13.965 11.599 14.1161C10.3717 14.4188 8.73367 14.5212 7 14.5212C5.26633 14.5212 3.62833 14.4196 2.401 14.1161C1.79044 13.965 1.21567 13.7487 0.780111 13.422C0.318889 13.0763 0 12.5935 0 11.98C0 11.4086 0.278444 10.8742 0.656444 10.427C1.04067 9.97316 1.57189 9.55568 2.19489 9.19991C3.44167 8.49127 5.13722 7.98666 7 7.98666ZM7 9.43878C5.42656 9.43878 4.011 9.86716 3.00533 10.44C2.50211 10.7261 2.12256 11.0368 1.87756 11.3273C1.62556 11.625 1.55556 11.85 1.55556 11.98C1.55556 12.0686 1.58433 12.1622 1.75389 12.2893C1.94756 12.4345 2.28433 12.5848 2.79922 12.7119C3.82433 12.966 5.29744 13.0691 7 13.0691C8.70333 13.0691 10.1757 12.9653 11.2 12.7119C11.7157 12.5848 12.0524 12.4345 12.2461 12.2893C12.4157 12.1622 12.4444 12.0686 12.4444 11.98C12.4444 11.8493 12.3744 11.625 12.1232 11.3273C11.8774 11.0368 11.4979 10.7261 10.9947 10.44C9.989 9.86643 8.57344 9.43878 7 9.43878ZM7 0C8.0314 0 9.02055 0.382477 9.74986 1.06329C10.4792 1.7441 10.8889 2.66749 10.8889 3.6303C10.8889 4.59312 10.4792 5.5165 9.74986 6.19731C9.02055 6.87813 8.0314 7.2606 7 7.2606C5.9686 7.2606 4.97945 6.87813 4.25014 6.19731C3.52083 5.5165 3.11111 4.59312 3.11111 3.6303C3.11111 2.66749 3.52083 1.7441 4.25014 1.06329C4.97945 0.382477 5.9686 0 7 0Z"
              />
            </svg>
            <div>
              <div class="text-[12px]">모집인원</div>
              <div class="mt-0.5 font-semibold text-[13px] text-gray-800">{{ job.personnel }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 업무 내용 -->
      <section
        class="w-[335px] h-[242px] flex-shrink-0 rounded-[16px] bg-white shadow-[1px_1px_4px_rgba(0,0,0,0.25)] mx-auto p-4"
      >
        <!-- 라벨 -->
        <h3 class="text-[18px] font-bold text-[#333] font-[Inter] leading-normal mb-2">
          업무 내용
        </h3>

        <!-- 주요 업무 -->
        <div class="text-[13px] text-gray-700 mb-3">
          <div class="font-semibold text-[#333] mb-1 ms-1">주요 업무</div>
          <ul class="list-disc pl-5 space-y-1 ms-1">
            <li v-for="(duty, i) in job.duties" :key="i">{{ duty }}</li>
          </ul>
        </div>

        <div class="h-px bg-gray-200 my-2"></div>

        <!-- 우대 사항 -->
        <div class="text-[13px] text-gray-700">
          <div class="font-semibold text-[#333] mb-1 ms-1">우대 사항</div>
          <ul class="list-disc pl-5 space-y-1 ms-1">
            <li v-for="(plus, i) in job.plus" :key="i">{{ plus }}</li>
          </ul>
        </div>
      </section>

      <!-- 근무 위치 -->
      <section class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 class="text-[14px] font-bold text-[#111] mb-2">근무 위치</h3>

        <div class="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <section class="px-5">
            <div class="relative w-[335px] h-[163px] flex-shrink-0 rounded-[14px]">
              <JobsMap
                :jobs="[{ title: job.title, company: job.company, location: job.address }]"
                :center="job.address"
              />
            </div>
          </section>
        </div>
        <div class="px-3 py-2 text-[12px] text-gray-700">
          {{ job.address }}
        </div>

        <div class="mt-3 text-[12px] text-gray-600 space-y-1">
          <div class="flex items-center gap-2">
            <!-- 작은 마커 아이콘 -->
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none">
              <path
                d="M6.5 7.583a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666Z"
                fill="#22C55E"
              />
              <path
                d="M6.197 11.85c.081.058.18.083.28.07a.36.36 0 0 0 .246-.12C6.89 11.66 10.417 9.07 10.403 6.25 10.403 4.2 8.8 2.597 6.75 2.597 4.7 2.597 3.097 4.2 3.097 6.247c-.014 2.825 3.514 5.414 3.1 5.603Z"
                stroke="#22C55E"
                stroke-width=".7"
                fill="none"
              />
            </svg>
            <span class="text-gray-700">대중교통</span>
          </div>
          <div class="pl-5">
            <span class="text-gray-700">버스</span>
            <span class="mx-1 text-gray-400">|</span>
            <span class="text-gray-700">{{ job.buses }}</span>
          </div>
          <div class="pl-5 text-gray-500">
            {{ job.station }}
          </div>
        </div>
      </section>

      <!-- 회사 정보 -->
      <section class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 class="text-[14px] font-bold text-[#111] mb-2">회사 정보</h3>

        <div class="grid grid-cols-2 gap-3 text-[12px]">
          <div class="bg-gray-50 rounded-xl p-3">
            <div class="text-gray-500">업종</div>
            <div class="font-semibold text-gray-800 mt-1">{{ job.industry }}</div>

            <div class="h-px bg-gray-200 my-3"></div>

            <div class="text-gray-500">설립년도</div>
            <div class="font-semibold text-gray-800 mt-1">{{ job.founded }}</div>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <div class="text-gray-500">직원수</div>
            <div class="font-semibold text-gray-800 mt-1">{{ job.headcount }}</div>

            <div class="h-px bg-gray-200 my-3"></div>

            <div class="text-gray-500">매출액</div>
            <div class="font-semibold text-gray-800 mt-1">{{ job.revenue }}</div>
          </div>
        </div>

        <p class="text-[12px] text-gray-600 mt-3 leading-5">
          {{ job.about }}
        </p>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-t border-gray-200 px-4 pt-2 pb-[calc(16px+env(safe-area-inset-bottom))]"
    >
      <button
        class="w-full h-12 rounded-xl bg-green-500 text-white font-semibold shadow-md"
        @click="onApply"
      >
        지원하기
      </button>
    </div>
  </div>
</template>
