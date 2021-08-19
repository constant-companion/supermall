<template>
  <div id="home">
    <div class="home-nav">
     <van-search
        v-model="value"
        shape="round"
        background="#d4237a"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </div>

    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      class="tabcontrol"
      v-show="isTabControlShow"
      ref="tabcontrol1"/>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="ContentScroll"
            :pull-up-load="true"
            @pullingUp="LoadMore">
      <!--  轮播图-->
      <home-swipe :banners="banners" @ImgLoaded="ImgLoaded"/>
      <!--    推荐-->
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <!--    本周流行-->
      <stylish></stylish>
      <!--    卡片导航控制-->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabcontrol2"/>
      <!--    商品展示-->
      <goods-list :goods="ShowGoods"></goods-list>
    </scroll>
    <!--    @click.native监听组件根元素的点击事件-->
    <back-top @click.native="backtopClick" v-show="isBackTopShow"/>

  </div>
</template>

<script>
//子组件
import HomeSwipe from "./childComps/HomeSwipe";
import HomeRecommendView from "./childComps/HomeRecommendView";
import Stylish from "./childComps/Stylish";
import BackTop from "../../components/content/backTop/BackTop";

//公共组件
import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
// 防抖
import { debounce } from '../../common/utils'
//路由请求
import { getHomeMultidata, getHomeGoods } from "../../network/home";
//搜素框
import Vue from 'vue';
import { Search, Toast } from 'vant';
Vue.use(Search);

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwipe,
    HomeRecommendView,
    Stylish,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      value: '',
      banners: [],
      recommends: [],
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []}
      },
      CurrentType: 'pop',
      isBackTopShow: false,
      tag: true,  //设置tag判断轮播图第一次加载完图片发过来事件就行了
      isTabControlShow: false,  //用来设置吸顶显示
      TabControlShowHeight: 0 //表示计算出来的吸顶移动距离
    }
  },
  computed: {
    ShowGoods() {
      return this.goods[this.CurrentType].list;
    }
  },
  //首页已经建立好了，该去请求home收据了,调用周期函数创建组件完成之后的时间
  created() {
    this.getHomeMultidatalist();
    this.getHomeGoodslist('pop');
    this.getHomeGoodslist('new');
    this.getHomeGoodslist('sell');
  },
  mounted() {
    // 通过事件总线监听每一张图片加载完成，刷新scroll动态计算滚动高度,并应用防抖
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('homeitemImgLoaded', () => {
      refresh();
    })
  },
  methods: {
    // 监听事件方法
    onSearch(){
      Toast({
        message: '敬请期待后续！！',
        icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.17qq.com%2Fimg_biaoqing%2F81260391.jpeg&refer=http%3A%2F%2Fwww.17qq.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621921530&t=7a3c55287fd63c009fe31a719c87ec97'
      });
    },
    tabClick(index) {
      switch (index){
        case 0: this.CurrentType = 'pop';break;
        case 1: this.CurrentType = 'new';break;
        case 2: this.CurrentType = 'sell';break;
      }
      //保持两个tabcontrol的CurrentIndex一致
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    //返回顶部监听
    backtopClick() {
      //获取scroll对象，调用对象方法实现回到顶部
        this.$refs.scroll.scrollTo(0, 0, 500)
    },
    // 监听滚动条位置事件
    ContentScroll(position) {
      this.isBackTopShow = Math.abs(position.y) > 700
      //判断吸顶，监听位置事件
      this.isTabControlShow = Math.abs(position.y) > this.TabControlShowHeight
    },
    //监听下拉加载更多
    LoadMore() {
      this.getHomeGoodslist(this.CurrentType);
      this.$refs.scroll.finishPullUp();
    },

    // 只要判断监听轮播图第一次加载完成图片就可以通知首页计算offsetTop距离,设置一个tag
    //此方法弃用，在滚动区域无法使用定位
    ImgLoaded() {
      if(this.tag){
        this.TabControlShowHeight = this.$refs.tabcontrol2.$el.offsetTop;
        console.log('首页类型导航条吸顶距离为：'+ this.TabControlShowHeight + 'px');
        this.tag = false;
      }
    },

    // 网络请求方法：
    //1. 请求多个数据(异步操作)
    getHomeMultidatalist() {
      getHomeMultidata().then( res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    //2. 请求类型商品数据
    getHomeGoodslist(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
       this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      })
    }

  }
}
</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
/*}*/
/*.home-nav{*/
/*  background-color: #d4237a;*/
/*  color: white;*/
  /*原生js滚动才会生效，使用better-scroll插件时，页面只会在滚动区域滚动，页面不会跟着滚动，即不用fixed属性*/
 /*position: fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  /*z-index: 1;*/
}
.home-nav{
  height: 54px;
}

/*定位适配*/
.content{
  position: absolute;
  top: 54px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

/*移动视口适配*/
/*#home{*/
/*  height: 100vh;*/
/*}*/
/*.content{*/
/*  height: calc(100% - 90px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/

.tabcontrol{
  position: relative;
  z-index: 1;
  transition: all .5s;
}
</style>
