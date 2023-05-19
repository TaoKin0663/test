// 轮播图
import {api} from "../assets/http/api.js"
import $axios from "axios"
let get_banner = {
    state:{
        bannerData : null,
    },
    mutations:{
        set_bannerData(state,data){
            state.bannerData = data;
        }
    },
    actions:{
        async get_bannerData(context){
            let res = await $axios.get(api.get_banner);
            context.commit("set_bannerData",res.data.banners)
        }
    },
}

export {get_banner}