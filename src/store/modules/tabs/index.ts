import { Module } from 'vuex';
import tabStateTypes from './types';
import RootStateTypes from '../../types';
// create a new Store Modules.
const tabModule: Module<tabStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    tabsOption:[
      {
        route:'/author',
        title:'文章博主',
        name:'Author'
      }
    ],
    currentIndex:'',
    breadcrumbList:[]
  },
  mutations: {
    ADD_TAB: (state: tabStateTypes,data:{route:string,name:string,title:String}) => {
      if(!blacklistRouter.includes(data.route)){
        state.tabsOption.push(data);
      }
    },
    DELETE_TAB: (state: tabStateTypes,route:string) => {
      const index=state.tabsOption.findIndex(tab=>tab.route===route)
        state.tabsOption.splice(index,1);
      },
    SET_TAB: (state: tabStateTypes,index:string) => {
      if(!blacklistRouter.includes(index)){
        state.currentIndex=index;
      }
    },
    CLEAR_TAB: (state: tabStateTypes) => {
        // 初始化tab
        state.tabsOption=[{route:'/author',title:'文章博主', name:'Author'}];
    }

  },
  actions: {
  },
  getters: {
    getCurrentIndex(state:tabStateTypes) {
      return state.currentIndex;
    },
    getTabsOption(state:tabStateTypes) {
      return state.tabsOption;
    }
  },
};
// 路由黑名单
const blacklistRouter = ['/data/page-stream', '/data/data-day']
export default tabModule;
