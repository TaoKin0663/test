<template>
        <li class="hotItem">
            <a @click.prevent="getResult(hotData)" href="">{{hotData.searchWord}}</a>
        </li>
</template>
<script>
// import {mapMutations} from 'vuex'
export default {
    props:['hotData','index'],
    data(){
        return{

        }
    },
    methods: {
        // ...mapMutations(['setSearchData']),
        getResult(data){
            let world = data.searchWord;
            // this.setSearchData(world);
            //点击热搜词搜索
            this.$store.dispatch('getSearchResult',world)
            //点击切换结果页，改变toggle值为3
            this.$store.commit("result_changeToggle")
            this.$store.commit("addVal",world)
            
            // this.historySearch.push(this.value)
            // this.historyList1 = JSON.parse(localStorage.getItem("searchWorld")) || [];
            // localStorage.setItem("searchWorld",JSON.stringify(world));
            // this.$store.commit('getResult',)
        }
        
        
    },
    computed: {
        hotSearchData(){
            return this.$store.state.search_vuex.hotSearch
        }
    }
}
</script>

<style lang="scss" scope>
        .hotItem{
            list-style: none;
            font-size: r(28);
            display: inline-block;
            padding: r(10) r(20);
            border: 1px solid silver;
            border-radius: 30px;
            margin: 0 r(20) r(10) 0;
            a{
                color: black;
            }
        }
</style>

