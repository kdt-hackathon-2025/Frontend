<template>
  <!--중앙 정렬 -->
  <div class="w-screen h-screen flex items-center justify-center bg-gray-100">
    <!-- 화면 사이즈 고정 -->
    <div
      id="app"
      class="w-[375px] h-[812px] flex flex-col relative overflow-hidden bg-white rounded-2xl shadow-lg"
    >
      <router-view class="flex-1 overflow-y-auto" />
      <BottomNav v-if="!route.meta.hideBottomNav" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import BottomNav from './components/BottomNav.vue'

const route = useRoute()
</script>
