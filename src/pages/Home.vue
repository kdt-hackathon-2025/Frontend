<template>
  <div class="bg-[#FBFBFB] min-h-screen">
    <BasicHeader type="icon" title="슬기로운 은퇴생활" />
    
    <!-- 메인 컨텐츠 -->
    <div class="flex flex-col items-center pb-20">
      <!-- 추천/인기 탭과 지역 정보 카드 -->
      <div class="relative">
        <!-- 추천/인기 탭 -->
        <div class="absolute top-0 left-0 flex z-10">
          <button 
            :class="[
              'h-[30px] flex-shrink-0 border border-black/10 cursor-pointer font-semibold text-sm w-[52px] rounded-tl-[10px] rounded-tr-0 rounded-br-0 rounded-bl-0',
              activeTab === 'recommend' ? 'bg-[#03C473] text-white' : 'bg-[#FBFBFB] text-black'
            ]" 
            @click="setActiveTab('recommend')"
          >
            추천
          </button>
          <button 
            :class="[
              'h-[30px] flex-shrink-0 border border-black/10 cursor-pointer font-semibold text-sm w-[54px] rounded-tl-0 rounded-tr-[10px] rounded-br-0 rounded-bl-0',
              activeTab === 'popular' ? 'bg-[#03C473] text-white' : 'bg-[#FBFBFB] text-black'
            ]" 
            @click="setActiveTab('popular')"
          >
            인기
          </button>
          <button class="ml-[105px] h-[30px] px-4 bg-[#03C473] text-white text-sm rounded-full cursor-pointer border-0 whitespace-nowrap" style="position: relative; top: -8px;" @click="goToIntro">
            테스트 다시하기
          </button>
        </div>

        <!-- 지역 정보 카드 -->
        <div 
          class="w-[335px] h-[400px] flex-shrink-0 rounded-[0_15px_15px_15px] border-0 border-[#E2E2E2] bg-white relative shadow-[1px_1px_2px_rgba(0,0,0,0.25)] mt-[30px] overflow-hidden p-4"
          @mousedown="startDrag"
          @mousemove="handleDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          @touchstart="startDrag"
          @touchmove="handleDrag"
          @touchend="endDrag"
        >
          <!-- 드래그 가능한 영역 -->
          <div class="absolute inset-0 cursor-grab active:cursor-grabbing" style="pointer-events: none;"></div>
          <transition :name="enableAnimation ? (slideDirection === 'next' ? 'slide-next' : 'slide-prev') : ''" mode="out-in">
            <div class="absolute w-full h-full top-0 left-0" :key="contentKey">
              <!-- TOP 배지 -->
              <div class="absolute top-[18px] left-[16px] w-[55px] h-[23px] rounded-[10px] border border-[#4AA982] bg-[#E5FEF4] flex items-center justify-center">
                <span class="text-[#4AA982] text-xs font-bold">TOP {{ currentRegion.rank }}</span>
              </div>
              <img :src="currentRegion.image" :alt="currentRegion.regionName" class="absolute top-[57px] left-[16px] w-[34px] h-[26px]">
              <h2 class="absolute top-[59px] left-[58px] text-[#333] text-xl font-bold">{{ currentRegion.regionName }}</h2>
              
              <div v-if="activeTab === 'recommend'" class="flex items-center justify-end space-x-1 text-green-600 text-sm cursor-pointer absolute top-[65px] right-[16px]" @click="goToReport">
                <span>추천 리포트</span>
                <span>→</span>
              </div>

              <!-- 채용 정보 리스트 -->
              <div class="absolute top-[107px] left-1/2 transform -translate-x-1/2 flex flex-col gap-3">
                <div class="w-[303px] h-[74px] rounded-[10px] bg-white relative shadow-[1px_1px_2px_rgba(0,0,0,0.25)] cursor-pointer" v-for="job in currentRegion.jobs" :key="job.title" @click="goToJobDetail">
                  <p class="absolute top-[16px] left-[20px] text-black text-xs font-medium">{{ job.company }}</p>
                  <p class="absolute top-[38px] left-[20px] text-[#333] text-base font-semibold">{{ job.title }}</p>
                  <span class="absolute top-[39px] right-[16px] text-[#475067] text-sm font-normal">{{ job.deadline }}</span>
                </div>
              </div>
            </div>
          </transition>

          <!-- 페이지 인디케이터 -->
          <div 
            class="absolute bottom-[16px] left-1/2 transform -translate-x-1/2 flex gap-2 z-10"
            @mousedown.stop
            @touchstart.stop
            style="pointer-events: auto;"
          >
            <div 
              v-for="(region, index) in regionData" 
              :key="region.id"
              :class="['w-2 h-2 rounded-full cursor-pointer', currentSlide === index ? 'bg-gray-800' : 'bg-gray-300']"
              @click="goToSlide(index)"
            ></div>
          </div>
        </div>
      </div>

      <!-- 지역 행사 소식 -->
      <div class="w-[335px] h-[209px] rounded-[15px] bg-white shadow-[1px_1px_2px_rgba(0,0,0,0.25)] relative mt-[20px]">
        <h3 class="absolute top-[16px] left-[20px] text-[#333] text-base font-semibold">지역 행사 소식</h3>
        <!-- 가로 스크롤 영역 -->
        <div class="absolute top-[56px] left-[20px] right-[20px] flex gap-3 overflow-x-auto no-scrollbar pr-[20px]">
          <div v-for="festival in festivalData" :key="festival.id" class="w-[142px] shrink-0">
            <div class="w-[142px] h-[128px] rounded-[10px] border border-[#E2E2E2] bg-white relative cursor-pointer" @click="goToFestival(festival.link)">
              <img :src="festival.image" alt="" class="w-[142px] h-[89px] rounded-t-[10px] absolute top-0 left-0 object-cover">
              <p class="absolute bottom-3 left-3 text-[#333] text-xs font-normal">{{ festival.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicHeader from '../components/BasicHeader.vue';
import fes1 from '../assets/image/fes1.png';
import fes2 from '../assets/image/fes2.png';
import fes3 from '../assets/image/fes3.jpg';
import fes4 from '../assets/image/fes4.png';

export default {
  components: {
    BasicHeader
  },
  data() {
    return {
      activeTab: 'recommend',
      currentSlide: 0,
      enableAnimation: true,
      isDragging: false,
      startX: 0,
      currentX: 0,
      dragThreshold: 50,
      slideDirection: 'next',
      hasDragged: false,
      festivalData: [
        {
          id: 1,
          image: fes1,
          title: '논산 딸기 축제',
          link: 'nonsan'
        },
        {
          id: 2,
          image: fes2,
          title: '울산 고래 축제',
          link: 'ulsan'
        },
        {
          id: 3,
          image: fes3,
          title: '대전 빵 축제',
          link: 'daejeon'
        },
        {
          id: 4,
          image: fes4,
          title: '김천 김밥 축제',
          link: 'gimcheon'
        }
      ],
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
        // 인기 탭일 때는 새로운 지역들
        const popularData = [
          {
            id: 0,
            image: '/src/assets/image/jeungpyeong.svg',
            regionName: '충청북도 증평군',
            rank: 1,
            jobs: [
              {
                company: '증평군청',
                title: '사회복지 전담공무원',
                deadline: 'D-15'
              },
              {
                company: '증평종합사회복지관',
                title: '아동복지 프로그램 강사',
                deadline: 'D-8'
              },
              {
                company: '증평군립요양원',
                title: '간호조무사',
                deadline: 'D-22'
              }
            ]
          },
          {
            id: 1,
            image: '/src/assets/image/sunchang.svg',
            regionName: '전라북도 순창군',
            rank: 2,
            jobs: [
              {
                company: '순창군청',
                title: '보건소 방문간호사',
                deadline: 'D-10'
              },
              {
                company: '순창군종합사회복지관',
                title: '노인돌봄 전담인력',
                deadline: 'D-18'
              },
              {
                company: '순창군립병원',
                title: '물리치료사',
                deadline: 'D-5'
              }
            ]
          },
          {
            id: 2,
            image: '/src/assets/image/gangjin.svg',
            regionName: '전라남도 강진군',
            rank: 3,
            jobs: [
              {
                company: '강진군청',
                title: '정신건강복지센터 사회복지사',
                deadline: 'D-12'
              },
              {
                company: '강진군종합사회복지관',
                title: '장애인 활동지원사',
                deadline: 'D-20'
              },
              {
                company: '강진군 건강가정지원센터',
                title: '가족상담사',
                deadline: 'D-7'
              }
            ]
          }
        ];
        return popularData[this.currentSlide];
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
        this.slideDirection = index > this.currentSlide ? 'next' : 'prev';
        this.currentSlide = index;
      }
    },
    goToFestival(festival) {
      if (festival === 'nonsan') {
        window.open('http://nonsancntf.or.kr/cntf/html/sub03/030101.html?mode=V&mng_no=2361&search_type=__intro__&sval=', '_blank');
      } else if (festival === 'ulsan') {
        window.open('https://www.ulsanwhale.com/', '_blank');
      } else if (festival === 'daejeon') {
        window.open('https://www.djto.kr/kor/index.do', '_blank');
      } else if (festival === 'gimcheon') {
        window.open('https://korean.visitkorea.or.kr/kfes/detail/fstvlDetail.do?fstvlCntntsId=54ffde37-3298-4de1-8f42-fccc2e79cb15', '_blank');
      }
    },
    goToReport() {
      this.$router.push({
        path: '/report'
      });
    },
    goToJobDetail(e) {
      // 드래그가 발생했으면 클릭 이벤트 무시
      if (this.hasDragged) {
        e.stopPropagation();
        return;
      }
      
      this.$router.push({
        path: '/jobs/1'
      });
    },
    goToIntro() {
      this.$router.push({
        path: '/intro'
      });
    },
    startDrag(e) {
      this.isDragging = true;
      this.hasDragged = false;
      this.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      this.currentX = this.startX;
      e.preventDefault();
    },
    handleDrag(e) {
      if (!this.isDragging) return;
      this.currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      
      // 10px 이상 움직이면 드래그로 간주
      if (Math.abs(this.currentX - this.startX) > 10) {
        this.hasDragged = true;
      }
      
      e.preventDefault();
    },
    endDrag() {
      if (!this.isDragging) return;
      
      const deltaX = this.currentX - this.startX;
      const totalSlides = this.regionData.length;
      
      if (Math.abs(deltaX) > this.dragThreshold) {
        if (deltaX > 0) {
          // 왼쪽에서 오른쪽으로 드래그 - 이전 슬라이드
          this.slideDirection = 'prev';
          this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : totalSlides - 1;
        } else {
          // 오른쪽에서 왼쪽으로 드래그 - 다음 슬라이드
          this.slideDirection = 'next';
          this.currentSlide = this.currentSlide < totalSlides - 1 ? this.currentSlide + 1 : 0;
        }
      }
      
      this.isDragging = false;
      this.startX = 0;
      this.currentX = 0;
      
      // 드래그 플래그를 약간의 지연 후에 리셋하여 클릭 이벤트가 먼저 처리되도록
      setTimeout(() => {
        this.hasDragged = false;
      }, 100);
    }
  }
}
</script>

<style scoped>
* {
  font-family: Pretendard;
}

/* 다음 슬라이드 애니메이션 */
.slide-next-enter-active, .slide-next-leave-active {
  transition: transform 0.15s ease-out;
}

.slide-next-enter-from {
  transform: translateX(100%);
}

.slide-next-leave-to {
  transform: translateX(-100%);
}

.slide-next-enter-to, .slide-next-leave-from {
  transform: translateX(0);
}

/* 이전 슬라이드 애니메이션 */
.slide-prev-enter-active, .slide-prev-leave-active {
  transition: transform 0.15s ease-out;
}

.slide-prev-enter-from {
  transform: translateX(-100%);
}

.slide-prev-leave-to {
  transform: translateX(100%);
}

.slide-prev-enter-to, .slide-prev-leave-from {
  transform: translateX(0);
}

/* 스크롤바 숨기기 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>