import { Module } from "vuex";
import { setLocal } from "@/utils/storage";
import tagTypes from './types'
import RootStateTypes from '../../types';
const tagModule: Module<tagTypes, RootStateTypes> = {
    namespaced: true,
    state:{
        meun: [],
        tagList:[],
    },
    mutations:{
        SET_TAGS(state, tags){
            state.tagList = tags
            setLocal('Tag_LIST', tags)
        },
        GET_MEUN: (state, meun: any) => {
            state.meun = meun
        }
    }
}
export default tagModule