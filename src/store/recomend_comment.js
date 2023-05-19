import $axios from "axios"
// 歌单评论链接
let recomment = {
    state:{
        commentData:{
            comments:[]
        }
    },
    mutations:{
        get_recomments(state,data){
            state.commentData = data
        }
    },
    actions:{
        async get_comment(context,myid){
            const baseurl = ' http://localhost:3000'  //https://netease.bluej.cn
            let res = await $axios(baseurl+`/comment/playlist?id=${myid}`)
            console.log("修改专辑",res)
            let data = {
                comments: res.data.comments,
                hotComments: res.data.hotComments,
            }
            
            context.commit("get_recomments", data)
        }
    }
}
export {recomment}