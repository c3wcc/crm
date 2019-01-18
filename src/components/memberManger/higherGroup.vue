<template>
  <div 
    v-loading="loading"
    element-loading-text="加载数据中"
    class="display-main-div">
    <div style="padding: 30px;">
      <div style="height: 25px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>云短信</b></el-breadcrumb-item>
          <el-breadcrumb-item><b>客户管理</b></el-breadcrumb-item>
          <el-breadcrumb-item><b>高级分组</b></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="display-main-div2 ">
        <!-- main-display2-height -->
        <div class="col1">
          <div class="row0">
            <el-input placeholder="输入分组名称" v-model="form.name">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="row1">
            <el-button type="primary" @click="openEdit" size="mini" class="btn" plain>新建分类</el-button>
            <el-button type="primary" size="mini" class="btn" @click="createOrImportGroup=1" plain>创建分组</el-button>
            <el-button type="primary" size="mini" class="btn" @click="createOrImportGroup=2" plain>导入分组</el-button>
          </div>
          <div style="width: 90%;height: 20px;background-color: #f2f2f2;color: #999999;margin-top: 20px;
            display: flex;justify-content: center;padding: 3px;">
            右击分类或分组进行操作
          </div>
          <div v-if="reflash" class="row2">
            <div class="row2-item" v-for="(item, index) in data.groupList" :key="`groupList${index}`">
              <div style="width: 100%;" >
                <i v-if="isGroupListShow[index]" @click="alterShow(index)" class="el-icon-caret-bottom"></i>
                <i v-else @click="alterShow(index)" class="el-icon-caret-right"></i>
                <span @contextmenu.prevent.stop="handleRightClickGroup($event, item)" style="margin-left: 5px;">
                  {{item.type}}
                </span>
              </div>
              <el-collapse-transition>
                <div v-show="isGroupListShow[index]">
                  <div class='row2-item-group-member' @click.prevent.stop='handleLeftClickGroupItem(item2)' @contextmenu.prevent.stop="handleRightClickGroupItem($event, item)" 
                    v-for="(item2, index2) in item.children" :key="`collapse-transition${index2}`">
                    【{{item2.type===1?'动态':'静态'}}】{{item2.name}}
                  </div>
                </div>
              </el-collapse-transition>              
            </div>
          </div>
        </div>
        <div v-show="!showMarketing" class="col2">
          <div class="left">
            <el-form :model="form" class="demo-form-inline" label-position="left" label-width="80px;">
              <el-form-item class="item" label="所属分类">
                <el-select v-model="form.type" placeholder="请选择">
                  <el-option
                    v-for="item in data.groupList"
                    :key="item.id"
                    :label="item.type"
                    :value="item.id">
                  </el-option>
                </el-select>              
              </el-form-item>
              <el-form-item label="分组名称">
                <el-input class='creating-dialog-input' @change='computeFormName' placeholder="输入分组名称" v-model="form.name">
                  <template slot="suffix">{{form.name.length}}/15</template>
                </el-input>
              </el-form-item>
              <el-form-item label="分类类型">
                <el-radio-group v-model="form.type">
                  <el-radio :label="3">动态分组</el-radio>
                  <el-radio :label="6">静态分组</el-radio>
                </el-radio-group>
                <div>
                  <span style="color: red;"><b>动态分组：</b></span><span>每晚12点根据分组条件自动刷新组内会员数据。</span>
                  <span style="color: red;"><b>静态分组：</b></span><span>只保存一次初始数据并且之后不再进行数据更新</span>
                </div>
                <div>
                  <el-radio-group v-model="createOrImportGroup" size="mini">
                    <el-radio-button :label="1">创建分组</el-radio-button>
                    <el-radio-button :label="2">导入分组</el-radio-button>
                  </el-radio-group>
                </div>
                <div>
                  <createGroup v-if="createOrImportGroup===1" :form.sync='form.create' :scene='createOption'></createGroup>
                  <importGroup v-else :form.sync='form.import' ></importGroup>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="createOrImportGroup===1" class="right">
            <selectCreateGropItem :scene.sync='createOption'></selectCreateGropItem>
          </div>
        </div>
        <div v-if="showMarketing" class="col2">
          <div>
            <el-form :inline="true" :model="marketing" label-position="left" label-width="100px;">
              <el-form-item style="margin-left: 40px;" label="">
                <span><b>{{`分组名称：${marketing.name}`}}</b></span>
              </el-form-item>
              <el-form-item style="margin-left: 40px;" label="">
                <span><b>{{`筛选会员：`}}<span style="color: blue;">{{marketing.count}}</span>{{`个, 有号码: `}}<span style="color: blue;">{{marketing.countHaveNum}}</span>个</b></span>
              </el-form-item>
              <el-form-item style="margin-left: 40px;" label="">
                <span><b>{{`分组类别：${marketing.tyep===1?'静态':'动态'}分组`}}</b></span>
              </el-form-item>
            </el-form>
            <br>
            <el-form :inline="true" :model="marketing" label-position="left" label-width="100px;">
              <el-form-item style="margin-left: 40px;" label="">
                <span><b>{{`创建时间${marketing.time}`}}</b></span>
              </el-form-item>
              <el-form-item style="margin-left: 40px;" label="">
                <span><b>{{`最后更新时间${marketing.time}`}}</b></span>
              </el-form-item>
            </el-form>
            <el-form :inline="true" :model="marketing" label-position="left" label-width="100px;">
              <el-form-item style="margin-left: 40px;" label="">
                <el-button type="primary" plain size="mini">立即营销</el-button>
              </el-form-item>
              <el-form-item style="margin-left: 40px;" label="">
                <el-button type="primary" plain size="mini">编辑</el-button>
              </el-form-item>
            </el-form>
            <el-table
              v-if="!isLoadingTableList"
              v-loading="isLoadingTableList"
              element-loading-text="加载数据中"
              :data="list"
              border
              tooltip-effect="dark"
              @selection-change="handleSelectionChange">
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
      </div>
      <el-dialog title="新建分类" :visible.sync="dialog.edit" width="700px">
        <el-form v-if="dialog.edit" :model="form" label-position='left' label-width="100px">
          <el-form-item label="分类名称">
            <el-input class='creating-dialog-input' @change='computeFormName' placeholder="输入分组名称" v-model="form.name">
              <template slot="suffix">{{form.name.length}}/15</template>
            </el-input>
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
    <vue-simple-context-menu
        :elementId="'myUniqueId1'"
        :options="options.rightClick1"
        :ref="'rghtClickGroupMenu'"
        @optionClicked="handleOptionClicked1">
    </vue-simple-context-menu>
    <vue-simple-context-menu
        :elementId="'myUniqueId2'"
        :options="options.rightClick2"
        :ref="'rghtClickGroupItemMenu'"
        @optionClicked="handleOptionClicked2">
    </vue-simple-context-menu>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
// import areaChoose from './areaChoose.vue'
import createGroup from './createGroup.vue'
import selectCreateGropItem from './selectCreateGropItem.vue'
import importGroup from './importGroup.vue'

export default {
  name: 'membermanger-higherGroup',
  components: {
    // areaChoose,
    createGroup,
    importGroup,
    selectCreateGropItem,
  },
  data () {
    return {
      loading: true,
      isLoadingTableList: false,
      themeConf: themeConf,
      theme: 'theme-color-defualt',
      reflash: true,
      showMarketing: false,
      data: {
        groupList: [
          {
            id: 1,
            type: '分类1',
            children: [
              {
                type: 1,
                name: '4444444',
                count: 1000,
                countHaveNum: 100,
              }
            ],
          },
          {
            id: 2,
            type: '分类2',
            children: [

            ],
          },
          {
            id: 3,
            type: '分类3',
            children: [

            ],
          },
        ],
      },
      form: {
        name: '',
        explanation: '',
        areaCustom: [],
        import: {

        },
        create: {

        },
      },
      listSelect: '全部分组',
      list: null,
      multipleSelection: [],
      dialog: {
        edit: false,
      },
      createOrImportGroup: 1,
      createOption: [],
      isGroupListShow: [],
      marketing: {
        time: '2016-04-12 20:07',
      },
      marketingList: [],
      options: {
        rightClick1: [
          {
            name: '新建分类',
          },
        ],
        rightClick2: [
          {
            name: '新建分类',
          },
          {
            name: '修改',
          },
          {
            name: '删除',
          }
        ],
      }
    }
  },
  computed: {

  },
  methods: {
    async init() {
      for (let idx = 0; idx < this.data.groupList.length; idx ++) {
        this.isGroupListShow.push(true)
      }
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
    alterShow (idx) {
      this.isGroupListShow[idx] = !this.isGroupListShow[idx]
      this.reflash = false
      this.reflash = true
    },
    
    handleRightClickGroup (event, item) {
      this.$refs.rghtClickGroupMenu.showMenu(event, item)
    },
    handleRightClickGroupItem (event, item) {
      this.$refs.rghtClickGroupItemMenu.showMenu(event, item)
    },
    handleLeftClickGroupItem (item) {
      this.marketing = {...this.marketing, ...item}
      this.showMarketing = true
    },
    handleOptionClicked1 (event) {

      event
      // window.alert(JSON.stringify(event))
    },
    handleOptionClicked2 (event) {
      event
      // window.alert(JSON.stringify(event))
    },
  },
  created () {
    this.theme = unit.getTheme(this)
    this.init()
  },
}
</script>
<style scoped>
  .display-main-div {

  }
  .display-main-div2 {
    width: 100%;
    padding-top: 20px;
    display: flex;
  }
  .display-main-div2 .col1 {
    /* width: 15%; */
    border-left: 0px;
    border-top: 0px;
    border-bottom: 1px;
    border-right: 1px;
    border-style:solid;
    border-color: #d7d7d7;
    /* overflow-y: scroll; */
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding-bottom: 30px;
  }
  .display-main-div2 .row0 {
    margin-bottom: 20px;
  }
  .display-main-div2 .col1 .row1{
    display: flex;
    justify-content: space-between;
  }
  .display-main-div2 .col1 .row1 .btn{
    width: 80px;
  }
  .display-main-div2 .col1 .row2{
    width: 100%;
  }
  .display-main-div2 .col1 .row2 .row2-item {
    color: #333333;
    cursor: pointer;
  }
  .display-main-div2 .col1 .row2 .row2-item-group-member {
    display: flex;
    margin-left: 30px;
    cursor: pointer;
  }
  .display-main-div2 .col2 {
    width: 100%;
    height: 100%;
    padding-left: 30px;
    display: flex;
  }
  .display-main-div2 .col2 .left{
    width: 70%;
  }
  .display-main-div2 .col2 .right{
    width: 25%;
  }
  /* .display-main-div2 .col2 .left .tip-text span {
  } */
  .creating-dialog-input {
    width: 400px;
  }
  /* .creating-dialog-radio {
    display: flex;
    align-items: center;
  } */
</style>
