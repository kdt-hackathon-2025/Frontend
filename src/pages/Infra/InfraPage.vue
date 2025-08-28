<script setup>
import { ref } from 'vue'

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
</script>

<template>
  <div class="infra-page">
    <div class="header">
      <img src="/src/assets/image/logo.png" alt="로고이미지">
      <span class="title">슬기로운 은퇴생활</span>
    </div>

    <div class="map-container">
      <img src="/src/assets/image/infra-map.png" alt="인프라 지도" class="map">
      <img src="/src/assets/image/infra-pin.svg" alt="인프라 핀" class="pin">
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
      <div v-for="p in places" :key="p.id" class="place-card">
        <div class="place-title">{{ p.name }}</div>
        <img class="place-pin" src="/src/assets/image/infra-pin-black.svg" alt="핀 아이콘" />
        <div class="place-addr">{{ p.addr }}</div>
      </div>
    </div>

    <div class="pagination-bar" role="pagination" aria-label="pagination">
      <button class="nav-arrow left" :disabled="currentPage===1" @click="prev" aria-label="이전 페이지">
        <img src="/src/assets/image/Arrow left.png" alt="왼쪽 화살표">
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
        <img src="/src/assets/image/Arrow right.png" alt="오른쪽 화살표">
      </button>
    </div>
  </div>
</template>

<style>
.infra-page{
  background-color: #FBFBFB;
  position: relative;
}
.header{
  width: 100%;
  height: 4.75rem;
  background-color: #FBFBFB;
  padding-top: 1.25rem;
  padding-left: 1.25rem;
  display: flex;
}
.header img {
  width: 2.1875rem;
  height: 2.25rem;
  flex: 0 0 auto;
}
.title {
  color: #1E1E1E;
  font-family: "SB 어그로OTF L";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  margin-top: 8px;
  margin-left: 14px;
  flex: 1;
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
  right: 2rem;

  margin-top: 0.25rem;
  font-family: Inter;
  font-size: 14px;
  color: #7D7D7D;
  font-weight: 400;
}
.tag-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(19rem);

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
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
  margin-top: 5rem;
  margin-left: 24px;
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
  left: 1rem;
  width: 1rem;
  height: 1rem;
  object-fit: contain;
}

.place-addr{
  position: absolute;
  top: 3.25rem;
  left: 2.25rem;
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
  margin: 20px auto 320px;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  align-items: center;
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
