<template>
  <div v-show="refresh" class="orderCare-div">
    <div style="padding: 30px;">
      <div style="height: 25px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>云短信</b></el-breadcrumb-item>
          <el-breadcrumb-item><b>订单催付</b></el-breadcrumb-item>
          <el-breadcrumb-item v-if="mode==='1'"><b>下单关怀</b></el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="mode==='2'"><b>下单关怀(货到)</b></el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="mode==='3'"><b>处方药关怀</b></el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="mode==='4'"><b>常规催付</b></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <flowchart tip="买家下单后立即发送短信提醒买家防止诈骗行为，提高买家体验。"></flowchart>
      <div style="margin-top: 20px;">
        <el-radio-group size="small" v-model="careOrMsgRecord">
          <el-radio-button v-if="mode==='1'" :label="1">订单关怀</el-radio-button>
          <el-radio-button v-if="mode==='2'" :label="1">下单关怀(货到)</el-radio-button>
          <el-radio-button v-if="mode==='3'" :label="1">处方药提醒</el-radio-button>
          <el-radio-button v-if="mode==='4'" :label="1">常规催付</el-radio-button>
          <el-radio-button v-if="mode==='4'" :label="3">催付效果</el-radio-button>
          <el-radio-button :label="2">短信记录</el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="careOrMsgRecord===1">
        <mission :param='param'></mission>
      </div>
      <div v-if="careOrMsgRecord===3">
        <effect :toMsgRecord='toMsgRecord' :param="param"></effect>
      </div>
      <div v-if="careOrMsgRecord===2">
        <msg-record :param="param"></msg-record>
      </div>
    </div>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import flowchart from './flowchart.vue'
import mission from './mission.vue'
import msgRecord from './msgRecord.vue'
import effect from './effect.vue'

export default {
  name: 'orderCare',
  components: {
    flowchart,
    mission,
    msgRecord,
    effect,
  },
  mode: null,
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
      careOrMsgRecord: 1,
      param: {

      },
      refresh: true,
    }
  },
  computed: {

  }, 
  watch: {
    '$route.path': function (newVal, oldVal) {
      this.mode = newVal.split('/')[2]
      this.refresh = false
      this.refresh = true
      this.init()
    }
  },
  methods: {
    async init() {
      this.loading = false
    },
    toMsgRecord () {
      this.careOrMsgRecord = 2
    }
  },
  created () {
    this.theme = unit.getTheme(this)
    this.data = this.form
    this.mode = this.$route.path.split('/')[2]
    //this.init()
  },
}
</script>
<style scoped>
  .orderCare-div {
  }
</style>
