<template>
    <li class="item-box">
        <div class="item-l">
            <div class="imgBox imgWrap">
                <img :src="itemList.coverImgUrl" alt="">
            </div>
            <p class="updateTime">{{itemList.updateFrequency}}</p>
        </div>
        <div class="item-r">
            <li v-for="(item,idx) in itemList.tracks" :key="idx">
                {{idx+1}}.{{item.first}}&nbsp;-&nbsp;{{item.second}}
            </li>
        </div>
    </li>
</template>
<script>
export default {
    props:['itemList']
}
</script>
<style lang="scss" scoped>
    .item-box{
        list-style: none;
        display: flex;
        padding-left: r(20);
        .item-l{
            position: relative;
            .imgBox{
                width: r(200);
                height: r(200);
                margin-top: r(16);
                font-size: 0;
                img{
                    border-radius: 8px;
                }
            }
            .updateTime{
                position: absolute;
                bottom: r(14);
                left: r(14);
                color: white;
            }
        }
        .item-r{
            margin-left: 10px;
            margin-top: r(16);
            li{
                font-size: r(24);
                width: r(450);
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                height: r(70);
                line-height: r(70);
            }
        }
    }
</style>