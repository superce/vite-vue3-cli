<template>
  <div class="navbar">
    <el-header height="50px">
      <hamburger id="Hamburger" :is-active="opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="breadcrumb-container" />
      <div class="right-menu">
        <div id="fullScreen" class="right-menu-box">
          <el-button class="full-screen">
            <el-tooltip :content="langConfig.header.fullScreen[lang]" effect="dark" placement="left">
              <el-icon v-show="fullScreen == false" @click="toShowFullScreen()" >
                <i class="iconfont icon-fangda"></i>
              </el-icon>
            </el-tooltip>

            <el-tooltip :content="langConfig.header.exitFullScreen[lang]" effect="dark" placement="left">
              <el-icon v-show="fullScreen == true" @click="toExitFullScreen()">
                <i class="iconfont icon-suoxiao"></i>
              </el-icon>
            </el-tooltip>

          </el-button>
        </div>
        <el-dropdown class="avatar-container" trigger="hover">
          <div class="avatar-wrapper">
            <el-avatar :src="avatar"></el-avatar>
            <div class="nickname">{{ nickname }}</div>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <el-dropdown-item>
                <span style="display: block" @click="logout">{{ langConfig.header.user.logout[lang] }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { Message,FullScreen ,BottomLeft} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import Hamburger from '@/components/Hamburger/Hamburger.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import { toFullScreen, exitFullScreen } from '@/utils/screen'
import { useStore } from '@/store/index'
import { langConfig } from '@/utils/constant/config'
import headIcon from '/images/logo.png'

export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb,
    Message,
    FullScreen,
    BottomLeft
  },
  props: {
    primary: {
      default: '#fff',
      type: String
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const opened = computed(() => store.getters['appModule/getSidebarState'])
    const fullScreen = ref(false)
    const messageNum = computed(() => store.getters['messageModule/getMessageNum'])
    const lang = computed((): string => store.getters['settingsModule/getLangState'])
    const nickname = computed(() => store.getters.name)
    const avatar = computed(() => headIcon)
    // methods
    const toggleSideBar = () => {
      store.dispatch('appModule/toggleSideBar')
    }

    const toShowFullScreen = () => {
      toFullScreen()
      fullScreen.value = true
    }

    const toExitFullScreen = () => {
      exitFullScreen()
      fullScreen.value = false
    }
    const logout = () => {
      store.commit('loginModule/CLEAR')
      location.reload()
    }

    return {
      messageNum,
      toShowFullScreen,
      toExitFullScreen,
      toFullScreen,
      exitFullScreen,
      fullScreen,
      nickname,
      lang,
      avatar,
      toggleSideBar,
      opened,
      langConfig,
      logout
    }
  }
})
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .nickname {
    float: right;
    padding: 0px 0 0px 10px;
    line-height: 40px;
    outline: none;
    font-size: 18px;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    &:focus {
      outline: none;
    }
    .right-menu-box{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .message-badge {
      .is-fixed {
        top: 12px !important;
        right: 28px !important;
      }
      .message {
        border: none;
        padding: 5px 20px;

        i {
          background-color: transparent;
          border: none;
          color: #2c3e50;
          font-size: 25px;
        }
      }
    }

    .full-screen {
      background-color: transparent;
      border: none;
      padding: 5px 20px;

      i {
        background-color: transparent;
        border: none;
        color: #2c3e50;
        font-size: 28px;
      }
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        cursor: pointer;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
