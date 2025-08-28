import { createRouter, createWebHistory } from 'vue-router'
import OnboardingPage from '@/pages/OnboardingPage.vue'
import OnboardingIntro from '@/pages/OnboardingIntro.vue'
import TestQ1 from '@/pages/test/TestQ1.vue'
import TestQ2 from '@/pages/test/TestQ2.vue'
import TestQ3 from '@/pages/test/TestQ3.vue'
import TestQ4 from '@/pages/test/TestQ4.vue'
import TestQ5 from '@/pages/test/TestQ5.vue'
import TestFinish from '@/pages/test/TestFinish.vue'
import Home from '@/pages/Home.vue'
import MyPage from '@/pages/MyPage.vue'
import Report from '@/pages/Report.vue'

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
      path: '/q1',
      name: 'TestQ1',
      component: TestQ1,
      meta: { hideBottomNav: true },
    },
    {
      path: '/q2',
      name: 'TestQ2',
      component: TestQ2,
      meta: { hideBottomNav: true },
    },
    {
      path: '/q3',
      name: 'TestQ3',
      component: TestQ3,
      meta: { hideBottomNav: true },
    },
    {
      path: '/q4',
      name: 'TestQ4',
      component: TestQ4,
      meta: { hideBottomNav: true },
    },
    {
      path: '/q5',
      name: 'TestQ5',
      component: TestQ5,
      meta: { hideBottomNav: true },
    },
    {
      path: '/finish',
      name: 'TestFinish',
      component: TestFinish,
      meta: { hideBottomNav: true },
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../pages/CommunityPage.vue'),
    },
    {
      path: '/stores',
      name: 'StoreList',
      component: () => import('../pages/StoreList.vue'),
    },
    {
      path: '/stores/:id',
      name: 'StoreDetail',
      component: () => import('../pages/StoreDetail.vue'),
    {      path: '/profile',
      name: 'MyPage',
      component: MyPage,
    },
    {
      path: '/report',
      name: 'Report',
      component: Report,
    },
  ],
})

export default router
