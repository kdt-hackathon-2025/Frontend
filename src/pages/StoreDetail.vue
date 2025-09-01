<template>
  <div class="min-h-dvh bg-[#FBFBFB]">
    <!-- 헤더 -->
    <BasicHeader class="sticky top-0 z-50 bg-white border-b" type="back" title="제휴 매장 상세" />

    <!-- 상단 이미지 -->
    <img :src="hero" alt="" class="w-full h-[160px] object-cover" />

    <section class="px-5 space-y-4 py-4 pb-12">
      <!-- 가게 카드 -->
      <div class="bg-white rounded-[16px] shadow-[1px_1px_2px_rgba(0,0,0,0.25)] p-6 mt-1">
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

        <p class="mt-1 text-[14px] text-[#7D7D7D] font-medium">
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
      <div class="bg-white rounded-[16px] shadow-[1px_1px_2px_rgba(0,0,0,0.25)] p-6">
        <div class="flex items-center justify-between pb-2">
          <h3 class="text-[20px] font-bold text-[#333]">주요 상품/서비스</h3>
          <button
            class="flex items-center text-[13px] text-[#7D7D7D] cursor-pointer hover:underline"
          >
            더보기 <img :src="rightLine" class="w-4 h-4" alt="" />
          </button>
        </div>

        <ul class="">
          <li v-for="(m, i) in menu.slice(0, 3)" :key="m.id" class="pt-2">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[16px] font-semibold text-[#454545] leading-5">
                  {{ m.name }}
                </p>
                <p class="text-[14px] text-[#787774] leading-5">
                  {{ m.sub }}
                </p>
              </div>
              <p class="text-[16px] font-medium text-[#454545] leading-5">
                {{ m.price }}
              </p>
            </div>
            <div v-if="i < menu.length - 1" class="mt-2 h-[1.5px] bg-[#F2F4F6]"></div>
          </li>
        </ul>
      </div>

      <!-- 체험단 쿠폰 : 카드 1개 안에 리스트 -->
      <div class="bg-white rounded-[16px] shadow-[1px_1px_2px_rgba(0,0,0,0.25)] p-6">
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
                <p class="text-[14px] text-[#96A0B5] font-medium">사용 기한: {{ c.until }}</p>

                <div class="mt-1 flex justify-end">
                  <button
                    class="h-[32px] px-3 rounded-[10px] bg-[#03C473] text-white text-[14px] font-semibold cursor-pointer"
                    @click="openPurchase(c)"
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
      <div class="bg-white rounded-[16px] shadow-[1px_1px_2px_rgba(0,0,0,0.25)] p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h3 class="text-[20px] text-[#333] font-bold">체험단 후기</h3>
            <span class="text-[13px] text-[#454545] font-medium">총 34개</span>
          </div>

          <button
            class="flex items-center text-[13px] text-[#7D7D7D] cursor-pointer hover:underline"
          >
            전체보기 <img :src="rightLine" class="w-4 h-4" alt="" />
          </button>
        </div>

        <ul class="space-y-4 mt-4">
          <li v-for="(r, i) in reviews" :key="r.id" class="rounded-2xl">
            <!-- 작성자 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img :src="r.avatar" class="w-6 h-6 rounded-full object-cover" />
                <p class="text-[18px] font-semibold text-[#454545]">
                  {{ r.name }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2 pt-2">
              <img :src="r.rating === 4 ? stars4 : stars5" class="w-[60px] h-3" alt="" />
              <span class="text-[14px] text-[#7D7D7D] font-medium">{{ r.date }}</span>
            </div>

            <p class="mt-1 text-[16px] text-[#454545] font-medium">
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
                class="inline-flex px-3 py-1 rounded-[33px] border border-[#03C473]/100 bg-[#E5FEF4] text-[14px] text-[#4AA982] font-medium"
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

      <Transition
        enter-active-class="transition ease-out duration-150"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showPurchase"
          class="fixed inset-0 z-[100] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          <!-- Dim -->
          <div
            class="absolute inset-0 bg-[rgba(44,44,44,0.66)] backdrop-blur-[1px]"
            @click.self="closePurchase"
          ></div>

          <!-- Card -->
          <div class="relative w-80 rounded-[10px] border border-[#E2E2E2] bg-white shadow-lg p-7">
            <Transition
              mode="out-in"
              enter-active-class="transition duration-220 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-120 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <!-- 구매 전 화면 -->
              <div v-if="modalMode === 'purchase'" :key="'purchase'">
                <!-- 타이틀 -->
                <div class="w-full text-center leading-tight">
                  <span class="text-[20px] font-bold text-[#03C473] align-middle">포인트</span
                  ><span class="text-[20px] font-semibold text-[#333333] align-middle"
                    >를 사용하여<br />구매하시겠습니까?
                  </span>
                </div>

                <!-- 썸네일 -->
                <div class="mt-6 flex justify-center">
                  <img
                    :src="selectedCoupon?.img"
                    alt=""
                    class="w-[100px] h-[100px] rounded-[12px] object-cover"
                  />
                </div>

                <!-- 상품명 -->
                <p class="mt-1 text-center text-[16px] font-medium text-[#333333]">
                  {{ selectedCoupon?.title }}
                </p>

                <!-- 포인트 정보 -->
                <div class="mt-6 space-y-2 flex flex-col items-center">
                  <div
                    class="w-[280px] flex items-center justify-between text-[16px] font-medium px-2"
                  >
                    <span class="text-[#1E1E1E]">필요 포인트</span>
                    <span class="flex items-center gap-1">
                      <span class="text-[#2E8AF1] pr-1">{{
                        needPointsOf(selectedCoupon)?.toLocaleString()
                      }}</span>
                      <img :src="point" class="w-3 h-3" alt="" />
                    </span>
                  </div>

                  <div
                    class="w-[280px] flex items-center justify-between text-[16px] font-medium px-2"
                  >
                    <span class="text-[#1E1E1E]">내 포인트</span>
                    <span class="flex items-center gap-1">
                      <span class="text-[#1E1E1E] pr-1">{{ myPoints.toLocaleString() }}</span>
                      <img :src="point" class="w-3 h-3" alt="" />
                    </span>
                  </div>

                  <div class="w-[280px] h-[0.5px] bg-[rgba(103,115,142,0.50)]"></div>

                  <div
                    class="w-[280px] flex items-center justify-between text-[16px] font-medium px-2"
                  >
                    <span class="text-[#1E1E1E]">구매 후 내 포인트</span>
                    <span class="flex items-center gap-1">
                      <span class="text-[#1E1E1E] pr-1">
                        {{ Math.max(0, myPoints - needPointsOf(selectedCoupon)).toLocaleString() }}
                      </span>
                      <img :src="point" class="w-3 h-3" alt="" />
                    </span>
                  </div>
                </div>

                <!-- 버튼 -->
                <div class="mt-6 flex justify-center gap-2">
                  <button
                    class="w-[100px] h-[38px] rounded-[10px] border border-[#03C473] bg-[#FBFBFB] text-[16px] font-semibold text-[#03C473]"
                    @click="closePurchase"
                  >
                    취소
                  </button>
                  <button
                    class="w-[100px] h-[38px] rounded-[10px] bg-[#03C473] text-[16px] font-semibold text-white disabled:opacity-50"
                    :disabled="needPointsOf(selectedCoupon) > myPoints"
                    @click="confirmPurchase"
                  >
                    구매하기
                  </button>
                </div>
              </div>

              <!-- 구매 완료 화면 -->
              <div v-else :key="'success'">
                <!-- 체크 아이콘 -->
                <div class="flex justify-center mt-3">
                  <img :src="completed" alt="" class="w-20 h-20" />
                </div>

                <!-- 제목 -->
                <p class="mt-6 text-center text-[24px] font-bold text-[#03C473]">
                  체험단 신청 완료
                </p>

                <!-- 보조 문구 -->
                <p class="text-center text-[18px] font-semibold text-[#3D4352]">
                  마이페이지에서 확인하세요
                </p>

                <!-- 안내문 -->
                <p class="mt-3 mx-auto w-[247px] text-center text-[16px] font-normal text-[#333]">
                  지정된 기간 내 매장을 방문하신 후,<br />QR코드를 제시해주세요.
                </p>

                <!-- 버튼들 -->
                <div class="mt-9 flex flex-col items-center gap-1">
                  <button
                    class="w-64 h-[38px] rounded-[10px] bg-[#03C473] text-white text-[16px] font-semibold"
                    @click="goMyPage"
                  >
                    마이페이지 바로가기
                  </button>
                  <button
                    class="h-[38px] text-[#03C473] text-[16px] font-semibold"
                    @click="closePurchase"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
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
import stars5 from '@/assets/image/star_group5.svg'

import menu1 from '@/assets/image/menu1.png'
import user1 from '@/assets/image/user3.webp'
import user2 from '@/assets/image/user-icon.png'
import cimg1 from '@/assets/image/community_image1.png'
import cimg2 from '@/assets/image/community_image2.png'
import cimg3 from '@/assets/image/community_image3.png'
import cimg4 from '@/assets/image/review8.jfif'
import cimg5 from '@/assets/image/review9.jfif'
import point from '@/assets/image/point.svg'
import cimg6 from '@/assets/image/review10.jfif'

import completed from '@/assets/image/completed.svg'
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const router = useRouter()
const showPurchase = ref(false)
const modalMode = ref('purchase') // 'purchase' | 'success'
const selectedCoupon = ref(null)
const myPoints = ref(10000)

const shop = {
  name: '빵공장 라뜰리에 김가',
  rating: '4.8',
  category: '카페 · 베이커리',
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
    until: '2025-09-20',
    needPoints: 5000,
  },
  {
    id: 2,
    title: '빵 뷔페 1인',
    img: cimg1,
    desc1: '빵 뷔페 1인',
    desc2: '(평일 11:00~13:30)',
    until: '2025-09-20',
    needPoints: 8000,
  },
]

const reviews = [
  {
    id: 1,
    name: '강은퇴',
    avatar: user1,
    date: '2025.08.25',
    content: '빵 종류도 다양하고 커피도 맛있어요~ 친절한 서비스에 기분 좋게 다녀왔습니다ㅎㅎ',
    pill: '아메리카노 디저트 세트',
    photos: [cimg2, cimg3, cimg4],
    rating: 5,
  },
  {
    id: 2,
    name: '원주토박이',
    avatar: user2,
    date: '2025.08.15',
    content: '여기 빵 너무 맛있네요^^ 강추드립니다.',
    pill: '빵 뷔페 1인',
    photos: [cimg6, cimg5],
    rating: 4,
  },
]

function needPointsOf(coupon) {
  if (!coupon) return 0
  return coupon.needPoints || (coupon.id === 1 ? 5000 : 7000)
}

function openPurchase(coupon) {
  selectedCoupon.value = coupon
  modalMode.value = 'purchase'
  showPurchase.value = true
  lockScroll()
}

function closePurchase() {
  showPurchase.value = false
  selectedCoupon.value = null
  modalMode.value = 'purchase'
  unlockScroll()
}

async function confirmPurchase() {
  const need = needPointsOf(selectedCoupon.value)
  myPoints.value = Math.max(0, myPoints.value - need)
  modalMode.value = 'success'
}

function goMyPage() {
  closePurchase()
  router.push({ name: 'MyPage' })
}

// ESC 닫기
function onKeydown(e) {
  if (e.key === 'Escape' && showPurchase.value) closePurchase()
}

function lockScroll() {
  document.documentElement.classList.add('overflow-hidden')
}
function unlockScroll() {
  document.documentElement.classList.remove('overflow-hidden')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
* {
  font-family: Pretendard;
}
</style>
