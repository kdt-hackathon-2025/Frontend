<script setup>
import BottomNav from './components/BottomNav.vue'
</script>

<template>
  <div id="app">
    <router-view />
    <BottomNav />
  </div>
</template>

<style>
html,
body,
#app {
  width: 440px;
  height: 956px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}
</style>
