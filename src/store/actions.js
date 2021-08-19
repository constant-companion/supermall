export default  {
  //不能直接修改state，通过context
  addCart(context, payload) {
    let Product = null;
    for(let item of context.state.cartList) {
      if (item.iid === payload.iid) {
        Product = item;
      }
    }
    if(Product){
      //提交到mutation
      context.commit('AddCount',Product);
    }else{
      payload.Count = 1;
      context.commit('AddToCart',payload)
    }
  }
}
