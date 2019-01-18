<template>
  <div class="msgRecord-div">
    <div style="margin-top: 20px;">
      <el-form label-width="80px" :inline="true" label-position="left">
        <el-form-item label="发送时间">
          <time-interval></time-interval>
        </el-form-item>
        <el-form-item label="提醒类型">
          <el-select style="width: 100px;" v-model="form.t" placeholder="请选择">
            <el-option
              v-for="item in options.o1"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送状态">
          <el-select style="width: 150px;" v-model="form.t" placeholder="请选择">
            <el-option
              v-for="item in options.o1"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input v-model="form.t" style="width: 400px;margin-left: 5px;" 
            placeholder="输入买家昵称/手机号码/订单编号/短信内容">
          </el-input>
          <el-button plain type="success" style="margin-left: 5px;">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- <el-form label-width="100px" label-position="left">
      </el-form> -->

      <el-table
        v-if="!isLoadingTableList"
        v-loading="isLoadingTableList"
        element-loading-text="加载数据中"
        :data="list"
        border
        tooltip-effect="dark">
        <el-table-column
          label="买家昵称">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column
          label="手机号码">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column
          label="订单号">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column
          label="短信内容">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column
          label="提醒类型">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column
          label="实际扣费（条）">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column
          label="发送状态">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column
          label="发送时间">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
      </el-table>      
    </div>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import timeInterval from '../common/timeInterval.vue'

export default {
  name: 'msgRecord',
  components: {
    timeInterval,
  },
  props: {
    param: Object,
  },
  data () {
    return {
      loading: true,
      themeConf: themeConf,
      theme: 'theme-color-defualt',
      isLoadingTableList: false,
      data: {
      },
      list: [],
      form: {
        t: null,
      },
      p: {

      },
      options: {
        o1: [
          {
            id: 1,
            label: '订单关怀',
          }
        ],
        o2: [
          {
            id: 1,
            label: '已发送'
          }
        ],
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
    this.p = {...this.p, ...this.param}
    this.data = this.form
    //this.init()
  },
}
</script>
<style scoped>
  .msgRecord-div {
    width: 100%;
    height: 100%;
  }
</style>
