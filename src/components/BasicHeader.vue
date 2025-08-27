<template>
  <header class="text-[#FBFBFB] flex w-[375px] h-[76px] items-center">
    <!-- 패턴 1 : 아이콘 + 타이틀 -->
    <template v-if="type === 'icon'">
      <RouterLink :to="iconTo">
        <img :src="iconSrc" alt="" class="w-[35px] ml-[20px] cursor-pointer" />
      </RouterLink>
      <p class="text-[#1E1E1E] font-['Aggravo'] text-xl font-light ml-[14px]">{{ title }}</p>
    </template>
    <!-- 패턴 2 : 뒤로가기 + 타이틀 -->
    <template v-else-if="type === 'back'">
      <button @click="handleBack" class="mr-2">
        <svg
          class="ml-[1.25rem] cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.366066 8.11648C0.131727 8.35088 8.29697e-05 8.66877 8.29697e-05 9.00022C8.29697e-05 9.33168 0.131727 9.64956 0.366066 9.88397L7.43732 16.9552C7.55262 17.0746 7.69055 17.1698 7.84306 17.2354C7.99556 17.3009 8.15959 17.3353 8.32556 17.3368C8.49154 17.3382 8.65614 17.3066 8.80976 17.2438C8.96338 17.1809 9.10294 17.0881 9.22031 16.9707C9.33768 16.8533 9.43049 16.7138 9.49334 16.5602C9.55619 16.4065 9.58782 16.2419 9.58638 16.076C9.58494 15.91 9.55045 15.746 9.48494 15.5935C9.41943 15.441 9.3242 15.303 9.20482 15.1877L3.01731 9.00022L9.20482 2.81273C9.43251 2.57697 9.55851 2.26122 9.55566 1.93347C9.55281 1.60573 9.42135 1.29221 9.18959 1.06045C8.95783 0.828692 8.64431 0.697231 8.31657 0.694383C7.98882 0.691535 7.67307 0.817528 7.43732 1.04523L0.366066 8.11648Z"
            fill="#333333"
          />
        </svg>
      </button>
      <p class="text-[#1E1E1E] font-['Aggravo'] text-xl font-light ml-[14px]">{{ title }}</p>
    </template>
  </header>
</template>

<style scoped>
@font-face {
  font-family: 'Aggravo';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroL.woff') format('woff');
  font-weight: 300;
  font-display: swap;
}
</style>