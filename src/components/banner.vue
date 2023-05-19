<template>
<div>

    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide imgWrap" v-for="(item, index) in data" :key="index">
                <!-- {{index}} -->
                <img :src=item.pic alt="">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</div>
</template>

<script>
import Swiper from 'swiper';
import '../assets/swiper.min.css';
export default {
    props:["data"],
    mounted(){
        new Swiper ('.swiper-container', {
            autoplay: {
                delay: 10000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            loop:true,
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true//修改swiper的父a元素时，自动初始化swiper
        })
    },
}
</script>
<style lang="scss" scoped>
    .swiper-container{
        width:100vw;
        height:22vh;
        .swiper-slide{
            width:100%;
        }
    }
</style>