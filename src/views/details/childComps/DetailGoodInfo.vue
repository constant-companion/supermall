<template>
  <div v-if="Object.keys (detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
    <div class="start"></div>
    <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
  </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index"
           :src="item"
           @load="imgLoad" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailGoodInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0, //记录图片加载的数量
      imagesLength: 0 //记录要加载的图片数量，通过watch监听
    }
  },
  methods: {
    imgLoad(){
      if(++this.counter === this.imagesLength){
        this.$emit('ImageLoaded');
      }
    }
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
.goods-info{
  background-color: white;
}
.info-desc{
  padding: 40px 20px;
  position: relative;
}
.desc{
  font-size: 13px;
}
.info-key{
  padding: 10px 20px;
}
.info-list img{
  width: 100%;
  height: auto;
}
</style>
