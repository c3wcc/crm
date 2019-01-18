<template>
  <div class="effect-div">
    <div>
      <div style="maring-top: 20px;">
        <span>分析类型：</span>
        <el-radio v-model="analysisType" :label="1">汇总效果</el-radio>
        <el-radio v-model="analysisType" :label="2">区分任务</el-radio>
        <el-select style="margin-left: 5px;" v-model="form.t" placeholder="请选择">
          <el-option
            v-for="item in options.o1"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div>
        <h3>今日数据监控</h3>
        <span style="color: #333333;">更新时间{{updateTime}}</span>
      </div>
      <div class="dataTabel1">
        <el-row>
          <el-col :span="3">
            <span>催付订单数</span>
          </el-col>
          <el-col :span="3">
            <span>链接点击率（PV）</span>
          </el-col>
          <el-col :span="3">
            <span>催付链接点击（UV）</span>
          </el-col>
          <el-col :span="3">
            <span>催付链接付款</span>
          </el-col>
          <el-col :span="3">
            <span>挽回订单数</span>
          </el-col>
          <el-col :span="3">
            <span>挽回金额</span>
          </el-col>
          <el-col :span="3">
            <span>催付成功率</span>
          </el-col>
          <el-col :span="3">
            <span style="marign-right: 5px;">ROI</span>
            <el-tooltip class="item" effect="dark" content="投入：产出=短信成功扣费条数x短信单价（按0.05元算）：挽回金额（例如ROI=1:2相当于花一块钱带来两块钱的收益" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <span>催付订单数</span>
          </el-col>
          <el-col :span="3">
            <span>链接点击率（PV）</span>
          </el-col>
          <el-col :span="3">
            <span>催付链接点击（UV）</span>
          </el-col>
          <el-col :span="3">
            <span>催付链接付款</span>
          </el-col>
          <el-col :span="3">
            <span>挽回订单数</span>
          </el-col>
          <el-col :span="3">
            <span>挽回金额</span>
          </el-col>
          <el-col :span="3">
            <span>催付成功率</span>
          </el-col>
          <el-col :span="3">
            <span style="marign-right: 5px;">ROI</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>常规催付短信</span>
            <span>{{}}</span>
            <span>条</span>
            <el-button type="text" @click="toMsgRecord()">查看发送记录</el-button>
          </el-col>
          <el-col :span="12">
            <span>今日未付订单</span>
            <span>{{}}</span>
            <span>单</span>
            <el-button type="text">查看未付款订单</el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <h3>往日数据监控分析</h3>
        <div>
          <el-row>
            <el-col :span="22">
              <el-radio v-model="analysisType" :label="1">近7天</el-radio>
              <el-radio v-model="analysisType" :label="2">近1个月</el-radio>
              <el-radio style="margin-right: 20px;" v-model="analysisType" :label="3">自定义</el-radio>
              <time-interval style="margin-right: 20px;" ></time-interval>
              <el-button type="primary" plain>查询</el-button>
            </el-col>
            <el-col :span="2">
              <el-button @click="openExport" type="success" plain>导出数据</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <el-table
          v-if="!isLoadingTableList"
          v-loading="isLoadingTableList"
          element-loading-text="加载数据中"
          :data="list"
          border
          tooltip-effect="dark">
          <el-table-column
            label="统计时间">
            <template slot-scope="scope">
              {{scope.row.rOrder}}
            </template>
          </el-table-column>
          <el-table-column
            label="催付订单数">
            <template slot-scope="scope">
              {{scope.row.rOrder}}
            </template>
          </el-table-column>
          <el-table-column
            label="链接点击率（PV）">
            <template slot-scope="scope">
              {{scope.row.rOrder}}
            </template>
          </el-table-column>
          <el-table-column
            label="催付链接点击（UV）">
            <template slot-scope="scope">
              {{scope.row.rOrder}}
            </template>
          </el-table-column>
          <el-table-column
            label="催付链接付款">
            <template slot-scope="scope">
              {{scope.row.rOrder}}
            </template>
          </el-table-column>
          <el-table-column
            label="挽回订单数">
            <template slot-scope="scope">
              <el-button @click="openOrderDialog(scope.row)" type="text">{{scope.row.rOrder}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="挽回金额">
            <template slot-scope="scope">
              {{scope.row.rOrder}}
            </template>
          </el-table-column>
          <el-table-column
            label="催付成功率">
            <template slot-scope="scope">
              {{scope.row.rOrder}}
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <div>
                <span v-if="false">{{scope}}</span>
                <span style="marign-right: 5px;">ROI</span>
                <el-tooltip class="item" effect="dark" content="投入：产出=短信成功扣费条数x短信单价（按0.05元算）：挽回金额（例如ROI=1:2相当于花一块钱带来两块钱的收益" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </template>
            <template slot-scope="scope">
              {{scope.row.rOrder}}
            </template>
          </el-table-column>
        </el-table>        
      </div>
      <div style="margin-top: 20px;">
        <ve-line :data="chartData"></ve-line>
      </div>
    </div>
    <el-dialog :visible.sync="dialog.export" width="1000px">
      <template slot="title">
        <div style="diaplay: flex;">
          <h4>导出数据</h4>
        </div>
      </template>
      <div v-if="dialog.export">
        <el-checkbox style="margin-bottom: 20px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="exportParam.t" @change="handleCheckedChange">
          <el-checkbox v-for="item in options.o2" :label="item.id" :key="item.id">{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <div style="margin-top: 20px;">
          <el-button type="success" size="mini" plain>导出</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialog.order" width="1000px">
      <template slot="title">
        <div style="diaplay: flex;">
          <h4>导出数据</h4>
        </div>
      </template>
      <div v-if="dialog.order">
        <div>
          
        </div>
        <el-table
          v-if="!isLoadingTableList2"
          v-loading="isLoadingTableList2"
          element-loading-text="加载数据中"
          :data="list2"
          border
          tooltip-effect="dark">
          <el-table-column
            label="买家昵称">
            <template slot-scope="scope">
              {{scope.row.t}}
            </template>
          </el-table-column>
          <el-table-column
            label="手机号码">
            <template slot-scope="scope">
              {{scope.row.t}}
            </template>
          </el-table-column>
          <el-table-column
            label="实付金额">
            <template slot-scope="scope">
              {{scope.row.t}}
            </template>
          </el-table-column>
          <el-table-column
            label="催付时间">
            <template slot-scope="scope">
              {{scope.row.t}}
            </template>
          </el-table-column>
          <el-table-column
            label="付款时间">
            <template slot-scope="scope">
              {{scope.row.t}}
            </template>
          </el-table-column>
          <el-table-column
            label="短信内容">
            <template slot-scope="scope">
              {{scope.row.t}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import timeInterval from '../common/timeInterval.vue'

export default {
  name: 'effect',
  components: {
    timeInterval,
  },
  props: {
    effect: Object,
    toMsgRecord: Function,
  },
  data () {
    return {
      loading: true,
      themeConf: themeConf,
      isLoadingTableList: false,
      isLoadingTableList2: false,
      theme: 'theme-color-defualt',
      data: {
      },
      dialog: {
        export: false,
        order: false,
      },
      form: {
        t: null,
      },
      list2: [],
      isIndeterminate: false,
      checkAll: false,
      exportParam: {
        t: [],
      },
      chartData: {
        columns: ['日期', '催付订单数', '挽回订单', '挽回金额'],
        rows: [
          { '日期': '1/1', '催付订单数': 1393, '挽回订单': 1093, '挽回金额': 0.32 },
          { '日期': '1/2', '催付订单数': 3530, '挽回订单': 3230, '挽回金额': 0.26 },
          { '日期': '1/3', '催付订单数': 2923, '挽回订单': 2623, '挽回金额': 0.76 },
          { '日期': '1/4', '催付订单数': 1723, '挽回订单': 1423, '挽回金额': 0.49 },
          { '日期': '1/5', '催付订单数': 3792, '挽回订单': 3492, '挽回金额': 0.323 },
          { '日期': '1/6', '催付订单数': 4593, '挽回订单': 4293, '挽回金额': 0.78 }
        ]
      },
      list: [
        {
          rOrder: 100,
        }
      ],
      analysisType: 1,
      form: {

      },
      updateTime: '',
      options: {
        o1: [
          {
            id: 1,
            label: '日期'
          }
        ],
        o2: [
          {
            id: 1,
            label: '统计日期',
          },
          {
            id: 2,
            label: '催付订单数',
          },
          {
            id: 3,
            label: '链接点击率（PV）',
          },
          {
            id: 4,
            label: '催付链接付款',
          },
          {
            id: 5,
            label: '挽回订单',
          },
          {
            id: 6,
            label: '挽回金额',
          },
          {
            id: 7,
            label: '催付成功率',
          },
          {
            id: 8,
            label: 'ROI',
          },
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
    openExport () {
      this.dialog.export = true
    },
    openOrderDialog (data) {
      this.dialog.order = true
    },
    handleCheckAllChange(val) {
      let arr = []
      if (val) {
        for (const i of this.options.o2) {
          arr.push(i.id)
        }
      }
      this.exportParam.t = arr
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.options.o2.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.o2.length
    },
  },
  created () {
    this.theme = unit.getTheme(this)
    // this.data = this.form
    //this.init()
  },
}
</script>
<style scoped>
  .effect-div {
    width: 100%;
    height: 100%;
  }
  .dataTabel1 {
    border-width: 1px;
    border-style:solid;
    border-color: #d7d7d7;
    height: 100px;
    width: 80%;
    margin-top: 20px;
    text-align: center;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
