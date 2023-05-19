<template>
  <div class="all">
    <div class="iWantoSay" :style="{backgroundImage:'url(' + songdetailed.coverImgUrl +')'}"></div>
    <div class="pic">
      <div class="imgbox">
        <img :src="songdetailed.coverImgUrl" />
      </div>
      <div class="myword">
        <p>{{ songdetailed.name }}</p>
      </div>
      <div class="tage">
        <p>标签:</p>
        <span v-for="(item,idx) in songdetailed.tags" :key="idx">{{item}}</span>
      </div>
      <!-- 简介介绍 -->
      <div class="mywords">
        <p>{{ songdetailed.description }}</p>
      </div>
    </div>
    <button @click="back">返回</button>
  </div>
</template>
<script>
export default {
  computed: {
    songdetailed(){
      return this.$store.state.songdetailed
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
.all {
  z-index: 3;
  position: fixed;
  .iWantoSay {
    position: relative;
    width: 110%;
    height: 110%;
    background-size: auto 110%;
    transform-origin: center;
    background-repeat: no-repeat;
    transform: translateX(-10px);
    position: fixed;
    filter: blur(10px);
    overflow: hidden;
    z-index: -1;
  }
  .pic {
    padding: r(20);
    .imgbox {
      width: r(360);
      margin: 0 auto;
      padding-top: r(170);
      img {
        width: 100%;
      }
    }
  }
  .myword {
    padding-top: r(20);
    font-size: r(30);
    color: white;
    padding-bottom: r(20);
    opacity: 0.8;
  }
  .tage {
    display: flex;
    color: white;
    opacity: 0.8;
    font-size: r(30);
    text-align: left;
    padding-top: r(20);
    span {
      text-align: center;
      background-color: rgba($color: white, $alpha: 0.3);
      border-radius: r(20);
      margin-left: r(20);
      padding: 0 13px;
    }
  }
  .mywords {
    text-align: left;
    color: white;
    opacity: 0.8;
    font-size: r(30);
    padding-top: r(60);
    p {
      line-height: 25px;
    }
  }
  button {
    width: r(100);
    font-size: r(20);
    border-radius: r(20);
    background-color: rgba($color: white, $alpha: 0.3);
  }
}
</style>