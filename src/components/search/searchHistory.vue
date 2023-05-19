<template>
    <ul class="historyBox">
        <li class="historyItem">
            <i class="iconfont icon-shijian"></i>
            <div @click="getResult(item)" class="pBox">
                <p >{{item}}</p>
            </div>
            <i @click="delHistory(idx)" class="iconfont icon-icon_guanbi"></i>
        </li>
    </ul>
</template>
<script>
export default {
    props:['item','idx'],
    data(){
        return{
            historyList:[]
        }
    },
    computed:{
    },
    created() {
        this.historyList = JSON.parse(localStorage.getItem("searchWorld")) || []
    },
    methods: {
        delHistory(index){
            this.$emit("del",index)
        },
        getResult(record){
            
            this.$store.commit("iptChange",record)
            this.$store.dispatch('getSearchResult',record);
            this.$store.commit("result_changeToggle");
            this.$store.commit("addVal",record)
            // this.$store.commit('iptChange',)  
        }
    },
}
</script>
<style lang="scss" scope>
.historyBox{
    margin-top: 10px;
}
    .historyItem{
        display: flex;
        font-size: r(28);
        height: r(80);
        line-height: r(80);
        padding: 0 20px;
        i{
            color: #e8e9ea;
        }
        .icon-icon_guanbi{
            color: #c8c9ca;
        }
        .pBox{
            border-bottom: 1px solid #f1f2f3;
            width: 100%;
            text-align: left;
            display: flex;
            justify-content: space-between;
            p{
                margin-left: 20px;
            }
        }
    }
</style>