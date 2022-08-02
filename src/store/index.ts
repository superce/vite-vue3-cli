import { InjectionKey } from '@vue/runtime-core';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

import settingsModule from './modules/Setting/index';
import appModule from './modules/app/index';
import messageModule from './modules/message/index'
import tabModule from './modules/tabs/index'
import tagModule from './modules/tag';
import loginModule from './modules/Login';
import RootStateTypes, { AllStateTypes } from './types';
import { getLocal, getUserId } from '@/utils/storage';
// const storeMoudle = import.meta.globEager("./modules/*/index.ts")
const defaultState = {
  count: 0,
};
// let modules:any = {}
// for(let i in storeMoudle){
//   modules[i.slice(10,-3)] = storeMoudle[i].default
// }
// console.log(modules)
// 新建store 实例
export const store = createStore({
  state() {
    return defaultState;
  },
  mutations: {
    increment(state: typeof defaultState) {
      // eslint-disable-next-line no-plusplus
      state.count++;
    },
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
  },
  getters: {
    count(state: typeof defaultState) {
      return state.count;
    },
    userId:() => getUserId(),
    name: (state: any) => state.loginModule.name || getLocal('LOGIN_USER_NAME'),
    categroy:(state: any) => state.tagModule.tagList || getLocal('Tag_LIST'),
    meunCode:(state:any) => state.tagModule.meun,
  },
  modules: {
    settingsModule,
    appModule,
    messageModule,
    tabModule,
    tagModule,
    loginModule
  },
});

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue3-store');

export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key);
}
