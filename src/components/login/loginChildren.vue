<template>
        <van-form @submit="onSubmit" id="login">
            <van-field
                v-model="username"
                name="user_name"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true ,errorMessage:'请填写手机'}]"
            />
            <van-field
                v-model="password"
                type="password"
                name="user_password"
                label="密码"
                placeholder="密码"
                
                :rules="[{ required: true, errorMessage:'请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                登录
                </van-button>
            </div>
        </van-form>
</template>
<script>
import {mapGetters} from "vuex"
import {Toast} from "vant"
export default {
     data() {
        return {
        username: '',
        password: '',
        isLogin:true,
        codenew:0
        };
  },
  computed:{
    ...mapGetters(['code'])
  },
  methods: {
    onSubmit(values) {
      this.$store.dispatch("getUserInfo",values);
      // setTimeout(() => {
        // console.log("打印",this.code);
      // }, 500);

      // if(this.codenew == 200){
      //   this.$router.push({
      //       name:'Recommends'
      //     })
      //   }else{
      //     Toast("您的账号密码错误")
      //   }
      // }
    }
  },
  watch:{
    code(newVal){
      console.log(newVal);
      this.codenew = newVal.code
       if(this.codenew == 200){
        this.$router.push({
            name:'Recommends'
          })
        }else{
          Toast("您的账号密码错误")
        }
      }
    }
  }
  
</script>