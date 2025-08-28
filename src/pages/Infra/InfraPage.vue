<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BasicHeader from '../../components/BasicHeader.vue';

const router = useRouter()

const tags = ['편의', '의료', '교육', '문화', '관광']
const activeTag = ref('의료')

const places = [
  { id: 1, name: '강원특별자치도 원주의료원', addr: '강원특별자치도 원주시 서원대로 387 (개운동)' },
  { id: 2, name: '원주세브란스기독병원', addr: '강원특별자치도 원주시 일산로 20 (일산동)' },
  { id: 3, name: '원주프라임병원', addr: '강원특별자치도 원주시 남원로 556 (개운동)' },
  { id: 4, name: '본베스트병원', addr: '강원특별자치도 원주시 능라도길 51 (무실동)' },
]

const pages = [1, 2, 3, 4, 5]
const currentPage = ref(1)

function prev() {
  if (currentPage.value > 1) currentPage.value--
}
function next() {
  if (currentPage.value < pages[pages.length - 1]) currentPage.value++
}
function goDetail() {
  router.push('/infraDetail')
}
</script>

<template>
  <div class="infra-page">
    <BasicHeader type="icon" title="슬기로운 은퇴생활" />

    <div class="map-container">
      <img src="/src/assets/image/infra-map.png" alt="인프라 지도" class="map">
      <!-- <img src="/src/assets/image/infra-pin.svg" alt="인프라 핀" class="pin"> -->
       <div class="pin">
          <svg xmlns="http://www.w3.org/2000/svg" width="106" height="101" viewBox="0 0 106 101" fill="none">
            <path d="M82.6967 16.175C82.6967 20.0846 77.6702 23.4357 77.6702 23.4357C77.6702 23.4357 72.6436 20.0846 72.6436 16.175C72.6436 14.8419 73.1731 13.5634 74.1158 12.6207C75.0585 11.678 76.337 11.1484 77.6702 11.1484C79.0033 11.1484 80.2818 11.678 81.2245 12.6207C82.1672 13.5634 82.6967 14.8419 82.6967 16.175Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M77.6702 17.8506C78.5955 17.8506 79.3457 17.1004 79.3457 16.175C79.3457 15.2497 78.5955 14.4995 77.6702 14.4995C76.7448 14.4995 75.9946 15.2497 75.9946 16.175C75.9946 17.1004 76.7448 17.8506 77.6702 17.8506Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M104.814 73.4787C104.814 77.3883 99.7873 80.7394 99.7873 80.7394C99.7873 80.7394 94.7607 77.3883 94.7607 73.4787C94.7607 72.1456 95.2903 70.8671 96.233 69.9244C97.1757 68.9817 98.4542 68.4521 99.7873 68.4521C101.12 68.4521 102.399 68.9817 103.342 69.9244C104.284 70.8671 104.814 72.1456 104.814 73.4787Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M99.7873 75.1543C100.713 75.1543 101.463 74.4041 101.463 73.4787C101.463 72.5534 100.713 71.8032 99.7873 71.8032C98.862 71.8032 98.1118 72.5534 98.1118 73.4787C98.1118 74.4041 98.862 75.1543 99.7873 75.1543Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M71.6382 80.5159C71.6382 84.4254 66.6116 87.7765 66.6116 87.7765C66.6116 87.7765 61.585 84.4254 61.585 80.5159C61.585 79.1827 62.1145 77.9042 63.0572 76.9615C63.9999 76.0188 65.2784 75.4893 66.6116 75.4893C67.9447 75.4893 69.2232 76.0188 70.1659 76.9615C71.1086 77.9042 71.6382 79.1827 71.6382 80.5159Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M66.6116 82.1914C67.5369 82.1914 68.2871 81.4412 68.2871 80.5159C68.2871 79.5905 67.5369 78.8403 66.6116 78.8403C65.6862 78.8403 64.936 79.5905 64.936 80.5159C64.936 81.4412 65.6862 82.1914 66.6116 82.1914Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M48.5161 49.3508C48.5161 53.2604 43.4895 56.6115 43.4895 56.6115C43.4895 56.6115 38.4629 53.2604 38.4629 49.3508C38.4629 48.0177 38.9925 46.7391 39.9351 45.7965C40.8778 44.8538 42.1564 44.3242 43.4895 44.3242C44.8226 44.3242 46.1012 44.8538 47.0438 45.7965C47.9865 46.7391 48.5161 48.0177 48.5161 49.3508Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M43.4895 51.0263C44.4149 51.0263 45.165 50.2762 45.165 49.3508C45.165 48.4254 44.4149 47.6753 43.4895 47.6753C42.5641 47.6753 41.814 48.4254 41.814 49.3508C41.814 50.2762 42.5641 51.0263 43.4895 51.0263Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M43.4892 55.4944C43.4892 59.4039 38.4626 62.755 38.4626 62.755C38.4626 62.755 33.436 59.4039 33.436 55.4944C33.436 54.1612 33.9656 52.8827 34.9083 51.94C35.851 50.9974 37.1295 50.4678 38.4626 50.4678C39.7958 50.4678 41.0743 50.9974 42.017 51.94C42.9596 52.8827 43.4892 54.1612 43.4892 55.4944Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M38.4626 57.1699C39.388 57.1699 40.1382 56.4197 40.1382 55.4944C40.1382 54.569 39.388 53.8188 38.4626 53.8188C37.5373 53.8188 36.7871 54.569 36.7871 55.4944C36.7871 56.4197 37.5373 57.1699 38.4626 57.1699Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M36.4521 35.3879C36.4521 39.2975 31.4255 42.6486 31.4255 42.6486C31.4255 42.6486 26.3989 39.2975 26.3989 35.3879C26.3989 34.0548 26.9285 32.7763 27.8712 31.8336C28.8139 30.8909 30.0924 30.3613 31.4255 30.3613C32.7587 30.3613 34.0372 30.8909 34.9799 31.8336C35.9225 32.7763 36.4521 34.0548 36.4521 35.3879Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M31.4255 37.0635C32.3509 37.0635 33.1011 36.3133 33.1011 35.3879C33.1011 34.4626 32.3509 33.7124 31.4255 33.7124C30.5002 33.7124 29.75 34.4626 29.75 35.3879C29.75 36.3133 30.5002 37.0635 31.4255 37.0635Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.3193 79.6223C11.3193 83.5319 6.29271 86.8829 6.29271 86.8829C6.29271 86.8829 1.26611 83.5319 1.26611 79.6223C1.26611 78.2892 1.7957 77.0106 2.73837 76.068C3.68104 75.1253 4.95957 74.5957 6.29271 74.5957C7.62584 74.5957 8.90438 75.1253 9.84705 76.068C10.7897 77.0106 11.3193 78.2892 11.3193 79.6223Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.29271 81.2978C7.21808 81.2978 7.96824 80.5477 7.96824 79.6223C7.96824 78.6969 7.21808 77.9468 6.29271 77.9468C5.36734 77.9468 4.61718 78.6969 4.61718 79.6223C4.61718 80.5477 5.36734 81.2978 6.29271 81.2978Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M56.5586 61.5266C56.5586 65.4362 51.532 68.7872 51.532 68.7872C51.532 68.7872 46.5054 65.4362 46.5054 61.5266C46.5054 60.1935 47.035 58.9149 47.9776 57.9723C48.9203 57.0296 50.1988 56.5 51.532 56.5C52.8651 56.5 54.1436 57.0296 55.0863 57.9723C56.029 58.9149 56.5586 60.1935 56.5586 61.5266Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M51.532 63.2021C52.4573 63.2021 53.2075 62.452 53.2075 61.5266C53.2075 60.6012 52.4573 59.8511 51.532 59.8511C50.6066 59.8511 49.8564 60.6012 49.8564 61.5266C49.8564 62.452 50.6066 63.2021 51.532 63.2021Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M63.5957 16.2873C63.5957 20.1969 58.5691 23.548 58.5691 23.548C58.5691 23.548 53.5425 20.1969 53.5425 16.2873C53.5425 14.9542 54.0721 13.6757 55.0147 12.733C55.9574 11.7903 57.2359 11.2607 58.5691 11.2607C59.9022 11.2607 61.1807 11.7903 62.1234 12.733C63.0661 13.6757 63.5957 14.9542 63.5957 16.2873Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M58.5691 17.9629C59.4944 17.9629 60.2446 17.2127 60.2446 16.2873C60.2446 15.362 59.4944 14.6118 58.5691 14.6118C57.6437 14.6118 56.8935 15.362 56.8935 16.2873C56.8935 17.2127 57.6437 17.9629 58.5691 17.9629Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M95.7661 88.6702C95.7661 92.5797 90.7395 95.9308 90.7395 95.9308C90.7395 95.9308 85.7129 92.5797 85.7129 88.6702C85.7129 87.337 86.2425 86.0585 87.1851 85.1158C88.1278 84.1731 89.4064 83.6436 90.7395 83.6436C92.0726 83.6436 93.3512 84.1731 94.2938 85.1158C95.2365 86.0585 95.7661 87.337 95.7661 88.6702Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M90.7395 90.3457C91.6649 90.3457 92.415 89.5955 92.415 88.6702C92.415 87.7448 91.6649 86.9946 90.7395 86.9946C89.8141 86.9946 89.064 87.7448 89.064 88.6702C89.064 89.5955 89.8141 90.3457 90.7395 90.3457Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M31.4257 92.6002C31.4257 96.4387 26.3992 99.7289 26.3992 99.7289C26.3992 99.7289 21.3726 96.4387 21.3726 92.6002C21.3726 91.2913 21.9021 90.0361 22.8448 89.1105C23.7875 88.185 25.066 87.665 26.3992 87.665C27.7323 87.665 29.0108 88.185 29.9535 89.1105C30.8962 90.0361 31.4257 91.2913 31.4257 92.6002Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M26.3992 94.2453C27.3245 94.2453 28.0747 93.5088 28.0747 92.6002C28.0747 91.6917 27.3245 90.9552 26.3992 90.9552C25.4738 90.9552 24.7236 91.6917 24.7236 92.6002C24.7236 93.5088 25.4738 94.2453 26.3992 94.2453Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M51.5317 6.1223C51.5317 10.0319 46.5051 13.3829 46.5051 13.3829C46.5051 13.3829 41.4785 10.0319 41.4785 6.1223C41.4785 4.78916 42.0081 3.51063 42.9508 2.56796C43.8934 1.62529 45.172 1.0957 46.5051 1.0957C47.8382 1.0957 49.1168 1.62529 50.0595 2.56796C51.0021 3.51063 51.5317 4.78916 51.5317 6.1223Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M46.5051 7.79783C47.4305 7.79783 48.1806 7.04767 48.1806 6.1223C48.1806 5.19693 47.4305 4.44677 46.5051 4.44677C45.5797 4.44677 44.8296 5.19693 44.8296 6.1223C44.8296 7.04767 45.5797 7.79783 46.5051 7.79783Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.3349 49.4631C14.3349 53.3727 9.30833 56.7238 9.30833 56.7238C9.30833 56.7238 4.28174 53.3727 4.28174 49.4631C4.28174 48.13 4.81132 46.8514 5.75399 45.9088C6.69666 44.9661 7.9752 44.4365 9.30833 44.4365C10.6415 44.4365 11.92 44.9661 12.8627 45.9088C13.8053 46.8514 14.3349 48.13 14.3349 49.4631Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.30833 51.1387C10.2337 51.1387 10.9839 50.3885 10.9839 49.4631C10.9839 48.5377 10.2337 47.7876 9.30833 47.7876C8.38296 47.7876 7.6328 48.5377 7.6328 49.4631C7.6328 50.3885 8.38296 51.1387 9.30833 51.1387Z" stroke="#03C473" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
       </div>
    </div>

    <div class="list-count">총 31개</div>

    <div class="tag-container">
      <button
        v-for="t in tags"
        :key="t"
        :class="['tag', { active: activeTag === t }]"
        @click="activeTag = t"
      >
        {{ t }}
      </button>
    </div>

    <div class="list-container">
      <div v-for="p in places" :key="p.id" class="place-card" @click="goDetail">
        <div class="place-title">{{ p.name }}</div>
        <img class="place-pin" src="/src/assets/image/infra-pin-black.svg" alt="핀 아이콘" />
        <div class="place-addr">{{ p.addr }}</div>
      </div>
    </div>

    <div class="pagination-bar" role="pagination" aria-label="pagination">
      <button class="nav-arrow left" :disabled="currentPage===1" @click="prev" aria-label="이전 페이지">
        <img src="/src/assets/image/arrow_left.png" alt="왼쪽 화살표">
      </button>

      <div class="pages">
        <button
          v-for="n in pages"
          :key="n"
          :class="['page', { active: currentPage === n }]"
          @click="currentPage = n"
          :aria-current="currentPage===n ? 'page' : undefined"
        >
          {{ n }}
        </button>
      </div>

      <button class="nav-arrow right" :disabled="currentPage===pages[pages.length-1]" @click="next" aria-label="다음 페이지">
        <img src="/src/assets/image/arrow_right.png" alt="오른쪽 화살표">
      </button>
    </div>
  </div>
</template>

<style>
* {
  font-family: Pretendard;
}
.infra-page{
  background-color: #FBFBFB;
  position: relative;
}
.map-container {
  margin-left: 5.31rem;
  position: relative;
  display: inline-block;
}
.map{
  width: 12.88063rem;
  height: 11.8125rem;
  display: block;
}
.pin {
  position: absolute;
  top: 46%;
  left: 47%;
  transform: translate(-50%, -50%);
  width: 6.47175rem;
  height: 6.16456rem;
}
.list-count {
  position: absolute;
  right: 2.25rem;

  margin-top: 0.25rem;
  font-family: Inter;
  font-size: 14px;
  color: #7D7D7D;
  font-weight: 400;
}
.tag-container {
  position: relative;
  margin: 2rem auto 1rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.tag {
  display: flex;
  width: 3.60319rem;
  height: 1.75rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 624.9375rem;
  border: 1px solid #E2E2E2;
  background: #FFF;
  color: #6B6B6B;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}

.tag.active {
  background: #03C473;
  border-color: #03C473;
  color: #FFF;
}

.list-container{
  width: 20.9375rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.place-card{
  position: relative;
  width: 20.9375rem;
  height: 5.5625rem;
  background: #FFF;
  border-radius: 0.75rem;
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.25));
  overflow: hidden;
}

.place-title{
  position: absolute;
  top: 1rem;
  left: 1.25rem;
  width: 14.125rem;
  height: 1.5rem;
  color: #333;
  font-family: Inter, sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.place-pin{
  position: absolute;
  top: 3.25rem;
  left: 1.25rem;
  width: 1rem;
  height: 1rem;
  object-fit: contain;
}

.place-addr{
  position: absolute;
  top: 3.25rem;
  left: 2.5rem;
  width: 16.9375rem;
  height: 1.0625rem;
  color: #3D4352;
  font-family: Inter, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.0625rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pagination-bar{
  width: 23.4375rem;
  margin: 20px auto 80px;
  position: relative;
  display: flex;
  grid-template-columns: 24px 1fr 24px;
  justify-content: center;
  align-items: center;
  padding: 0 2.25rem;
}

.pages{
  min-width: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.page{
  width: 2.125rem;
  height: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #1E1E1E;
  font: 600 16px/1 Inter;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.page.active{
  background: #03C473;
  color: #FFF;
}

.nav-arrow{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem; height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
.nav-arrow.left  { justify-self: start; }
.nav-arrow.right { justify-self: end;   }

.nav-arrow:disabled{
  opacity: 0.35;
  cursor: default;
}

</style>
