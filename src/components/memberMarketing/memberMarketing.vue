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
  name: 'memberMarketing',
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
          title: '短信营销',
          children: [
            {
              name: '会员发送',
              path: '/memberMarketing/memberSend',
            },
            {
              name: '订单发送',
              path: '/memberMarketing/orderSend'
            },
            {
              name: '智能营销',
              path: '/memberMarketing/memberSend'
            },
            {
              name: '指定号码发送',
              path: '/memberMarketing/memberSend'
            },
            {
              name: '导入号码发送',
              path: '/memberMarketing/memberSend'
            },
            {
              name: '高级发送',
              path: '/memberMarketing/memberSend'
            },
            {
              name: '发送',
              path: '/memberMarketing/memberSend'
            },
            {
              name: '短信记录及效果',
              path: '/memberMarketing/memberSend'
            },
            {
              name: '营销效果汇总分析',
              path: '/memberMarketing/memberSend'
            },
          ]
        },
        {
          title: '场景营销',
          children: [
            {
              name: '首购有礼',
              path: '/',
            },
            {
              name: '复购有礼',
              path: '/'
            },
            {
              name: '休眠提醒',
              path: '/'
            },
            {
              name: '满月礼',
              path: '/'
            },
            {
              name: '百日礼',
              path: '/'
            },
            {
              name: '周年庆',
              path: '/'
            },
            {
              name: '生日关怀',
              path: '/'
            },
            {
              name: '会员账单',
              path: '/'
            },
            {
              name: '等级升级前提醒',
              path: '/'
            },
            {
              name: '等级升级后提醒',
              path: '/'
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
    this.asideActive = this.$route.path==='/memberMarketing'?null:this.$route.path
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
