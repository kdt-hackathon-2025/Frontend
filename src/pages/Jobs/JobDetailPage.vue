<!-- JobDetailPage.vue -->
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
    title: '스마트팜 생산관리 팀장 채용',
    company: '농업회사 법인 플랜티팜 주식회사',
    address: '전라남도 나주시 덕산길 172',
    tags: ['정규직', '경력', '학력 무관'],
    salary: '연 4,000만원',
    time: '09:00 ~ 18:00',
    days: '주 5일',
    personnel: '2명',
    duties: [
      '스마트팜 시설 내 작물 생산 관리',
      '현장 제작 시설 모니터링 및 조작',
      '작업 실적·설비 점검 기록',
      '원부자재 적정 관리',
    ],
    plus: ['농업 관련 학과 졸업', '스마트팜 운용 경력자', '컴퓨터 활용 가능자'],
    buses: '115, 112, 100, 111',
    station: '왕곡면행정복지센터 하차',
  },
]

const job = computed(() => JOBS.find((j) => j.id === id.value) || JOBS[0])

const goBack = () => router.back()
const onApply = () => {
  // TODO: 지원 로직
  alert('지원하기 클릭!')
}
</script>

<template>
  <!-- 앱 프레임(고정 비율) 안에서만 스크롤/배치 -->
  <div class="w-[440px] h-[956px] mx-auto bg-white overflow-hidden grid grid-rows-[auto,1fr,auto]">
    <!-- 헤더 -->
    <header class="px-4 py-3 flex items-center gap-3">
      <button class="text-gray-700" @click="goBack">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </button>
      <h1 class="font-bold">일자리 상세</h1>
    </header>

    <!-- 본문(스크롤 영역) -->
    <main class="overflow-y-auto px-4 pb-4">
      <!-- 상단 카드 -->
      <section class="mt-3 rounded-2xl border border-gray-200 p-4 shadow-lg bg-white">
        <h2 class="text-[16px] font-extrabold text-gray-900 leading-tight">
          {{ job.title }}
        </h2>
        <p class="text-[12px] text-gray-500 mt-1">{{ job.company }}</p>

        <div class="flex items-center gap-2 mt-1 text-[12px] text-gray-600">
          <font-awesome-icon :icon="['fas', 'location-dot']" class="text-gray-400" />
          <span>{{ job.address }}</span>
        </div>

        <div class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="t in job.tags"
            :key="t"
            class="px-2 py-1 rounded-md text-[11px] font-semibold"
            :class="t === '정규직' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'"
          >
            {{ t }}
          </span>
        </div>
      </section>

      <!-- 근무 조건 -->
      <section class="mt-3 rounded-2xl border border-gray-200 p-4 shadow-lg bg-white">
        <h3 class="text-[14px] font-bold text-gray-900">근무 조건</h3>

        <div class="grid grid-cols-2 gap-3 mt-3 text-[13px]">
          <div class="rounded-xl bg-gray-50 p-3">
            <div class="text-gray-500">연봉</div>
            <div class="mt-1 font-semibold text-gray-800">{{ job.salary }}</div>
            <div class="mt-3 text-gray-500">근무일</div>
            <div class="mt-1 font-semibold text-gray-800">{{ job.days }}</div>
          </div>

          <div class="rounded-xl bg-gray-50 p-3">
            <div class="text-gray-500">근무시간</div>
            <div class="mt-1 font-semibold text-gray-800">{{ job.time }}</div>
            <div class="mt-3 text-gray-500">모집인원</div>
            <div class="mt-1 font-semibold text-gray-800">{{ job.personnel }}</div>
          </div>
        </div>
      </section>

      <!-- 업무 내용 -->
      <section class="mt-3 rounded-2xl border border-gray-200 p-4 shadow-lg bg-white">
        <h3 class="text-[14px] font-bold text-gray-900 mb-2">업무 내용</h3>

        <div class="text-[12px] text-gray-600">
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
      <section class="mt-3 rounded-2xl border border-gray-200 p-4 shadow-lg bg-white">
        <h3 class="text-[14px] font-bold text-gray-900 mb-2">근무 위치</h3>

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
            <font-awesome-icon :icon="['fas', 'bus']" class="text-gray-400" />
            <span class="text-gray-500">대중교통</span>
          </div>
          <div class="pl-6">
            <span class="text-gray-700">버스</span>
            <span class="mx-1 text-gray-400">|</span>
            <span class="text-gray-700">{{ job.buses }}</span>
          </div>
          <div class="pl-6 text-gray-500">
            {{ job.station }}
          </div>
        </div>
      </section>

      <!-- 회사 정보 -->
      <section class="mt-3 rounded-2xl border border-gray-200 p-4 shadow-lg bg-white">
        <h3 class="text-[14px] font-bold text-gray-900 mb-2">회사 정보</h3>

        <div class="grid grid-cols-2 gap-3 text-[12px]">
          <div class="bg-gray-50 rounded-xl p-3">
            <div class="text-gray-500">업종</div>
            <div class="font-semibold text-gray-800 mt-1">농업, 임업 및 어업</div>

            <div class="h-px bg-gray-200 my-3"></div>

            <div class="text-gray-500">인원</div>
            <div class="font-semibold text-gray-800 mt-1">15명</div>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <div class="text-gray-500">설립년도</div>
            <div class="font-semibold text-gray-800 mt-1">2018년</div>

            <div class="h-px bg-gray-200 my-3"></div>

            <div class="text-gray-500">매출액</div>
            <div class="font-semibold text-gray-800 mt-1">50억원</div>
          </div>
        </div>

        <p class="text-[12px] text-gray-600 mt-3 leading-5">
          농업회사법인 ㈜플랜티팜은 스마트온실 기술을 기반으로 생산성 향상과 안정적인 농업을
          실현하는 기업입니다. 친환경 재배 시스템을 통해 고품질 작물을 공급합니다.
        </p>
      </section>
    </main>

    <!-- 버튼 행: 프레임 내부 맨 아래 -->
    <div class="px-4 py-3 bg-white">
      <button class="w-full h-12 rounded-xl bg-green-500 text-white font-semibold" @click="onApply">
        지원하기
      </button>
    </div>
  </div>
</template>
