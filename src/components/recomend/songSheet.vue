<template>
  <div class="Sheet">
    <a @click="nextone(myid)">
      <div>
        <div class="pho">
          <img :src="mypic" />
        </div>
        <p>{{myname}}</p>
        <span class="iconfont icon-erji">{{numberFormat}}</span>
        <!-- <span class="iconfont icon-erji">{{mycount}}</span> -->
      </div>
    </a>
  </div>
</template>
<script>
export default {
  props: ["myid", "myname", "mypic", "mycount"],
  computed: {
    numberFormat: function() {
      var param = {};
      var k = 10000,
        sizes = ["", "万", "亿", "万亿"],
        i;
      if (this.mycount < k) {
        param.num = this.mycount;
        param.unit = "";
      } else {
        i = Math.floor(Math.log(this.mycount) / Math.log(k));
        param.num = (this.mycount / Math.pow(k, i)).toFixed(2);
        param.unit = sizes[i];
      }
      return param.num + param.unit;
    }
  },
  methods: {
    async  nextone(myid) {
      this.$store.commit("get_count", this.numberFormat); 
      this.$router.push({
        name: "detailed",
        params: {
          id: myid
        }
      });
      this.$store.dispatch("get_comment", myid);
    }
  }
};
</script>
<style lang="scss">
.Sheet {
  width: 33%;
  font-size: 0;
  a {
    color: black;
    display: inline-block;
    margin-bottom: r(30);
    div {
      position: relative;
      .pho {
        background-color: red;
        img {
          width: 100%;
        }
      }
      p {
        font-size: r(28);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      span {
        font-size: r(10);
        position: absolute;
        right: 0;
        top: 0;
        color: white;
      }
    }
  }
}
</style>
