import { Module } from 'vuex';
import { getLocal, setLocal } from '@/utils/storage';
import appStateTypes from './types';
import RootStateTypes from '../../types';
// create a new Store Modules.
const appModule: Module<appStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false,
    },
    device: 'desktop',
  },
  mutations: {
    toggle_sidebar: (state: appStateTypes) => {
      // eslint-disable-next-line no-console
      state.sidebar.opened = !state.sidebar.opened;

      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        setLocal('sidebarStatus', true);
      } else {
        setLocal('sidebarStatus', false);
      }
    },
    close_sidebar:(state, withoutAnimation)=>{
      setLocal('sidebarStatus', false)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    toggle_device: (state, device) => {
      state.device = device
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('toggle_sidebar');
    },
    closeSideBar({commit},{widthoutAnimation}){
      commit('close_sidebar',widthoutAnimation);
    },
    toggleDevice({ commit }, device) {
      commit('toggle_device', device)
    }
  },
  getters: {
    getSidebarState(state:appStateTypes) {
      return state.sidebar.opened;
    },
    getSidebarAnimation(state:appStateTypes) {
      return state.sidebar.withoutAnimation;
    },
    getDeviceState(state:appStateTypes) {
      return state.device;
    }
  },
};
export default appModule;
