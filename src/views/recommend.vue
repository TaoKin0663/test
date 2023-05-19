<template>
    <div class="title_1">
        <banner :data = bannerData></banner>
        <h2>推荐歌单</h2>
        
        <div  class="songSheet" >
            <loading v-if="!songsheet"></loading>
            <songSheet v-else  v-for='(item,idx) in songsheet' :key='idx' :myid='item.id' 
            :myname='item.name' :mypic='item.picUrl' :mycount='item.playCount'>
            </songSheet>
        </div>
        <div class="newSongList">
            <h2>推荐音乐</h2>
            <songlist v-for='(item,idx) in newsonglist' :key='idx' 
            :songName='item.name' :singer='item.song.artists' :album='item.song.album.name' :id='item.id'
            :data="$store.state.newsonglist"
            :type="'recommend'"
            >
            </songlist>
        </div>
    </div>
</template>
<script>
import songSheet from '../components/recomend/songSheet.vue'
import songlist from '../components/hot-music/song-list.vue'
import loading from "../components/loading.vue"
import banner from "../components/banner.vue"
export default {
    components:{
       songSheet,
       songlist,
       loading,
       banner,
    },
    mounted(){
        this.$store.dispatch("get_bannerData");
    },
    computed:{
        songsheet(){
            return this.$store.state.songsheet
        },
        newsonglist(){
            return this.$store.state.newsonglist
        },
        bannerData(){
            return this.$store.state.get_banner.bannerData;
        }
    }
}
</script>
<style lang="scss">
    .title_1{
        margin-top: r(185);
        text-align: left;
        h2{
            position: relative;
            font-size: r(38);
            padding-left: 9px;
            padding-top: r(20);
            margin-bottom: r(14);
            font-weight: normal;
            &::after{
                content: "";
                position: absolute;
                background-color: #d33a31;
                width: r(4);
                height: 50%;
                left: 0;
                bottom: 0;
            }
        }
    }
    .songSheet{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: r(40);
    }
    .newSongList{
        h2{
            margin-top: 0;
        }
    }
.songSheet {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: r(40);
}
.newSongList {
  h2 {
    margin-top: 0;
  }
}
</style>