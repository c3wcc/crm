<template>
  <div class="inittemplate-div">
    <el-button plain style="" size="mini">按钮</el-button>
    <el-input type="number" style="width: 80px;" v-model.number="form.t"></el-input>
    <el-input v-model="form.t" placeholder="请输入内容"></el-input>


    <el-select v-model="form.t" placeholder="请选择">
      <el-option
        v-for="item in options.o1"
        :key="item.id"
        :label="item.label"
        :value="item.id">
      </el-option>
    </el-select>


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
    </el-table>

    <el-checkbox-group >
      <el-checkbox :label="1" name="type">持续开启</el-checkbox>
    </el-checkbox-group>
    
    <el-radio-group v-model="editForm.t">
      <el-radio :label="1" name="type">持续开启</el-radio>
      <el-radio :label="2" name="type">指定时间</el-radio>
    </el-radio-group>


    
    <el-form label-width="100px" :model="form" label-position="left">
      <el-form-item label="名字">
      </el-form-item>
    </el-form>

    <el-switch
      v-model="scope.row.t"
      active-color="#13ce66"
      inactive-color="#ff4949"
      :active-value="100"
      :inactive-value="0">
    </el-switch>


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
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
}
</script>
<style scoped>
  .test {
    cursor: pointer;
  }
</style>
