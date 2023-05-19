import $axios from 'axios'
import { api } from '../assets/http/api.js'
export let searchTagList = {
    state: {
        ttt:111,
        hotSearch:[]
    },
    mutations: {
        setHotSearch(state,val){
            state.hotSearch = val;
        }
    },
    actions: {
        get_hot_search(context){
            $axios(api.get_hot_search_list).then(res=>{
                context.commit("setHotSearch",res.data.data.slice(0,10))
            })
        }
    },
    modules: {
    }
}
// export default { searchTagList }