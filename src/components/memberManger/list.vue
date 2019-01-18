<template>
  <div 
    v-loading="loading"
    element-loading-text="加载数据中"
    class="display-main-div">
    <div style="padding: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><b>云短信</b></el-breadcrumb-item>
        <el-breadcrumb-item><b>客户管理</b></el-breadcrumb-item>
        <el-breadcrumb-item><b>会员管理</b></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="tip">
        您店铺共有 {{data.countMember}} 位会员，截至{{data.countDate}}，系统已同步{{data.syncMember}}位的完整数据，有 {{data.needImportMember}} 位需导入订单补全联系人信息  <span>导入订单信息</span>
      </div>
      <!-- <el-form :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form> -->
      <div class="form-area">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item class="item" label="买家昵称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item class="item" label="手机号码：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item class="item" label="买家姓名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item class="item" label="交易次数：">
            <el-input type="number" style="width: 80px;" v-model.number="form.name"></el-input>
            ~
            <el-input type="number" style="width: 80px;" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item class="item" label="交易总额：">
            <el-input type="number" style="width: 80px;" v-model.number="form.name"></el-input>
            ~
            <el-input type="number" style="width: 80px;" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item class="item" label="最后购买时间：">
            <el-date-picker
              v-model="form.name"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="item" label="">
            <el-button type="success" size="mini" plain :loading="isLoadingTableList">查询</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item class="item" label="会员等级：">
            <el-checkbox-group v-model="form.grade">
              <el-checkbox label="店铺客户"></el-checkbox>
              <el-checkbox label="普通客户"></el-checkbox>
              <el-checkbox label="高级会员"></el-checkbox>
              <el-checkbox label="VIP会员"></el-checkbox>
              <el-checkbox label="至尊VIP"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item class="item radio" label="所在地区：">
            <el-radio v-model="form.area" label="1">不限</el-radio>
            <el-radio v-model="form.area" label="2">江浙泸</el-radio>
            <el-radio v-model="form.area" label="3">偏远地区</el-radio>
            <el-radio v-model="form.area" label="4">自定义</el-radio>
            <el-popover
              style="padding: 0px;"
              placement="bottom-start"
              trigger="click">
              <areaChoose :chosen.sync='form.areaCustom'></areaChoose>
              <span style="color: #0000ff;cursor: pointer;" slot="reference">(50)</span>
            </el-popover>
          </el-form-item>
        </el-form>

      </div>
      <el-table
        v-if="!isLoadingTableList"
        v-loading="isLoadingTableList"
        element-loading-text="加载数据中"
        :data="list"
        border
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="买家昵称">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="买家姓名">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="会员等级">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="地区">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="手机号码">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="交易总额"
          sortable>
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="交易次数"
          sortable>
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="未购买天数"
          sortable>
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="最后购买时间"
          sortable>
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import areaChoose from './areaChoose.vue'

export default {
  name: 'membermanger-list',
  components: {
    areaChoose,
  },
  data () {
    return {
      loading: true,
      isLoadingTableList: false,
      themeConf: themeConf,
      theme: 'theme-color-defualt',
      data: {
        countMember: 22,
        countDate: '2018-09-12',
        syncMember: 14,
        needImportMember: 8,
      },
      form: {
        grade: [],
        area: [],
        areaCustom: ['a', 'b', 'c'],
      },
      list: null,
      multipleSelection: [],
    }
  },
  methods: {
    async init() {

      this.loading = false
    },
    handleSelectionChange (v) {
      this.multipleSelection = v
    },
    chooseCustom () {
      // console.log('i')
    },
  },
  created () {
    this.theme = unit.getTheme(this)
    this.init()
  },
}
</script>
<style scoped>
  .display-main-div .tip {
    background-color: #f2f2f2;
    color: #000;
    padding: 5px;
    margin-top: 5px;
  }
  .display-main-div .form-area {
    margin-top: 20px;
  }
  .display-main-div .form-area .item{
    margin-right: 50px;
  }
  .display-main-div .form-area .radio span{
    color: #0000ff;
  }
  .tip span {
    color: #0000ff;
    cursor: pointer;
  }
</style>
