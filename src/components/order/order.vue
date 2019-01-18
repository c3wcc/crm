<template>
  <div v-if="!loading" class="main margin-top-by-top-bar">
    <top-bar></top-bar>
    <div class="display-area display-area-height">
      <div class="aside-router aside-width">
        <el-menu
          :default-active="asideActive"
          :class="`aside-nav main-display-height`"
          :background-color='themeConf[theme].asideMenuBgColor'
          :text-color='themeConf[theme].asideMenuTextColor'
          :active-text-color='themeConf[theme].asideMenuAcTextColor'
          :router="true"
          :collapse-transition='true'>
          <el-submenu v-for="(item, idx) in asideList" :key="`mbmberMarketingSubmenu${idx}`" :index="`${idx}`">
            <template slot="title">
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item 
                v-for="(item2, idx2) in item.children" 
                :index="item2.path"
                :key="`mbmberMarketingSubmenu${idx}-${idx2}`">
                {{item2.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="display-split"></div>
      <router-view class='main-display-width main-display-height ovf'></router-view>
    </div>
  </div>
</template>

<script>
import topBar from '../common/topBar.vue'
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'

export default {
  name: 'order',
  components: {
    topBar,
  },
  data () {
    return {
      loading: true,
      themeConf: themeConf,
      theme: 'theme-color-defualt',
      asideActive: null,
      asideList: [
        {
          title: '下单催付',
          children: [
            {
              name: '下单关怀',
              path: '/order/1',
            },
            {
              name: '下单关怀(货到)',
              path: '/order/2'
            },
            {
              name: '处方药关怀',
              path: '/order/3'
            },
            {
              name: '常规催付',
              path: '/order/4'
            },
            {
              name: '二次催付',
              path: '/order/5'
            },
            {
              name: '预售催付',
              path: '/order/6'
            },
            {
              name: '聚划算催付',
              path: '/order/7'
            },
          ]
        },
        {
          title: '付款关怀',
          children: [
            {
              name: '付款关怀',
              path: '/8',
            },
            {
              name: '智能凑单',
              path: '/9'
            },
          ]
        },
        {
          title: '物流提醒',
          children: [
            {
              name: '延迟发货',
              path: '/10',
            },
            {
              name: '发货提醒',
              path: '/11'
            },
            {
              name: '疑难件提醒',
              path: '/12'
            },
            {
              name: '同城提醒',
              path: '/13'
            },
            {
              name: '派单提醒',
              path: '/'
            },
            {
              name: '签收提醒',
              path: '/'
            },
            {
              name: '物流广告',
              path: '/'
            },
          ]
        },
        {
          title: '回款关怀',
          children: [
            {
              name: '回款关怀',
              path: '/',
            },
          ]
        },
        {
          title: '评价关怀',
          children: [
            {
              name: '自动催付',
              path: '/',
            },
            {
              name: '好评感谢',
              path: '/',
            },
            {
              name: '中差评安抚',
              path: '/',
            },
          ]
        },
        {
          title: '退款关怀',
          children: [
            {
              name: '申请退款',
              path: '/',
            },
            {
              name: '同意退款',
              path: '/',
            },
            {
              name: '拒绝退款',
              path: '/',
            },
            {
              name: '退款成功',
              path: '/',
            },
          ]
        },
      ],
    }
  },
  methods: {
    async init() {
      await import(`../../theme/${this.theme}/index.css`)
      this.loading = false
    },
  },
  created () {
    this.theme = unit.getTheme(this)
    this.asideActive = this.$route.path==='/order'?null:this.$route.path
    this.init()
  },
}
</script>
<style scoped>
  .main {
    width: 100vw;
  }
  .display-area {
    display: flex;
    width: 100vw;
  }
  .aside-router {
    height: 100%;
    overflow-y: auto ;
    overflow-x: hidden;
  }
  .aside-nav {
    width: 100%;
  }
  .menu-title:hover {
    background-color: #ac0505;
  }
</style>
