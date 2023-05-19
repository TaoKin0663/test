<template>
  <div class="newsong">
    <div class="pic">
      <img :src="songdetailed.coverImgUrl" />
    </div>
    <div class="photo">
      <div>
        <img :src="songdetailed.coverImgUrl" />
        <i class="iconfont icon-erji">{{get_playcount}}</i>
      </div>
      <div class="word">
        <div class="word-top">
          <p>{{songdetailed.name}}</p>
        </div>
        <div class="middle">
          <img :src="songdetailed.creator.avatarUrl" alt />
          <p>{{songdetailed.creator.nickname}}</p>
        </div>
        <div class="bottom" @click="creatorinfo(songdetailed.id,songdetailed.userId)">
          <p>简介</p>
        </div>
      </div>
    </div>
    <div class="middle_column">
      <!-- 评论区 -->
      <div class="comment" @click="Broad(songdetailed.id)">
        <p class="iconfont icon-liuyan1"></p>
        <span>{{comment.comments.length}}</span>
      </div>
      <div class="share_more" @click="sharemyFri">
        <p class="iconfont icon-fenxiang"></p>
        <span>分享</span>
      </div>
      <div>
        <p class="iconfont icon-xiazai"></p>
        <span>下载</span>
      </div>
      <div>
        <p class="iconfont icon-duoxuankuang" @click="checkbox(songdetailed.id)"></p>
        <span>多选</span>
      </div>
    </div>
    <songlist
      v-for="(item,idx) in tracks"
      :key="idx"
      :songName="item.name"
      :singer="item.ar"
      :album="item.al.name"
    ></songlist>
    <!-- 返回上一页 -->
    <div class="iconfont icon-fanhui backup" @click="backgo">
      <!-- <p>上一页</p> -->
    </div>
    <!-- 分享 -->
    <div class="share" v-show="open">
      <div class="share_not_touch">
        <div class="share_methods">
          <i class="iconfont  icon-pengyouquan"></i>
          <i class="iconfont  icon-weibo"></i>
          <i class="iconfont icon-QQkongjian"></i>
        </div>
        <p @click="close">不想分享了</p>
      </div>
    </div>
  </div>
</template>
<script>
import songlist from "../components/hot-music/song-list.vue";
export default {
  data(){
    return {
      open:''
    }
  },
  components: {
    songlist
  },
  async created() {
    const baseurl = ' http://localhost:3000'  //https://netease.bluej.cn
      let songsheet = await this.$axios(
        baseurl+`/playlist/detail?id=${this.$route.params.id}`
      );
      // console.log(11111111111111,songsheet)
      // 此处,在Vuex中,将下面 songsheet.data.playlist 赋值给了 this.$store.state.songdetailed
      this.$store.commit("get_detailed", songsheet.data.playlist);
  },
  methods: {
    creatorinfo(id, userId) {
      this.$router.push({
        name: "detalied_creatorinfo",
        params: {
          id: id,
          userId: userId
        }
      });
    },
    // 跳转至评论区
    Broad(id) {
      this.$router.push({
        name: "detailed_Board",
        params: {
          id: id
        }
      });
    },
    backgo() {
      this.$router.go(-1);
    },
    close(){
      this.open = false
    },
    sharemyFri(){
      this.open = true
    },
    checkbox(id){
      this.$router.push({
        name:"detailed_songs_checkbox",
        params:{
          id:id
        }
      })
    }
  },
  computed: {
    comment() {
      // console.log(this.$store.state.recomment)
      return this.$store.state.albumRecomment.commentData;
    },
    tracks() {
      return this.$store.state.songdetailed.tracks;
    },
    songdetailed() {
      return this.$store.state.songdetailed;
    },
    get_playcount(){
      return this.$store.state.get_playcount
    }
  }
};
</script>
<style lang="scss">
.newsong {
  position: relative;
  .share {
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.7);
    position: absolute;
    left: 0;
    top: 0;
    .share_not_touch {
      width: 80%;
      height: 100px;
      margin: 0 auto;
      background-color: gray;
      position: absolute;
      top: 30%;
      left: 10%;
      border-radius: 10px;
      .share_methods {
        i {
          font-size: r(100);
          padding: 0 20px;
        }
      }
      p{
        font-size: r(40);
        padding-top: r(20);
      }
    }
  }
  .backup {
    font-size: r(50);
    // background-color: skyblue;
    position: absolute;
    left: r(12);
    top: 0;
  }
  .pic {
    width: 100%;
    height: r(380);
    overflow: hidden;
    img {
      width: 100%;
      filter: blur(20px);
      transform: translateY(-60px);
    }
  }
  .photo {
    width: 100%;
    position: absolute;
    top: r(46);
    left: r(20);
    overflow: hidden;
    display: flex;
    div {
      width: r(300);
      img {
        width: 100%;
        border-radius: 50%;
      }
      i {
        position: absolute;
        right: r(28);
        bottom: 0;
        color: white;
        font-size: 12px;
      }
    }
    &::before {
      content: "歌单";
      color: white;
      background-color: red;
      width: 1rem;
      font-size: 16px;
      transform: scale(0.8);
      position: absolute;
      border-radius: 5px;
      left: -5px;
    }
    .word {
      font-size: r(25);
      .word-top {
        text-align: left;
        width: r(400);
        p {
          color: white;
          padding-left: r(30);
          font-size: r(35);
          display: inline-block;
          padding-right: 5px;
        }
      }
      .middle {
        display: flex;
        vertical-align: middle;
        padding-top: r(30);
        margin-left: r(30);
        width: r(400);
        transform: translateY(r(20));
        &::after {
          content: " >";
          color: white;
          display: flex;
          align-items: center;
          transform: translateY(2px);
        }
        p {
          padding-right: r(10);
        }
        img {
          border-radius: 50%;
          width: r(60);
        }
        p {
          font-size: r(20);
          line-height: r(30);
          padding-top: r(20);
          color: white;
          white-space: nowrap;
        }
        span {
          padding-top: r(20);
        }
      }
      .bottom {
        width: r(400);
        padding-right: r(10);
        padding-top: r(10);
        text-align: left;
        p {
          font-size: r(35);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          color: white;
          padding-left: r(30);
          padding-top: r(40);
          &::after {
            content: ">";
          }
        }
        span {
          position: absolute;
          right: r(232);
          bottom: r(28);
        }
      }
    }
  }
  .middle_column {
    padding-top: 5px;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    font-size: 0;
    .comment {
      p {
        font-size: r(60);
      }
      span {
        font-size: r(32);
      }
    }
    p {
      font-size: r(50);
      padding-top: (4px);
    }
    span {
      font-size: r(20);
    }
  }
}
</style>