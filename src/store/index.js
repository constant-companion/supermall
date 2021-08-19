import Vue from 'vue';
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
Vue.use(Vuex)

const state = {
  cartList: [],
  profileInfo: [
    {
      title: '我的余额',
      num: '0.00',
      unit: '元'
    },
    {
      title: '我的优惠券',
      num: '0',
      unit: '张'
    },
    {
      title: '我的积分',
      num: '0',
      unit: '分'
    }
  ]
}

//创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
