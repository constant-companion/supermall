<template>
   <div id="details">
     <details-nav-bar @navClick="navClick" ref="nav"/>
     <scroll class="content" ref="detailScroll" @scroll="detailContent" :probe-type="3">
       <details-swipe :TopImgs="TopImgs"/>
       <detail-base-info :goods="goods"/>
       <detail-shop-info :shop="shop"/>
       <detail-good-info :detailInfo="detailInfo" @ImageLoaded="ImageLoaded"/>
       <detail-param-info :paramInfo="paramInfo" ref="params"/>
       <detail-comment-info :comment-info="commentInfo" ref="comment"/>
       <goods-list :goods="goodsRecommend" ref="recommend"/>
     </scroll>
     <back-top @click.native="backTopClick" v-show="isBackTopShow"/>
     <detail-good-nav class="detailGoodNav" @AddCart="AddCart" :cart-count="CartCount"/>
   </div>
</template>

<script>
//组件
import DetailsNavBar from "./childComps/DetailsNavBar";
import DetailsSwipe from "./childComps/DetailsSwipe";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";
import DetailGoodInfo from "./childComps/DetailGoodInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backTop/BackTop";
//数据请求
import { getGoodsDetails, Goods, Shop, GoodsParam, getGoodsRecommend} from "../../network/details";
import {debounce} from "../../common/utils";
//引入商品导航
import DetailGoodNav from "./childComps/DetailGoodNav";

export default {
  name: "Details",
  components: {
    DetailsNavBar,
    DetailsSwipe,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop,
    DetailGoodNav,
  },
  data() {
    return {
      iid: null,
      TopImgs: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsRecommend: [],
      getPositionY: [],
      currentIndex: 0,
      isBackTopShow: false
    }
  },
  created() {
    this.iid = this.$route.params.iid;
    getGoodsDetails(this.iid).then( res => {
      const data = res.result;
      this.TopImgs = data.itemInfo.topImages;
      //创建商品对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //创建商家信息对象
      this.shop = new Shop(data.shopInfo);
      //保存商品详情数据
      this.detailInfo = data.detailInfo;
      //保存商品参数数据
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      //保存商品评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0];
      }
    }),
      //请求推荐数据
    getGoodsRecommend().then((res) => {
      this.goodsRecommend = res.data.list;
    })
  },
  mounted() {
    // 通过事件总线监听每一张图片加载完成，刷新scroll动态计算滚动高度,并应用防抖
    const refresh = debounce(this.$refs.detailScroll.refresh, 500)
    this.$bus.$on('detailImgLoaded', () => {
      refresh();
    })
  },
  computed: {
    //计算购物车商品数量
    CartCount() {
      return this.$store.state.cartList.length;
    }
  },
  methods: {
    ImageLoaded() {
      //加载完最后一张图片重新计算滚动区域高度
      this.$refs.detailScroll.refresh();
      //加载完成计算点击导航滑动距离
      this.getPositionY = [];
      this.getPositionY.push(0);
      this.getPositionY.push(this.$refs.params.$el.offsetTop);
      this.getPositionY.push(this.$refs.comment.$el.offsetTop);
      this.getPositionY.push(this.$refs.recommend.$el.offsetTop);
      console.log('导航锚点定位距离:' + this.getPositionY)
    },
    navClick(index) {
      this.$refs.detailScroll.scrollTo(0, -this.getPositionY[index], 200);
    },
    //监听滚动位置事件
    detailContent(position) {
      const positoinY = -position.y
      let length = this.getPositionY.length;
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i &&
          ((i < length - 1 && positoinY >= this.getPositionY[i] && positoinY < this.getPositionY[i + 1]) ||
            (i === length - 1 && positoinY >= this.getPositionY[i]))) {
          this.currentIndex = i;
          this.$refs.nav.CurrentIndex = this.currentIndex
        }
      }
      //回到顶部
      this.isBackTopShow = Math.abs(position.y) > 1000
    },
    //回到顶部
    backTopClick() {
      this.$refs.detailScroll.scrollTo(0, 0, 500)
    },
    //加入购物车
    AddCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.TopImgs[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc ;
      product.price = this.goods.realPrice;
      product.oldprice = this.goods.oldPrice;
      product.iid = this.iid;
      //将商品添加到购物车
      //mutations里面不适合做复杂操作，推荐放到action里面
      //this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product)
    }
  }
}
</script>

<style scoped>
#details{
  position: relative;
  z-index: 2;
  background-color: white;
  height: 100vh;
}
.content{
  height: calc(100% - 94px);
}
.detailGoodNav{
  position: relative;
  z-index: 3;
}
</style>
