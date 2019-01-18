import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/index.vue'

// 会员管理
import memberManger from '../components/memberManger/memberManger.vue'
import memberMangerList from '../components/memberManger/list.vue'
import memberGroup from '../components/memberManger/group.vue'
import memberHigherGroup from '../components/memberManger/higherGroup.vue'
import memberInteraction from '../components/memberManger/interaction.vue'
import memberVipGroup from '../components/memberManger/vipGroup.vue'
import memberBlacklist from '../components/memberManger/blacklist.vue'

//订单关怀
import order from '../components/order/order.vue'
import orderCare from '../components/order/orderCare.vue'

// 会员营销
import memberMarketing from '../components/memberMarketing/memberMarketing.vue'

Vue.use(Router);

const defalutRouter = [
  {
    path: '/',
    name: 'index',
    component: index,
    // children: [
    //   { path: '5', component: h2 },
    // ]
  },
  {
    path: '/memberManger',
    name: 'memberManger',
    component: memberManger,
    children: [
      { path: 'list', component: memberMangerList },
      { path: 'group', component: memberGroup },
      { path: 'higherGroup', component: memberHigherGroup },
      { path: 'interaction', component: memberInteraction },
      { path: 'vipGroup', component: memberVipGroup },
      { path: 'blacklist', component: memberBlacklist },
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    children: [
      { path: '1', component: orderCare },
      { path: '2', component: orderCare },
      { path: '3', component: orderCare },
      { path: '4', component: orderCare },
      { path: '5', component: orderCare },
      { path: '6', component: orderCare },
      { path: '7', component: orderCare },
      { path: '8', component: orderCare },
      { path: '9', component: orderCare },
    ]
  },
  {
    path: '/memberMarketing',
    name: 'memberMarketing',
    component: memberMarketing,
    children: [
      // { path: 'list', component: memberMangerList },
    ]
  },
];

export default new Router({
  routes: defalutRouter,
  mode: 'history',
})
