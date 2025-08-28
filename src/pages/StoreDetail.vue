<template>
  <div class="min-h-dvh bg-[#FBFBFB]">
    <!-- 헤더 -->
    <BasicHeader class="sticky top-0 z-50 bg-white border-b" type="back" title="제휴 매장 상세" />

    <!-- 상단 히어로 이미지 374 × 128 -->
    <img :src="hero" alt="" class="w-full h-[160px] object-cover" />

    <section class="px-5 space-y-4 py-4 pb-12">
      <!-- 가게 카드 -->
      <div class="bg-white rounded-[16px] shadow-[1px_1px_2px_rgba(0,0,0,0.25)] p-5 mt-1">
        <div class="flex items-start justify-between gap-2">
          <h2 class="text-[20px] font-bold text-[#333] leading-none">
            {{ shop.name }}
          </h2>

          <div class="flex items-center gap-1 shrink-0">
            <img :src="star20" class="w-5 h-5" alt="" />
            <span class="text-[16px] font-medium text-[#333] cursor-pointer hover:underline">{{
              shop.rating
            }}</span>
          </div>
        </div>

        <p class="mt-1 text-[15px] text-[#7D7D7D] font-medium">
          {{ shop.category }}
        </p>

        <p class="mt-2 pb-2 text-[15px] text-[#333] font-medium max-w-[287px]">
          {{ shop.desc }}
        </p>

        <!-- 주소/전화/영업시간 -->
        <div class="mt-3 space-y-2">
          <div class="flex items-center gap-2">
            <img :src="pin" class="w-[18px] h-[18px]" alt="" />
            <span class="text-[14px] text-[#3D4352]">{{ shop.addr }}</span>
          </div>
          <div class="flex items-center gap-2">
            <img :src="phone" class="w-[18px] h-[18px]" alt="" />
            <span class="text-[14px] text-[#3D4352]">{{ shop.tel }}</span>
          </div>
          <div class="flex items-center gap-2">
            <img :src="clock" class="w-[18px] h-[18px]" alt="" />
            <span class="text-[14px] text-[#3D4352]">{{ shop.hours }}</span>
          </div>
        </div>
      </div>

      <!-- 주요 상품 / 서비스 -->
      <div class="bg-white rounded-[16px] shadow-[1px_1px_2px_rgba(0,0,0,0.25)] p-5">
        <div class="flex items-center justify-between pb-1">
          <h3 class="text-[20px] font-bold text-[#333]">주요 상품/서비스</h3>
          <button
            class="flex items-center text-[12px] text-[#7D7D7D] cursor-pointer hover:underline"
          >
            더보기 <img :src="rightLine" class="w-4 h-4" alt="" />
          </button>
        </div>

        <ul>
          <li v-for="(m, i) in menu.slice(0, 3)" :key="m.id" class="py-2">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[16px] font-semibold text-[#454545] leading-5">
                  {{ m.name }}
                </p>
                <p class="text-[13px] text-[#787774] leading-5">
                  {{ m.sub }}
                </p>
              </div>
              <p class="text-[16px] font-medium text-[#454545] leading-5">
                {{ m.price }}
              </p>
            </div>
            <div v-if="i < menu.length - 1" class="mt-4 h-[1.5px] bg-[#F2F4F6]"></div>
          </li>
        </ul>
      </div>

      <!-- 체험단 쿠폰 : 카드 1개 안에 리스트 -->
      <div class="bg-white rounded-[16px] shadow-[1px_1px_2px_rgba(0,0,0,0.25)] p-5">
        <h3 class="text-[20px] font-bold text-[#333]">체험단 쿠폰</h3>

        <!-- 쿠폰 리스트 -->
        <ul class="overflow-hidden">
          <li v-for="(c, i) in coupons" :key="c.id" class="pt-4">
            <!-- 쿠폰 타이틀 -->
            <p class="text-[16px] text-[#454545] font-semibold mb-2">
              {{ c.title }}
            </p>

            <!-- 썸네일 + 설명 + 버튼 -->
            <div class="flex gap-3">
              <img
                :src="c.img"
                alt=""
                class="w-[100px] h-[100px] rounded-[12px] object-cover shrink-0"
              />

              <div class="min-w-0 flex-1">
                <p class="text-[14px] text-[#454545] font-medium">
                  {{ c.desc1 }}<br />{{ c.desc2 }}
                </p>
                <p class="text-[12px] text-[#96A0B5] font-medium">사용 가능 기간: {{ c.until }}</p>

                <div class="mt-2 flex justify-end">
                  <button
                    class="h-[32px] px-3 rounded-[10px] bg-[#03C473] text-white text-[13px] font-semibold cursor-pointer"
                  >
                    체험단 신청하기
                  </button>
                </div>
              </div>
            </div>
            <div v-if="i < coupons.length - 1" class="mt-4 h-[1.5px] bg-[#F2F4F6] -mx-5"></div>
          </li>
        </ul>
      </div>

      <!-- 체험단 후기 -->
      <div class="bg-white rounded-[16px] shadow-[1px_1px_2px_rgba(0,0,0,0.25)]">
        <div class="flex items-center justify-between px-5 pt-5">
          <div class="flex items-center gap-2">
            <h3 class="text-[20px] text-[#333] font-bold">체험단 후기</h3>
            <span class="text-[12px] text-[#454545] font-medium">총 {{ reviews.length }}개</span>
          </div>

          <button
            class="flex items-center text-[12px] text-[#7D7D7D] cursor-pointer hover:underline"
          >
            전체보기 <img :src="rightLine" class="w-4 h-4" alt="" />
          </button>
        </div>

        <ul class="space-y-4 p-5">
          <li v-for="(r, i) in reviews" :key="r.id" class="rounded-2xl">
            <!-- 작성자 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img :src="r.avatar" class="w-6 h-6 rounded-full object-cover" />
                <p class="text-[15px] font-semibold text-[#454545]">
                  {{ r.name }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2 pt-2">
              <img :src="stars4" class="w-[60px] h-3" alt="" />
              <span class="text-[11px] text-[#7D7D7D] font-medium">{{ r.date }}</span>
            </div>

            <p class="mt-1 text-[14px] text-[#454545] font-medium">
              {{ r.content }}
            </p>

            <!-- 사진들 -->
            <div class="mt-2 overflow-x-auto no-scrollbar snap-x snap-mandatory">
              <!-- li가 px-3 이므로 내부는 px-3 로만 맞춤 -->
              <div class="flex gap-2">
                <img
                  v-for="(img, idx) in r.photos"
                  :key="idx"
                  :src="img"
                  class="w-[100px] h-[100px] rounded-[3px] object-cover shrink-0 snap-start"
                />
              </div>
            </div>

            <!-- 태그 pill -->
            <div class="mt-2">
              <span
                class="inline-flex px-3 py-1 rounded-[33px] border border-[#03C473]/100 bg-[#E5FEF4] text-[12px] text-[#4AA982] font-medium"
              >
                {{ r.pill }}
              </span>
            </div>
            <div v-if="i < reviews.length - 1" class="mt-4 h-[1.5px] bg-[#F2F4F6]"></div>
          </li>
        </ul>
      </div>

      <!-- 하단 여백 -->
      <div class="h-2"></div>
    </section>
  </div>
</template>

<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import hero from '@/assets/image/community_image3.png'

import star20 from '@/assets/image/star20.svg'
import pin from '@/assets/image/pin.svg'
import phone from '@/assets/image/phone.svg'
import clock from '@/assets/image/clock.svg'

import rightLine from '@/assets/image/right-line.svg'
import stars4 from '@/assets/image/star_group4.svg'

import menu1 from '@/assets/image/menu1.png'
import user1 from '@/assets/image/user1.png'
import cimg1 from '@/assets/image/community_image1.png'
import cimg2 from '@/assets/image/community_image2.png'
import cimg3 from '@/assets/image/community_image3.png'

const shop = {
  name: '빵공장 라뜰리에 김가',
  rating: '4.8',
  category: '카페',
  desc: '신선한 원주 치악산 복숭아를 활용한 슈페너와 코코넛의 달콤함이 어우러진 시그니처 라떼를 맛볼 수 있습니다.',
  addr: '강원 원주시 행구로 314 라뜰리에김가',
  tel: '033-735-5677',
  hours: '10:00 ~ 22:00',
}

const menu = [
  { id: 1, name: '치악산 복숭아 슈페너', sub: '커피', price: '6,500원' },
  { id: 2, name: '리치 포레스트 아이스티', sub: '아이스티', price: '6,500원' },
  { id: 3, name: '다람쥐 코코넛 라떼', sub: '커피', price: '6,500원' },
]

const coupons = [
  {
    id: 1,
    title: '아메리카노/디저트 세트',
    img: menu1,
    desc1: '아메리카노 1잔, 디저트',
    desc2: '(휘낭시에, 타르트 중 택1)',
    until: '2025-08-20',
  },
  {
    id: 2,
    title: '빵뷔페 1인',
    img: cimg1,
    desc1: '빵뷔페 1인',
    desc2: '(평일 11:00~13:30)',
    until: '2025-08-20',
  },
]

const reviews = [
  {
    id: 1,
    name: '화진',
    avatar: user1,
    date: '2025.08.25',
    content: '커피가 너무 맛있어요~',
    pill: '아메리카노 디저트 세트',
    photos: [cimg1, cimg2, cimg3],
  },
  {
    id: 2,
    name: '미정',
    avatar: user1,
    date: '2025.06.12',
    content: '여기 빵 너무 맛있네요^^',
    pill: '아메리카노 디저트 세트',
    photos: [cimg1, cimg3],
  },
]
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
* {
  font-family: Pretendard;
}
</style>
