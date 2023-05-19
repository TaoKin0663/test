<template>
    <div class="search-box">
        <!-- 搜索框 + 模糊搜索 -->
        
        <searchInput v-on:sendMsg="add"></searchInput>
        <!-- 标题 -->
        <div v-show="$store.state.search_vuex.toggle == 1" class="title">
            <p>热门搜索</p>
        </div>
        <!-- 热搜词 -->
        <div class="hotBox">
            <hotSearch 
                v-show="$store.state.search_vuex.toggle == 1" 
                v-for="(item,idx) in hotSearchData" 
                :key="item.score"  
                :hotData="item"
                :index="idx"
            ></hotSearch>
        </div>
        
        <!-- 搜索记录 -->

        <searchHistory 
            v-show="$store.state.search_vuex.toggle == 1" 
            v-for="(item,idx) in historySearch" 
            v-on:del="delHistory" 
            :key="idx" 
            :item='item' 
            :idx="idx"
        ></searchHistory>
        <!-- 搜索结果 -->

        <songList
            v-show="$store.state.search_vuex.toggle == 3"
            v-for="(item) in searchResult"
            v-bind:songName= item.name
            v-bind:singer= item.artists
            v-bind:album = item.album.name
            v-bind:displayNum = false
            :key='item.id'
            :id="item.id"
            :data="searchResult"
            :type="'search'"
            >
            </songList>
    </div>
</template>
<script>
import searchInput from '../components/search/searchInput.vue'
import hotSearch from '../components/search/hotSearch.vue'
import searchHistory from '../components/search/searchHistory.vue'
import songList from '../components/hot-music/song-list.vue'
export default {
    components:{
        hotSearch,
        searchHistory,
        searchInput,
        songList,
    },
    data(){
        return{
            value:'',
            historySearch:[],
            isLoading:true
        }
    },
    watch: {
    },
    methods: {
        add(val){
            this.historySearch = val;
        },
        delHistory(index){
            this.historySearch.splice(index,1);
            localStorage.setItem('searchWorld', JSON.stringify(this.historySearch));
        },
    },
    computed: {
        //计算搜索结果
        searchResult(){
           return  this.$store.state.search_vuex.setSearchData;
        },
        //计算热搜结果
        hotSearchData(){
            return this.$store.state.search_vuex.hotSearch
        },
    },
    async created() {
        await this.$store.dispatch("get_hot_search");
        this.historySearch = JSON.parse(localStorage.getItem("searchWorld")) || []
    },
}
</script>
<style lang="scss" scope>
    .search-box{
        margin-top: r(180);
        font-size: 0;
        text-align: left;
    }
    .hotBox{
        padding-left: 20px;
    }
    .title{
            text-align: left;
            font-size: r(28);
            p{
                padding: r(20);
            }
        }
    .van-search{
        margin-bottom: 10px;
        border-bottom: 1px solid #eff0f0;
            .van-search__content{
                border-radius: 20px;
            }

    }
</style>