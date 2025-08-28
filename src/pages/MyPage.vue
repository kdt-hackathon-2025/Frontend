<template>
  <div class="bg-[#FBFBFB] h-screen overflow-y-auto pb-20">
    <!-- 헤더 -->
    <BasicHeader type="icon" title="마이페이지" />

    <!-- 프로필 카드 -->
    <div
      class="bg-white w-80 h-28 rounded-2xl shadow-[1px_1px_2px_0px_rgba(0,0,0,0.25)] mx-7 px-[16px] flex items-center"
    >
      <img class="w-16 h-16" src="../assets/image/user-icon.png" />
      <div class="ml-3">
        <div class="flex gap-[9rem]">
          <p class="font-semibold text-[#333333] text-lg">김은퇴</p>
          <button class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
            >
              <path
                d="M1.5 11L6.5 6L1.5 1"
                stroke="#898989"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <p class="font-medium text-[#7D7D7D] text-sm">서울 거주 중</p>
        <div class="flex gap-[16px]">
          <p class="font-medium text-[#333333]">보유 포인트</p>
          <p class="font-bold text-[#03C473]">300p</p>
        </div>
      </div>
    </div>

    <!-- 탭 -->
    <div class="flex mt-4 w-[20.5rem] mx-6 bg-white rounded-full p-1 text-sm font-medium">
      <button class="flex-1 py-2 text-center font-bold text-[#898989]">적립금</button>
      <button
        class="flex-1 py-2 text-center rounded-full bg-[#E9F9F3] text-[#4AA982] font-bold cursor-pointer"
      >
        체험단
      </button>
    </div>

    <!-- 상태 필터 바 -->
    <div class="mx-8 mt-4 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        <span class="font-semibold text-[#1E1E1E]">사용 가능</span>
        <span class="px-1">|</span>
        <span class="font-semibold text-[#7D7D7D]">사용 완료</span>
      </div>
      <button class="text-sm text-[#7D7D7D] flex gap-[0.7rem] items-center cursor-pointer">
        리뷰 전체보기
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.47124 4.52879C5.59622 4.65381 5.66643 4.82334 5.66643 5.00012C5.66643 5.1769 5.59622 5.34643 5.47124 5.47145L1.6999 9.24279C1.63841 9.30646 1.56484 9.35725 1.48351 9.39219C1.40217 9.42713 1.31469 9.44552 1.22617 9.44629C1.13765 9.44706 1.04986 9.43019 0.967934 9.39667C0.886003 9.36315 0.811568 9.31364 0.748973 9.25105C0.686378 9.18845 0.636876 9.11402 0.603355 9.03209C0.569835 8.95016 0.552967 8.86237 0.553736 8.77385C0.554505 8.68533 0.572896 8.59785 0.607836 8.51652C0.642775 8.43518 0.693563 8.36162 0.757236 8.30012L4.05724 5.00012L0.757236 1.70012C0.635798 1.57439 0.568601 1.40598 0.57012 1.23119C0.571639 1.05639 0.641752 0.88918 0.765357 0.765575C0.888962 0.641969 1.05617 0.571857 1.23097 0.570338C1.40577 0.568819 1.57417 0.636015 1.6999 0.757454L5.47124 4.52879Z"
            fill="#898989"
          />
        </svg>
      </button>
    </div>

    <!-- 쿠폰 리스트 -->
    <div class="px-7 mt-3 space-y-3">
      <!-- 쿠폰 하나 -->
      <div
        class="flex items-center bg-white rounded-2xl shadow-[1px_1px_2px_0px_rgba(0,0,0,0.25)] p-4 w-80 h-40"
      >
        <div class="flex flex-col gap-[12px]">
          <h2 class="font-semibold text-[#333333]">빵공장 라뜰리에 김가</h2>
          <div class="flex gap-[16px]">
            <img
              class="w-[6.25rem] h-[6.25rem] bg-gray-200 rounded-xl"
              src="../assets/image/coupon1.png"
            />
            <div>
              <p class="text-sm text-[#5C667B] leading-snug font-semibold">
                아메리카노 1잔, 디저트 <br />(휘낭시에, 타르트 중 택1)
              </p>
              <p class="text-xs text-[#96A0B5] mt-0.5">사용 가능 기간: 2025-08-20</p>
              <button
                class="mt-2 ml-10 w-32 h-8 px-3 py-1 bg-[#03C473] text-[#FBFBFB] text-sm rounded-xl font-semibold cursor-pointer"
                @click="isQrOpen = true"
              >
                쿠폰 사용하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 쿠폰 하나 -->
      <div
        class="flex items-center bg-white rounded-2xl shadow-[1px_1px_2px_0px_rgba(0,0,0,0.25)] p-4 w-80 h-40"
      >
        <div class="flex flex-col gap-[12px]">
          <h2 class="font-semibold text-[#333333]">빵공장 라뜰리에 김가</h2>
          <div class="flex gap-[16px]">
            <img
              class="w-[6.25rem] h-[6.25rem] bg-gray-200 rounded-xl"
              src="../assets/image/coupon2.png"
            />
            <div>
              <p class="text-sm text-[#5C667B] leading-snug font-semibold">
                빵 뷔페 1인 <br />(평일 11:00~13:00)
              </p>
              <p class="text-xs text-[#96A0B5] mt-0.5">사용 가능 기간: 2025-08-20</p>
              <button
                class="mt-2 ml-10 w-32 h-8 px-3 py-1 bg-[#03C473] text-[#FBFBFB] text-sm rounded-xl font-semibold cursor-pointer"
                @click="isQrOpen = true"
              >
                쿠폰 사용하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 쿠폰 하나 -->
      <div
        class="flex items-center bg-white rounded-2xl shadow-[1px_1px_2px_0px_rgba(0,0,0,0.25)] p-4 w-80 h-40"
      >
        <div class="flex flex-col gap-[12px]">
          <h2 class="font-semibold text-[#333333]">먼데이 브런치&카페</h2>
          <div class="flex gap-[16px]">
            <img
              class="w-[6.25rem] h-[6.25rem] bg-gray-200 rounded-xl"
              src="../assets/image/coupon3.png"
            />
            <div>
              <p class="text-sm text-[#5C667B] leading-snug font-semibold">
                아메리카노 1잔, 디저트 <br />(휘낭시에, 타르트 중 택1)
              </p>
              <p class="text-xs text-[#96A0B5] mt-0.5">사용 가능 기간: 2025-08-20</p>
              <button
                class="mt-2 ml-10 w-32 h-8 px-3 py-1 bg-[#03C473] text-[#FBFBFB] text-sm rounded-xl font-semibold"
                @click="isQrOpen = true"
              >
                쿠폰 사용하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- QR 모달 -->
    <div
      v-if="isQrOpen"
      class="w-96 h-full fixed flex justify-center items-center bg-[#2C2C2CA8] z-50 inset-0"
    >
      <div class="relative w-80 h-96 bg-white rounded-[10px]">
        <!-- 닫기 버튼 -->
        <button @click="isQrOpen = false" class="absolute right-6 top-6 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M16 1L1 16M1 1L16 16"
              stroke="#1E1E1E"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div class="mt-12 flex flex-col items-center">
          <p class="text-[#1E1E1E] text-center">
            이용하실 가맹점에서 <br />
            큐알코드를 보여주세요
          </p>
          <img src="../assets/image/qr.png" class="w-64 h-64 text-center" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import { ref } from 'vue'

const isQrOpen = ref(false)
</script>
