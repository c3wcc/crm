<template>
  <div v-if="!loading" class="area-choose-main">
    <div class="tip">
      <el-form :inline="true">
        <el-form-item class="item" >
          <div slot="label">
            &nbsp;&nbsp;选择所在省份
          </div>
          <el-radio v-model="quickSelect" label="1">全选</el-radio>
          <el-radio v-model="quickSelect" label="2">排除地区</el-radio>
          <el-radio v-model="quickSelect" label="3">排除偏远地区</el-radio>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item style="display: flex;">
          <el-checkbox-group v-model="c">
            <el-checkbox label="x">华东</el-checkbox>
            <el-checkbox label="a"></el-checkbox>
            <el-checkbox label="b"></el-checkbox>
            <el-checkbox label="c"></el-checkbox>
            <el-checkbox label="d"></el-checkbox>
            <el-checkbox label="e"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'

export default {
  name: 'memberManger',
  data () {
    return {
      loading: true,
      themeConf: themeConf,
      c: [],
      quickSelect: null,
      quickSelectRow: [false, true],
    }
  },
  props: {
    chosen: Array,
  },
  methods: {
    async init () {
      this.loading = false
    },
    updateChosen () {
      this.$emit('update:chosen', this.c)
    },
    handleRawChosen () {
      this.c = [...this.chosen]
      console.log(this.c)
    }
  },
  created () {
    this.theme = unit.getTheme(this)
    this.handleRawChosen()
    this.init()
  },
}
</script>
<style scoped>
  .area-choose-main {

  }
  .area-choose-main .tip .item {
    width: 100%;
    background-color: #f2f2f2;
    padding: 2px;
  }
</style>
