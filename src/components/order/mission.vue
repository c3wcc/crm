<template>
  <div class="mission-div">
    <div>
      <div class="op">
        <div>
          <el-button plain size="small" v-if="showList" @click="openEdit({}, 1)">创建任务</el-button>
          <el-button plain size="small" v-if="!showList" @click="showList=true">返回列表</el-button>
        </div>
        
        <div v-if="showList" style="display: flex;align-items: center;">
          <span style="width: 180px;">开启状态：</span>
          <el-select v-model="form.t" placeholder="请选择">
            <el-option
              v-for="item in options.o1"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input v-model="form.t" style="margin-left: 10px;" placeholder="输入任务名称，短信内容"></el-input>
          <el-button plain style="margin-left: 10px;">查询</el-button>
        </div>
      </div>
      <div v-if="showList" style="margin-top: 20px;">
        <el-table
          v-if="!isLoadingTableList"
          v-loading="isLoadingTableList"
          element-loading-text="加载数据中"
          :data="list"
          border
          tooltip-effect="dark">
          <el-table-column
            label="任务名称">
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
          <el-table-column
            label="任务时间">
            <template slot-scope="scope">
              {{scope.row.t}}
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间">
            <template slot-scope="scope">
              {{scope.row.t}}
            </template>
          </el-table-column>
          <el-table-column
            label="最后修改时间">
            <template slot-scope="scope">
              {{scope.row.t}}
            </template>
          </el-table-column>
          <el-table-column
            label="优先级"
            width="80">
            <template slot-scope="scope">
              <el-popover
                placement="left"
                width="100px"
                trigger="click">
                <el-input type="number" style="width: 80px;" v-model.number="scope.row.t"></el-input>
                <span slot="reference" style="cursor: pointer;color: #409eff;">{{scope.row.t}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="开启状态"
            width="80">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.t"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="100"
                :inactive-value="0">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" @click="openEdit(scope.row, 2)" style="margin-left: 10px;">编辑</el-button>
              <el-button type="danger" plain size="mini" @click="deleteMssion(scope.row)" style="margin-left: 10px;">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else style="margin-top: 20px;">
        <el-form label-width="100px" :model="editForm" label-position="left">
          <el-form-item label="是否开启">
            <el-switch
              v-model="editForm.t"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="100"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="任务时间">
            <el-radio-group style="margin-right: 20px;" v-model="editForm.t">
              <el-radio :label="1" name="type">持续开启</el-radio>
              <el-radio :label="2" name="type">指定时间</el-radio>
            </el-radio-group>
            <time-interval></time-interval>
          </el-form-item>
          <el-form-item label="发送时间">
            <span style="margin-right: 5px;">买家下单</span>
            <el-input type="number" style="width: 80px;" v-model.number="editForm.t">数字输入框</el-input>
            <el-select style="margin-right: 5px;width: 80px;" v-model="form.t" placeholder="时间">
              <el-option
                v-for="item in options.o2"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
            <span>发送短信</span>
          </el-form-item>
          <el-form-item label="发送时段">
            <span style="margin-right: 5px;">每天</span>
            <el-time-picker
              style="width: 150px;"
              v-model="editForm.t">
            </el-time-picker>
            <span style="margin-left: 5px;margin-right: 5px;">至</span>
            <el-time-picker
              style="width: 150px;"
              v-model="editForm.t">
            </el-time-picker>
            <span style="margin-left: 5px;margin-right: 5px;">时，发送短信。其他时间发送短信</span>
            <el-select 
              style="width: 150px;"
              v-model="form.t" placeholder="请选择">
              <el-option
                v-for="item in options.o3"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
            <el-time-select
              style="width: 100px;"
              v-model="form.t"
              :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00'
              }">
            </el-time-select>
            <br>
            <span style="margin-right: 5px;margin-top: 5px;">午休时间</span>
            <el-time-picker
              style="width: 150px;margin-top: 5px;"
              v-model="editForm.t">
            </el-time-picker>
            <span style="margin-left: 5px;margin-right: 5px;margin-top: 5px;">至</span>
            <el-time-picker
              style="width: 150px;"
              v-model="editForm.t">
            </el-time-picker>
            <span style="margin-left: 5px;margin-top: 5px;">不发送</span>
          </el-form-item>
          <el-form-item label="发送条件">
            <div>
              <el-checkbox style="margin-right: 10px;" v-model="editForm.t" :label="1" name="type">实付金额达到</el-checkbox>
              <el-input type="number" style="width: 80px;" v-model.number="editForm.t"></el-input>
              ~
              <el-input type="number" style="width: 80px;" v-model.number="editForm.t"></el-input>
              <span style="margin-left: 10px;">元</span>
            </div>
            <div style="margin-top: 10px;">
              <el-checkbox style="margin-right: 10px;" v-model="editForm.t" :label="1" name="type">商品数量</el-checkbox>
              <el-input type="number" style="width: 80px;" v-model.number="editForm.t"></el-input>
              ~
              <el-input type="number" style="width: 80px;" v-model.number="editForm.t"></el-input>
            </div>
            <div style="margin-top: 10px;">
              <el-checkbox style="margin-right: 10px;" v-model="editForm.t" :label="1" name="type">买家留言包含</el-checkbox>
              <el-input style="width: 200px;" v-model="editForm.t" placeholder="多个关键字用“,”隔开"></el-input>
              <el-radio-group style="margin-left: 10px;"  v-model="editForm.t">
                <el-radio :label="1" name="type">发送</el-radio>
                <el-radio :label="2" name="type">不发送</el-radio>
              </el-radio-group>
            </div>
            <div style="margin-top: 10px;">
              <el-checkbox style="margin-right: 10px;" v-model="editForm.t" :label="1" name="type">买家备注包含</el-checkbox>
              <el-input style="width: 200px;" v-model="editForm.t" placeholder="多个关键字用“,”隔开"></el-input>
              <el-radio-group style="margin-left: 10px;"  v-model="editForm.t">
                <el-radio :label="1" name="type">发送</el-radio>
                <el-radio :label="2" name="type">不发送</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="订单来源">
            <el-checkbox-group >
              <el-checkbox :label="1" name="type">手机端</el-checkbox>
              <el-checkbox :label="2" name="type">PC端</el-checkbox>
              <el-checkbox :label="3" name="type">聚划算</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="订单类型">
            <el-radio-group style="margin-left: 10px;"  v-model="editForm.t">
              <el-radio :label="1" name="type">发送</el-radio>
              <el-radio :label="2" name="type">不发送</el-radio>
            </el-radio-group>
            <el-select style="margin-left: 10px;" v-model="form.t" placeholder="时间">
              <el-option
                v-for="item in options.o4"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单旗标">
            <el-radio-group style="margin-left: 10px;"  v-model="editForm.t">
              <el-radio :label="1" name="type">1</el-radio>
              <el-radio :label="2" name="type">2</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发送号码">
            <el-radio-group style="margin-left: 10px;"  v-model="editForm.t">
              <el-radio :label="1" name="type">优先收货人手机号</el-radio>
              <el-radio :label="2" name="type">优先支付宝手机号</el-radio>
              <el-radio :label="3" name="type">收货人手机号</el-radio>
              <el-radio :label="4" name="type">支付宝手机号</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="会员等级">
            <el-checkbox-group >
              <el-checkbox :label="1" name="type">首次到店会员</el-checkbox>
              <el-checkbox :label="2" name="type">店铺会员</el-checkbox>
              <el-checkbox :label="3" name="type">高级会员</el-checkbox>
              <el-checkbox :label="4" name="type">VIP会员</el-checkbox>
              <el-checkbox :label="5" name="type">至尊VIP</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="过滤设置">
            <div>
              <el-checkbox :label="1" :v-model="editForm.t" name="type">同一个旺旺号</el-checkbox>
              <el-input type="number" style="width: 80px;margin-left: 5px;" v-model.number="editForm.t"></el-input>
              <span style="color: #606266;margin-left: 5px;">天只提醒一次</span>

              <el-checkbox style="margin-left: 20px;" :label="1" :v-model="editForm.t" name="type">同一个旺旺号</el-checkbox>
              <el-input type="number" style="width: 80px;margin-left: 5px;" v-model.number="editForm.t"></el-input>
              <span style="color: #606266;margin-left: 5px;">天只提醒一次</span>
            </div>
            <div>
              <el-checkbox :label="1" :v-model="editForm.t" name="type">屏蔽黑名单</el-checkbox>
              <span style="color: #92a8ff;cursor: pointer;"
                @click="$router.push({ path: '/memberManger/blacklist'})">
                查看
              </span>
              <el-checkbox style="margin-left: 20px;" :label="1" :v-model="editForm.t" name="type">屏蔽给过中差评客户</el-checkbox>
              <el-checkbox style="margin-left: 20px;" :label="1" :v-model="editForm.t" name="type">屏蔽退过款客户</el-checkbox>
            </div>
          </el-form-item>
          <el-form-item label="选择地区">
            <el-radio v-model="form.area" label="1">不限</el-radio>
            <el-radio v-model="form.area" label="2">江浙泸</el-radio>
            <el-radio v-model="form.area" label="3">偏远地区</el-radio>
            <el-radio v-model="form.area" label="4">自定义</el-radio>
            <el-popover
              style="padding: 0px;"
              placement="bottom-start"
              trigger="click">
              <areaChoose :chosen.sync='form.areaCustom'></areaChoose>
              <span style="color: #92a8ff;cursor: pointer;" slot="reference">(50)</span>
            </el-popover>
          </el-form-item>
          <el-form-item label="选择商品">
            <el-radio v-model="form.area" label="1">全部商品</el-radio>
            <el-radio v-model="form.area" label="2">指定商品</el-radio>
            <el-radio v-model="form.area" label="3">排除商品</el-radio>
            <span @click="selectGoods" style="color: #92a8ff;cursor: pointer;">
              已选{{selectGoodsCount}}个(点击进行筛选)
            </span>
          </el-form-item>
          <el-form-item label="短信签名">
            <el-radio-group style="margin-left: 10px;"  v-model="editForm.t">
              <el-radio :key="index" v-for="(item, index) in options.shopName" :label="item.id" name="type">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="编辑短信">
            <msgEditor></msgEditor>
          </el-form-item>
          <el-form-item label="短信测试">
            <el-input style="width: 200px;" v-model="editForm.t" placeholder="多个关键字用“,”隔开"></el-input>
            <el-button plain style="margin-left: 10px;">发送测试号码</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button plain type="success">保存设置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    
    <el-dialog :visible.sync="dialog.edit" width="1200px">
      <template slot="title">
        <div style="diaplay: flex;">
          <h4>选择商品</h4>
        </div>
      </template>
      <div v-if="dialog.edit">
        <choose-goods :selectGoodsList.sync='form.selectGoodsList'></choose-goods>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import timeInterval from '../common/timeInterval.vue'
import areaChoose from '../memberManger/areaChoose.vue'
import msgEditor from '../common/msgEditor.vue'
import chooseGoods from './chooseGoods.vue'

export default {
  name: 'mission',
  components: {
    timeInterval,
    areaChoose,
    msgEditor,
    chooseGoods,
  },
  props: {
    param: Object,
  },
  data () {
    return {
      loading: true,
      themeConf: themeConf,
      isLoadingTableList: false,
      theme: 'theme-color-defualt',
      data: {
      },
      selectGoodsCount: 10,
      showList: true,
      form: {
        t: null,
        areaCustom: [],
        selectGoodsList: [],
      },
      editForm: {
        t: null,
      },
      list: [
        {
          t: '123',

        }
      ],
      options: {
        o1: [
          {
            id: 1,
            label: '全部',
          },
          {
            id: 2,
            label: '已开启',
          },
          {
            id: 3,
            label: '已关闭',
          },
        ],
        o2: [
          {
            id: 1,
            label: '分钟',
          },
          {
            id: 2,
            label: '小时',
          },
          {
            id: 3,
            label: '天',
          },
        ],
        o3: [
          {
            id: 1,
            label: '不发送',
          },
          {
            id: 2,
            label: '顺延第二天',
          },
        ],
        o4: [
          {
            id: 1,
            label: '全部',
          },
          {
            id: 2,
            label: '未付定金',
          },
          {
            id: 3,
            label: '已付定金，未付尾款',
          },
          {
            id: 4,
            label: '定金已付，尾款已付',
          },
        ],
        shopName: [
          {
            id: 1,
            name: '店铺名1'
          }
        ],
      },
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

    // 1增加 2修改
    async openEdit (data, type) {
      if (type)
      this.editForm = {...this.editForm, ...data}
      this.showList = false
    },
    async selectGoods () {
      this.dialog.edit = true
    }
  },
  created () {
    this.theme = unit.getTheme(this)
    this.data = this.form
    //this.init()
  },
}
</script>
<style scoped>
  .mission-div {
    width: 100%;
    
    margin-top: 20px;
  }
  .mission-div .op{
    display: flex;
    width: 80%;
    justify-content: space-between;
    
  }
</style>
