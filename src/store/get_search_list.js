import $axios from 'axios'
import { api } from '../assets/http/api.js'
export let searchKeyWord = {
    state: {
        inputVal:'',
        searchData1:null,
        setSearchData:[]
    },
    mutations: {
        getSearchKey(state,val){
            state.inputVal = val;
        },
        setSearchData1(state,val){
            state.searchData1 = val
        },
        clearData(state){
            state.searchData = []
        },

    },
    actions: {
        // 发送请求，获取数据
        async getSearchResult(context,songName){
            // 清除数据
            context.commit("clearData");
            await $axios(api.get_search_list + songName).then(res=>{
                context.commit("setSearchData",res.data.result.songs)
            })
        },
    },
    getters:{
        val: state => state.searchData1
    }, 
    modules: {

    }
}