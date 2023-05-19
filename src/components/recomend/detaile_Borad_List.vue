<template>
  <div class="all-1" >
    <div class="user_img" >
      <img :src="user_img" alt />
    </div>
    <div class="content">
      <div class="user_name">
        <p>{{user_name}}</p>
        <p>{{time | formatDate}}</p>
      </div>
      <div class="user_word">
        <p>{{user_word}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["user_name", "time", "user_word", "user_img"],
  filters: {
    formatDate: function(value) {
      // 时间戳转换日期格式方法
      if (value == null) {
        return "";
      } else {
        let date = new Date(value);
        let y = date.getFullYear(); // 年
        let MM = date.getMonth() + 1; // 月
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate(); // 日
        d = d < 10 ? "0" + d : d;
        return y + "年" + MM + "月" + d + "日";
      }
    }
  },
};
</script>
<style lang="scss">
.all-1 {
  display: flex;
  width: 100%;
  text-align: left;
  font-size: 0;
  background: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
  .user_img {
    width: r(50);
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .content {
    .user_name {
      padding-left: r(14);
      p {
        font-size: r(10);
      }
    }
  }
  .user_word {
    background-color: rgba($color: pink, $alpha: 0.5);
    p {
      padding-left: r(14);
      font-size: 10px;
    }
  }
}
</style>