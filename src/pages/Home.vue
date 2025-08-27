<template>
  <div class="full-container">
    <BasicHeader />
    
    <!-- 메인 컨텐츠 -->
    <div class="main-content">
      <!-- 추천/인기 탭과 지역 정보 카드 -->
      <div class="relative">
        <!-- 추천/인기 탭 -->
        <div class="tab-buttons">
          <button :class="['recommend-btn', { active: activeTab === 'recommend' }]" @click="setActiveTab('recommend')">추천</button>
          <button :class="['popular-btn', { active: activeTab === 'popular' }]" @click="setActiveTab('popular')">인기</button>
        </div>

        <!-- 지역 정보 카드 -->
      <div class="region-card p-4 mb-6">
        <transition :name="enableAnimation ? 'slide' : ''" mode="out-in">
          <div class="region-card-content" :key="contentKey">
            <!-- TOP 배지 -->
            <div class="top1-badge">
              <span class="top1-text">TOP {{ currentRegion.rank }}</span>
            </div>
            <img :src="currentRegion.image" :alt="currentRegion.regionName" class="region-image">
            <h2 class="region-title">{{ currentRegion.regionName }}</h2>
            
            <div v-if="activeTab === 'recommend'" class="flex items-center justify-end space-x-1 text-green-600 text-sm cursor-pointer" style="position: absolute; top: 65px; right: 16px;" @click="goToReport">
              <span>추천 리포트</span>
              <span>→</span>
            </div>

            <!-- 채용 정보 리스트 -->
            <div class="job-list">
              <div class="job-item" v-for="job in currentRegion.jobs" :key="job.title">
                <p class="company-name">{{ job.company }}</p>
                <p class="job-title">{{ job.title }}</p>
                <span class="job-deadline">{{ job.deadline }}</span>
              </div>
            </div>
          </div>
        </transition>

        <!-- 페이지 인디케이터 -->
        <div class="page-indicator">
          <div 
            v-for="(region, index) in regionData" 
            :key="region.id"
            :class="['w-2 h-2 rounded-full cursor-pointer', currentSlide === index ? 'bg-gray-800' : 'bg-gray-300']"
            @click="goToSlide(index)"
          ></div>
        </div>
      </div>

      <!-- 지역 행사 소식 -->
      <div class="event-news-box">
        <h3 class="event-title">지역 행사 소식</h3>
        <div class="festival-grid">
          <div class="festival-item" @click="goToFestival('nonsan')">
            <img src="../assets/image/fes1.png" alt="" class="festival-image">
            <p class="festival-title">논산 딸기 축제</p>
          </div>
          <div class="festival-item" @click="goToFestival('ulsan')">
            <img src="../assets/image/fes2.png" alt="" class="festival-image">
            <p class="festival-title">울산 고래 축제</p>
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
      activeTab: 'recommend',
      currentSlide: 0,
      enableAnimation: true,
      regionData: [
        {
          id: 0,
          image: '/src/assets/image/wonju.png',
          regionName: '강원도 원주시',
          rank: 1,
          jobs: [
            {
              company: '청소년 발달장애인 방과후활동센터 꿈드림',
              title: '발달 장애인 방과후 활동교사',
              deadline: 'D-25'
            },
            {
              company: '청춘마당 노인주간보호센터',
              title: '청춘마당 주간보호센터 사회복지사',
              deadline: 'D-4'
            },
            {
              company: '휴방문요양재가센터',
              title: '재가센터 사회복지사',
              deadline: 'D-12'
            }
          ]
        },
        {
          id: 1,
          image: '/src/assets/image/andong.png',
          regionName: '경상북도 안동시',
          rank: 2,
          jobs: [
            {
              company: '평화재가복지센터',
              title: '방문목욕 요양보호사(여)',
              deadline: 'D-5'
            },
            {
              company: '경상북도안동교육지원청',
              title: '다문화가정 학생 한국어 강사',
              deadline: 'D-16'
            },
            {
              company: '안동시종합사회복지관',
              title: '안동시 종합 사회복지관 직원',
              deadline: 'D-26'
            }
          ]
        },
        {
          id: 2,
          image: '/src/assets/image/jeongeup.png',
          regionName: '전라북도 정읍시',
          rank: 3,
          jobs: [
            {
              company: '정읍시청',
              title: '사회복지 전담공무원',
              deadline: 'D-8'
            },
            {
              company: '정읍종합사회복지관',
              title: '노인복지 프로그램 강사',
              deadline: 'D-15'
            },
            {
              company: '정읍시립요양원',
              title: '요양보호사',
              deadline: 'D-20'
            }
          ]
        }
      ]
    }
  },
  computed: {
    currentRegion() {
      if (this.activeTab === 'popular') {
        // 인기 탭일 때는 정읍시가 1위
        const popularOrder = [2, 0, 1]; // 정읍시, 원주시, 안동시 순서
        const reorderedData = popularOrder.map(index => ({
          ...this.regionData[index],
          rank: popularOrder.indexOf(index) + 1
        }));
        return reorderedData[this.currentSlide];
      } else {
        // 추천 탭일 때는 기본 순서
        return this.regionData[this.currentSlide];
      }
    },
    contentKey() {
      return `${this.activeTab}-${this.currentSlide}`;
    }
  },
  methods: {
    setActiveTab(tab) {
      this.enableAnimation = false; // 애니메이션 비활성화
      this.activeTab = tab;
      this.currentSlide = 0; // 탭 변경 시 항상 첫 번째 슬라이드로
      setTimeout(() => {
        this.enableAnimation = true; // 100ms 후 애니메이션 재활성화
      }, 100);
    },
    goToSlide(index) {
      if (index !== this.currentSlide) {
        this.currentSlide = index;
      }
    },
    goToFestival(festival) {
      if (festival === 'nonsan') {
        window.open('http://nonsancntf.or.kr/cntf/html/sub03/030101.html?mode=V&mng_no=2361&search_type=__intro__&sval=', '_blank');
      } else if (festival === 'ulsan') {
        window.open('https://www.ulsanwhale.com/', '_blank');
      }
    },
    goToReport() {
      this.$router.push({
        path: '/report',
        query: {
          rank: this.currentRegion.rank
        }
      });
    }
  }
}
</script>

<style scoped>
* {
  font-family: Pretendard;
}

.full-container {
  background-color: #FBFBFB;
  min-height: 100vh;
}

.region-card {
  width: 335px;
  height: 400px;
  flex-shrink: 0;
  border-radius: 0 15px 15px 15px;
  border: 0 solid #E2E2E2;
  background: #FFF;
  position: relative;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  margin-top: 30px;
  overflow: hidden;
}

.region-card-content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
}

.tab-buttons {
  position: absolute;
  top: 0px;
  left: 0;
  display: flex;
  z-index: 10;
}

.recommend-btn, .popular-btn {
  height: 30px;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.10);
  cursor: pointer;
  background: #FBFBFB;
  font-weight: 600;
  font-size: 14px;
}

.recommend-btn {
  width: 52px;
  border-radius: 10px 0 0 0;
}

.popular-btn {
  width: 54px;
  border-radius: 0 10px 0 0;
}

.recommend-btn.active, .popular-btn.active {
  background: #03C473;
  color: white;
}

.top1-badge {
  position: absolute;
  top: 18px;
  left: 16px;
  width: 55px;
  height: 23px;
  border-radius: 10px;
  border: 1px solid #4AA982;
  background: #E5FEF4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top1-text {
  color: #4AA982;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}


.region-image {
  position: absolute;
  top: 57px;
  left: 16px;
  width: 34px;
  height: 26px;
}

.region-title {
  position: absolute;
  top: 59px;
  left: 58px;
  color: #333;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.job-list {
  position: absolute;
  top: 107px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.job-item {
  width: 303px;
  height: 74px;
  border-radius: 10px;
  background: #FFF;
  position: relative;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
}

.company-name {
  position: absolute;
  top: 16px;
  left: 20px;
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.job-title {
  position: absolute;
  top: 38px;
  left: 20px;
  color: #333;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.job-deadline {
  position: absolute;
  top: 39px;
  right: 16px;
  color: #475067;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.event-news-box {
  width: 335px;
  height: 209px;
  border-radius: 15px;
  background: #FFF;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  position: relative;
}

.event-title {
  position: absolute;
  top: 16px;
  left: 20px;
  color: #333;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.page-indicator {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.festival-grid {
  position: absolute;
  top: 56px;
  left: 20px;
  display: flex;
  gap: 12px;
}

.festival-item {
  width: 142px;
  height: 128px;
  border-radius: 10px;
  border: 1px solid #E2E2E2;
  background: #FFF;
  position: relative;
  cursor: pointer;
}

.festival-image {
  width: 142px;
  height: 89px;
  border-radius: 10px 10px 0 0;
  position: absolute;
  top: 0;
  left: 0;
}

.festival-title {
  position: absolute;
  bottom: 12px;
  left: 12px;
  color: #333;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
  gap: 30px;
}


</style>