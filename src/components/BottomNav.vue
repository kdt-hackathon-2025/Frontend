<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = [
  { name: 'community', label: '커뮤니티', icon: ['fas', 'smile'], path: '/community' },
  { name: 'jobs', label: '일자리', icon: ['fas', 'briefcase'], path: '/region-jobs' },
  { name: 'home', label: '홈', icon: ['fas', 'house'], path: '/home' },
  { name: 'info', label: '인프라', icon: ['fas', 'location-dot'], path: '/infra' },
  { name: 'profile', label: '내 정보', icon: ['fas', 'user'], path: '/profile' },
]

const active = ref('home')

function setActive(it) {
  active.value = it.name
  if (it.path) {
    router.push(it.path)
  }
}
</script>

<template>
  <nav class="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 z-10">
    <div class="mx-auto max-w-[375px] flex justify-between px-3 py-2">
      <button
        v-for="it in items"
        :key="it.name"
        type="button"
        class="flex flex-col items-center gap-1 min-w-[72px]"
        @click="setActive(it)"
      >
        <font-awesome-icon
          :icon="it.icon"
          class="text-2xl"
          :class="active === it.name ? 'text-[#00C473]' : 'text-gray-400'"
        />
        <span
          class="text-[11px]"
          :class="active === it.name ? 'text-[#00C473] font-semibold' : 'text-gray-400'"
        >
          {{ it.label }}
        </span>
      </button>
    </div>
  </nav>
</template>
