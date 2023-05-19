<template>
    <div class="drawMenuBox">
        <div @click.stop="toLogin" class="avatorBox imgWrap">
            <img :src = "isLogin ? avator : avatorUrl[0].src"   alt="what">
            <div v-show = "!isLogin" class="avatorMask"></div>
            <p v-show = "!isLogin">点击登录</p>
        </div>
        <p class="user">{{nickName}}</p>

    </div>
</template>
<script>
import {mapMutations} from 'vuex'
import { Toast } from 'vant';
export default {
    data(){
        return{
            avatorUrl:[{
                src:require('../assets/image/avator.jpg')
            }],
            
        }
    },
    methods:{
        ...mapMutations(["closeMenuMask"]),
        // 点击头像登录
        toLogin(){
            this.closeMenuMask();  //关闭菜单跟遮罩
            if(!this.$store.state.loginInfo.isLogin ){
                // 如未登录则跳转登录页面
                    this.$router.push({
                    name:"login",
                })
            }else{
                // 已登录弹出遮罩提示
                Toast('您已登陆');
                
            }
            
        }
    },
    computed:{
        avator(){
            return this.$store.state.loginInfo.data.profile.avatarUrl
        },
        isLogin(){
            return this.$store.state.loginInfo.isLogin
        },
        nickName(){
            return this.$store.state.loginInfo.nickName
        }
    }
}
</script>
<style lang="scss" scoped>
@keyframes fade{
    from{
        transform:translateX(-100%)
    }
    to{
        transform:translateX(0)
    }
}
    .drawMenuBox{

        width: 60vw;
        height: 100vh;
        background-color: #eaeaea;
        // opacity: 0.8;
        position: fixed;
        transform: translateX(-100%);
        z-index: 999;
        animation: fade 0.5s linear forwards;
        .avatorBox{
            width: r(200);
            height: r(200);
            margin: r(100) auto;
            position: relative;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
            }
            p{
                font-size: r(30);
                color: white;
                opacity: 0.5;
                position: absolute;
                top: 79%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 100%;
            }
            .avatorMask{
                background-color: black;
                opacity: 0.4;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
        .user{
             font-size: r(50);   
        }
    }
</style>