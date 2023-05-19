// 歌曲详情vuex
import {api} from "../assets/http/api.js"
import $axios from "axios"

let song_details = {
    state:{
        song_details_data : [],
        song_url_data:{},
        duration : 0,           //音频时长,
        currentPlayList:null,   //当前需要播放的歌曲列表
        currentPlayID:"",       //当前播放歌曲ID
        currentPlayTime:0,      //当前播放时间
        currentLyricData : null,//当前歌曲歌词
        currentLyric: null,     //当前歌词对象
        lyricScrollTop:0,       //当前歌词scroolTop
    },
    mutations:{
        set_song_details_data(state,data){
            state.song_details_data =  data;
        },
        set_song_url(state,data){
            state.song_url_data = data;
        },
        // 写入当前已经播放时间
        set_currentPlayTime(state,val){
            state.currentPlayTime = val;
        },
        // 当前歌曲歌词
        set_currentLyricData(state,data){
            state.currentLyricData=data;
        },
    },
    actions:{
       async get_song_details_data(context,songid){
            return new Promise(function(resolve){
                $axios.get(api.get_song_details+songid).then(res=>{
                    context.commit("set_song_details_data",res.data.songs[0])
                    resolve()
                })
            })
        },
        async get_song_url(context,songid){
            return new Promise(function(resolve){
                $axios.get(api.get_song_url+songid).then(res=>{
                    context.commit("set_song_url",res.data.data);
                    resolve();
                });
            })
        },
        // 当前歌曲歌词
        async get_currentLyricData(context,songid){
            return new Promise(function(resolve){
                $axios.get(api.get_song_pyric+songid).then(res=>{
                    context.commit("set_currentLyricData",res.data);
                    resolve();
                });
            });
        }
    }
}

export { song_details }