<template>
<div v-if="Object.keys(goods).length !== 0" class="base-info">
  <div class="info-title">{{ goods.title }}</div>
  <div class="info-price">
    <span class="n-price">{{goods.newPrice}}</span>
    <span class="o-price">{{goods.oldPrice}}</span>
    <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
  </div>
  <div class="info-other">
    <span>{{goods.columns[0]}}</span>
    <span>{{goods.columns[1]}}</span>
    <span>{{goods.services[goods.services.length-1].name}}</span>
  </div>
  <div class="info-service">
    <span class="info-service-item" v-for="index in goods.services.length-1"
          :key="index">
      <img :src="goods.services[index-1].icon">
      <span>{{goods.services[index-1 ].name}}</span>
    </span>
  </div>
</div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info {
  margin-top:15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222
}
.info-price {
  margin-top: 10px;
  position: relative;
}
.info-price .n-price {
  font-size:24px;
  color: #d4237a;
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.discount{
  position: absolute;
  top: -6px;
  background-color: #d4237a;
  display: inline-block;
  border-radius: 10%;
  color: white;
  margin-left: 10px;
  padding: 4px;
}
.info-other{
  margin-top: 20px;
  display: flex;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
}
.info-other span{
  flex: 1;
  font-size: 15px;
}
.info-other span:nth-child(2){
  text-align: center;
}
.info-other span:nth-child(3){
  text-align: right;
}
.info-service{
  margin-top: 20px;
  margin-bottom: 20px;
}
.info-service-item img{
  width: 12px;
}
.info-service-item{
  font-size: 12px;
  margin-right: 6px;
  text-align: left;
}
</style>
