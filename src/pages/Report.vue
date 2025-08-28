<template>
  <div class="bg-[#FBFBFB] min-h-screen">
    <BasicHeader type="back" title="추천 리포트" />
    
    <!-- 메인 컨텐츠 -->
    <div class="flex justify-center mb-16">
      <div class="w-[324px] h-[727px] rounded-[15px] bg-white shadow-[1px_1px_2px_rgba(0,0,0,0.25)] p-4 relative">
        <span class="absolute top-[22px] left-[55px] text-[#03C473] font-bold text-base">TOP {{ rank }}</span>
        <span class="absolute top-5 left-[116px] text-lg font-semibold">강원도 원주시</span>
        <img src="../assets/image/wonju_scenery.png" alt="원주 풍경" class="absolute top-16 left-0 w-[324px] h-[166px] object-cover">
        
        <!-- 콘텐츠 섹션들 -->
        <div class="absolute top-[258px] left-7 right-7">
          <div class="flex flex-col space-y-6">
          <!-- 한줄요약 -->
          <div>
            <h3 class="text-[15px] font-bold text-[#333] mb-2" style="line-height: 18px;">한 줄 요약</h3>
            <p class="text-[14px] font-medium text-[#333]" style="line-height: 18px;">
              중소도시 규모에 산과 계곡이 어우러진 환경, 수도권 접근성과 의료 인프라가 뛰어난 균형잡힌 도시
            </p>
          </div>

          <!-- 왜 원주시인가? -->
          <div>
            <h3 class="text-[15px] font-bold text-[#333] mb-3" style="line-height: 18px;">왜 원주시인가?</h3>
            <div class="text-[14px] font-medium text-[#333]" style="line-height: 18px;">
              <div class="flex items-start mb-4">
                <font-awesome-icon :icon="['fas', 'check']" class="text-[#333] mr-2 flex-shrink-0" style="font-size: 20px;" />
                <p>치악산 국립공원, 섬강 등 산·계곡 자연환경이 풍부해 여가 생활에 적합해요.</p>
              </div>
              <div class="flex items-start mb-4">
                <font-awesome-icon :icon="['fas', 'check']" class="text-[#333] mr-2 flex-shrink-0" style="font-size: 20px;" />
                <p>원주세브란스기독병원, 원주의료원 등 대형 의료시설이 위치해 있어요.</p>
              </div>
              <div class="flex items-start">
                <font-awesome-icon :icon="['fas', 'check']" class="text-[#333] mr-2 flex-shrink-0" style="font-size: 20px;" />
                <p>KTX, 중앙고속도로로 수도권 접근성이 뛰어나 주말에 가족 방문이 편리해요.</p>
              </div>
            </div>
          </div>

          <!-- 인프라 현황 -->
          <div>
            <h3 class="text-[15px] font-bold text-[#333] mb-3" style="line-height: 18px;">인프라 현황</h3>
            <div class="flex flex-col items-center space-y-3">
              <!-- 교통 인프라 -->
              <div class="w-[277px] h-[66px] rounded-[10px] border border-[#E2E2E2] bg-white relative">
                <!-- 이미지 영역 (왼쪽 73px 공간의 중앙) -->
                <div class="absolute left-0 top-0 w-[73px] h-[66px] flex items-center justify-center">
                  <img src="../assets/image/train.png" alt="교통" class="w-[39px] h-[39px]">
                </div>
                <!-- 세로 구분선 -->
                <div class="absolute left-[73px] top-0 w-px h-[66px] bg-[#E2E2E2]"></div>
                <!-- 텍스트 영역 -->
                <div class="absolute left-[85px] top-0 h-full flex items-center">
                  <div class="flex items-center">
                    <span class="text-[14px] font-medium text-[#333]" style="line-height: 18px;">KTX원주역 ↔ 청량리 50분대</span>
                  </div>
                </div>
              </div>

              <!-- 생활 인프라 -->
              <div class="w-[277px] h-[66px] rounded-[10px] border border-[#E2E2E2] bg-white relative">
                <!-- 이미지 영역 (왼쪽 73px 공간의 중앙) -->
                <div class="absolute left-0 top-0 w-[73px] h-[66px] flex items-center justify-center">
                  <img src="../assets/image/mart.png" alt="생활편의" class="w-[39px] h-[39px]">
                </div>
                <!-- 세로 구분선 -->
                <div class="absolute left-[73px] top-0 w-px h-[66px] bg-[#E2E2E2]"></div>
                <!-- 텍스트 영역 -->
                <div class="absolute left-[85px] top-0 h-full flex items-center">
                  <div class="text-[14px] font-medium text-[#333]" style="line-height: 18px;">
                    <div>대형 마트, 문화의 거리,</div>
                    <div>종합시장 등 생활 편의시설 풍부</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import BasicHeader from '../components/BasicHeader.vue';

export default {
  components: {
    BasicHeader
  },
  data() {
    return {
      rank: 1
    }
  },
  created() {
    // URL 쿼리에서 랭크 정보 가져오기
    if (this.$route.query.rank) {
      this.rank = parseInt(this.$route.query.rank);
    }
  }
}
</script>

<style scoped>
* {
  font-family: Pretendard;
}
</style>