<template>
  <div class="all">
    <div class="ground_white">
      <div class="mybackimg" :style="{backgroundImage:'url(' + songdetailed.coverImgUrl +')'}"></div>
      <div class="detailed_title" @click="push">
        <div class="pic">
          <img :src="songdetailed.coverImgUrl" alt />
        </div>
        <div class="world">
          <div class="song_name">
            <p>{{songdetailed.name}}</p>
          </div>
          <div class="songer_name">
            <p>{{songdetailed.creator.nickname}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 留言 -->
    <div class="margin_top">
      <div class="user_borad" @click="add">
        <p>精彩评论</p>
      </div>
      <div v-show="recommentData.hotComments.length!=0">
        <detaileboradlist
          v-for="(item,idx) in recommentData.hotComments.slice(0,a)"
          :key="idx"
          :user_name="item.user.nickname"
          :time="item.time"
          :user_word="item.content"
          :user_img="item.user.avatarUrl"
        ></detaileboradlist>
      </div>
      <div class="giveMeMore">
        <p @click="moresongs" v-if="a<recommentData.hotComments.length">点击展开更多评论</p>
        <p v-else></p>
      </div>
      <div v-show="recommentData.hotComments.length==0" class="notComment">
        <p>暂时还没有精彩评论噢!</p>
      </div>
      <div class="user_comment">
        <h5>评论</h5>
        <detaileboradlist
          v-for="(item,idx) in recommentData.comments.slice(0,b)"
          :key="idx"
          :user_name="item.user.nickname"
          :time="item.time"
          :user_word="item.content"
          :user_img="item.user.avatarUrl"
        ></detaileboradlist>
      </div>
       <div class="giveMeMore">
        <p @click="moresong" v-if="b<recommentData.comments.length">点击展开更多评论</p>
        <p v-else></p>
      </div>
    </div>
  </div>
</template>
<script>
import detaileboradlist from "../components/recomend/detaile_Borad_List";
export default {
  created() {
    console.log("this.$store.state.songdetailed",this.$store.state.songdetailed)
  },
  data() {
    return {
      a: 3,
      b: 10
    };
  },
  components: {
    detaileboradlist
  },
  methods: {
    push() {
      this.$router.go(-1)
    },
    add() {
      // console.log("recomment", this.$store.state.recomment.comment.data);
      // console.log("热门评论",this.$store.state.Boradlist.userword.data.hotComments);
    },
    moresongs() {
      this.a += 3;
    },
    moresong(){
      this.b += 3;
    }
  },
  computed: {
    songdetailed() {
      return this.$store.state.songdetailed;
    },
    recommentData() {
      return this.$store.state.albumRecomment.commentData;
    }
  }
};
</script>
<style lang="scss">
.all {
  z-index: 3;
  width: 100%;
  position: relative;
  background: rgba($color: skyblue, $alpha: 0.4);
  .ground_white {
    width: 100%;
    background-color: white;
    position: fixed;
    .mybackimg {
      filter: blur(3px);
      height: r(140);
    }
    .detailed_title {
      &::after {
        content: ">";
        font-size: r(40);
        transform: translateY(35%);
        color: white;
        padding-right: r(12);
      }
      width: 100%;
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 0;
      .pic {
        width: r(150);
        padding: r(20);
        img {
          width: 100%;
        }
      }
      .world {
        padding: r(20);
        padding-left: 0;
        text-align: left;
        color: white;
        width: 100%;
        line-height: r(46);
        .song_name {
          p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            font-size: r(30);
          }
        }
        .songer_name {
          p {
            font-size: r(10);
            opacity: 0.8;
          }
        }
      }
    }
  }
  // background-color: rgba($color: #000000, $alpha: 0.8);
  .margin_top {
    // margin-top: r(200);
    padding-top: r(140);
    // background  : rgba($color: skybule, $alpha: 0.5);
    .user_borad {
      p {
        font-size: r(35);
        text-align: left;
        padding: r(20);
        font-weight: bold;
      }
    }
    .giveMeMore {
      p {
        font-size: r(20);
      }
    }
    .notComment {
      p {
        font-size: r(20);
      }
    }
    .user_comment {
      text-align: left;
      h5 {
        font-size: r(35);
        text-align: left;
        // padding: r(20);
        font-weight: bold;
      }
    }
  }
}
</style>