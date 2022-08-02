<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import logo from '/images/logo.png'
import { useStore } from '../../../store/index'

export default defineComponent({
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const store = useStore()
    // eslint-disable-next-line no-console
    const reactiveData = reactive({
      title: computed(() => store?.state?.settingsModule?.title)
    })
    return {
      logo,
      ...toRefs(reactiveData)
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
