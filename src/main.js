import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../src/assets/_reset.scss"
import { Overlay } from 'vant';
import { Tab, Tabs ,Search ,Loading ,Form ,Field ,Button ,Image as VanImage ,Toast } from 'vant'
import '../public/rem.js'




import 'vant/lib/tabs/index.css';
import axios from "axios" 
  
Vue.prototype.$axios = axios;
Vue.prototype.audio = new Audio();//音频对象
Vue.prototype.duration = 0;//音频时长
Vue.prototype.isRun = false,//是否执行playpage页面的监听
// 播放音频
Vue.prototype.setSrcAndPlay=function(url){
    this.audio.src = url;
    this.audio.play();
}
// 当前音乐对象
Vue.prototype.currentMusicData = {
    idx:0,           //当前歌曲下标
    step:0,          //播放进度条步进器
    id : "",         //当前歌曲id
    picUrl : "",     //图片
    url   : "",      //歌曲地址
    name : "",       //歌名
    singerName : "", //歌手名称
    lyricLineNum:0,  //歌词行数
};
Vue.config.productionTip = false



Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Search);
Vue.use(Overlay);
Vue.use(Loading);
Vue.use(Form).use(Field).use(Button).use(VanImage);
Vue.use(Toast);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')