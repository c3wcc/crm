<template>
  <div v-if="!loading" class="main margin-top-by-top-bar">
    <top-bar></top-bar>
    <div class="display-area display-area-height">
      <div class="aside-router aside-width">
        <!-- <el-menu            
          :default-active="asideActive"
          :class="`aside-nav main-display-height`"
          :background-color='themeConf[theme].asideMenuBgColor'
          :text-color='themeConf[theme].asideMenuTextColor'
          :active-text-color='themeConf[theme].asideMenuAcTextColor'
          :router="true">
          <el-menu-item
            v-for="item in asideList"
            :key="item.value"
            :index="item.path">
            {{item.name}}
          </el-menu-item>
        </el-menu> -->

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
  name: 'memberManger',
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
          title: '会员管理',
          children: [
        {
          name: '会员列表',
          path: '/memberManger/list'
        },
        {
          name: '会员分组',
          path: '/memberManger/group'
        },
        {
          name: '高级分组',
          path: '/memberManger/higherGroup'
        },
        {
          name: '会员互动',
          path: '/memberManger/interaction'
        },
        {
          name: 'vip等级划分',
          path: '/memberManger/vipGroup'
        },
        {
          name: '黑名单列表',
          path: '/memberManger/blacklist'
        },
          ]
        },
      ],
      // asideList: [
      //   {
      //     name: '会员列表',
      //     path: '/memberManger/list'
      //   },
      //   {
      //     name: '会员分组',
      //     path: '/memberManger/group'
      //   },
      //   {
      //     name: '高级分组',
      //     path: '/memberManger/higherGroup'
      //   },
      //   {
      //     name: '会员互动',
      //     path: '/memberManger/interaction'
      //   },
      //   {
      //     name: 'vip等级划分',
      //     path: '/memberManger/vipGroup'
      //   },
      //   {
      //     name: '黑名单列表',
      //     path: '/memberManger/blacklist'
      //   },
      // ],
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
    this.asideActive = this.$route.path==='/memberManger'?null:this.$route.path
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
