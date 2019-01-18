<template>
  <div 
    v-loading="loading"
    element-loading-text="加载数据中"
    class="display-main-div">
    <div style="padding: 30px;">
<el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item><b>云短信</b></el-breadcrumb-item>
      <el-breadcrumb-item><b>客户管理</b></el-breadcrumb-item>
      <el-breadcrumb-item><b>会员分组</b></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="form-area">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item class="item" label="创建时间：">
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
      <el-radio-group style="margin-bottom: 20px;" size='small' v-model="listSelect">
        <el-radio-button label="全部分组"></el-radio-button>
        <el-radio-button label="我的分组"></el-radio-button>
        <el-radio-button label="系统分组"></el-radio-button>
      </el-radio-group>
      <div>
        <el-button @click="openEdit" size="mini" style="margin-bottom: 20px;" plain :loading="isLoadingTableList">创建分组</el-button>
      </div>
      <el-table
        v-if="!isLoadingTableList"
        v-loading="isLoadingTableList"
        element-loading-text="加载数据中"
        :data="list"
        border
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column
          label="序号">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="分组名称">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="客户数（人）">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="分组来源">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="累计下单">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <input type="hidden" :_e='scope'>
            <div>
              消费总额/占比
            <el-tooltip class="item" effect="dark" content="本组累积 实付总额/全店累计实付总额 * 100%" placement="right">
              <i class="el-icon-question"></i>
            </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="说明">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间">
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
      <el-dialog title="创建分组" :visible.sync="dialog.edit" width="1200px">
        <el-form v-if="dialog.edit" :model="form" label-position='left' label-width="100px">
          <el-form-item label="分组名称">
            <el-input class='creating-dialog-input' @change='computeFormName' placeholder="输入分组名称" v-model="form.name">
              <template slot="suffix">{{form.name.length}}/15</template>
            </el-input>            
          </el-form-item>
          <el-form-item label="分组说明">
            <el-input class='creating-dialog-input' @change='computeFormExplanation' placeholder="输入分组名称" v-model="form.explanation">
              <template slot="suffix">{{form.explanation.length}}/50</template>
            </el-input>            
          </el-form-item>
          <el-form-item label="最近交易">
            <div class="creating-dialog-radio">
              <el-radio-group v-model="radio2">
                <el-radio :label="1">不限</el-radio>
                <el-radio :label="2">近7天</el-radio>
                <el-radio :label="3">近1个月</el-radio>
                <el-radio :label="4">近3个月</el-radio>
                <el-radio :label="5">近半年</el-radio>
                <el-radio :label="6">自定义</el-radio>
              </el-radio-group>
              <el-date-picker
                style="margin-left: 20px;"
                v-model="form.name"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="交易次数">
            <div class="creating-dialog-radio">
              <el-radio-group v-model="radio2">
                <el-radio :label="0">不限</el-radio>
                <el-radio :label="1">0次</el-radio>
                <el-radio :label="2">1次</el-radio>
                <el-radio :label="3">2次</el-radio>
                <el-radio :label="4">3次以上</el-radio>
                <el-radio :label="6">自定义</el-radio>
              </el-radio-group>
              <el-input type="number" style="margin-left: 20px;width: 80px;" v-model.number="form.name"></el-input>
              &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
              <el-input type="number" style="width: 80px;" v-model="form.name"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="累积金额">
            <div class="creating-dialog-radio">
              <el-radio-group v-model="radio2">
                <el-radio :label="0">不限</el-radio>
                <el-radio :label="1">1~100</el-radio>
                <el-radio :label="2">100~200</el-radio>
                <el-radio :label="3">200~300</el-radio>
                <el-radio :label="4">300以上</el-radio>
                <el-radio :label="6">自定义</el-radio>
              </el-radio-group>
              <el-input type="number" style="margin-left: 20px;width: 80px;" v-model.number="form.name"></el-input>
              &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
              <el-input type="number" style="width: 80px;" v-model="form.name"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="平均客单价">
            <div class="creating-dialog-radio">
              <el-radio-group v-model="radio2">
                <el-radio :label="0">不限</el-radio>
                <el-radio :label="1">1~100</el-radio>
                <el-radio :label="2">100~200</el-radio>
                <el-radio :label="3">200~300</el-radio>
                <el-radio :label="4">300以上</el-radio>
                <el-radio :label="6">自定义</el-radio>
              </el-radio-group>
              <el-input type="number" style="margin-left: 20px;width: 80px;" v-model.number="form.name"></el-input>
              &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
              <el-input type="number" style="width: 80px;" v-model="form.name"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="回头购买周期">
            <div class="creating-dialog-radio">
              <el-radio-group v-model="radio2">
                <el-radio :label="0">不限</el-radio>
                <el-radio :label="1">3~7天</el-radio>
                <el-radio :label="2">8~15天</el-radio>
                <el-radio :label="3">16~30天</el-radio>
                <el-radio :label="3">30天以上</el-radio>
                <el-radio :label="6">自定义</el-radio>
              </el-radio-group>
              <el-input type="number" style="margin-left: 20px;width: 80px;" v-model.number="form.name"></el-input>
              &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
              <el-input type="number" style="width: 80px;" v-model="form.name"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="地区">
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
          <el-form-item label="会员等级">
            <div class="creating-dialog-radio">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="店铺会员"></el-checkbox>
                <el-checkbox label="高级会员"></el-checkbox>
                <el-checkbox label="VIP会员"></el-checkbox>
                <el-checkbox label="至尊VIP"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item label="会员过滤">
            <div class="creating-dialog-radio">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="给过中差评客户"></el-checkbox>
                <el-checkbox label="黑名单"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item label="过滤退款">
            <el-radio v-model="form.area" label="1">不过滤</el-radio>
            <el-radio v-model="form.area" label="2">退款1笔以上</el-radio>
            <el-radio v-model="form.area" label="2">退款2笔以上</el-radio>
            <el-radio v-model="form.area" label="2">自定义</el-radio>
            <el-input type="number" style="margin-left: 20px;width: 80px;" v-model.number="form.name"></el-input>
          </el-form-item>
          <el-form-item label="">
            <div style="display: flex;">
              <el-button type="danger" @click="dialog.edit=false" plain size="mini">取消</el-button>
              <el-button type="success" plain size="mini">确认</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    </div>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import areaChoose from './areaChoose.vue'

export default {
  name: 'membermanger-group',
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
      },
      form: {
        name: '',
        explanation: '',
        areaCustom: [],
      },
      listSelect: '全部分组',
      list: null,
      multipleSelection: [],
      dialog: {
        edit: false,
      }
    }
  },
  computed: {

  },
  methods: {
    async init() {
      this.loading = false
    },
    handleSelectionChange (v) {
      this.multipleSelection = v
    },
    openEdit () {
      this.dialog.edit = true
    },
    computeFormName () {
      // if (this.form.name.length > 15) {

      // }
    },
    computeFormExplanation () {
      // if (this.form.name.length > 50) {
        
      // }
    },
  },
  created () {
    this.theme = unit.getTheme(this)
    this.init()
  },
}
</script>
<style scoped>
  .display-main-div .form-area {
    margin-top: 20px;
  }
  .display-main-div .form-area .item{
    margin-right: 50px;
  }
  .creating-dialog-input {
    width: 400px;
  }
  .creating-dialog-radio {
    display: flex;
    align-items: center;
  }
</style>
