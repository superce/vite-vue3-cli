import router from './index'
import { store } from '../store'
import { getToken } from '@/utils/storage';
router.beforeEach(async (to: any, from: any, next: any) => {
    const tabsOption = store.getters['tabModule/getTabsOption']
    // 判断当前路由中是否已经入栈
    const flag = tabsOption.findIndex((tab: { route: string }) => tab.route === to.path) > -1
    if (!flag && !to.meta.hiddenTab) {
        store.commit('tabModule/ADD_TAB', { route: to.path, title: to.meta.title, name: to.name })
    }
    store.commit('tabModule/SET_TAB', to.path)
    // 跳转页面之前判断有没有此页面权限
    if (getToken()) {
        if(typeof to.meta.title === 'string'){
            document.title = to.meta.title
        }
        next()
    } else if (to.path === '/login' || to.path === '/notallow') {
        next()
    } else {
        next({ path: '/login', query: { redirect: to.fullPath } })
    }
})
