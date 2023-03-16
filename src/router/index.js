import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        requireLogin: true,
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/landing-app',
      name: 'landing-app',
      component: () => import('@/views/LandingApp.vue'),
      meta: {
        requireLogin: true,
      },
    },
    {
      path: '/templates/create',
      name: 'create-template',
      component: () => import('@/views/CreateTemplate.vue'),
      meta: {
        requireLogin: true,
        navActiveLink: 'landing-app',
        pageTitle: 'صفحات الهبوط',
        breadcrumb: [
          {
            text: 'إنشاء صفحة',
            active: true,
          },
        ],
      },
    },
    {
      path: '/templates/:id',
      name: 'templates',
      component: () => import('@/views/template-view/Template.vue'),
      meta: {
        requireLogin: true,
        navActiveLink: 'landing-app'
      },
    },
    {
      path: '/templates/:id/setup',
      name: 'templates-setup',
      component: () => import('@/views/template-view/template-setup/TemplateSetup.vue'),
      meta: {
        requireLogin: true,
        navActiveLink: 'landing-app'
      },
    },
    {
      path: '/templates/:id/editor',
      name: 'editor',
      component: () => import('@/views/editor/Editor.vue'),
      meta: {
        requireLogin: true,
        layout: 'full',
      },
    },
    {
      path: '/account-setting',
      name: 'account-setting',
      component: () => import('@/views/account-setting/AccountSetting.vue'),
      meta: {
        requireLogin: true,
        pageTitle: 'إعدادت الحساب',
        breadcrumb: [
          {
            text: 'إعدادت',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/best',
      name: 'best',
      component: () => import('@/views/error/best.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/test/:id',
      name: 'test',
      component: () => import('@/views/error/Test.vue'),
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  // handle access
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.auth.isAuthenticated) {
    return next({name: 'login'})
  } else {
    next()
  }
})


// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    setTimeout(() => {
      appLoading.style.display = 'none'
    }
    , 900);
  }

})


export default router
