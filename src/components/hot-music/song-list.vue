<template>
  <li @click="play_music(id)">
    <div class="item">
      <div v-if="displayNum" class="item-l">{{num | formatId}}</div>
      <div class="item-c">
        <p class="song-name">{{songName}}</p>
        <p class="album">{{artistFormat(singer)}}-{{album}}</p>
      </div>
      <div class="item-r">
        <span></span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  /*
        id  歌曲id
        num 歌曲序号
        songName 歌曲名称
        singer 歌手
        album 专辑
        displayNum 是否渲染id
        data 当前播放列表的数据
        type 类型 推荐音乐、热搜榜、热搜
    */
  props: ["id", "num", "songName", "singer", "album", "displayNum","data","type"],
   data(){
     return{
      //  rankPic:'../../assets/image/hot-music/opt.png'
     }
   },
  filters: {
    // 格式化ID
    formatId(val) {
      return val.toString().length == 1 ? "0" + val : val;
    }
  },
  components:{
  },
  computed:{
  },
  methods: {
    artistFormat(artArr = []) {
      if (!(artArr instanceof Array)) {
        return artArr;
      } else {
        let res = "";
        artArr.forEach(el => {
          res += `${el.name}` + " / ";
        });
        return res.slice(0, res.length - 2);
      }
    },
    async play_music(songid) {
        // 派发事件
        await this.$store.dispatch("get_song_details_data", songid);
        await this.$store.dispatch("get_song_url", songid);
        await this.$store.dispatch("get_currentLyricData",songid);
        this.$store.state.currentPlayList = [];
        if(this.type == "hotsong"){
            this.$store.state.currentPlayList.push(
                this.data.map(el=> {
                   return {id:el.id,songName:el.name,ar:el.ar}
                })
            );
        }else if(this.type == "recommend"){
            this.$store.state.currentPlayList.push(
                this.data.map(el=> {
                   return {id:el.id,songName:el.name,ar:el.song.artists}
                })
            ); 
        }else if(this.type == "search"){
             this.$store.state.currentPlayList.push(
                this.data.map(el=> {
                   return {id:el.id,songName:el.name,ar:el.artists}
                })
            );
        }
        this.currentMusicData.idx = -1;
        for(var i = 0;i<this.$store.state.currentPlayList[0].length-1;i++){
            if(this.$store.state.currentPlayList[0][i].id == songid){
                this.currentMusicData.idx = i;
                break;
            }
        }
        // 跳转路由
        this.$router.push({
            name: "playpage",
            params: { id: songid }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
  border-bottom: 1px solid #f0f0f1;
  list-style: none;
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0 r(10);
    .item-l {
      width: 10%;
      font-size: r(35);
      display: flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: center;
    }
    .item-c {
      width: 82%;
      text-align: left;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: r(15) 0;
      .song-name {
        font-size: r(35);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .album {
        font-size: r(25);
        color: #8b8b8b;
      }
    }
    .item-r {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 10%;
      span {
        display: inline-block;
        width: r(85);
        height: r(60);
        background: url("../../assets/image/hot-music/opt.png") no-repeat;
        background-size: r(420);
        background-position-x: r(-50);
      }
    }
  }
}
</style>