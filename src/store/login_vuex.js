import { api } from "../assets/http/api.js"
import $axios from 'axios'

export let loginInfo = {
    state:{
        data:null,  //存放数据
        isLogin:false,  //判断是否登录过
        nickName:'大哥大',  //设置初始名称
    },
    mutations:{
        //设置用户信息
        setUserInfo(state,value){
            state.isLogin = true
            state.data = value;
        },
        //设置用户名
        setNickname(state,value){
            state.nickName = value
        },
        //设置验证提醒
        setMessage(state,value){
            state.message = value
        }
    },
    actions:{
          async getUserInfo(context,values){
                $axios(api.get_userInfo + 'phone=' + values.user_name + '&password=' + values.user_password)
                .then(res=>{
                    console.log("状态码",res.data.code);
                    
                    let data = res.data
                    console.log("全部数据",data);
                    context.commit("setUserInfo",data);
                    context.commit("setNickname",data.profile.nickname);
                })
                
                
            }   
    },
    getters:{
        code:state => state.data
    }
}