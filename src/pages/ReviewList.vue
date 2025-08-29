<template>
  <div class="bg-[#FBFBFB] h-screen overflow-y-auto pb-20">
    <BasicHeader type="back" title="리뷰 전체보기" />

    <!-- 메인 화면 -->
    <div class="px-[23px]">
      <!-- 작성한 리뷰 개수 -->
      <div class="flex gap-[6px]">
        <p class="text-[#333333]">내가 작성한 리뷰</p>
        <p class="text-[#03C473]">총 {{ reviews.length }}개</p>
      </div>

      <!-- 리뷰 카드 -->
      <div
        v-for="(review, index) in reviews"
        :key="index"
        class="w-80 h-60 bg-white rounded-lg shadow-[1px_1px_2px_0px_rgba(0,0,0,0.25)] mt-[18px] py-[15px] px-[19px]"
      >
        <!-- 상단(가게명, 날짜, 평점) -->
        <div>
          <!-- 가게명, 버튼 -->
          <div class="flex gap-[7px] items-center">
            <p class="font-semibold text-[#333333] text-lg">{{ review.store }}</p>
            <button @click="$router.push(`/stores/1`)" class="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
                fill="none"
              >
                <path
                  d="M5.08105 5.24414C5.07132 5.26068 5.05395 5.28756 5.01855 5.32227L0.537109 9.71094C0.533998 9.71398 0.531733 9.71549 0.53125 9.71582H0.530273C0.529763 9.71598 0.528684 9.7165 0.527344 9.7168C0.525876 9.71712 0.523462 9.71643 0.520508 9.7168C0.519277 9.71573 0.518115 9.71431 0.516602 9.71289L4.84961 5.47168L5.08105 5.24414ZM0.537109 0.517578L5.01855 4.90625L5.01953 4.90723C5.05403 4.94075 5.0714 4.96722 5.08105 4.9834L4.84961 4.75684L0.516602 0.513672C0.519257 0.511175 0.522238 0.509664 0.524414 0.507812C0.52767 0.510553 0.532733 0.513294 0.537109 0.517578Z"
                  fill="#333333"
                  stroke="#333333"
                />
              </svg>
            </button>
          </div>

          <!-- 평점, 날짜 -->
          <div class="flex items-center">
            <div class="flex space-x-0.5">
              <span v-for="n in 5" :key="n" class="text-[#03C473]">
                <span v-if="n <= review.rating"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                  >
                    <path
                      d="M4.53834 1.10996C4.70914 0.699318 5.29086 0.699318 5.46166 1.10996L6.46974 3.53367C6.54174 3.70679 6.70455 3.82508 6.89144 3.84006L9.50804 4.04983C9.95137 4.08537 10.1311 4.63863 9.79336 4.92796L7.79979 6.63567C7.65739 6.75764 7.59521 6.94903 7.63871 7.13141L8.24778 9.68477C8.35098 10.1174 7.88035 10.4593 7.5008 10.2275L5.26063 8.85919C5.10062 8.76146 4.89938 8.76146 4.73937 8.85919L2.4992 10.2275C2.11965 10.4593 1.64902 10.1174 1.75222 9.68476L2.36129 7.13141C2.40479 6.94903 2.3426 6.75764 2.20021 6.63567L0.206638 4.92796C-0.13113 4.63863 0.0486337 4.08537 0.491961 4.04983L3.10856 3.84006C3.29545 3.82508 3.45826 3.70679 3.53026 3.53367L4.53834 1.10996Z"
                      fill="#03C473"
                    /></svg
                ></span>
                <span v-else
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                  >
                    <path
                      d="M4.53834 1.10996C4.70914 0.699318 5.29086 0.699318 5.46166 1.10996L6.46974 3.53367C6.54174 3.70679 6.70455 3.82508 6.89144 3.84006L9.50804 4.04983C9.95137 4.08537 10.1311 4.63863 9.79336 4.92796L7.79979 6.63567C7.65739 6.75764 7.59521 6.94903 7.63871 7.13141L8.24778 9.68477C8.35098 10.1174 7.88035 10.4593 7.5008 10.2275L5.26063 8.85919C5.10062 8.76146 4.89938 8.76146 4.73937 8.85919L2.4992 10.2275C2.11965 10.4593 1.64902 10.1174 1.75222 9.68476L2.36129 7.13141C2.40479 6.94903 2.3426 6.75764 2.20021 6.63567L0.206638 4.92796C-0.13113 4.63863 0.0486337 4.08537 0.491961 4.04983L3.10856 3.84006C3.29545 3.82508 3.45826 3.70679 3.53026 3.53367L4.53834 1.10996Z"
                      fill="#D9D9D9"
                    /></svg
                ></span>
              </span>
            </div>
            <p class="ml-[8px] text-sm text-[#7D7D7D]">{{ review.date }}</p>
          </div>

          <!-- 리뷰 내용 -->
          <p class="text-[#333333] mt-1">{{ review.content }}</p>

          <!-- 사진 -->
          <div class="mt-2 overflow-x-auto flex gap-2">
            <img
              v-for="(img, index) in review.images"
              :key="index"
              :src="img"
              class="w-24 h-24 rounded-[3px]"
            />
          </div>

          <!-- 태그 -->
          <div class="mt-2">
            <span
              class="text-sm rounded-[33px] border-[0.50px] border-[#03C473] px-2 py-1 text-[#03C473] bg-[#E5FEF4]"
              >{{ review.tag }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicHeader from '@/components/BasicHeader.vue'
import review1 from '@/assets/image/review1.png'
import review2 from '@/assets/image/review2.png'
import review3 from '@/assets/image/review3.png'
import review4 from '@/assets/image/review4.png'
import review5 from '@/assets/image/review5.png'
import review6 from '@/assets/image/review6.png'
import review7 from '@/assets/image/review7.png'

const reviews = [
  {
    id: 1,
    store: '빵공장 라뜰리에 김가',
    date: '2025.08.25',
    rating: 4,
    content: '커피가 너무 맛있어요~',
    images: [review1, review2],
    tag: '아메리카노 디저트 세트',
  },
  {
    id: 2,
    store: '슬은 베이커리',
    date: '2025.08.25',
    rating: 5,
    content: '과일도 신선하고 생크림이 느끼하지 않아요',
    images: [review3, review4, review5],
    tag: '제철 과일 케이크 세트',
  },
  {
    id: 3,
    store: '시니어 카페',
    date: '2025.08.25',
    rating: 4,
    content: '커피가 너무 맛있어요~',
    images: [review6, review7],
    tag: '아메리카노 디저트 세트',
  },
]
</script>

<style scoped>
* {
  font-family: Pretendard;
}
</style>
