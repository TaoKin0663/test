<template>
  <div id="app">
      <!-- 遮罩 -->
    <div @click="outMenu" v-show="isShowMask" class="mask"></div>
    <drawMenu v-show="isShowMenu" ></drawMenu>
      <!-- 导航 -->
    <div id="nav" v-bind:class="{'hide' : hideHead}">
        <!-- 顶部 -->
        <div class="top">
            <i @click="showMenu" class="iconfont icon-caidan"></i>
        </div>

        <van-tabs v-model="active" @click="clickMusic">
            <van-tab name="Recommends" title="推荐音乐"></van-tab>
            <van-tab name="Rank" title="热歌榜"></van-tab>
            <van-tab name="Search" title="搜索"></van-tab>
        </van-tabs>
    </div>
    <router-view :class="{'content':isPlayPage}"></router-view>
    <div class="bottomBar" v-show="isPlayPage" @click="showPlayPage">
        <div class="bottomBar-l">
            <div class="circular">
                <div class="imgWrap">
                    <img :src="currentMusicData.picUrl" alt="">
                </div>
            </div>
            <div class="opt">
                <p class="name">{{currentMusicData.name}}</p>
                <div class="singerBox">
                    <marquee behavior="scroll" direction="left" scrollamount="20" loop=infinite class="singerName">{{currentMusicData.singerName}}</marquee>
                </div>
            </div>
        </div>
        <div class="bottomBar-r">
            <span class="iconfont" :class="playClassName" @click.stop="controlAudio"></span>
            <span class="iconfont icon-bofangliebiao" @click.stop="showPlayList"></span>
        </div>
    </div>
    <!-- 当前播放列表 -->
    <playList :isShow=showMask @displayMask="displayMask"></playList>
  </div>
</template>
<script>
import playList from "./components/playList.vue"
import drawMenu from "./views/menu.vue"
import {mapState, mapMutations} from 'vuex'
export default {
    data(){
        return{
            active:"Recommends",
            
            isPlayPage:false,   
            playClassName:"icon-zanting1",//播放/暂停类名
            showMask : false,//遮罩
            hideHead : false ,//显示/隐藏 头部
        }
    },
    components:{
        playList,
        drawMenu,
    },
    computed:{
        
        ...mapState({
            isShowMenu : state => state.menuLogin.isShowMenu,
            isShowMask : state => state.menuLogin.isShowMask
        })
        
    },
    watch:{
        $route:{
            handler:function(to){
                // 底部播放栏
                this.isPlayPage = to.name!="playpage" && this.currentMusicData.url != "";
                // 是否显示头部
                this.hideHead = to.name != "Recommends" && to.name != "Rank" && to.name != "Search";
                if(this.audio.paused){
                    this.playClassName = "icon-bofang1";
                }else{
                    this.playClassName = "icon-zanting1";
                }
                // 歌词是否播放
                if(this.$store.state.song_details.currentLyric){
                    this.$store.state.song_details.currentLyric.togglePlay();
                }
                let that =this;
                // 当音频结束停止
                this.audio.onended = function(){
                    that.playClassName = "icon-bofang1";
                    this.pause();
                    // 歌词是否播放
                    if(that.$store.state.song_details.currentLyric){
                        that.$store.state.song_details.currentLyric.togglePlay();
                    }
                }

                let navList = ["Recommends","Rank","Search"];
                //修复刷新导航栏重置
                if(navList.includes(to.name)){
                    this.active = to.name
                }
            },

            immediate:true
        }
    },
    methods:{
        ...mapMutations(["changeMenu","changeMask"]),
        displayMask(){
            this.showMask = !this.showMask;
        },
        //点击导航栏，路由根据name值跳转
        clickMusic(name){
            this.$router.push({
                name:name
            })
        },
        // 控制音频
        controlAudio(){
            if(this.audio.paused){
                this.playClassName = "icon-zanting1";
                this.audio.play();
            }else{
                this.playClassName = "icon-bofang1";
                // 当前歌词所在高亮行初始化
                this.currentMusicData.lyricLineNum = 0;
                this.audio.pause();
            }
            // 歌词是否播放
            if(this.$store.state.song_details.currentLyric){
                this.$store.state.song_details.currentLyric.togglePlay();
            }            
        },
        // 显示当前播放列表
        showPlayList(){
            this.showMask = true;
        },
        showPlayPage(){
            // 跳转路由
            this.$router.push({
                name: "playpage",
                params: { id: 123 }
            });
        },
        showMenu(){
            this.changeMenu()
            this.changeMask()
        },
        outMenu(){
            this.changeMenu()
            this.changeMask()
        }
    },
    async created(){
        const baseurl = ' http://localhost:3000'  //https://netease.bluej.cn
        let res = await this.$axios(baseurl+`/personalized?limit=6`)
        this.$store.commit("get_Sheet",res.data.result)
        let res1 = await this.$axios(baseurl+'/personalized/newsong')
        this.$store.commit("get_newsong",res1.data.result)
    }
  }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto;
  width: 100%;
  height: 100%;
  .mask{
        width: 100vw;
        height: 100vh;
        background-color: black;
        opacity: 0.5;
        position: fixed;
        z-index: 3;
    }
  .menuBox{
      width: 50%;
      height: 100%;
      background-color: skyblue;
  }
  
    
    // 侧滑菜单
    menu{
        width: 60vw;
        height: 100vh;
        background-color: salmon;
        position: absolute;
        z-index: 4;
    }
      }
.hide{
    display: none;
}
#nav{
    position: absolute;
    width: 100%;
    overflow:auto;
    z-index: 2; 
    border-bottom: 1.5px solid #E8E9E9;
    div{
        .van-tab--active{
            color: #DD001B;
        }
    }
    .top{
      width: 100vw;
      height: 45px;
      background-color: rgb(224, 58, 77);
      position: relative;

      .icon-caidan{
        position: absolute;
        left: 16px;
        top: 14px;
        color: white;
        font-weight: bold;
    }
    }
}
.content{
    margin-bottom: 8vh;
}
.bottomBar{
    width: 100%;
    height: 8vh;
    position: fixed;
    background-color: white;
    border-top: 1px solid #dfdfdf;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .bottomBar-l{
        .circular{
            width: r(90);
            height: r(90);
            position: absolute;
            top: 50%;
            left: r(10);
            transform: translateY(-50%);
            border-radius: 50%;
            overflow: hidden;
        }
        .opt{
            width: r(400);
            font-size: r(30);
            position: absolute;
            left: r(110);
            top: 50%;
            transform: translateY(-50%);
            text-align: left;
            .singerBox{
                width:100%;
                height:r(50);
                line-height:r(50);
                overflow:hidden;
                position:relative;
                .singerName{
                    font-size: r(25);
                    white-space: nowrap;
                    word-wrap: break-word;
                    word-break: break-all;
                    color: #a0a0a0;
                    position:absolute;
                    top:0;
                    left:0;
                }
            }
        }
    }
    .bottomBar-r{
        width: 22vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            font-size: r(70);
            line-height: r(85);
        }
    }
}
</style>
