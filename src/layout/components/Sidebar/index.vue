<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :router="true" :unique-opened="true" :default-active="activeMenu" class="el-menu-vertical" :collapse="isCollapse" text-color="#303133">
        <!--递归路由对象-->
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { isExternal } from '@/utils/validate'
import sidebarItem from '@/layout/components/Sidebar/sidebarItem.vue'
import logo from './Logo.vue'
import { useStore } from '../../../store/index'
export default defineComponent({
  components: {
    logo,
    sidebarItem
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const isCollapse = computed(() => !store.getters['appModule/getSidebarState'])
    const showLogo = computed(() => store.state.settingsModule.sideBarLogo)
    const routes = ref(router.options.routes) //computed(() => store.state.permissionModule.accessRoutes)
    const activeMenu = computed(() => store.getters['tabModule/getCurrentIndex'])

    onMounted(() => {
      // onGetMeun()
      const routePath = route.path
      store.commit('tabModule/SET_TAB', routePath)
    })
    const meunPermission = computed(() => store.state.tagModule.meun)
    const onGetMeun = async () => {
      routes.value.forEach((items: any) => {
        const hasRouteParent = findMeunItem(items.name)
        if (hasRouteParent) {
          items.meta.title = hasRouteParent.name
          items.meta.index = hasRouteParent.showOrder
          }
        if (items?.children) {
          items?.children.forEach((item: { name: string; meta: { hidden: boolean; title: string } }) => {
            const hasRoute = findMeunItem(item.name)
            if (hasRoute) {
              items.meta.hidden = false
              item.meta.hidden = false
              item.meta.title = hasRoute.name
            }
          })
        }
      })
    }
    const findMeunItem = (code: string) => {
      return meunPermission.value.find((item) => item.code === code)
    }

    return {
      activeMenu,
      routes,
      showLogo,
      isCollapse
    }
  }
})
</script>
<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  text-align: left;
}
</style>
