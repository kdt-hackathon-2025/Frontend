import { createRouter, createWebHistory } from 'vue-router'
import OnboardingPage from '@/pages/OnboardingPage.vue'
import OnboardingIntro from '@/pages/OnboardingIntro.vue'
import Home from '@/pages/Home.vue'

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
      path: '/home',
      name: 'Home',
      component: Home
    }
  ],
})

export default router
