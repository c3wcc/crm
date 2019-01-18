<template>
  <div class="vipGroup-div">
    <div style="padding: 30px;">
      <div style="height: 25px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>云短信</b></el-breadcrumb-item>
          <el-breadcrumb-item><b>客户管理</b></el-breadcrumb-item>
          <el-breadcrumb-item><b>VIP等级划分</b></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="row">
        <b>店铺会员</b>
        <span class="row-margin-top">升级条件</span>
        <span class="row-margin-top">有购买记录。。。</span>
      </div>
      <div class="row">
        <b>普通会员(VIP1)</b>
        <span class="row-margin-top">升级条件</span>
        <div class="row-margin-top">
          <span style="margin-right: 10px;">交易额</span>
          <el-input class='creating-dialog-input' style="width: 300px;" v-model="form.t"></el-input>
          <span style="margin-left: 10px;margin-right: 10px;">或交易量</span>
          <el-input class='creating-dialog-input' style="width: 300px;" v-model="form.t"></el-input>
        </div>
      </div>
      <div class="row">
        <b>高级会员(VIP2)</b>
        <span class="row-margin-top">升级条件</span>
        <div class="row-margin-top">
          <span style="margin-right: 10px;">交易额</span>
          <el-input class='creating-dialog-input' style="width: 300px;" v-model="form.t"></el-input>
          <span style="margin-left: 10px;margin-right: 10px;">或交易量</span>
          <el-input class='creating-dialog-input' style="width: 300px;" v-model="form.t"></el-input>
        </div>
      </div>
      <div class="row">
        <b>VIP会员(VIP3)</b>
        <span class="row-margin-top">升级条件</span>
        <div class="row-margin-top">
          <span style="margin-right: 10px;">交易额</span>
          <el-input class='creating-dialog-input' style="width: 300px;" v-model="form.t"></el-input>
          <span style="margin-left: 10px;margin-right: 10px;">或交易量</span>
          <el-input class='creating-dialog-input' style="width: 300px;" v-model="form.t"></el-input>
        </div>
      </div>
      <div class="row">
        <b>至尊VIP会员(VIP4)</b>
        <span class="row-margin-top">升级条件</span>
        <div class="row-margin-top">
          <span style="margin-right: 10px;">交易额</span>
          <el-input class='creating-dialog-input' style="width: 300px;" v-model="form.t"></el-input>
          <span style="margin-left: 10px;margin-right: 10px;">或交易量</span>
          <el-input class='creating-dialog-input' style="width: 300px;" v-model="form.t"></el-input>
        </div>
      </div>
      <div style="display: flex;">
        
        <el-button type="primary" size="mini">保存设置</el-button>
        <el-button style="margin-left: 20px;" type="success" size="mini">初始化等级</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'

export default {
  name: 'vipGroup',
  components: {

  },
  props: {
    // form: Object,
  },
  data () {
    return {
      loading: true,
      themeConf: themeConf,
      theme: 'theme-color-defualt',
      data: {
      },
      form: {
        t: null,
      }
    }
  },
  computed: {

  },
  methods: {
    // async init() {
    //   this.loading = false
    // },
  },
  created () {
    this.theme = unit.getTheme(this)
    this.data = this.form
    //this.init()
  },
}
</script>
<style scoped>
  .vipGroup-div {
  }
  .vipGroup-div .row{
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
  .vipGroup-div .row .row-margin-top {
    margin-top: 5px;
  }
</style>
