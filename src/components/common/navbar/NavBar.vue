<template>
<div class="navbar">
  <div class="left-nav">
    <slot name="left-nav"></slot>
  </div>
  <div class="center-nav">
    <slot name="center-nav"></slot>
  </div>
  <div class="right-nav">
    <slot name="right-nav"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.navbar{
  height: 44px;
  line-height: 44px;
  display: flex;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100,100,100,.2);
}
.left-nav, .right-nav{
  width: 60px;
}
.center-nav{
  flex: 1;
}
</style>
