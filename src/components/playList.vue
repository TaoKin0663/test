<template>
  <!-- 遮罩层 -->
  <van-overlay :show="isShow"
               @click.stop="changShow">
    <!-- 当前播放列表 -->
    <div class="playList" @click.stop="">
      <p class="opt">当前播放<span>({{playList.length}})</span></p>
      <ul class="musicInfo">
        <li v-for="(item, index) in playList"
            :key="index">
          <div class="content-l">
            <p class="songName">{{item.songName}}<span class="singerName">-{{formatSingerName(item.ar)}}</span></p>
          </div>
          <div class="content-r"></div>
        </li>
      </ul>
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: ["isShow"],
  computed:{
      playList:function(){
          return this.$store.state.currentPlayList[0] || [];
      }
  },
  methods: {
    changShow () {
      this.$emit("displayMask");
    },
    formatSingerName (artArr = []) {
        if (!(artArr instanceof Array)) {
            return artArr
        }
        else {
            let res = "";
            artArr.forEach(el => {
                res += `${el.name}` + " / ";
            });
            return res.slice(0, res.length - 2);
        }
    }
  },
}
</script>

<style lang="scss" scoped>
// 遮罩层
.van-overlay {
  z-index: 2;
  // 当前播放猎
  .playList {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: absolute;
    padding: r(35) r(20);
    width: 90vw;
    height: 55vh;
    left: 50%;
    bottom: 10vw;
    border-radius: r(55);
    transform: translateX(-50%);
    background-color: white;
    .opt {
        text-align: left;
        font-size: r(35);
        font-weight: bold;
        margin-bottom: r(20);
        span {
            font-size: r(30);
            margin-left: r(10);
            color: #7f7f7f;
        }
    }
    .musicInfo {
        height: 100%;
        font-size: 0;
        overflow: auto;
        li {
            width: r(500);
            display: flex;
            justify-content: space-between;
            height: r(65);
            line-height: r(65);
            .content-l{
                width: 100%;
                display: flex;
                justify-content: start;
                text-align: left;
                .songName{
                    white-space: nowrap;
                    overflow: hidden; 
                    text-overflow: ellipsis;
                    font-size: r(35);
                }
                .singerName{
                    white-space: nowrap;
                    overflow: hidden; 
                    text-overflow: ellipsis;
                    font-size: r(28);
                    color: #7f7f7f;
                }
            }
        }
    }
  }
}
</style>