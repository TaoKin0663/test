import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from "../views/recommend.vue"
import hotsong from "../views/hotsong.vue"
import search from "../views/search.vue"
import playpage from "../views/playpage.vue"
import detailed from "../views/detailed.vue"
import rank from "../views/rank.vue"
import login from "../views/login.vue"
import detalied_creatorinfo from "../views/detalied_creatorinfo.vue"
import detailed_Board from "../views/detailed_Board.vue"
import detailed_songs_checkbox from '../components/recomend/detailed_songs_checkbox.vue'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
    //重定向
    {
        path: '/',
        redirect: '/recommend',//设置默认指向的路径
    },
    // 推荐音乐
    {
        path: "/recommend",
        name:'Recommends',
        component: recommend
    },
    // 热歌
    {
        path: "/hotsong",
        name:"HotSong",
        component: hotsong
    },
    // 搜索
    {
        path: "/search",
        name:"Search",
        component: search
    },
    // 播放页面
    {
        path:"/song/:id",
        name:"playpage",
        component:playpage
    },
    // 歌单详情页
    {
        path:"/song_detailed/:id",
        name:"detailed",
        component:detailed,
    },
    // 歌单 简介 页
    {
        path:"/detalied_creatorinfo/:id/:userId",
        name:"detalied_creatorinfo",
        component:detalied_creatorinfo,
    },
    // 留言板
    {
        path:"/detailed_Board/:id",
        name:"detailed_Board",
        component:detailed_Board
    },
    // 多选页面
    {
        path:"/detailed_songs_checkbox/:id",
        name:"detailed_songs_checkbox",
        component:detailed_songs_checkbox
    },
    {
        path:"/rank",
        name:"Rank",
        component:rank
    },
    {
        path:"/login",
        name:"login",
        component:login
    }
    // {
    //     path:'/rankDetail',
    //     name:"rankDetail",
    //     component:() => import('../views/hotsong.vue'),
    // }
]

const router = new VueRouter({
    routes
})



export default router
