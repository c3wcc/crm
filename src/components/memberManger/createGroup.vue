<template>
  <div v-if="!loading" class="create-group-main">
    <!-- <div :key="i" v-for="i in scene">
      {{i}}
    </div> -->
    <span class="title"><b>基本信息</b></span>
    <el-form label-width="100px" :model="form" label-position="left">
      <el-form-item label="活动名称" prop="name">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group >
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('星座')==-1" class="item" label="星座">
        <el-checkbox-group v-model="form.t">
          <el-checkbox :label="0">学生</el-checkbox>
          <el-checkbox :label="0">IT</el-checkbox>
          <el-checkbox :label="0">金融族</el-checkbox>
          <el-checkbox :label="0">公务员</el-checkbox>
          <el-checkbox :label="0">白领</el-checkbox>
          <el-checkbox :label="0">居家族</el-checkbox>
          <el-checkbox :label="0">其他</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('会员等级')==-1" class="item" label="会员等级">
        <el-checkbox-group v-model="form.t">
          <el-checkbox :label="1">店铺客户</el-checkbox>
          <el-checkbox :label="2">普通客户</el-checkbox>
          <el-checkbox :label="3">高级会员</el-checkbox>
          <el-checkbox :label="4">VIP会员</el-checkbox>
          <el-checkbox :label="5">至尊VIP</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('淘宝标签')==-1" class="item" label="淘宝标签">
        <el-select style="width: 100px;" v-model="form.t" placeholder="请选择">
          <el-option
            v-for="item in options.o1"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <div style="background-color: #f2f2f2;padding: 5px;">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" 
            @change="handleCheckAllChange">
            全选
          </el-checkbox>
          <el-checkbox-group v-model="form.checkedTag" @change="handleCheckedTagChange">
            <el-checkbox v-for="item in options.tagList" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('买家印象')==-1" class="item" label="买家印象">
        <el-checkbox-group v-model="form.t">
          <el-checkbox :label="0"><el-rate v-model="rate[0]" disabled ></el-rate></el-checkbox>
          <el-checkbox :label="1"><el-rate v-model="rate[1]" disabled ></el-rate></el-checkbox>
          <el-checkbox :label="2"><el-rate v-model="rate[2]" disabled ></el-rate></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('买家印象')==-1" class="item" label="">
        <el-checkbox-group v-model="form.t">
          <el-checkbox :label="3"><el-rate v-model="rate[3]" disabled ></el-rate></el-checkbox>
          <el-checkbox :label="4"><el-rate v-model="rate[4]" disabled ></el-rate></el-checkbox>
          <el-checkbox :label="5">无</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('性别')==-1" class="item" label="性别">
        <el-checkbox-group v-model="form.t">
          <el-checkbox :label="0">男</el-checkbox>
          <el-checkbox :label="0">女</el-checkbox>
          <el-checkbox :label="0">未知</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('职业')==-1" class="item" label="职业">
        <el-checkbox-group v-model="form.t">
          <el-checkbox :label="0">学生</el-checkbox>
          <el-checkbox :label="0">IT</el-checkbox>
          <el-checkbox :label="0">金融族</el-checkbox>
          <el-checkbox :label="0">公务员</el-checkbox>
          <el-checkbox :label="0">白领</el-checkbox>
          <el-checkbox :label="0">居家族</el-checkbox>
          <el-checkbox :label="0">其他</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('生日')==-1" class="item" label="生日">
        <el-select style="width: 100px;margin-right: 20px;" v-model="form.t" placeholder="请选择">
          <el-option
            v-for="item in options.o2"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="form.t"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('年龄')==-1" class="item" label="年龄">
        <el-select style="width: 100px;margin-right: 20px;" v-model="form.t" placeholder="请选择">
          <el-option
            v-for="item in options.o1"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('QQ')==-1" class="item" label="QQ">
        <el-select style="width: 100px;margin-right: 20px;" v-model="form.t" placeholder="请选择">
          <el-option
            v-for="item in options.o1"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input style="width: 400px;" v-model.number="form.t" placeholder="多个请用','隔开'" ></el-input>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('微信')==-1" class="item" label="微信">
        <el-select style="width: 100px;margin-right: 20px;" v-model="form.t" placeholder="请选择">
          <el-option
            v-for="item in options.o1"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input style="width: 400px;" v-model.number="form.t" placeholder="多个请用','隔开'" ></el-input>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('邮箱')==-1" class="item" label="邮箱">
        <el-select style="width: 100px;margin-right: 20px;" v-model="form.t" placeholder="请选择">
          <el-option
            v-for="item in options.o1"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input style="width: 400px;" v-model.number="form.t" placeholder="多个请用','隔开'" ></el-input>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('旺旺昵称')==-1" class="item" label="旺旺昵称">
        <el-select style="width: 100px;margin-right: 20px;" v-model="form.t" placeholder="请选择">
          <el-option
            v-for="item in options.o1"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input style="width: 400px;" v-model.number="form.t" placeholder="多个请用','隔开'" ></el-input>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('买家姓名')==-1" class="item" label="买家姓名">
        <el-select style="width: 100px;margin-right: 20px;" v-model="form.t" placeholder="请选择">
          <el-option
            v-for="item in options.o1"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input style="width: 400px;" v-model.number="form.t" placeholder="多个请用','隔开'" ></el-input>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('星座')==-1" class="item" label="星座">
        <el-checkbox-group v-model="form.t">
          <el-checkbox :label="0">白羊座</el-checkbox>
          <el-checkbox :label="0">金牛座</el-checkbox>
          <el-checkbox :label="0">双子座</el-checkbox>
          <el-checkbox :label="0">巨蟹座</el-checkbox>
          <el-checkbox :label="0">狮子座</el-checkbox>
          <el-checkbox :label="0">处女座</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('星座')==-1" class="item" label="">
        <el-checkbox-group v-model="form.t">
          <el-checkbox :label="0">天秤座</el-checkbox>
          <el-checkbox :label="0">天蝎座</el-checkbox>
          <el-checkbox :label="0">射手座</el-checkbox>
          <el-checkbox :label="0">摩羯座</el-checkbox>
          <el-checkbox :label="0">水瓶座</el-checkbox>
          <el-checkbox :label="0">双鱼座</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('手机号段')==-1" class="item" label="手机号段">
        <el-checkbox-group v-model="form.t">
          <el-checkbox :label="0">联通</el-checkbox>
          <el-checkbox :label="0">移动</el-checkbox>
          <el-checkbox :label="0">电信</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('气温')==-1" class="item" label="气温">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        &nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('省市')==-1" class="item" label="省市">
        默认全部
      </el-form-item>
    </el-form>

    
    <span class="title"><b>交易属性</b></span>
    <el-form label-width="100px" :model="form" label-position="left">
      <el-form-item v-if="scene.indexOf('详细地址')==-1" class="item" label="详细地址">
        <el-select style="width: 100px;margin-right: 20px;" v-model="form.t" placeholder="请选择">
          <el-option
            v-for="item in options.o1"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input style="width: 400px;" v-model.number="form.t"  ></el-input>
        <span style="margin-left: 5px;"><b>多个请用“,”隔开'</b></span>
        <el-radio-group v-model="form.t">
          <el-radio :label="3">找学生/教师</el-radio>
          <el-radio :label="6">找白领</el-radio>
          <el-radio :label="6">找公务员</el-radio>
          <el-radio :label="9">找IT人员</el-radio>
          <el-radio :label="9">找金额族</el-radio>
          <el-radio :label="9">找医护人员</el-radio>
          <el-radio :label="9">找居家族</el-radio>
          <el-radio :label="9">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('邮费')==-1" class="item" label="邮费">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        &nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
      </el-form-item>
      <orderQuery :form.sync='form.orderQuery'></orderQuery>
    </el-form>    
    
    <span class="title"><b>RFM模型属性</b></span>
    <el-form label-width="120px" :model="form" label-position="left">
      <el-form-item v-if="scene.indexOf('第一次下单时间')==-1" class="item" label="第一次下单时间">
        <time-interval :time.sync='form.time'></time-interval>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('第一次付款时间')==-1" class="item" label="第一次付款时间">
        <time-interval :time.sync='form.time'></time-interval>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('第一次成功时间')==-1" class="item" label="第一次成功时间">
        <time-interval :time.sync='form.time'></time-interval>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('最后下单时间')==-1" class="item" label="最后下单时间">
        <time-interval :time.sync='form.time'></time-interval>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('最后付款时间')==-1" class="item" label="最后付款时间">
        <time-interval :time.sync='form.time'></time-interval>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('最后成功时间')==-1" class="item" label="最后成功时间">
        <time-interval :time.sync='form.time'></time-interval>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('付款休眠时间')==-1" class="item" label="付款休眠时间">
        <time-interval :time.sync='form.time'></time-interval>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('成功次数')==-1" class="item" label="成功次数">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        次&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>次
      </el-form-item>
      <el-form-item v-if="scene.indexOf('下单休眠时间')==-1" class="item" label="下单休眠时间">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        天&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>天
      </el-form-item>
      <el-form-item v-if="scene.indexOf('成功休眠时间')==-1" class="item" label="成功休眠时间">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        天&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>天
      </el-form-item>
      <el-form-item v-if="scene.indexOf('下单次数')==-1" class="item" label="下单次数">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        次&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>次
      </el-form-item>
      <el-form-item v-if="scene.indexOf('客户复购周期')==-1" class="item" label="客户复购周期">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        天&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>天
      </el-form-item>
      <el-form-item v-if="scene.indexOf('退款次数')==-1" class="item" label="退款次数">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        次&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>次
      </el-form-item>
      <el-form-item v-if="scene.indexOf('客单价')==-1" class="item" label="客单价">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        元&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>元
      </el-form-item>
      <el-form-item v-if="scene.indexOf('客件数')==-1" class="item" label="客件数">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        件&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>件
      </el-form-item>
      <el-form-item v-if="scene.indexOf('下单总额')==-1" class="item" label="下单总额">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        元&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>元
      </el-form-item>
      <el-form-item v-if="scene.indexOf('成功交易额')==-1" class="item" label="成功交易额">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        元&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>元
      </el-form-item>
      <el-form-item v-if="scene.indexOf('退款总额')==-1" class="item" label="退款总额">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        元&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>元
      </el-form-item>
    </el-form>
    <span class="title"><b>营销属性</b></span>
    <el-form label-width="150px" :model="form" label-position="left">
      <el-form-item v-if="scene.indexOf('短信营销复购')==-1" class="item" label="短信营销复购">  
        <el-radio-group v-model="form.t">
          <el-radio :label="3">是</el-radio>
          <el-radio :label="6">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('短信营销次数')==-1" class="item" label="短信营销次数">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        次&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>次
      </el-form-item>
      <el-form-item v-if="scene.indexOf('最后短信营销时间')==-1" class="item" label="最后短信营销时间">
        <time-interval :time.sync='form.time'></time-interval>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('短信营销休眠天数')==-1" class="item" label="短信营销休眠天数">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        次&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>次
      </el-form-item>
      <el-form-item v-if="scene.indexOf('短链点击次数')==-1" class="item" label="短链点击次数">  
        <el-checkbox-group v-model="form.t">
          <el-checkbox :label="form.t">短链点击客户</el-checkbox>
          <el-checkbox :label="form.t">短链未点击客户</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="scene.indexOf('聚划算敏感度')==-1" class="item" label="聚划算敏感度">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        %&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>%
      </el-form-item>
      <el-form-item v-if="scene.indexOf('万人团敏感度')==-1" class="item" label="万人团敏感度">
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
        %&nbsp;&nbsp;~&nbsp;&nbsp;
        <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>%
      </el-form-item>
      <el-form-item v-if="scene.indexOf('链接最后点击时间')==-1" class="item" label="链接最后点击时间">
        <time-interval :time.sync='form.time'></time-interval>
      </el-form-item>
    </el-form>
    
      <div style="margin-top: 20px;">
        <span><b>筛选会员：<span style="color: #0000FF">{{selectCount}}</span>人 ，
        有号码：<span style="color: #0000FF">{{haveNumCount}}</span>人</b></span>
        <el-button plain style="margin-left: 10px;" size="mini">计算人群</el-button>
      </div>
      <el-button type="success" plain size="mini">保存分组</el-button>
      <el-button type="danger" plain size="mini">一键清空条件</el-button>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import orderQuery from './orderQuery.vue'
import timeInterval from '../common/timeInterval.vue'

export default {
  name: 'membermanger-createGroup',
  components: {
    orderQuery,
    timeInterval,
  },
  props: {
    scene: Array,
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
        checkedTag: [],
        // 订单查询列表
        orderQuery: [
          {
            
          }
        ],
        time: [],
      },
      rate: [1, 2, 3, 4, 5],
      isIndeterminate: false,
      checkAll: false,
      selectCount: 1000,
      haveNumCount: 100,
      options: {
        o1: [
          {
            id: 1,
            label: '不限',
          },
          {
            id: 2,
            label: '指定',
          },
          {
            id: 3,
            label: '排除',
          },
        ],
        o2: [
          {
            id: 1,
            label: '指定',
          },
          {
            id: 2,
            label: '介于',
          },
          {
            id: 3,
            label: '排除',
          },
        ],
        tagList: ['标签1', '标签2', '标签3', ],
      }
    }
  },
  computed: {

  },
  methods: {
    async init() {
      this.loading = false
    },
    handleCheckAllChange(val) {
      this.form.checkedTag = val ? this.options.tagList : [];
      this.isIndeterminate = false;
    },
    handleCheckedTagChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.options.tagList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.tagList.length
    }
  },
  created () {
    this.theme = unit.getTheme(this)
    this.init()
  },
}
</script>
<style scoped>
  .create-group-main .title {
    font-size: 20px;
  }
</style>
