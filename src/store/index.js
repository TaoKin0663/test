import Vue from 'vue'
import Vuex from 'vuex'
// import $axios from 'axios'
// import { api } from '../assets/http/api.js'
// 导入热歌榜vuex
import {hot_music_list} from "./hot_music_list_vuex.js"
import {song_details} from "./get_song_details_vuex"
import {rank} from "./rank_vuex.js"
// import createPersistedState from "vuex-persistedstate"
import {search_vuex} from './search.js'
import { recomment } from "./recomend_comment.js"
import {menuLogin} from "./menuLogin_vuex.js"   //菜单登录
import { loginInfo } from "./login_vuex"
import {get_banner} from "./get_banner.js"
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    songsheet:null,
    newsonglist:null,
    songdetailed:{
        coverImgId:'',
        creator:{
            avatarUrl:""
        }
    },
    hideHead:false,//隐藏头部tab
    get_playcount:null,
    searchHistoryData :[],
    detalied_id:null,
    currentPlayList:[],//当前播放歌曲列表
  },
    
    mutations: {
        get_Sheet(state,songsheet){
            state.songsheet = songsheet
        },
        setSearchHistory(state,msg){
            state.searchHistoryData = msg
        },
        get_newsong(state,newsong){
            state.newsonglist = newsong
        },
        get_detailed(state,songdetailed){
            state.songdetailed = songdetailed
        },
        get_count(state,get_playcount){
            state.get_playcount = get_playcount
        },
    },
    actions: {

    },
    modules: {
        hot_music_list,
        song_details,
        albumRecomment:recomment,
        search_vuex,
        rank,
        menuLogin,
        loginInfo,
        get_banner
    }
})
