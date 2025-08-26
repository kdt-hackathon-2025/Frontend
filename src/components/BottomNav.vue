<script setup>
import { ref } from 'vue'

const items = [
  { name: 'community', label: '커뮤니티', icon: ['fas', 'smile'] },
  { name: 'jobs', label: '일자리', icon: ['fas', 'briefcase'] },
  { name: 'home', label: '홈', icon: ['fas', 'house'] },
  { name: 'info', label: '종합정보', icon: ['fas', 'location-dot'] },
  { name: 'profile', label: '내 정보', icon: ['fas', 'user'] },
]

const active = ref('home')

function setActive(name) {
  active.value = name
}
</script>

<template>
  <nav class="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 z-10">
    <div class="mx-auto max-w-[440px] flex justify-between px-3 py-2">
      <button
        v-for="it in items"
        :key="it.name"
        type="button"
        class="flex flex-col items-center gap-1 min-w-[72px]"
        @click="setActive(it.name)"
      >
        <font-awesome-icon
          :icon="it.icon"
          class="text-2xl"
          :class="active === it.name ? 'text-green-500' : 'text-gray-400'"
        />
        <span
          class="text-[11px]"
          :class="active === it.name ? 'text-green-500 font-semibold' : 'text-gray-400'"
        >
          {{ it.label }}
        </span>
      </button>
    </div>
  </nav>
</template>
