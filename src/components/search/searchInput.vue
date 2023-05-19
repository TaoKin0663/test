<template>
    <div>
        <van-search v-model="value" @search="onSearch"  placeholder="请输入搜索关键词" />

        <!-- 通过状态值来决定是否渲染出来   1为默认显示，2为模糊搜索，3为搜索结果-->
        <ul class="mohuBox" v-show="$store.state.search_vuex.toggle == 2">
            <li>搜索"{{value}}"</li>

            <li v-for="(item,idx) in mohuList" :key="idx">
                <p><i class="iconfont icon-search"></i></p>
                <p @click="getResult(item)">{{item.name}}--{{item.artists[0].name}}</p>
            </li>
        </ul>
        
    </div>
</template>
<script>
import {api} from '../../assets/http/api.js'
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
// import {mapState} from 'vuex'
export default {
    data(){
        return{
            msg:'',
            value:'',   //input的值
            historySearch:[],//历史记录搜索
            mohuList:[],     //模糊搜索
            isMohu:true ,
            historyList1:[]
           }
    },
    methods: {
        ...mapMutations(['setSearchData',
                        'iptChange',
                        'clearData',
                        'changeToggle',
                        'close_changeToggle',
                        'result_changeToggle',
                        'clearData']),
        // 点击事件
        onSearch(){
            //向数组里添加input输入的内容
            this.historySearch.unshift(this.value);
            //将数组添加到本地存储中
            localStorage.setItem("searchWorld",JSON.stringify(this.historySearch));
            //向父组件传递此数组，方便父组件的兄弟组件(searchHistory)拿到数据并循环遍历渲染出来
            this.$emit('sendMsg',this.historySearch);
            //将input框输入的值派发到vuex的state中的inputVal里,
            // this.$store.commit('getSearchKey',this.value)
            //将vuex里的inputVal值存放在songName
            // let songName = this.$store.state.search_vuex.inputVal;

            //通过派发事件，将input框输入的值发送到vuex里，vuex里通过此关键字拼接api接口进行请求
            this.$store.dispatch("getSearchResult",this.value)
            //通过派发事件改变v-show的判断条件，改为3，即显示搜索结果页
            this.$store.commit('result_changeToggle')
        },
        // 点击模糊搜索里的内容，搜索结果
        getResult(data){
            // 获取模糊搜索中的name值，通过name值来搜索，获取搜索结果
            let world = data.name;
            this.$store.dispatch("getSearchResult",world)
            // 改变v-show的状态值为3，即显示搜索结果页
            this.$store.commit("result_changeToggle")
        }
    },
    computed: {
        ...mapGetters(["iptValue","msg1"]),
        // ...mapState({
        //     msg2 : state => state.search_vuex.msg
        // })
    },
    
    //监听input框，当里面的值改变时，会有一个新值newVal
    watch: {
        value:{
            handler(){
                //将改变的值发出存放vuex里
                this.iptChange(this.value);
                
                
                // 当值不为空时
                if(this.value != ''){
                    // 先清除之前的搜索记录，初始化数组
                    this.clearData();
                    //如果需要模糊搜索，改变v-show的状态为2，即能显示模糊搜索
                    if(this.isMohu ==true){
                        this.changeToggle();
                    //不需要模糊搜索，改变v-show的状态为3，即显示结果
                    }else{
                        this.result_changeToggle()
                        this.isMohu = true
                    }
                    //拼接新值,请求搜索到的记录
                    this.$axios(api.get_search_list + this.value).then(res=>{
                        // 裁切请求到的数据5条
                        this.mohuList = res.data.result.songs.slice(0,5)
                    })
                }else{
                    // 当值为空时，改变v-show的状态值为1,即为默认显示的热搜和历史记录
                    this.close_changeToggle()
                }
            },
            immediate:true,
            deep:true
        },
        // vuex里getter中msg1的变化
        // msg(){
        //     console.log("wa",this.msg);
        // },
        msg1(){
            // 将改变的值赋给input绑定的value
            this.value = this.msg1;
            //将模糊搜索关闭
            this.isMohu = false;

            this.historySearch.push(this.value)
            this.historyList1 = JSON.parse(localStorage.getItem("searchWorld")) || [];
            
            this.historyList1.unshift(this.value)
            localStorage.setItem('searchWorld', JSON.stringify(this.historyList1))
            
        },
        // msg2(){
        //     this.value = this.msg2;
        //     this.isMohu = false;
        // }
    },
}
</script>
<style lang="scss">
    .van-search{
        border-bottom: 1px solid #eff0f0;
        .van-search__content{
            border-radius: 20px;
        }
    }
    .mohuBox{
        font-size: r(26);
        text-align: left;
        li{
            display: flex;
            height: r(80);
            line-height: r(80);
            p{
                &:first-child{
                    width: r(80);
                    text-align: center;
                }
                &:last-child{
                    width: 80%;
                    border-bottom: 1px solid silver;
                }
            }
        }
    }
</style>