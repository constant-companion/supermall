<template>
<div class="goods-item" @click="goodsitemClick">
  <img v-lazy="ImgShow" alt="" @load="ImgLoaded">
  <div class="goods-info">
    <p>{{ goodsitem.title }}</p>
    <span class="price">{{ goodsitem.price }}</span>
    <span class="collect">{{ goodsitem.cfav }}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsitem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ImgShow() {
      //关于组件数据一些不重合的地方可用计算属性
      return this.goodsitem.image || this.goodsitem.show.img;
    }
  },
  // 监听每一张图片加载完成，发送事件总线到home（改进 =》 根据路由发送事件总线）
  methods: {
    ImgLoaded() {
      if( this.$route.path.indexOf('home') === 1){
        this.$bus.$emit('homeitemImgLoaded')
      }
      else if( this.$route.path.indexOf('details') === 1) {
        this.$bus.$emit('detailImgLoaded')
      }
    },
    goodsitemClick() {
      this.$router.push('/details/' + this.goodsitem.iid)
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
  /*border:3px solid hotpink;*/
}
.goods-info {
  font-size: 15px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: hotpink;
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
