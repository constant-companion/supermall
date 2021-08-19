<template>
  <div class="home-swipe">
    <van-swipe :autoplay="3000" indicator-color="#d4237a">
      <van-swipe-item v-for="(item, index) in banners" :key="index" class="van-swipe-item">
        <a :href="item.link">
          <img v-lazy="item.image" @load="ImgLoaded" />
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem, Lazyload  } from 'vant';
import 'vant/lib/index.css'
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload)
export default {
  name: "HomeSwipe",
  props: {
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    //向主页发送图片加载完成事件（有几张图片就会发几次）
    ImgLoaded() {
      this.$emit('ImgLoaded')
    }
  }
}
</script>

<style scoped>
.van-swipe-item {
  height: 180px;
}
.van-swipe-item img{
  width: 100%;
  height: auto;
}
</style>
