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
  </div>
</template>

<script setup>
</script>

<style>
.infra-page{
  /* background-color: orange; */
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
  position: fixed;
  margin-top: 0.25rem;
  right: 2rem;
  font-family: Inter;
  font-size: 14px;
  color: #7D7D7D;
  font-style: normal;
  font-weight: 400;
}
</style>
