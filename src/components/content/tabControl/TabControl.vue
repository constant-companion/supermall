<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" class="tab-control-text" >
      <span :class="{active: index === currentIndex}" @click="itemClick(index)">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index);
    }
  }
}
</script>

<style scoped>
/*使用了scroll插件会使这个属性失效*/
/*.tab-control{*/
/*  display: flex;*/
/*  text-align: center;*/
/*  !*吸顶*!*/
/*  position: sticky;*/
/*  top: 44px;*/
/*  z-index: 1;*/
/*  background-color: white;*/
/*}*/
.tab-control{
  display: flex;
  text-align: center;
  background-color: white;
}
.tab-control-text{
  flex: 1;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
}
.tab-control-text span{
  padding: 5px;
}
.active{
  color: #d4237a;
  border-bottom: 2px solid #d4237a;
}
</style>
