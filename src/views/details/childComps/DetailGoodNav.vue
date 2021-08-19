<template>
  <van-goods-action>
    <van-goods-action-icon icon="chat-o" text="客服" dot @click="chatClick"/>
    <van-goods-action-icon icon="cart-o" text="购物车" :badge="CartCount" @click="cartClick"/>
    <van-goods-action-icon icon="shop-o" text="店铺" badge="12" @click="shopClick"/>
    <van-goods-action-button type="warning" color="#C46E99" text="加入购物车" @click="AddCart"/>
    <van-goods-action-button type="danger" color="#d4237a" text="立即购买" @click="buyNow"/>
  </van-goods-action>
</template>

<script>
import Vue from 'vue';
import { GoodsAction, GoodsActionIcon, GoodsActionButton, Toast } from 'vant';
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Toast)
export default {
  name: "DetailGoodNav",
  props: {
    CartCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    AddCart() {
      this.$emit('AddCart')
      Toast.success('添加成功');
    },
    chatClick() {
      Toast('功能还未完善，sorry');
    },
    cartClick() {
      this.$router.push('/cart')
    },
    shopClick() {
      Toast('功能还未完善，sorry');
    },
    buyNow() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style>
.van-info{
  background-color: #d4237a;
}
</style>
