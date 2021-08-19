<template>
  <div class="home-swipe">
    <van-swipe :autoplay="3000" indicator-color="#d4237a">
      <van-swipe-item v-for="(item, index) in TopImgs" :key="index" class="van-swipe-item">
        <a>
          <img v-lazy="item"/>
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
  name: "DetailsSwipe",
  props: {
    TopImgs: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.van-swipe-item{
  height: 300px;
}
.van-swipe-item img{
  width: 100%;
  height: auto;
}
</style>
