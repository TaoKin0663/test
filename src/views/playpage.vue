<template>
    <div>
        <div class="page">
            <!-- 返回 -->
            <div class="backbox">
                <div class="backbtn" @click.prevent="backFn">
                    <p class="iconfont icon-zuojiantou"></p>
                </div>
                <div class="info">
                    <p>{{currentMusicData.name}}</p>
                    <span>{{currentMusicData.singerName}}</span>
                </div>
            </div>
            <!-- 背景 -->
            <div style="overflow:hideen">
                <div class="bg" :style="{backgroundImage: 'url(' + currentMusicData.picUrl + ')' }"></div>
            </div>
            <!-- 圆 -->
            <div class="circular-bg">
                <div class="circular" :style="{transform:'rotateZ(' +angle +'deg)'}">
                    <div class="imgWrap">
                        <img :src=currentMusicData.picUrl alt="">
                    </div>
                </div>
            </div>
            <!-- 歌词 -->
             <!-- :style="{transform:'translateY('+$store.state.song_details.translateLyric+'px)'}" -->
            
            <div class="lyric" ref="lyric">
                    <p v-for="(line,index) in currentLyric.lines" ref="lyricLine"
                        v-bind:key="index"
                        :class="{'current':currentMusicData.lyricLineNum===index}"  
                        class="text"
                       
                    >
                        {{line.txt}}
                    </p>
            </div>
            <!-- 底部播放模块 -->
            <div class="audio-box" @click.stop="">
                <!-- <audio id="audio-tag" :src=urlData[0].url autoplay></audio> -->
                <div class="box-t" @click.stop="">
                    <span class="timed">{{timed}}</span>
                    <div class="progress-box">
                        <div class="progress" v-bind:style='"max-width:"+progress+"%"'
                         @touchmove="touchmoveBar"
                         @touchend="touchmoveEndBar"
                        >
                        </div>
                    </div>
                    <span class="audio-time">{{$store.state.song_details.duration}}</span>
                </div>
                <div class="box-b">
                    <!-- <div class="play-order iconfont icon-suijibofang"></div> -->
                    <div class="control">
                        <p class="last-song iconfont icon-shangyiqu101" @click.stop="lastSong"></p>
                        <p class="play-song iconfont " v-bind:class="playSongClassName" @click.stop="controlAudio"></p>
                        <p class="next-song iconfont icon-xiayiqu101" @click.stop="nextSong"></p>
                    </div>
                    <!-- <div class="play-list iconfont icon-PlayListbofangliebiao"></div> -->
                </div>
            </div>
        </div>
        <div class="Tips" v-show="isShowTips">
            <span>{{Tips}}</span>
        </div>
    </div>
</template>
<script>
// 引入歌词插件
import Lyric from 'lyric-parser';
export default {
    data(){
        return {
            urlData:[],
            playSongClassName : "icon-zanting1",
            timed:"00:00",//播放过的时间
            second:"0",     //秒 播放过的时间
            progress:0,//播放进度样式
            timer : null ,//计时器
            angle : 0,//旋转角度
            timerRotate : null ,//旋转计时器
            Tips : "",//提示内容
            isShowTips : false,//是否提示
        }
    },
    computed:{
        currentLyric(){
            return this.$store.state.song_details.currentLyric || {lines:[]}
        }
    },
    methods:{
        // 提示
        showTips(isShow,msg){
            this.Tips = msg;
            this.isShowTips = isShow;
        },
        // 返回上一页
        backFn(){
            this.$router.go(-1);
            this.$store.commit("result_changeToggle");
        },
        // 控制音频
        controlAudio(){
            if(this.audio.paused){
                this.playSongClassName = "icon-zanting1";
                this.audio.play();
                this.setTimed();                
            }else{
                this.playSongClassName = "icon-bofang1";
                this.audio.pause();
                clearInterval(this.timer);
                clearInterval(this.timerRotate);
            }
            // 歌词是否播放
            if(this.$store.state.song_details.currentLyric){
                this.$store.state.song_details.currentLyric.togglePlay();
            }
            this.isAnimate = !this.isAnimate;
            if(!this.audio.paused){
                // 同步下歌词
                this.syncLyrics();
            }
        },
        // 格式化歌手名称 防止多个歌手
        formatName:function(arr=[]){
            if(!arr){return ""}
            let res = "";
            arr.forEach(el=>{res += el.name + " / "});
            return res.toString().slice(0,res.length-2);
        },
        // 设置当前歌曲时长
        setAudioTime(time){
            this.$store.state.song_details.duration = this.formatAudioTime(time,"needCalc");
        },
        // 格式化时间
        formatAudioTime(time,Symbol="no"){
            let audioTime = parseInt(time);
            // 转换分秒
            let m = parseInt(audioTime / 60) ;
            let s = audioTime % 60 ;
            if(Symbol=="needCalc"){
                this.currentMusicData.step = 100 / (m*60 +s);
            }
            if(m == 0){
                m = "00"
            }else if(m<10){
                m = "0" + m;
            }
            if(s < 10){
                s = "0" + s;
            }
            return `${m}:${s}`
        },
        // 计时器
        setTimed(){
            this.timer = setInterval(() => {
                this.timed =this.formatAudioTime(++this.second);
                this.progress+=this.currentMusicData.step;
                if(this.timed == this.$store.state.song_details.duration){
                    clearInterval(this.timer);
                    clearInterval(this.angle);
                }
            }, 1000);
            this.timerRotate = setInterval(() => {
                this.angle+=0.5;
            }, 16.6);
        },
        // 拖动进度条
        touchmoveBar(event){
            const parentTag = event.target.parentNode;//父元素 （进度条容器）
            const events = event.targetTouches[0].pageX - parentTag.offsetLeft // 获得触摸拖动的距离
            const touwidth = (event.target.offsetWidth / parentTag.clientWidth) // 计算进度条所在比例
            this.second = this.audio.duration * touwidth;//必须给，用于结束拖动后继续的播放世间,不然会跳回去
            this.timed =this.formatAudioTime(this.second); // 通过所在比例赋值给音频应在的播放时间
            this.progress = (events / parentTag.clientWidth) * 100;//必须给，用于进度条动画，不然动画会跳回去
            event.target.style.maxWidth = `${this.progress}%` // 计算进度条所在比例宽度
            this.playSongClassName = "icon-bofang1";
            this.audio.pause();
            clearInterval(this.timer);
            clearInterval(this.timerRotate);
        },
        // 进度条拖动结束
        touchmoveEndBar(event){
            const touwidth = (event.target.offsetWidth / event.target.parentNode.clientWidth) // 计算进度条所在比例
            this.audio.currentTime = this.audio.duration * touwidth // 通过所在比例赋值给音频应在的播放时间
            this.controlAudio();
            this.syncLyrics();//同步歌词
        },
        // 下一首
        async nextSong(){
            if(this.currentMusicData.idx == -1){return}
            if(this.$store.state.currentPlayList[0].length-1 == this.currentMusicData.idx){ 
               this.showTips(true,"已经是最后一首哦");
                // 2秒后把提示隐藏掉
                setTimeout(() => {
                    this.isShowTips =  false
                }, 2000);
                return
            }
            // 清空
            this.second = 0;
            this.timed = "00:00";
            this.progress = 0;
            // 清空定时器
            clearInterval(this.timer);
            clearInterval(this.timerRotate);
            this.currentMusicData.idx +=1;
            let songid = this.$store.state.currentPlayList[0][this.currentMusicData.idx].id;
            // 派发事件请求
            await this.$store.dispatch("get_song_details_data", songid);
            await this.$store.dispatch("get_song_url", songid);
            await this.$store.dispatch("get_currentLyricData",songid);
            this.iniPlayInfo();
            this.playSongClassName = "icon-zanting1";
            this.setTimed();
        },
        // 上一首
        async lastSong(){
            if(this.currentMusicData.idx == -1){return}
            if(this.currentMusicData.idx ==0){
                this.showTips(true,"已经是第一首哦");
                // 2秒后把提示隐藏掉
                setTimeout(() => {
                    this.isShowTips =  false
                }, 2000);
                return
            }
            // 清空之间
            this.second = 0;
            this.timed = "00:00";
            // 清空定时器
            clearInterval(this.timer);
            clearInterval(this.timerRotate);
            this.progress = 0;
            this.currentMusicData.idx -=1;
            let songid = this.$store.state.currentPlayList[0][this.currentMusicData.idx].id;
            // 派发事件请求
            await this.$store.dispatch("get_song_details_data", songid);
            await this.$store.dispatch("get_song_url", songid);
            await this.$store.dispatch("get_currentLyricData",songid);
            this.iniPlayInfo();
            this.playSongClassName = "icon-zanting1";
            this.setTimed();
        },
        // 初始化播放信息 并且 播放
        iniPlayInfo(){
            this.currentMusicData.url = this.$store.state.song_details.song_url_data[0].url;
            this.currentMusicData.picUrl = this.$store.state.song_details.song_details_data.al.picUrl;
            this.currentMusicData.name = this.$store.state.song_details.song_details_data.name;
            this.currentMusicData.singerName = this.formatName(this.$store.state.song_details.song_details_data.ar);
            this.currentMusicData.id = this.$store.state.currentPlayList[0][this.currentMusicData.idx].id;
            this.setSrcAndPlay(this.currentMusicData.url);
            this.$nextTick(()=>{
                this.getLyric();
                // 新歌曲时候初始化滚动位置
                if(this.$refs.lyric){
                    this.$refs.lyric.scrollTop = 0;
                }
            })
        },
        // 
        getLyric:function(){
            if(this.$store.state.song_details.currentLyric){
                this.$store.state.song_details.currentLyric.stop();
            }
            // 新建歌词对象
            this.$store.state.song_details.currentLyric = new Lyric(this.$store.state.song_details.currentLyricData.lrc.lyric,this.handleLyric);
            // 如果当前歌曲为播放状态，调用歌词对象的播放方法，播放歌词
            if (!this.audio.paused) {
                this.$store.state.song_details.currentLyric.play();
            }
        },
        // 
        handleLyric:function({lineNum}){
            if(this.audio.paused){
                return
            }
            // console.log("当前播放歌词位置",lineNum);
            this.currentMusicData.lyricLineNum = lineNum;
            if (lineNum > 4) {
                if(this.$refs.lyric){
                    this.$refs.lyric.scrollTop += this.$refs.lyricLine[lineNum].clientHeight;
                }
            }
        },
        // 同步歌词
        syncLyrics(){
            // 音频进度条同步歌词
            if(this.$store.state.song_details.currentLyric){
                this.$store.state.song_details.currentLyric.seek(this.audio.currentTime*1000);
                let currentLine = this.currentMusicData.lyricLineNum
                this.$nextTick(()=>{
                    if(this.currentMusicData.lyricLineNum > 4 && this.$refs.lyric){
                        this.$refs.lyric.scrollTop = 0;
                        for(var i = 0;i<currentLine-4;i++){
                            this.$refs.lyric.scrollTop += this.$refs.lyricLine[i].clientHeight;
                        }
                    }
                });
            }
        },
    },
     created(){
        // 同一首歌则当前继续播放
        if(this.$store.state.song_details.song_details_data.id != this.currentMusicData.id){
            this.currentMusicData.lyricLineNum = 0;
            this.iniPlayInfo();
        }else{
            this.getLyric();
            // 音频进度条同步歌词
            this.syncLyrics();
        }
        // 拿到vuex数据给data
        let that = this;
        this.audio.oncanplay =  function(){
            that.setAudioTime(this.duration);
        };
        // 当音频结束停止
        this.audio.onended = function(){
            that.playSongClassName = "icon-bofang1";
            that.audio.pause();
            // 初始化
            that.currentMusicData.step = 0;
            clearInterval(that.timer);
            clearInterval(that.timerRotate);
            // 歌词是否播放
            if(that.$store.state.song_details.currentLyric){
                that.$store.state.song_details.currentLyric.togglePlay();
            }
            // 播放完进入下一首
            that.nextSong();
        }
        this.second= this.audio.currentTime;
        if(this.audio.paused){
            this.playSongClassName = "icon-bofang1";
            this.timed =this.formatAudioTime(this.second);
            clearInterval(this.timer);
            clearInterval(this.angle);
            this.progress=this.currentMusicData.step * this.second;
        }else{
             this.playSongClassName = "icon-zanting1";
            if(this.currentMusicData.step != 0){
                this.progress=this.currentMusicData.step * this.second;
            }
            this.setTimed();
        }
    },
    destroyed(){
        clearInterval(this.timer);
        clearInterval(this.angle);
    },
}
</script>
<style lang="scss" scoped>
    .backbox{
        height: r(120);
        padding-top:r(20);
        padding-left: r(10);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        font-size: 0;
        .backbtn{
            height: r(100);
            margin-right: r(5);
            p{
                font-size: r(50);
                color: white;
                line-height: r(100);
            }
        }
        .info{
            margin: auto;
            p,span{
                font-size: r(32);
                color: white;
                text-align: left;
            }
            span{
                display: block;
                transform: scale(0.8);
                transform-origin: left;
                color: #909090;
            }
        }
    }
    .page{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        .bg{
            position: absolute;
            top: 0px;
            left: 0px;
            height: 110%;
            width: 110%;
            margin: -5%;
            background-size: cover;
            filter: blur(15px) brightness(0.5);
            z-index: -1;
        }
        .circular-bg{
            width: r(420);
            height: r(420);
            border-radius: 50%;
            background-color: rgba(255, 255,255, 0.06);
            position: relative;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            .circular{
                overflow: hidden;
                width: r(400);
                height: r(400);
                position: absolute;
                margin: auto;
                left: -999px;
                right: -999px;
                top: -999px;
                bottom: -999px;
                border-radius: 50%;
            }
        }
        // 自定义播放模块样式
        .audio-box{
            width: 100%;
            height: 16vh;
            padding: 0 r(50);
            position: absolute;
            bottom: 0;
            .box-t{
                display: flex;
                justify-content: space-between;
                position: relative;
                .timed{
                    font-size: r(32);
                    transform: scale(0.9);
                    transform-origin: center;
                    color: white;
                }
                .audio-time{
                    font-size: r(32);
                    color: #9d9d9d;
                    transform: scale(0.9);
                    transform-origin: center;
                }
                .progress-box{
                    width: 68%;
                    height: 1.4px;
                    position: absolute;
                    margin: auto;
                    top: -999px;
                    right: -999px;
                    left: -999px;
                    bottom: -999px;
                    background-color:#8d8d8d;
                    .progress{
                        height: 100%;
                        background-color: white;
                        position: relative;
                    }
                    .progress::after{
                        content: "";
                        width: r(20);
                        height: r(20);
                        display: block;
                        border-radius: 50%;
                        background-color: white;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }
            .box-b{
                height: r(150);
                line-height: r(150);
                display: flex;
                justify-content: space-around;
                color: white;
                .next-song,.last-song{
                    font-size: r(55);
                }
                .control{
                    width: 70%;
                    display: flex;
                    justify-content: space-between;
                    .play-song{
                        font-size: r(130);
                    }
                }
            }
        }
    }
    @keyframes Tips{
        0%{
            opacity: 0;
        }
        50%{
            opacity: 100%;
        }
        100%{
            opacity: 0;
        }
    }
    .Tips{
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: r(30);
        animation: Tips 2s linear;
    }
    // 歌词
    .lyric{
        width: 80vw;
        height: 40vh;
        position: absolute;
        left: 50%;
        bottom: 18vh;
        transform: translateX(-50%);
        overflow-y: auto;
        p{
            font-size: r(30);
            line-height: r(60);
            color: #9c9c9c;
        }
        // 当前播放歌词
        .current{
            color: white;
            font-size: r(32);
        }
    }
</style>