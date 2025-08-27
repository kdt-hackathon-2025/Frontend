<!-- src/pages/Jobs/JobDetailPage.vue -->
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

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

const goBack = () => router.back()

const onApply = () => {
  // TODO: 지원 로직 연결
  alert('지원하기 클릭!')
}
</script>

<template>
  <!-- 앱 프레임 (375x812 기준) -->
  <div class="w-[375px] min-h-[812px] mx-auto bg-white relative">
    <!-- 헤더 -->
    <header class="relative h-[60px]">
      <!-- 뒤로가기 -->
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

      <!-- 타이틀 -->
      <h1
        class="absolute top-[23px] left-[58px] w-[92px] h-[24px] text-[20px] font-semibold leading-[1] text-[#1E1E1E] font-[Pretendard]"
      >
        일자리 상세
      </h1>
    </header>

    <!-- 스크롤 영역 -->
    <main class="px-4 pb-24 space-y-3">
      <!-- 상단 카드 -->
      <section class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 class="text-[16px] font-extrabold text-[#333] leading-snug">
          {{ job.title }}
        </h2>
        <p class="text-[12px] text-[#3D4352] mt-1">{{ job.company }}</p>
        <div class="flex items-center gap-2 mt-2 text-[12px] text-[#555]">
          <!-- 위치 아이콘 -->
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
      <section class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 class="text-[14px] font-bold text-[#111]">근무 조건</h3>

        <div class="grid grid-cols-2 gap-3 mt-3 text-[13px]">
          <div class="rounded-xl bg-gray-50 p-3">
            <div class="text-gray-500">급여</div>
            <div class="mt-1 font-semibold text-gray-800">{{ job.wage }}</div>

            <div class="h-px bg-gray-200 my-3"></div>

            <div class="text-gray-500">근무일</div>
            <div class="mt-1 font-semibold text-gray-800">{{ job.days }}</div>
          </div>

          <div class="rounded-xl bg-gray-50 p-3">
            <div class="text-gray-500">근무시간</div>
            <div class="mt-1 font-semibold text-gray-800">{{ job.time }}</div>

            <div class="h-px bg-gray-200 my-3"></div>

            <div class="text-gray-500">모집인원</div>
            <div class="mt-1 font-semibold text-gray-800">{{ job.personnel }}</div>
          </div>
        </div>
      </section>

      <!-- 업무 내용 -->
      <section class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 class="text-[14px] font-bold text-[#111] mb-2">업무 내용</h3>

        <div class="text-[12px] text-gray-700">
          <div class="font-semibold text-gray-800 mb-1">주요 업무</div>
          <ul class="list-disc pl-5 space-y-1">
            <li v-for="(d, i) in job.duties" :key="i">{{ d }}</li>
          </ul>

          <div class="h-px bg-gray-200 my-3"></div>

          <div class="font-semibold text-gray-800 mb-1">우대 사항</div>
          <ul class="list-disc pl-5 space-y-1">
            <li v-for="(p, i) in job.plus" :key="i">{{ p }}</li>
          </ul>
        </div>
      </section>

      <!-- 근무 위치 -->
      <section class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 class="text-[14px] font-bold text-[#111] mb-2">근무 위치</h3>

        <div class="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <div class="h-24 flex items-center justify-center text-gray-400 text-[12px]">
            지도 영역
          </div>
          <div class="px-3 py-2 text-[12px] text-gray-700 border-t">
            {{ job.address }}
          </div>
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

    <!-- 하단 지원 버튼 (고정) -->
    <div class="fixed left-1/2 -translate-x-1/2 bottom-4 w-[343px]">
      <button
        class="w-full h-12 rounded-xl bg-green-500 text-white font-semibold shadow-md"
        @click="onApply"
      >
        지원하기
      </button>
    </div>
  </div>
</template>
