import $axios from 'axios'
import { api } from '../assets/http/api.js'
export let search_vuex = {
    state: {
        msg:'',
        value:'',
        toggle:1,   //1为默认显示，2为模糊搜索，3为搜索结果
        searchHistoryData :[],
        hotSearch:[],
        inputVal:'',
        searchData:[],   //推送到localStorage里的
        setSearchData:[],  //存放搜索到的结果
    },
    mutations: {
        // 监听到的input框里值的改变
        iptChange(state,val){
            state.value = val;
        },
        changeToggle(state){
            state.toggle = 2;
        },
        close_changeToggle(state){
            state.toggle = 1;
        },
        result_changeToggle(state){
            state.toggle = 3;
        },
        setSearchHistory(state,val){
            state.searchHistoryData = val;
        },
        setHotSearch(state,val){
            state.hotSearch = val;
        },
        getSearchKey(state,val){
            state.inputVal = val;
        },
        //将发送请求后得到的数据放入setSearchData中
        setSearchData(state,val){
            state.setSearchData = val
        },
        clearData(state){
            state.searchData = []
        },
        addVal(state,value){
            state.msg = value
        }
    },
    actions: {
        get_hot_search(context){
            $axios(api.get_hot_search_list).then(res=>{
                context.commit("setHotSearch",res.data.data.slice(0,10))
            })
        },
        //发送请求获取结果
        async getSearchResult(context,songName){
            // 先清除之前的数据
            context.commit("clearData");
            await $axios(api.get_search_list + songName).then(res=>{
                context.commit("setSearchData",res.data.result.songs)
            })
        },
    },
    getters:{
        iptValue: state => state.value,
        msg1: state => state.msg 
    },
    modules: {
    }
}