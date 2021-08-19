<template>
  <nav-bar class="detail-nav">
    <div slot="left-nav" @click="titleback" class="back-img">
      <img src="../../../assets/img/common/back.svg" alt="">
    </div>
    <div slot="center-nav" class="title">
      <div v-for="(item, index) in title"
           class="title-item"
           :class="{active: CurrentIndex == index}"
           @click="titleClick(index)">{{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";
export default {
  name: "DetailsNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      title: ['商品','参数','评论','推荐'],
      CurrentIndex: 0
    }
  },
  methods: {
    //点击激活选中状态
    titleClick(index) {
      this.CurrentIndex = index;
      //点击发送事件
      this.$emit('navClick', index)
    },
    //返回
    titleback() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.detail-nav{
  position: relative;
  z-index: 2;
  background-color: white;
}
.title{
  display: flex;
}
.title-item{
  flex: 1;
}
.active{
  color: #d4237a;
}
.back-img img{
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
</style>
