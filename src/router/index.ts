import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import PlansView from "@/views/PlansView.vue";
import NotesView from "@/views/NotesView.vue";
import CodeSnippetsView from "@/views/CodeSnippetsView.vue";
import ThreejsView from "@/views/ThreejsView.vue";
import RealtimeView from "@/views/RealtimeView.vue";
import PriorityPlanView from "@/views/PriorityPlanView.vue";
import ResumeView from "@/views/ResumeView.vue";
import StepPlanningView from "@/views/StepPlanningView.vue";
import FileUploadView from "@/views/FileUploadView.vue";

// const store = userStore();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: LoginView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      component: MainView,
      children: [
        {
          path: 'plans',
          component: PlansView,
        },
        {
          path: 'notes',
          component: NotesView,
        },
        {
          path: 'code-snippets',
          component: CodeSnippetsView,
        },
        {
          path: 'three-js',
          component: ThreejsView,
        },
        {
          path: 'realtime',
          component: RealtimeView,
        },
        {
          path: 'priority-plan',
          component: PriorityPlanView,
        },
        {
          path: 'step-planning',
          component: StepPlanningView,
        },
        {
          path: 'ai-resume',
          component: ResumeView,
        },
        {
          path: 'file-upload',
          component: FileUploadView,
        }
      ],
    },
    /*{
      path: '/home',
      name: 'home',
      component: () => import('../views/PlansView.vue'),
      beforeEnter: () => {
        // reject the navigation
        return true;
        // return store.isAuthenticated
      },
    },*/
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
