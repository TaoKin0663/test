<template>
    <div class="box">
        <div class="btnBox">
            <button @click="isLogin = true">登录</button>
            <button @click="isLogin = false">注册</button>
        </div>
        <van-image
            round
            width="2rem"
            height="2rem"
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <component :is="isLogin?'login':'register'"></component>

    </div>
</template>
<script>
import login from '../components/login/loginChildren'
import register from '../components/login/registerChildren'
export default {
    data() {
        return {
        isLogin:true
        };
  },
  components:{
      login,
      register
  }
}
</script>
<style lang="scss" scoped>
    .box{
        margin: r(200) auto;
        .btnBox{
            height: 100px;
            button{
                width: 50%;
                font-size: r(50);
                
                &:first-child{
                    background-color: skyblue;
                }
            }
        }
    }
</style>