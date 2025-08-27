<template>
  <div class="bg-[#FBFBFB] min-h-screen">
    <BasicHeader type="icon" title="슬기로운 은퇴생" />

    <!-- 메인 컨텐츠 -->
    <div class="flex flex-col items-center pb-4">
      <!-- 추천/인기 탭과 지역 정보 카드 -->
      <div class="relative">
        <!-- 추천/인기 탭 -->
        <div class="absolute top-0 left-0 flex z-10">
          <button
            :class="[
              'h-[30px] flex-shrink-0 border border-black/10 cursor-pointer font-semibold text-sm w-[52px] rounded-tl-[10px] rounded-tr-0 rounded-br-0 rounded-bl-0',
              activeTab === 'recommend' ? 'bg-[#03C473] text-white' : 'bg-[#FBFBFB] text-black',
            ]"
            @click="setActiveTab('recommend')"
          >
            추천
          </button>
          <button
            :class="[
              'h-[30px] flex-shrink-0 border border-black/10 cursor-pointer font-semibold text-sm w-[54px] rounded-tl-0 rounded-tr-[10px] rounded-br-0 rounded-bl-0',
              activeTab === 'popular' ? 'bg-[#03C473] text-white' : 'bg-[#FBFBFB] text-black',
            ]"
            @click="setActiveTab('popular')"
          >
            인기
          </button>
        </div>

        <!-- 지역 정보 카드 -->
        <div
          class="w-[335px] h-[400px] flex-shrink-0 rounded-[0_15px_15px_15px] border-0 border-[#E2E2E2] bg-white relative shadow-[1px_1px_4px_rgba(0,0,0,0.25)] mt-[30px] overflow-hidden p-4"
        >
          <transition :name="enableAnimation ? 'slide' : ''" mode="out-in">
            <div class="absolute w-full h-full top-0 left-0" :key="contentKey">
              <!-- TOP 배지 -->
              <div
                class="absolute top-[18px] left-[16px] w-[55px] h-[23px] rounded-[10px] border border-[#4AA982] bg-[#E5FEF4] flex items-center justify-center"
              >
                <span class="text-[#4AA982] text-xs font-bold">TOP {{ currentRegion.rank }}</span>
              </div>
              <img
                :src="currentRegion.image"
                :alt="currentRegion.regionName"
                class="absolute top-[57px] left-[16px] w-[34px] h-[26px]"
              />
              <h2 class="absolute top-[59px] left-[58px] text-[#333] text-xl font-bold">
                {{ currentRegion.regionName }}
              </h2>

              <div
                v-if="activeTab === 'recommend'"
                class="flex items-center justify-end space-x-1 text-green-600 text-sm cursor-pointer absolute top-[65px] right-[16px]"
                @click="goToReport"
              >
                <span>추천 리포트</span>
                <span>→</span>
              </div>

              <!-- 채용 정보 리스트 -->
              <div
                class="absolute top-[107px] left-1/2 transform -translate-x-1/2 flex flex-col gap-3"
              >
                <div
                  class="w-[303px] h-[74px] rounded-[10px] bg-white relative shadow-[1px_1px_4px_rgba(0,0,0,0.25)]"
                  v-for="job in currentRegion.jobs"
                  :key="job.title"
                >
                  <p class="absolute top-[16px] left-[20px] text-black text-xs font-medium">
                    {{ job.company }}
                  </p>
                  <p class="absolute top-[38px] left-[20px] text-[#333] text-base font-semibold">
                    {{ job.title }}
                  </p>
                  <span
                    class="absolute top-[39px] right-[16px] text-[#475067] text-sm font-normal"
                    >{{ job.deadline }}</span
                  >
                </div>
              </div>
            </div>
          </transition>

          <!-- 페이지 인디케이터 -->
          <div class="absolute bottom-[16px] left-1/2 transform -translate-x-1/2 flex gap-2">
            <div
              v-for="(region, index) in regionData"
              :key="region.id"
              :class="[
                'w-2 h-2 rounded-full cursor-pointer',
                currentSlide === index ? 'bg-gray-800' : 'bg-gray-300',
              ]"
              @click="goToSlide(index)"
            ></div>
          </div>
        </div>
      </div>

      <!-- 지역 행사 소식 -->
      <div
        class="w-[335px] h-[209px] rounded-[15px] bg-white shadow-[1px_1px_4px_rgba(0,0,0,0.25)] relative mt-[30px]"
      >
        <h3 class="absolute top-[16px] left-[20px] text-[#333] text-base font-semibold">
          지역 행사 소식
        </h3>
        <div class="absolute top-[56px] left-[20px] flex gap-3">
          <div
            class="w-[142px] h-[128px] rounded-[10px] border border-[#E2E2E2] bg-white relative cursor-pointer"
            @click="goToFestival('nonsan')"
          >
            <img
              src="../assets/image/fes1.png"
              alt=""
              class="w-[142px] h-[89px] rounded-t-[10px] absolute top-0 left-0"
            />
            <p class="absolute bottom-3 left-3 text-[#333] text-xs font-normal">논산 딸기 축제</p>
          </div>
          <div
            class="w-[142px] h-[128px] rounded-[10px] border border-[#E2E2E2] bg-white relative cursor-pointer"
            @click="goToFestival('ulsan')"
          >
            <img
              src="../assets/image/fes2.png"
              alt=""
              class="w-[142px] h-[89px] rounded-t-[10px] absolute top-0 left-0"
            />
            <p class="absolute bottom-3 left-3 text-[#333] text-xs font-normal">울산 고래 축제</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicHeader from '../components/BasicHeader.vue'

export default {
  components: {
    BasicHeader,
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
              deadline: 'D-25',
            },
            {
              company: '청춘마당 노인주간보호센터',
              title: '청춘마당 주간보호센터 사회복지사',
              deadline: 'D-4',
            },
            {
              company: '휴방문요양재가센터',
              title: '재가센터 사회복지사',
              deadline: 'D-12',
            },
          ],
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
              deadline: 'D-5',
            },
            {
              company: '경상북도안동교육지원청',
              title: '다문화가정 학생 한국어 강사',
              deadline: 'D-16',
            },
            {
              company: '안동시종합사회복지관',
              title: '안동시 종합 사회복지관 직원',
              deadline: 'D-26',
            },
          ],
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
              deadline: 'D-8',
            },
            {
              company: '정읍종합사회복지관',
              title: '노인복지 프로그램 강사',
              deadline: 'D-15',
            },
            {
              company: '정읍시립요양원',
              title: '요양보호사',
              deadline: 'D-20',
            },
          ],
        },
      ],
    }
  },
  computed: {
    currentRegion() {
      if (this.activeTab === 'popular') {
        // 인기 탭일 때는 정읍시가 1위
        const popularOrder = [2, 0, 1] // 정읍시, 원주시, 안동시 순서
        const reorderedData = popularOrder.map((index) => ({
          ...this.regionData[index],
          rank: popularOrder.indexOf(index) + 1,
        }))
        return reorderedData[this.currentSlide]
      } else {
        // 추천 탭일 때는 기본 순서
        return this.regionData[this.currentSlide]
      }
    },
    contentKey() {
      return `${this.activeTab}-${this.currentSlide}`
    },
  },
  methods: {
    setActiveTab(tab) {
      this.enableAnimation = false // 애니메이션 비활성화
      this.activeTab = tab
      this.currentSlide = 0 // 탭 변경 시 항상 첫 번째 슬라이드로
      setTimeout(() => {
        this.enableAnimation = true // 100ms 후 애니메이션 재활성화
      }, 100)
    },
    goToSlide(index) {
      if (index !== this.currentSlide) {
        this.currentSlide = index
      }
    },
    goToFestival(festival) {
      if (festival === 'nonsan') {
        window.open(
          'http://nonsancntf.or.kr/cntf/html/sub03/030101.html?mode=V&mng_no=2361&search_type=__intro__&sval=',
          '_blank',
        )
      } else if (festival === 'ulsan') {
        window.open('https://www.ulsanwhale.com/', '_blank')
      }
    },
    goToReport() {
      this.$router.push({
        path: '/report',
        query: {
          rank: this.currentRegion.rank,
        },
      })
    },
  },
}
</script>

<style scoped>
* {
  font-family: Pretendard;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.15s ease-out;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
