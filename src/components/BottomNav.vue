<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const items = [
  { name: 'community', label: '커뮤니티', icon: ['fas', 'smile'] },
  { name: 'jobs', label: '일자리', icon: ['fas', 'briefcase'] },
  { name: 'home', label: '홈', icon: ['fas', 'house'] },
  { name: 'info', label: '종합정보', icon: ['fas', 'location-dot'] },
  { name: 'profile', label: '내 정보', icon: ['fas', 'user'] },
]

const isActive = (n) => route.name === n
</script>

<template>
  <!-- 고정 크기: 376x80, 가운데 정렬, 화면 하단 고정 -->
  <nav
    class="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[376px] h-[80px] shrink-0 bg-white border-t border-gray-200 rounded-t-xl"
    style="padding-bottom: env(safe-area-inset-bottom)"
  >
    <div class="h-full flex items-center justify-between px-3">
      <RouterLink
        v-for="it in items"
        :key="it.name"
        :to="{ name: it.name }"
        class="flex-1 h-full flex flex-col items-center justify-center gap-1"
      >
        <font-awesome-icon
          :icon="it.icon"
          class="text-xl"
          :class="isActive(it.name) ? 'text-green-500' : 'text-gray-400'"
        />
        <span
          class="text-[11px] leading-none"
          :class="isActive(it.name) ? 'text-green-500 font-semibold' : 'text-gray-400'"
        >
          {{ it.label }}
        </span>
      </RouterLink>
    </div>
  </nav>
</template>
