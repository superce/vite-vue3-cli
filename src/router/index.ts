import { createRouter, createWebHashHistory,createWebHistory , RouteRecordRaw } from 'vue-router'
const modules: any = import.meta.glob("./moudles/*.ts", { eager: true });
// 静态路由
export let constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
      hiddenTab: true
    }
  },
  {
    path: '/noFound',
    name: 'NoFound',
    component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
      title: 'noFound',
      hidden: true,
      hiddenTab: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/noFound.vue'),
    meta: {
      title: '未找到',
      hidden: true,
      hiddenTab: true
    }
  },
  {
    path: '/notAllow',
    name: 'NoPermission',
    component: () => import('@/views/notAllow.vue'),
    meta: {
      title: '无权限',
      hidden: true,
      hiddenTab: true
    }
  },

]
Object.values(modules).map((v: any) => {
  constantRoutes = constantRoutes.concat(v.default)
})
constantRoutes = constantRoutes.sort(function (a, b): number {
  var aindex: number | unknown = a.meta?.index ? a.meta.index : 0;
  var bindex: number | unknown = b.meta?.index ? b.meta.index : 0;
  if(typeof aindex === 'number' && typeof bindex === 'number'){
    return aindex - bindex;
  }else{
    return 0
  }
})
const routerUrl = import.meta.env.VITE_BASE_URL
const router = createRouter({
  history: createWebHistory(routerUrl), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: constantRoutes
})
export default router
