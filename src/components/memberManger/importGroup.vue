<template>
  <div>
    <el-form :model="data" class="demo-form-inline" label-position="left" label-width="80px;">
      <el-form-item label="旺旺昵称">
        <el-radio-group v-model="importFun" size="mini">
          <el-radio :label="1">手动输入</el-radio>
          <el-radio :label="2">添加文件</el-radio>
        </el-radio-group>
        <div v-if="importFun===1">
          <el-input
            style="width: 500px;"
            type="textarea"
            :rows="5"
            v-model="form.text">
          </el-input>
        </div>
        <div v-if="importFun===1">
          <span style="color: red;"><b>注</b></span><br>
          <span>1.多个旺旺昵称用’，‘隔开或一行一个。</span><br>
          <span>2.只能导入本店铺会员,非本店铺会员会自动过滤。重复买家昵称会自动去重。</span>
        </div>
        <div v-if="importFun===1">
          <span>筛选会员：<span style="color: #0000FF">{{selectCount}}</span>人 ，
          有号码：<span style="color: #0000FF">{{haveNumCount}}</span>人</span>
          <el-button plain style="margin-left: 10px;" size="mini">计算人群</el-button>
        </div>
      </el-form-item>
      <div v-if="importFun===2">
        <input type="file" ><br>
        <span>支持csv、xls、xlsx格式，文件大小不超过50M</span>
        <div>
          示例图片<br>
          <img :src="pic">
        </div>
      </div>
      <el-form-item label="">
        <el-button type="success" plain size="mini">保存分组</el-button>
        <el-button type="danger" plain size="mini">一键清空条件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import pic from '../../assets/example1.png'

export default {
  name: 'membermanger-importGroup',
  components: {
  },
  props: {
    form: Object,
  },
  data () {
    return {
      // loading: true,
      pic: pic,
      themeConf: themeConf,
      theme: 'theme-color-defualt',
      data: {
      },
      importFun: 1,
      selectCount: 1000,
      haveNumCount: 100,
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
    this.data = this.form
    //this.init()
  },
}
</script>
<style scoped>
  .sceneSelect-display-main-div {
    padding: 30px;
  }
</style>
