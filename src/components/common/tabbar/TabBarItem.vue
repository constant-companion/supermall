<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!IsActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="ActiveStyle" >
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return{
      // IsActive: true,
    }
  },
  computed: {
    IsActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    ActiveStyle() {
      return this.IsActive ? {color: this.ActiveColor} : {}
    }
  },
  props: {
    path: String,
    ActiveColor: {
      type: String,
      default: '#d4237a'
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;

}
.tab-bar-item img{
  margin-top: 3px;
  width: 24px;
  height: 24px;
  /*图片下方会多出3px的距离*/
  vertical-align: middle;
}

</style>
