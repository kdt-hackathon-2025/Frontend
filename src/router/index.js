import { createRouter, createWebHistory } from 'vue-router'
import OnboardingPage from '@/pages/OnboardingPage.vue'
import OnboardingIntro from '@/pages/OnboardingIntro.vue'
import JobsPage from '@/pages/Jobs/JobsPage.vue'
import JobDetailPage from '@/pages/Jobs/JobDetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Onboarding',
      component: OnboardingPage,
      meta: { hideBottomNav: true },
    },
    {
      path: '/intro',
      name: 'OnboardingIntro',
      component: OnboardingIntro,
      meta: { hideBottomNav: true },
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: JobsPage,
    },
    {
      path: '/jobs/:id',
      name: 'JobDetail',
      component: JobDetailPage,
    },
  ],
})

export default router
