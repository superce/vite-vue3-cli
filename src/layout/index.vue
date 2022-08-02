<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && opened" class="drawer-bg" @click="handleClickOutside" />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="contariner">
        <!--Navbar-->
        <div class="fixed-header">
          <navbar :primary="primary" />
        </div>
        <AppMain />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, ref, watchEffect } from 'vue'
import { useStore } from '@/store/index'
import { writeNewStyle, getStyleTemplate } from '@/utils'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
export default defineComponent({
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  setup() {
    const store = useStore()
    const originalStyle = ref('')
    const colors = reactive({
      primary: '#fff'
    })

    const opened = computed(() => store.getters['appModule/getSidebarState'])
    const device = computed(() => store.getters['appModule/getDeviceState'])
    const withoutAnimation = computed(() => store.getters['appModule/getSidebarAnimation'])
    const classObj = computed(() => ({
      hideSidebar: !opened.value,
      openSidebar: opened.value,
      withoutAnimation: withoutAnimation.value,
      mobile: device.value === 'mobile'
    }))
    /**
     * @description 监听device && opend
     * */
    watchEffect(() => {
      if (device.value === 'mobile') {
        store.dispatch('appModule/closeSideBar', { withoutAnimation: false })
      }
    })

    const handleClickOutside = () => {
      store.dispatch('appModule/closeSideBar', { withoutAnimation: false })
    }


    return {
      opened,
      device,
      handleClickOutside,
      classObj,
      ...toRefs(colors)
    }
  }
})
</script>
