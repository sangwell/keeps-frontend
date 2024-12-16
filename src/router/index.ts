import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
// import {userStore} from '../stores/store.ts';

// const store = userStore();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: () => {
        // reject the navigation
        return true;
        // return store.isAuthenticated
      },
    },
  ],
})

// 全局前置守卫
/*router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next(); // 登录页面不需要检查
  } else {
    if (store.state.isAuthenticated) {
      next(); // 已登录，允许访问
    } else {
      next('/login'); // 未登录，重定向到登录页面
    }
  }
});*/

export default router
