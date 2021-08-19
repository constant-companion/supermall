<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: "Scroll",
  props: {
    //父组件决定是否监听(封装起来传参)
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    }),
    // 滚动监听
    this.scroll.on('scroll', (position) => {
      //把位置信息通过自定义事件发出去
      this.$emit('scroll', position);
    })

    //上拉加载更多监听
    this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp');
    })
  },
  methods: {
    // 回到顶部方法封装
    scrollTo(x, y, time = 500) {
      // 加上this.scroll &&防止组件还没创建之前调用报错
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 上拉加载更多完成结束事件，使下一次上拉生效方法封装
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //监听每一张图片请求完成刷新scroll滚动高度
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
}
</script>

<style scoped>

</style>
