<template>
  <div id="app" class="w-[375px] h-[812px] mx-auto flex flex-col relative overflow-hidden">
    <router-view class="flex-1 overflow-y-auto" />
    <BottomNav v-if="!route.meta.hideBottomNav" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import BottomNav from './components/BottomNav.vue'

const route = useRoute()
</script>
