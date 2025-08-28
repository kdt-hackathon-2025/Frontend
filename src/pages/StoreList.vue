<template>
  <div class="min-h-screen bg-[#FBFBFB] overflow-y-auto">
    <BasicHeader type="back" title="제휴 매장 목록" />
    <section class="px-5 mt-1 pb-16">
      <!-- 카테고리 칩 -->
      <div class="py-1 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        <div class="flex whitespace-nowrap pr-4 gap-1">
          <button
            v-for="c in categories"
            :key="c.value"
            class="px-4 py-2 rounded-full border transition select-none text-[14px] font-medium leading-[1] snap-start focus:outline-none focus:ring-2 focus:ring-[#03C473]/30"
            :class="
              selected === c.value
                ? 'bg-[#03C473] text-[#FBFBFB] border-transparent'
                : 'bg-white text-[#7D7D7D] border-[#E2E2E2]'
            "
            @click="selected = c.value"
            :aria-pressed="selected === c.value"
          >
            {{ c.label }}
          </button>
        </div>
      </div>

      <!-- 상단 정렬/총 개수 -->
      <div class="flex items-center justify-between px-1 pt-5">
        <div class="flex items-center gap-1 select-none">
          <span class="text-[16px] font-bold text-[#333]">최신순</span>
          <img :src="iconDown" class="w-[11px] h-[7px] aspect-[11/7] shrink-0" alt="" />
        </div>
        <span class="text-[14px] text-[#7D7D7D]">총 {{ filtered.length }}개</span>
      </div>

      <!-- 리스트 -->
      <ul class="not-last:rounded-2xl">
        <li v-for="(s, i) in filtered" :key="s.id" class="pt-4">
          <div class="flex gap-4">
            <!-- 이미지 100x100 -->
            <img
              :src="s.img"
              alt=""
              class="w-[100px] h-[100px] rounded-[10px] object-cover shrink-0"
            />

            <!-- 오른쪽 내용 -->
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <!-- 이름 -->
                <h3 class="text-[16px] font-bold text-[#333] leading-normal break-words">
                  {{ s.name }}
                </h3>
                <!-- 북마크 -->
                <img
                  :src="s.bookmarked ? bookmarkFill : bookmarkOutline"
                  alt="bookmark"
                  class="w-[21px] h-[21px] aspect-square shrink-0 cursor-pointer"
                  @click="toggleBookmark(s)"
                />
              </div>

              <!-- 평점 (별 + 4.6 (34)) -->
              <div class="mt-1 flex items-center gap-1">
                <img :src="star14" class="w-[14px] h-[14px] aspect-square shrink-0" alt="" />
                <span class="text-[12px] font-medium text-[#333]">{{ s.rating }}</span>
                <span class="text-[12px] text-[#7D7D7D]">({{ s.reviewCount }})</span>
              </div>

              <!-- 주소 -->
              <p class="mt-1 text-[12px] text-[#7D7D7D] leading-normal">
                {{ s.addr }}
              </p>

              <!-- 소개 (한 줄 말줄임, 너비 190px 요구사항) -->
              <p class="mt-1 text-[12px] text-[#454545] leading-normal w-[190px] line-clamp-1">
                {{ s.desc }}
              </p>
            </div>
          </div>
          <div v-if="i < filtered.length - 1" class="mt-4 h-[1.5px] bg-[#F2F4F6] -mx-5"></div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BasicHeader from '@/components/BasicHeader.vue'

import iconDown from '@/assets/image/icon.svg'
import bookmarkOutline from '@/assets/image/bookmark-rounded.svg'
import bookmarkFill from '@/assets/image/bookmark-rounded-fill.svg'
import star14 from '@/assets/image/star14.svg'
import img1 from '@/assets/image/community_image1.png'
import img2 from '@/assets/image/community_image2.png'
import img3 from '@/assets/image/community_image3.png'
import img4 from '@/assets/image/community_image4.png'

// 예시 카테고리
const categories = [
  { value: 'all', label: '전체' },
  { value: 'cafe', label: '카페' },
  { value: 'medical', label: '의료/건강' },
  { value: 'living', label: '생활용품' },
  { value: 'food', label: '식당' },
  { value: 'culture', label: '문화' },
]
const selected = ref('all')

// 더미 데이터

const stores = ref([
  {
    id: 1,
    category: 'cafe',
    img: img3,
    name: '빵공장 라뜰리에 김가',
    rating: 4.8,
    reviewCount: 34,
    addr: '원주시 행구로 314',
    desc: '7년째 춘천에서 커피를 내리고 있습니다. 크루아상이 대표 메뉴입니다.',
    bookmarked: true,
  },
  {
    id: 2,
    category: 'food',
    img: img2,
    name: '먼데이 브런치&카페',
    rating: 4.6,
    reviewCount: 12,
    addr: '원주시 남원로 11',
    desc: '브런치와 라떼가 맛있는 7년째 한자리에서 운영 중인 카페입니다.',
    bookmarked: false,
  },
  {
    id: 3,
    category: 'cafe',
    img: img4,
    name: '카페 스트로베리',
    rating: 4.7,
    reviewCount: 23,
    addr: '원주시 봉산로 123번길 123',
    desc: '100% 동물성 생크림으로 느끼하지 않고 부드러운 케이크를 맛보세요.',
    bookmarked: false,
  },
  {
    id: 4,
    category: 'cafe',
    img: img1,
    name: '프렌치 크루아상',
    rating: 4.2,
    reviewCount: 20,
    addr: '원주시 행구로 123번길 123',
    desc: '프랑스산 버터가 가득 들어간 생지로 만든 크루아상 전문점입니다.',
    bookmarked: false,
  },
])

// 필터링
const filtered = computed(() =>
  selected.value === 'all'
    ? stores.value
    : stores.value.filter((s) => s.category === selected.value),
)

function toggleBookmark(store) {
  store.bookmarked = !store.bookmarked
}
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
* {
  font-family: Pretendard;
}
</style>
