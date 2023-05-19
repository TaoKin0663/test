// 获取当前设备系统 ios 或 andriod
function appSource() {
    const u = navigator.userAgent;
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
        return "ios";
    } else {
        return "andriod";
    }
}
let banner_type = appSource() == "ios" ? 2 : 1;
const baseurl = ' http://localhost:3000'  //https://netease.bluej.cn
let api = {
    // 热门歌单列表API
    get_hot_music_list : baseurl+"/top/list?idx=",
    // 获取歌曲详情
    get_song_details : baseurl+"/song/detail?ids=",
    get_hot_search_list : baseurl+'/search/hot/detail',
    // 获取歌曲url
    get_song_url :baseurl+"/song/url?id=",
    get_search_list:baseurl+'/search?keywords=',
    // 获取歌曲歌词
    get_song_pyric :baseurl+ "/lyric?id=",
    // 获取排行榜
    get_rank_detail:baseurl+'/toplist/detail',
    //获取登录用户信息
    get_userInfo : baseurl+'/login/cellphone?',
    /*
        获取轮播图
        type:资源类型,对应以下类型,默认为 0 即PC
        tip:先不考虑 pc ipad
        0: pc
        1: android
        2: iphone
        3: ipad  
    */ 
    get_banner:baseurl+'/banner?type='+banner_type,
}

export {api}