<template>
    <div class="nav">
        <div class="rank_page">
            <banner :data = bannerData></banner>
            <h2>排行榜</h2>
            <loading v-if="!showRankData.length"></loading>
            <rank-item v-for="(item, index) in showRankData" 
            :key="index"
            :itemList="item"
            @click.native="toRankList(item.name,item.coverImgUrl,item.updateFrequency)"
            ></rank-item>

            
            <div class="newSongList">
            <h2>推荐音乐</h2>
            <loading v-if="!newsonglist"></loading>
            <songlist v-for='(item,idx) in newsonglist' :key='idx' 
            :songName='item.name' :singer='item.song.artists' :album='item.song.album.name' :id='item.id'>
            </songlist>
        </div>
        </div>
    </div>
</template>
<script>
import rankItem from '../components/hot-music/rank-item.vue'
import {api} from '../assets/http/api.js'
import loading from "../components/loading.vue"
import {rankIndex} from "../assets/rankList.js"
import songlist from '../components/hot-music/song-list.vue'
import banner from "../components/banner.vue"
export default {
    data(){
        return{
            showRankName: [
                '云音乐新歌榜',
                '云音乐热歌榜',
                '云音乐飙升榜',
                '网易原创歌曲榜'
            ],
            showRankData:[]
        }
    },
    created(){
        this.$axios(api.get_rank_detail).then(res=>{
            this.showRankData = res.data.list.filter(item=>this.showRankName.includes(item.name));
            
        })
    },
    components:{
        rankItem,
        loading,
        songlist,
        banner
    },
    methods:{
        toRankList(name,url,time){
            let idx = rankIndex.get(name);
            // 修改vuex
            this.$store.commit("set_option",{url,time});
            this.$router.push({
                name:"HotSong",
                query:{
                    id:idx
                }
            })
        }
    },
    computed:{
        newsonglist(){
            return this.$store.state.newsonglist
        },
        bannerData(){
            return this.$store.state.get_banner.bannerData;
        }
    }
}
</script>
<style lang="scss" scoped>
    .rank_page{
        margin-top: r(185);
        font-size: r(24);
        text-align: left;
        h2{
            padding-left: r(20);
        }
    }
</style>