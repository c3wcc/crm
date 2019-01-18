<template>
  <div v-if="!loading" class="main-div top-bar-height">
    <div class="other-fun">
      其他功能
    </div>
    <div class="bar">
      <div class="logo top-bar-logo-width">
        logo图片
      </div>
      <div class="select-mode top-bar-not-logo-width">
        <el-menu :default-active="active" class='menu' mode="horizontal" @select="handleSelect"
          :background-color='themeConf[theme].topMenuBgColor'
          :text-color='themeConf[theme].topMenuTextColor'
          :active-text-color='themeConf[theme].topMenuAcTextColor'>
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">会员管理</el-menu-item>
          <el-menu-item index="3">订单关怀</el-menu-item>
          <el-menu-item index="4">会员营销</el-menu-item>
          <el-menu-item index="5">售后中心</el-menu-item>
          <el-menu-item index="6">数据分析</el-menu-item>
          <el-menu-item index="7">后台管理</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import themeConf from './theme.conf.js'
import unit from './unit.js'
export default {
  name: 'topBar',
  data () {
    return {
      loading: true,
      active: '1',
      themeConf: themeConf,
      theme: 'theme-color-defualt',
    }
  },
  props: {
    // msg: String
  },
  methods: {
    async init() {
      this.loading = false
    },
    handleSelect (key) {
      switch (key) {
        case '1':
          this.$router.push({ name: 'index', params: { }})
          break
        case '2':
          this.$router.push({ name: 'memberManger', params: { }})
          break
        case '3':
          this.$router.push({ name: 'order', params: { }})
          break
        case '4':
          this.$router.push({ name: 'memberMarketing', params: { }})
          break
      
        default:
          break
      }
    },
  },
  created () {
    this.theme = unit.getTheme(this)
    let routeStr = this.$route.path.split('/')
    switch (routeStr[1]) {
      case '':
        this.active = '1'
        break
      case 'memberManger':
        this.active = '2'
        break
      case 'order':
        this.active = '3'
        break
      case 'memberMarketing':
        this.active = '4'
        break
    }
    this.init()
  },
}
</script>
<style scoped>
  .main-div {
    display: flex;
    width: 100%;
    /* position: fixed;
    top: 0px; */
    flex-direction: column;
  }
  .main-div .other-fun {
    display: flex;
    justify-content: center;
  }
  .main-div .bar {
    display: flex;
    width: 100%;
    height: 60px;
  }
  .main-div .logo {
    height: 100%;
    background-color: rgb(15, 15, 15);
    color: #fff;
  }
  .main-div .select-mode {
    display: flex;
  }
  .main-div .select-mode-click-div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main-div .menu {
    width: 100%;
    height: 60px;
  }
</style>
