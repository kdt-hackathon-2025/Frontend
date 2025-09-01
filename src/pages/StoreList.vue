<template>
  <div class="min-h-screen bg-[#FBFBFB] overflow-y-auto">
    <BasicHeader type="back" title="제휴 매장 목록" />
    <section class="px-5 mt-1 pb-16">
      <!-- 카테고리 칩 -->
      <div class="py-1 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        <div class="flex whitespace-nowrap pr-4 gap-2">
          <button
            v-for="c in categories"
            :key="c.value"
            class="px-4 py-2 rounded-full border transition select-none text-[16px] font-medium leading-[1] snap-start cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#03C473]/30"
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
            <RouterLink :to="{ name: 'StoreDetail', params: { id: 1 } }">
              <img
                :src="s.img"
                alt=""
                class="w-[100px] h-[100px] rounded-[10px] object-cover shrink-0"
              />
            </RouterLink>

            <!-- 오른쪽 내용 -->
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <!-- 이름 -->
                <RouterLink :to="{ name: 'StoreDetail', params: { id: 1 } }">
                  <h3
                    class="text-[16px] font-bold hover:underline text-[#333] leading-normal break-words"
                  >
                    {{ s.name }}
                  </h3>
                </RouterLink>

                <!-- 북마크 -->
                <img
                  :src="s.bookmarked ? bookmarkFill : bookmarkOutline"
                  alt="bookmark"
                  class="w-[21px] h-[21px] aspect-square shrink-0 cursor-pointer"
                  @click="toggleBookmark(s)"
                />
              </div>
              <!-- 세부 카테고리 -->
              <p class="text-[14px] text-[#7D7D7D] leading-normal">
                {{ s.addr }}
              </p>

              <RouterLink :to="{ name: 'StoreDetail', params: { id: 1 } }">
                <!-- 평점  -->
                <div class="flex items-center gap-1">
                  <img :src="star14" class="w-[14px] h-[14px] aspect-square shrink-0" alt="" />
                  <span class="text-[14px] font-medium text-[#333]">{{ s.rating }}</span>
                  <span class="text-[14px] text-[#7D7D7D]">({{ s.reviewCount }})</span>
                </div>

                <!-- 소개 (한 줄 말줄임, 너비 190px 요구사항) -->

                <p
                  class="mt-2 text-[14px] text-[#454545] leading-normal w-[190px] line-clamp-1 hover:underline"
                >
                  {{ s.desc }}
                </p>
              </RouterLink>
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
import img1 from '@/assets/image/community_image1.png' // 프렌치 크루아상
import img2 from '@/assets/image/shop4.jpg' // 먼데이 브런치
import img3 from '@/assets/image/community_image3.png' // 빵공장 김가
import img4 from '@/assets/image/community_image4.png' // 스트로베리
import img5 from '@/assets/image/shop1.webp' // 카츠예미
import img6 from '@/assets/image/shop2.webp' // 흑돼지 삼백식당
import img7 from '@/assets/image/shop3.jpg' // 담짜장
import img8 from '@/assets/image/shop5.jfif' // 고트
import img9 from '@/assets/image/shop6.jfif' // 앤트빌라
import img10 from '@/assets/image/shop7.jfif' // 오봉집

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
    addr: '카페 · 베이커리',
    desc: '강원도 속 작은 유럽. 매일 갓 구운, 이름에 걸맞은 40여가지 이상의 베이커리와 케이크를 선보이고 있습니다. 탁 트인 치악산 풍경 속에서 시원하게 흘러내리는 폭포와 음악이..',
    bookmarked: true,
  },
  {
    id: 2,
    category: 'cafe',
    img: img2,
    name: '먼데이 브런치&카페',
    rating: 4.9,
    reviewCount: 58,
    addr: '카페 · 베이커리',
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
    addr: '카페 · 베이커리',
    desc: '100% 동물성 생크림으로 느끼하지 않고 부드러운 케이크를 맛보세요.',
    bookmarked: false,
  },
  {
    id: 4,
    category: 'food',
    img: img5,
    name: '카츠예미',
    rating: 4.8,
    reviewCount: 48,
    addr: '일식',
    desc: '백종원의 골목식당 출연했던 원주 돈카츠 대표 맛집 카츠예미입니다. 국내 유일한 프리미엄 돈카츠 덮밥을 즐겨보세요.',
    bookmarked: false,
  },
  {
    id: 5,
    category: 'cafe',
    img: img1,
    name: '프렌치 크루아상',
    rating: 4.3,
    reviewCount: 17,
    addr: '카페 · 베이커리',
    desc: '프랑스산 버터가 가득 들어간 생지로 만든 크루아상 전문점입니다.',
    bookmarked: false,
  },
  {
    id: 6,
    category: 'food',
    img: img6,
    name: '흑돼지 삼백식당',
    rating: 4.6,
    reviewCount: 21,
    addr: '한식 · 육류',
    desc: '깔끔한 이베리코 전문점입니다. 이베리코 흑돼지의 풍미를 느껴보세요.',
    bookmarked: false,
  },
  {
    id: 7,
    category: 'food',
    img: img7,
    name: '담짜장',
    rating: 4.1,
    reviewCount: 12,
    addr: '중식',
    desc: '담백함을 담다 - 부담스러운 기름기는 줄이고 재료 본연의 맛을 살려 속 편하게 담백함을 담았습니다. 생생함을 담다 - 매일 아침 매장에서 만드는 짜장..',
    bookmarked: false,
  },
  {
    id: 8,
    category: 'living',
    img: img8,
    name: '고트',
    rating: 4.5,
    reviewCount: 6,
    addr: '주방용품',
    desc: '국내 공예 작가의 개성있는 도자기 그릇과 오브제를 제안합니다. 색다른 가치를 담은 그릇들은 우리의 삶을 풍요하게 만듭니다..',
    bookmarked: false,
  },
  {
    id: 9,
    category: 'cafe',
    img: img9,
    name: '앤트빌라 혁신본점',
    rating: 4.2,
    reviewCount: 18,
    addr: '카페 · 베이커리',
    desc: '민생지원금 사용 가능! 국내 특급 호텔 파트너사인 제주테마농원의 애플망고는 특등급 최상품에 품질로 맛과 향이 뛰어납니다. 시즌한정 빙수 메뉴로 만나보세요.',
    bookmarked: false,
  },
  {
    id: 10,
    category: 'food',
    img: img10,
    name: '오봉집 원주혁신도시점',
    rating: 4.6,
    reviewCount: 16,
    addr: '한식 · 육류',
    desc: '어머니께서 쏟으셨던 그 정성 그대로 마음을 담았습니다. 찾아주시는 모든 고객님들께 정성을 다해 한 상을 준비했습니다.',
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
