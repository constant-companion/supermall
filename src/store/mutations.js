export default {
  //不适合做复杂操作(适合做跟踪数据),异步操作或者复杂操作放到actions
  AddCount(state, payload) {
    payload.Count += 1;
  },
  AddToCart(state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
}
