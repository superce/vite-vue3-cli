import { Module } from 'vuex';
import loginTypes from './types';
import RootStateTypes from '../../types';
import { getToken, setLocal, setToken, clearLocal } from '@/utils/storage';
import moment from 'moment'
// import tagStore from '../tag';
import Service from './api';
// create a new Store Modules.
const loginModule: Module<loginTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        user: {}
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            setToken(token)
        },
        SET_NAME: (state, name) => {
            state.name = name
            setLocal('LOGIN_USER_NAME', name)
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_USER: (state, user) => {
            state.user = user
        },
        CLEAR: (state) => {
            state.token = ''
            state.name = ''
            state.avatar = ''
            clearLocal()
        }
    },
    actions: {
        login({ commit }, data) {
            return new Promise<void>(async (resolve, reject) => {
                try{
                    const { Data } = await Service.loginUser(data)
                    const userInfo = {
                        ...data,
                        token: Data
                    }
                    returnParamsData(userInfo, commit)
                    console.log('ressssss');
                    resolve()
                }catch(err){
                    reject(err)
                }
            })
        },
        loginOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                commit('CLEAR')
                location.reload()
                resolve('退出登陆')
            })
        }
    }
};
const returnParamsData = async (res: any, commit: any) => {
    console.log('res', res);
    let user = { id: res.ddId, username: res.ddName, token: res.token }
    let now = moment()
    let exp = now.add(1, 'days').unix()
    let tokenObj = { exp, ...user }
    let tStr = encodeURIComponent(JSON.stringify(tokenObj))
    let prefix = btoa('wuweiarticle')
    let suffix = btoa(now.unix().toString())
    let middle = btoa(tStr)
    let token = `${prefix}.${middle}.${suffix}`
    // 记录登陆状态
    commit('SET_TOKEN', token)
    commit('SET_NAME', user.username)

}
export default loginModule;
