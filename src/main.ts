import 'default-passive-events'
import { createApp } from 'vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { key, store } from './store/index'
import router from './router/index'
import './router/beforEach'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import '@/assets/styles/index.scss'

const app = createApp(App).use(store, key).use(router).use(ElementPlus, { locale })
app.mount('#app')
// 在导航期间每次发生未捕获的错误时都会调用该处理程序
// eslint-disable-next-line no-console
router.onError((err: any) => {
  console.error('路由err',err)
})
