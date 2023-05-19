export let searchHide = {
    state: {
        toggle:1   //1为默认显示，2为模糊搜索，3为搜索结果
    },
    mutations: {
        changeToggle(state){
            state.toggle = 2;
        },
        close_changeToggle(state){
            state.toggle = 1;
        },
        result_changeToggle(state){
            state.toggle = 3;
        }
    },
    actions: {
    },
    modules: {
    }
}
// export default { searchTagList }