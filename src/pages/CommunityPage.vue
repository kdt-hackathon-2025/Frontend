<template>
  <div class="min-h-screen bg-[#FBFBFB] overflow-y-auto">
    <div class="flex items-center justify-between">
      <BasicHeader type="icon" title="강원도 게시판" />
      <button @click="openMenu" class="mr-4 cursor-pointer">
        <img :src="menuIcon" alt="menu" class="w-6 h-6" />
      </button>
    </div>
    <section class="px-5 mt-1 pb-16">
      <!-- 가맹점 헤더 라인 -->
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-[20px] font-bold text-[#333] leading-normal">지역 혜택 매장</h2>
        <button
          type="button"
          class="flex items-center text-[14px] font-medium cursor-pointer hover:underline text-[#7D7D7D] leading-normal"
          @click="onSeeAll"
        >
          전체보기
          <img :src="icRight" alt="" class="w-4 h-4 shrink-0 aspect-square" />
        </button>
      </div>

      <!-- 가로 스크롤 영역 -->
      <div class="flex gap-3 overflow-x-auto no-scrollbar">
        <div v-for="item in shops" :key="item.id" class="w-[195px] shrink-0">
          <img
            :src="item.img"
            :alt="item.title"
            class="w-[195px] h-[117px] object-cover rounded-2xl"
          />
          <div class="mt-2 flex items-start justify-between">
            <div class="min-w-0 mx-1">
              <h3
                class="text-[16px] font-semibold text-[#333] leading-normal truncate cursor-pointer"
              >
                {{ item.title }}
              </h3>
              <div class="flex items-center gap-1">
                <img :src="star" alt="" class="w-3 h-3 shrink-0" />
                <p class="text-[14px] font-medium text-[#454545] leading-normal truncate">
                  {{ item.rating }} ·
                  <span class="text-[#7D7D7D]"> {{ item.category }} · {{ item.addr }} </span>
                </p>
              </div>
            </div>
            <img
              :src="item.bookmarkIcon"
              alt="bookmark"
              class="w-[21px] h-[21px] aspect-square shrink-0"
            />
          </div>
        </div>
      </div>

      <!-- 구분 바 -->
      <div class="h-2 bg-[#F2F4F6] -mx-5 my-4 shrink-0"></div>

      <div class="mt-6">
        <!-- 최신순 헤더 (구분선 제거) -->
        <div class="flex items-center gap-1 mb-2 select-none">
          <h2 class="text-[16px] font-bold text-[#333] leading-normal">최신순</h2>
          <img :src="iconDown" alt="" class="w-[11px] h-[7.103px] aspect-[11/7.103] shrink-0" />
        </div>

        <!-- 게시글 리스트 -->
        <ul>
          <li v-for="(p, i) in posts" :key="p.id" class="py-4">
            <!-- 작성자 영역 -->
            <div class="flex items-start gap-3">
              <img
                :src="p.avatar"
                alt=""
                class="w-9 h-9 rounded-full object-cover ring-1 ring-black/10 shrink-0"
              />
              <div class="min-w-0">
                <p
                  class="text-[14px] font-semibold text-[#333] leading-normal truncate cursor-pointer"
                >
                  {{ p.name }}
                </p>
                <p class="text-[13px] text-[#7D7D7D] leading-normal truncate">
                  {{ p.region }} · {{ p.ago }}
                </p>
              </div>
            </div>

            <!-- 제목 / 본문 -->
            <h3
              class="mt-3 text-[16px] font-semibold leading-tight text-[#333] line-clamp-2 hover:underline cursor-pointer"
            >
              {{ p.title }}
            </h3>
            <p
              class="mt-1 text-[14px] text-[#454545] leading-normal line-clamp-2 hover:underline cursor-pointer"
            >
              {{ p.preview }}
            </p>

            <!-- 댓글/좋아요 영역 (오른쪽 정렬 그대로) -->
            <div
              class="mt-2 flex items-center gap-3 justify-end text-[14px] text-[#7D7D7D] cursor-pointer"
            >
              <!-- 좋아요: likeCount > 0 일 때만 렌더 -->
              <div v-if="(p.likeCount ?? 0) > 0" class="flex items-center gap-1">
                <img :src="iconHeart" alt="" class="w-3 h-3 shrink-0" />
                <span class="tabular-nums">
                  {{ p.likeCount > 99 ? '99+' : p.likeCount }}
                </span>
              </div>

              <!-- 댓글 -->
              <div class="flex items-center gap-1 cursor-pointer">
                <img :src="iconComment" alt="" class="w-3 h-3 shrink-0" />
                <span class="w-[28px] text-left tabular-nums">
                  {{
                    (p.commentCount ?? 0) > 0
                      ? p.commentCount > 99
                        ? '99+'
                        : p.commentCount
                      : '댓글'
                  }}
                </span>
              </div>
            </div>

            <!-- 구분선: 게시글 사이에만 표시 -->
            <div v-if="i < posts.length - 1" class="mt-4 h-[1.5px] bg-[#F2F4F6] -mx-5"></div>
          </li>
        </ul>
      </div>
      <Teleport to="body">
        <div
          class="fixed inset-x-0 z-[200] bottom-[calc(env(safe-area-inset-bottom)+77px)] pointer-events-none"
        >
          <div class="mx-auto w-[375px] px-4">
            <div class="flex justify-end">
              <button
                @click="goWrite"
                aria-label="글쓰기"
                class="w-[100px] h-[44px] rounded-[50px] bg-[#00C473] shadow-[0_0_8px_rgba(0,0,0,0.25)] flex items-center justify-center gap-1 text-white text-[16px] font-semibold pointer-events-auto active:scale-[.98] transition"
              >
                <img :src="plus" alt="" class="-ml-1 w-5 h-5" />
                <span>글쓰기</span>
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import BasicHeader from '@/components/BasicHeader.vue'
import cafe1 from '@/assets/image/community_image2.png'
import cafe2 from '@/assets/image/community_image1.png'

import icRight from '@/assets/image/right-line.svg'
import star from '@/assets/image/star14.svg'
import bookmarkIcon from '@/assets/image/bookmark-rounded.svg'
import iconDown from '@/assets/image/icon.svg'
import iconComment from '@/assets/image/comment.svg'
import user1 from '@/assets/image/user1.png'
import menuIcon from '@/assets/image/menu.svg'
import iconHeart from '@/assets/image/heart2.svg'
import plus from '@/assets/image/plus.svg'
import user2 from '@/assets/image/user2.jpg'
import user3 from '@/assets/image/user3.webp'
import user4 from '@/assets/image/user4.jfif'
import user6 from '@/assets/image/user6.png'

const shops = [
  {
    id: 1,
    img: cafe1,
    title: '먼데이 브런치&카페',
    rating: 4.6,
    category: '카페',
    addr: '원주시 봉산로',
    bookmarkIcon,
  },
  {
    id: 2,
    img: cafe2,
    title: '프렌치 크루아상',
    rating: 4.6,
    category: '카페',
    addr: '원주시 남원로',
    bookmarkIcon,
  },
  // 필요 시 더 추가
]

function onSeeAll() {
  // TODO: 라우팅하거나 이벤트 처리
  router.push({ name: 'StoreList' })
  console.log('전체보기 클릭')
}

// 커뮤니티 글 데이터
const posts = [
  {
    id: 1,
    avatar: user1,
    name: '행복한할머니',
    region: '강원도',
    ago: '방금 전',
    title: '실버 일자리 구하신 분 계신가요?',
    preview: '요즘 도서관 도우미 일을 하고 있습니다. 이직을 생각 중인데 괜찮은 일자리 있을까요?',
    likeCount: 0,
  },
  {
    id: 2,
    avatar: user2,
    name: '여행좋아아저씨',
    region: '강원도',
    ago: '3분 전',
    title: '이 지역 살기 괜찮나요?',
    preview:
      '은퇴 후 이사 고민 중인데 생활 환경이 어떤지 궁금합니다. 편의시설이나 교통은 어떤가요?',
    commentCount: 3,
    likeCount: 2,
  },
  {
    id: 3,
    avatar: user3,
    name: '강은퇴',
    region: '강원도',
    ago: '10분 전',
    title: '배트민턴 동호회 모집',
    preview:
      '매주 수요일 저녁에 체육관에서 배드민턴 모임을 하고 있습니다. 초보자도 환영이고, 같이 운동하면서 친목을 다지실 분들을 구합니다.',
    commentCount: 1,
    likeCount: 5,
  },
  {
    id: 4,
    avatar: user6,
    name: '등산이 최고',
    region: '강원도',
    ago: '24분 전',
    title: '배트민턴 동호회 모집',
    preview:
      '매주 수요일 저녁에 체육관에서 배드민턴 모임을 하고 있습니다. 초보자도 환영이고, 같이 운동하면서 친목을 다지실 분들을 구합니다.',
    commentCount: 1,
    likeCount: 5,
  },
  {
    id: 5,
    avatar: user4,
    name: '항상 웃자',
    region: '강원도',
    ago: '30분 전',
    title: '배트민턴 동호회 모집',
    preview:
      '매주 수요일 저녁에 체육관에서 배드민턴 모임을 하고 있습니다. 초보자도 환영이고, 같이 운동하면서 친목을 다지실 분들을 구합니다.',
    commentCount: 1,
    likeCount: 5,
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
