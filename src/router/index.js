import { createRouter, createWebHistory } from 'vue-router'

// 실제 있는 페이지
import HomePage from '@/pages/HomePage.vue'
import JobsPage from '@/pages/Jabs/JobsPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import InfoPage from '@/pages/InfoPage.vue'
import CommunityPage from '@/pages/CommunityPage.vue'
import JobDetailPage from '@/pages/Jabs/JabDetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/home', name: 'home', component: HomePage },
    { path: '/jobs', name: 'jobs', component: JobsPage },
    { path: '/profile', name: 'profile', component: ProfilePage },
    { path: '/info', name: 'info', component: InfoPage },
    { path: '/community', name: 'community', component: CommunityPage },
    { path: '/jobs', name: 'jobs', component: JobsPage },
    {
      path: '/jobs/:id',
      name: 'job-detail',
      component: JobDetailPage,
      meta: { hideBottomNav: true },
    },
  ],
})

export default router
