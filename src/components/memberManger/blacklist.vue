<template>
  <div class="blacklist-div">
    <div style="padding: 30px;">
      <div style="height: 25px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>云短信</b></el-breadcrumb-item>
          <el-breadcrumb-item><b>客户管理</b></el-breadcrumb-item>
          <el-breadcrumb-item><b>会员黑名单</b></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="tip">
        黑名单列表客户，在群发短信时，可以过滤，不向黑名单客户发送短信。
      </div>
      <div style="margin-top: 20px;">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item class="item" label="添加时间：">
            <el-date-picker
              v-model="form.name"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
            <el-input style="width: 300px;margin-left: 10px;" placeholder="输入旺旺昵称/手机号码/备注" v-model="form.t"></el-input>
            <el-button style="margin-left: 10px;" type="primary" plain>查询</el-button>
          </el-form-item>
        </el-form>        
      </div>
      <div style="width: 800px;">
        <div class="op">
          <el-button type="primary" @click="openEdit({}, 1)" size="mini" class="btn" plain>添加黑名单</el-button>
          <el-button type="primary" @click="deleteMsg({}, 1)" size="mini" class="btn" plain>删除黑名单</el-button>
          <el-button type="primary" @click="deleteMsg({}, 1)" size="mini" class="btn" plain>按查询结果删除</el-button>
        </div>
        <div style="margin-top: 20px;">
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
              label="手机号码/买家旺旺">
              <template slot-scope="scope">
                {{scope.row.phone}}
              </template>
            </el-table-column>
            <el-table-column
              label="备注">
              <template slot-scope="scope">
                {{ scope.row.remark }}
              </template>
            </el-table-column>
            <el-table-column
              label="时间">
              <template slot-scope="scope">
                {{ scope.row.date }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="primary" @click="deleteMsg(scope.row)" size="mini" class="btn" plain>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialog.edit" width="1000px">
      <template slot="title">
        <div style="diaplay: flex;">
          <h4>添加黑名单</h4>
        </div>
      </template>
      <el-form v-if="dialog.edit" :model="form" label-position='left' label-width="150px">
        <el-form-item label="手机号码/买家旺旺">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="form.t">
          </el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class='creating-dialog-input' @change='computeFormName' placeholder="输入分组名称" v-model="form.remark">
            <template slot="suffix">{{form.remark.length}}/50</template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <div style="display: flex;">
            <el-button type="success" size="mini" plain>确认</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
// import timeInterval from '../common/timeInterval.vue'

export default {
  name: 'blacklist',
  components: {
    // timeInterval,
  },
  props: {
    // form: Object,
  },
  data () {
    return {
      loading: true,
      themeConf: themeConf,
      theme: 'theme-color-defualt',
      multipleSelection: [],
      data: {
      },
      form: {
        t: null,
        remark: '',
      },
      isLoadingTableList: false,
      list: [
        {
          phone: '13222948408',
          remark: '回T',
          date: '2018-04-10 18:00:00'
        },
        {
          phone: '13222948408',
          remark: '回T',
          date: '2018-04-10 18:00:00'
        },
      ],
      isRemaind: 1,
      listOrCount: 1,
      dialog: {
        edit: false,
      }
    }
  },
  computed: {

  },
  methods: {
    // async init() {
    //   this.loading = false
    // },

    // type---> 1: 新增   2: 编辑
    openEdit (d, type) {
      this.form = {...this.form, ...d}
      if (type === 1) {
        this.dialog.edit = true
      } else {
        this.dialog.edit = true
      }
    },
    openRepayEditor () {

    },
    deleteMsg (data) {
      data
    },
    computeFormName () {

    },
    handleSelectionChange (v) {
      this.multipleSelection = v
    },
  },
  created () {
    this.theme = unit.getTheme(this)
    this.data = this.form
    //this.init()
  },
}
</script>
<style scoped>
  .blacklist-div {
  }
  .blacklist-div .tip {
    background-color: #f2f2f2;
    color: #000;
    padding: 5px;
    margin-top: 5px;
  }
  .blacklist-div .op {
    display: flex;
    margin-top: 30px;
    
  }
</style>
