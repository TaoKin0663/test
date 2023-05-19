<template>
  <div class="bottoms">
    <div v-for="(item,idx) in tracks" :key="idx">
      <label for="mybox" @click.prevent="point(idx)">
        <input type="checkbox" id="mybox" name="songs" :value="item.id" />
        <span class="iconfont icon-zhengque Yes" v-show="openData[idx]"></span>
        <p>{{item.name}}</p>
        <p>{{artistFormat(item.ar)}}-{{item.al.name}}</p>
      </label>
    </div>
    <!-- 返回上一页 -->
    <div class="iconfont icon-fanhui goback" @click="goback"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openData: []
    };
  },
  created() {
    // 将数值里的子项改为false
    this.openData = this.$store.state.songdetailed.tracks.map(() => false);
  },
  methods: {
    point(idx) {
      // 单独来点击为true，实现。$set()为即时更新视图
      this.$set(this.openData, idx, !this.openData[idx]);
    },
    artistFormat(artArr = []) {
      let res = "";
      artArr.forEach(el => {
        res += `${el.name}` + " / ";
      });
      return res.slice(0, res.length - 2);
    },
    goback() {
      this.$router.go(-1);
    }
  },
  computed: {
    tracks() {
      return this.$store.state.songdetailed.tracks;
    }
  }
};
</script>
<style lang="scss">
.bottoms {
  position: absolute;
  width: 100%;
  z-index: 4;
  background-color: pink;
  color: white;
  div {
      padding-top: r(40);
    label {
      position: relative;
      text-align: left;
      input {
        display: none;
      }
      span {
        color: black;
        font-weight: 300;
      }
      p {
        font-size: r(40);
        padding-left: r(100);
        &:last-child {
          font-size: r(20);
        }
      }
      .Yes {
        position: absolute;
        top: 10px;
        left: 0;
        transform: translateX(r(-360));
      }
      &::before {
        content: "";
        width: 15px;
        height: 15px;
        background-color: wheat;
        position: absolute;
        top: 10px;
        left: 0;
        transform: translateX(r(-360));
      }
    }
  }
}
</style>