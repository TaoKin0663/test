// 热门歌曲 vuex
import {api} from "../assets/http/api.js"
import $axios from "axios"

let hot_music_list = {
    state:{
        hot_music_list_data : [],
        // 不同榜单的banner
        option:{
            bg_url:"",   //背景图片url
            updatedTime:"",//更新时间
        }
    },
    mutations:{
        set_hot_music_list_data:function(state,resData){
            state.hot_music_list_data = resData;
        },
        set_option:function(state,data){
            state.option.bg_url = data.url;
            state.option.updatedTime = data.time;
        },
    },
    actions:{
        async get_hot_music_list_data(context,id){
            return new Promise(function(resolve){
                $axios.get(api.get_hot_music_list + id).then(res =>{
                    context.commit("set_hot_music_list_data",res.data.playlist.tracks);
                    // context.commit("set_hot_music_list_data",res.data.playlist.tracks.slice(0,20));
                    resolve();
                })
            });
        }
    }
}
export { hot_music_list }