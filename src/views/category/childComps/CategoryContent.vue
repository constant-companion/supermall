<template>
  <div id="CategoryContent">
    <scroll class="content" ref="scroll">
      <div class="right">
        <van-grid :column-num="2">
          <van-grid-item v-for="(item,index) in contentList" :key="index"
                         @click.native="gotoLink(item.link)">
            <img v-lazy="item.image" class="img-content" @load="imageLoad"/>
            <div class="title-content">{{item.title}}</div>
          </van-grid-item>
        </van-grid>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll";
import Vue from 'vue';
import {Grid, GridItem, Toast} from 'vant';

Vue.use(Grid);
Vue.use(GridItem);
export default {
  name: "CategoryContent",
  props: {
    contentList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      imageNumber: 0,
    }
  },
  methods: {
    imageLoad() {
      if (++this.imageNumber == this.contentList.length) {
        this.$refs.scroll.refresh();
      }
    },
    gotoLink(link) {
      setTimeout(() => {
        window.location.href = link
      },2000)
      Toast('声明：2s之后将会跳转到蘑菇街的页面！！！');
    }
  },
  components: {
    Scroll
  },
  mounted() {
    this.$nextTick(function () {
      this.$on('backTop', function () {
        this.$refs.scroll.scroll.scrollTo(0, 0, 0)
      })
    })
  }
}
</script>

<style scoped>
.right {
  width: 100%;
  display: flex;
}

.content {
  overflow: hidden;
  height: calc(100vh - 97px);
}

.img-content {
  width: 100%;
}

.title-content {
  font-size: 18px;
  margin-top: 20px;
}
</style>
