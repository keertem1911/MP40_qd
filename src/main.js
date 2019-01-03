import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import login from 'components/login/view'
import seller from 'components/seller/seller';
import payment from 'components/payment';
import orderList from 'components/order/list';
import orderDetail from 'components/order/detail';
import 'common/stylus/index.styl';
import store from './stores'
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

const routes = [{
  path: '/',
  component: login
}, {
  path: '/goods',
  component: goods,
  meta:{
    showHeader:true
  }
}, {
  path: '/ratings',
  component: ratings,
  meta:{
    showHeader:true
  }
}, {
  path: '/seller',
  component: seller,
  meta:{
    showHeader:true
  }
}, {
  path: '/payment',
  component: payment
}, {
  path: '/orderlist',
  component: orderList,
  meta:{
    showHeader:true
  }
}, {
    path: '/order/:orderId',
    component: orderDetail
}];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
window.bvue = new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
});

