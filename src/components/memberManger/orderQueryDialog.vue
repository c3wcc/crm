<template>
  <div class="orderQueryDialog-main">
    <el-dialog width="1200px;" @close='updateShow' title="订单查询" :visible.sync="s">
      <div v-if="s">
        <el-form :inline="true" :model="f" class="demo-form-inline" label-position="left" label-width="100px;">
          <el-form-item class="item" label="选择时间">
            <el-select class="o1" v-model="f.t" placeholder="请选择">
              <el-option
                v-for="item in options.o1"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select class="o2" v-model="f.t" placeholder="请选择">
              <el-option
                v-for="item in options.o2"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
            <span><time-interval></time-interval></span>
            <div>
              
            </div>
          </el-form-item>
          <el-form-item class="item" label="订单类型">
            <el-select v-model="f.t" placeholder="请选择">
              <el-option
                v-for="item in options.o3"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form style="margin-top: 10px;" :inline="true" :model="f" class="demo-form-inline">
          <el-form-item class="item" label="购买次数">
            <el-input type="number" style="width: 80px;" v-model.number="f.countBuy[0]"></el-input>
            ~
            <el-input type="number" style="width: 80px;" v-model="f.countBuy[1]"></el-input>
          </el-form-item>
          <el-form-item class="item" label="交易金额">
            <el-input type="number" style="width: 80px;" v-model.number="f.countBuy[0]"></el-input>
            ~
            <el-input type="number" style="width: 80px;" v-model="f.countBuy[1]"></el-input>
          </el-form-item>
          <el-form-item class="item" label="主菜单状态">
            <el-button plain size="mini">默认全部</el-button>
          </el-form-item>
        </el-form>
        <el-form style="margin-top: 10px;" :inline="true" :model="f" class="demo-form-inline">
          <el-form-item class="item" label="宝贝件数">
            <el-input type="number" style="width: 80px;" v-model.number="f.countBuy[0]"></el-input>
            ~
            <el-input type="number" style="width: 80px;" v-model="f.countBuy[1]"></el-input>
          </el-form-item>
          <el-form-item class="item" label="累积件数">
            <el-input type="number" style="width: 80px;" v-model.number="f.countBuy[0]"></el-input>
            ~
            <el-input type="number" style="width: 80px;" v-model="f.countBuy[1]"></el-input>
          </el-form-item>
          <el-form-item class="item" label="子菜单状态">
            <el-button plain size="mini">默认全部</el-button>
          </el-form-item>
        </el-form>
        <el-form style="margin-top: 10px;" :inline="true" :model="f" class="demo-form-inline">
          <el-form-item class="item" label="购买笔数">
            <el-input type="number" style="width: 80px;" v-model.number="f.countBuy[0]"></el-input>
            ~
            <el-input type="number" style="width: 80px;" v-model="f.countBuy[1]"></el-input>
          </el-form-item>
          <el-form-item class="item" label="累积金额">
            <el-input type="number" style="width: 80px;" v-model.number="f.countBuy[0]"></el-input>
            ~
            <el-input type="number" style="width: 80px;" v-model="f.countBuy[1]"></el-input>
          </el-form-item>
          <el-form-item class="item" label="订单来源">  
            <el-checkbox-group v-model="f.t">
              <el-checkbox :label="1">手机端</el-checkbox>
              <el-checkbox :label="1">PC端</el-checkbox>
              <el-checkbox :label="1">聚划算</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="f" class="demo-form-inline" label-position="left" label-width="100px;">
          <el-form-item class="item" label="">
            <el-select style="width: 100px;margin-right: 10px;" v-model="f.t" placeholder="请选择">
              <el-option
                v-for="item in options.o4"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
            <el-input type="number" style="width: 80px;" v-model.number="f.countBuy[0]"></el-input>
            ~
            <el-input type="number" style="width: 80px;" v-model="f.countBuy[1]"></el-input>
          </el-form-item>
          <el-form-item class="item" label="选择地区">
            <el-button plain size="mini">默认全部</el-button>
          </el-form-item>
          <el-form-item class="item" label="选择商品">
            <el-button plain size="mini">默认全部</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="f" class="demo-form-inline" label-position="left" label-width="100px;">
          <el-form-item class="item" label="买家留言">
            <el-select style="width: 100px;margin-right: 10px;" v-model="f.t" placeholder="请选择">
              <el-option
                v-for="item in options.o5"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
            <el-input style="width: 220px;" v-model.number="f.countBuy[0]" placeholder="多个用逗号隔开"></el-input>
          </el-form-item>
          <el-form-item class="item" label="卖家留言">
            <el-select style="width: 100px;margin-right: 10px;" v-model="f.t" placeholder="请选择">
              <el-option
                v-for="item in options.o5"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
            <el-input style="width: 220px;" v-model.number="f.countBuy[0]" placeholder="多个用逗号隔开"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="f" class="demo-form-inline" label-position="left" label-width="100px;">
          <el-form-item class="item" label="备注旗帜">
            <el-checkbox-group v-model="f.t">
              <el-checkbox :label="1">手机端</el-checkbox>
              <el-checkbox :label="2">PC端</el-checkbox>
              <el-checkbox :label="3">聚划算</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-form :model="f" class="demo-form-inline" label-position="left" label-width="100px;">
          <el-form-item class="item" label="评价状态">
            <el-radio-group v-model="f.t">
              <el-radio :label="3">不限</el-radio>
              <el-radio :label="6">买家未评</el-radio>
              <el-radio :label="9">买家已评</el-radio>
              <el-radio :label="6">卖家未评</el-radio>
              <el-radio :label="9">卖家已评</el-radio>
              <el-radio :label="6">买家未评，卖家未评</el-radio>
              <el-radio :label="9">买家未评，卖家已评</el-radio>
              <el-radio :label="6">买家已评，卖家未评</el-radio>
              <el-radio :label="9">买家已评，卖家已评</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-form :model="f" class="demo-form-inline" label-position="left" label-width="100px;">
          <el-form-item class="item" label="物流状态">
            <el-checkbox-group v-model="f.t">
              <el-checkbox :label="1">包裹已达收件城市</el-checkbox>
              <el-checkbox :label="2">包裹派送中</el-checkbox>
              <el-checkbox :label="3">包裹已签收</el-checkbox>
              <el-checkbox :label="4">未付定金</el-checkbox>
              <el-checkbox :label="5">定金和尾款都付</el-checkbox>
              <el-checkbox :label="6">已付定金，未付尾款</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-form :model="f" class="demo-form-inline" label-position="left" label-width="100px;">
          <el-form-item class="item" label="是否预售">
            <el-radio :label="3" v-model="f.t">不限</el-radio>
            <el-radio :label="6" v-model="f.t">预售</el-radio>
            <el-radio :label="9" v-model="f.t">非预售</el-radio>
          </el-form-item>
        </el-form>
        <span><b>过滤设置</b></span>
        <el-form :model="f" class="demo-form-inline" label-position="left" label-width="100px;">
          <el-form-item class="item" label="关闭订单">
            <el-input type="number" style="width: 80px;" v-model.number="f.countBuy[0]"></el-input>
            次~
            <el-input type="number" style="width: 80px;" v-model="f.countBuy[1]"></el-input>次
          </el-form-item>
          <el-form-item class="item" label="关闭订单金额">
            <el-input type="number" style="width: 80px;" v-model.number="f.countBuy[0]"></el-input>
            元~
            <el-input type="number" style="width: 80px;" v-model="f.countBuy[1]"></el-input>元
          </el-form-item>
          <el-form-item class="item" label="">
            <el-button plain type="success" @click="updateForm" size="mini">确定</el-button>
            <el-button plain type="danger" @click="s=false" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import timeInterval from '../common/timeInterval.vue'

export default {
  name: 'orderQueryDialog',
  components: {
    timeInterval,
  },
  props: {
    form: Object,
    show: Boolean,
    changeMethod: Number, // 1 添加  2 修改
  },
  data () {
    return {
      loading: true,
      themeConf: themeConf,
      theme: 'theme-color-defualt',
      s: this.show,
      f: {
        t: null,
        orderDate1: null,
        orderDate2: null,
        orderDate3: [],
        orderType: null,
        countBuy: [null, null],
        countMoney: [null, null],
        countGoods: [null, null],
        countCumulative: [null, null],
        countSell: [null, null],
        countCumulativeMoney: [null, null],
        state1: null,
        state2: null,
        src: null,
        one: null,
        oneRank: [null, null],
      },
      data: {
      },
      options: {
        o1: [
          {
            id: 1,
            label: '下单时间',
          },
          {
            id: 1,
            label: '付款时间',
          },
          {
            id: 1,
            label: '发货时间',
          },
          {
            id: 1,
            label: '变更时间',
          },
          {
            id: 1,
            label: '签收时间',
          },
          {
            id: 1,
            label: '结束时间',
          },
          {
            id: 1,
            label: '最早下单时间',
          },
          {
            id: 1,
            label: '最后下单时间',
          },
          {
            id: 1,
            label: '最早付款时间',
          },
          {
            id: 1,
            label: '最后付款时间',
          },
        ],
        o2: [
          {
            id: 1,
            label: '绝对时间',
          },
          {
            id: 2,
            label: '相对时间',
          },
        ],
        o3: [
          {
            id: 1,
            label: '全部',
          },
          {
            id: 2,
            label: '一口价',
          },
        ],
        o4: [
          {
            id: 1,
            label: '客单价',
          },
          {
            id: 2,
            label: '笔单价',
          },
        ],
        o5: [
          {
            id: 1,
            label: '包含',
          },
          {
            id: 2,
            label: '不包含',
          },
        ],
      },
    }
  },
  watch: {
    show (n) {
      this.s = n
    }
  },
  methods: {
    // async init() {
    //   this.loading = false
    // },
    updateShow () {
      this.$emit('update:show', this.s)
    },
    updateForm () {
      this.$emit('update:form', this.f)
    },
  },
  created () {
    this.theme = unit.getTheme(this)
    this.data = this.form
    this.f = {...this.f, ...this.form}
    //this.init()
  },
}
</script>
<style scoped>
  .orderQueryDialog-main {
  }
  .orderQueryDialog-main .o1 {
    width: 160px;
  }
  .orderQueryDialog-main .o2 {
    width: 160px;
  }
</style>
