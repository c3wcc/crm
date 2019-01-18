<template>
  <div class="interaction-div">
    <div style="padding: 30px;">
      <div style="height: 25px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>云短信</b></el-breadcrumb-item>
          <el-breadcrumb-item><b>客户管理</b></el-breadcrumb-item>
          <el-breadcrumb-item><b>会员互动</b></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="display: flex;align-items: center;">
        <h3>会员互动</h3>
        <span style="margin-left: 15px;color: #999999;">此功能用于买家回复代号后，系统自动触发发送对应短信内容给买家。</span>
      </div>
      <div>
        <el-radio-group size="small" v-model="listOrCount" >
          <el-radio-button :label="1" >自动回复列表</el-radio-button>
          <el-radio-button :label="2" >自动回复统计</el-radio-button>
        </el-radio-group>        
      </div>
      <div v-if="listOrCount===1" style="width: 800px;">
        <div class="op">
          <el-button type="primary" @click="openEdit({}, 1)" size="mini" class="btn" plain>新建分类</el-button>
          <div style="display: flex;align-items: center;">
            <span>买家有回复时提醒我</span>
            <el-switch
              style="margin-left: 10px;"
              v-model="isRemaind"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="2">
            </el-switch>
            <span style="cursor: pointer;color: #009dd9;margin-left: 10px;" @click="openRepayEditor">编辑</span>
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
              label="自动回复序号">
              <template slot-scope="scope">
                <span :key="`自动回复序号${idx}${item}`" v-for="(item, idx) in scope.row.serial">
                  {{item}},
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="短信内容">
              <template slot-scope="scope">
                {{ scope.row.msg }}
              </template>
            </el-table-column>
            <el-table-column
              label="是否开启">
              <template slot-scope="scope">
                <el-switch
                  style="margin-left: 10px;"
                  v-model="scope.row.remaind"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="2">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="primary" @click="openEdit(scope.row, 2)" size="mini" class="btn" plain>编辑</el-button>
                <el-button type="primary" @click="deleteMsg(scope.row)" size="mini" class="btn" plain>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-else style="width: 800px;">
        <div style="margin-top: 20px;">
          <el-table
            v-if="!isLoadingTableList"
            v-loading="isLoadingTableList"
            element-loading-text="加载数据中"
            :data="list"
            border
            tooltip-effect="dark">
            <el-table-column
              label="自动回复序号">
              <template slot-scope="scope">
                <span :key="`自动回复序号${idx}${item}`" v-for="(item, idx) in scope.row.serial">
                  {{item}},
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="短信内容">
              <template slot-scope="scope">
                {{ scope.row.msg }}
              </template>
            </el-table-column>
            <el-table-column
              label="买家回复条数">
              <template slot-scope="scope">
                {{scope.row.repayCount}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialog.edit" width="1000px">
      <template slot="title">
        <div style="diaplay: flex;">
          <h4>短信回复</h4>
          <span style="color: red;">特别提醒：如修改自动回复代号，则自动回复统计中原代号对应的买家回复条数将清零，并按修改后的新代号重新统计！</span>
        </div>
      </template>
      <el-form v-if="dialog.edit" :model="form" label-position='left' label-width="100px">
        <el-form-item label="回复代号">
          <el-input class='creating-dialog-input' style="width: 300px;" @change='computeFormName' placeholder="输入分组名称" v-model="form.name">
            <template slot="suffix">{{form.serial.length}}/15</template>
          </el-input>
        </el-form-item>
        <el-form-item label="编辑短信">
          <msg-editor></msg-editor>
        </el-form-item>
        <el-form-item label="短信签名">
          <el-radio-group v-model="radio2">
            <el-radio :label="3">小云旗舰店1</el-radio>
            <el-radio :label="6">小云旗舰店2</el-radio>
            <el-radio :label="9">小云旗舰店3</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="短信测试">
          <div style="display: flex;">
            <el-input class='creating-dialog-input' style="width: 300px;" v-model="form.name"></el-input>
            <el-button style="margin-left: 20px;" type="success" size="mini" plain>发送短信测试</el-button>
          </div>
        </el-form-item>
        <el-form-item label="">
          <div style="display: flex;">
            <el-button type="success" size="mini" plain>保存</el-button>
            <el-button style="margin-left: 20px;" type="danger" size="mini" plain>取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import msgEditor from '../common/msgEditor.vue'

export default {
  name: 'interaction',
  components: {
    msgEditor,
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
        serial: '',
      },
      isLoadingTableList: false,
      list: [
        {
          serial: [1, 2, 32],
          msg: '【小云旗舰店】好的，正在为您发货，请留意物流信息',
          remind: 1,
          repayCount: 20,
        },
        {
          serial: [1, 2, 32],
          msg: '【小云旗舰店】好的，正在为您发货，请留意物流信息',
          remind: 1,
          repayCount: 20,
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
  },
  created () {
    this.theme = unit.getTheme(this)
    this.data = this.form
    //this.init()
  },
}
</script>
<style scoped>
  .interaction-div {

  }
  .interaction-div .op {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    
  }
</style>
