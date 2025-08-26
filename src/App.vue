<script setup>
import { useRoute } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'

const route = useRoute()
</script>

<template>
  <div class="app-frame">
    <RouterView />
    <BottomNav v-if="!route.meta.hideBottomNav" />
  </div>
</template>

<style>
.app-frame {
  width: 375px;
  height: 812px;
  margin: 0 auto;
  position: relative;
  background: #fff;
  overflow: hidden;
}
</style>
