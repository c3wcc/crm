<template>
  <div v-if="!loading" class="main margin-top-by-top-bar">
    <top-bar></top-bar>
    <div class="display-area display-area-height">
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
      asideList: [],
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
