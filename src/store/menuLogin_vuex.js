export let menuLogin = {
    state:{
        isShowMenu:false,   //是否显示抽屉菜单
        isShowMask:false,   //是否显示点击抽屉后的遮罩
    },
    mutations:{
        changeMenu(state){
            state.isShowMenu = !state.isShowMenu
        },
        changeMask(state){
            state.isShowMask = !state.isShowMask
        },
        closeMenuMask(state){
            state.isShowMask = false;
            state.isShowMenu = false 
        }
    },
    actions:{
    }
}