<template>
    <keep-alive>
        <div class="nav">
            <div class="opt-bg" :style="{backgroundImage:'url('+bg_url+')'}">
                <p class="up-date">{{up_date}}</p>
            </div>
            <ul>
                <loading v-if="!data.length"></loading>
                <songList
                    v-else
                    v-bind:id=item.id
                    v-bind:num=index+1
                    v-bind:songName=item.name
                    v-bind:singer=item.ar
                    v-bind:album=item.al.name
                    v-bind:displayNum=true
                    v-bind:data = data
                    v-bind:type="'hotsong'"
                    v-for="(item, index) in data" :key="index"
                >
                </songList>
            </ul>
        </div>
    </keep-alive>
</template>
<script>
import songList from "../components/hot-music/song-list.vue"
import loading from "../components/loading.vue"
export default {
    data(){
        return{
            data:[]
        }
    },
    async created(){
        await this.$store.dispatch("get_hot_music_list_data",this.$route.query.id);
        this.data = this.$store.state.hot_music_list.hot_music_list_data;
    },
    components:{
        songList,
        loading,
    },
    computed:{
        bg_url:function(){
            return this.$store.state.hot_music_list.option.bg_url
        },
        up_date:function(){
            return this.$store.state.hot_music_list.option.updatedTime
        },
        bannerData(){
            return this.$store.state.get_banner.bannerData;
        }    
    }
}
</script>

<style scoped lang="scss">
    .opt-bg{
        width: 100vw;
        height: r(340);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;
        overflow: hidden;
        .up-date{
            color:white;
            font-size: r(26);
            text-align: left;
            position:absolute;
            bottom: r(10);
            left: r(20);
        }
    }
    .loading{
        position: fixed;
        top: 0;
        left: 0;
        background:url("../assets/image/loading4.svg")  center center no-repeat;
        width: 100vw;
        height: 100vh;
        z-index: 1000;
    }
    
</style>