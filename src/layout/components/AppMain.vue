<template>
  <section class="app-main">
    <el-tabs id="Tabs"
      v-model="currentIndex"
      type="card"
      closable
      @tab-click="clickTab"
      @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in tabsOption"
        :key="item.route"
        :closable="item.route !== '/'"
        :label="item.title"
        :name="item.route" />
    </el-tabs>
    <div class="app-content">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
            <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </div>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent,watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/index'

export default defineComponent({
  name: 'AppMain',
  setup() {
    // store 中获取当前路由以及所有的路由对象；
    const store = useStore()
    const tabsOption = computed(() => store.getters['tabModule/getTabsOption'])
    const currentIndex = computed({
      get(){
        return store.getters['tabModule/getCurrentIndex']
      },
      set(v){
        store.commit("tabModule/SET_TAB", v)
      }
    })

    watch(currentIndex,(newProps, oldProps) => {

    }, {immediate:true,deep:true})

    const router = useRouter()
    // mothods
    /**
     * @description 移除tab
     * */
    const removeTab = (tabName: string) => {
      store.commit('tabModule/DELETE_TAB', tabName)
      if (currentIndex.value === tabName) {
        if (tabsOption.value && tabsOption.value.length) {
          store.commit('tabModule/SET_TAB', tabsOption.value[tabsOption.value.length - 1].route)
          router.replace({ path: currentIndex.value })
        } else {
          router.replace({ path: '/' })
        }
      }
    }
    /**
     * @description 点击tab
     */
    const clickTab = (tabName: { paneName: string }) => {
      // eslint-disable-next-line no-console
      store.commit('tabModule/SET_TAB', tabName.paneName)
      router.replace({ path: currentIndex.value })
    }
    return {
      tabsOption,
      currentIndex,
      removeTab,
      clickTab
    }
  }
})
</script>
<style scoped>
.app-main {
  /*50 = navbar  */
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: white;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
