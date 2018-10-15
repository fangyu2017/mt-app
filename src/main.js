
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'

Vue.config.productionTip = false


Vue.use(VueRouter)

const routes=[
  {path:'/',redirect:'/goods'},//页面重定向
  {path:'/goods',component:Goods},
  {path:'/ratings',component:Ratings},
  {path:'/seller',component:Seller}

]
const router=new VueRouter({
  // mode:'history',// 去掉导航栏#
  routes,
  linkActiveClass:'active'// tab栏点击
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
