<template>
  <div class="orderQuery-div">
    <input v-show="false" type="text" ref="newFirstOrderQueryBtn" @click="newFirstOrderQuery">
    <!-- <el-button v-show="false" type="text" ref="newFirstOrderQueryBtn" @click="newFirstOrderQuery"  type="primary" plain size="mini">新建订单查询</el-button> -->
    <div class="orderQuery-item" v-for="(item, index) in data" :key="`orderQuery${index}`">
      <div class="orderQuery-head">
        <div style="display: flex;">
          <span>订单查询</span>
          <el-select class='o1' v-model="f[index]">
            <!-- v-if="index!==0"  -->
            <el-option
              v-for="item in options.o1"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="op">
          <el-button @click="show.edit=true" icon="el-icon-edit" circle></el-button>
          <el-button icon="el-icon-delete" circle></el-button>
          <el-button icon="el-icon-circle-plus-outline" circle></el-button>
        </div>
      </div>
      <div class="orderQuery-body">
        <div style="margin-left: 20px;">
          <el-form :model="f[index]" class="demo-form-inline" label-position="left" label-width="100px;">
            <el-form-item class="item">
              <template slot="label">
                <b>下单时间</b>
              </template>
              <span>2018-08-30 16:04:20~2018-08-31 16:05:17</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <order-query-dialog :show.sync="show.edit" :form.sync='oneForm'></order-query-dialog>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import orderQueryDialog from './orderQueryDialog.vue'

export default {
  name: 'orderQuery',
  components: {
    orderQueryDialog,
  },
  props: {
    form: Array,
  },
  data () {
    return {
      loading: true,
      themeConf: themeConf,
      theme: 'theme-color-defualt',
      f: this.form,
      data: {
      },
      oneForm: {
      },
      show: {
        edit: false,
      },
      options: {
        o1: [
          {
            id: 1,
            label: '并且',
          },
          {
            id: 1,
            label: '或者',
          },
          {
            id: 1,
            label: '排除',
          },
        ]
      }
    }
  },
  computed: {
    needClickNewBtn () {
      return this.$store.state.member.needNewOrderQuery
    }
  },
  watch: {
    needClickNewBtn (n) {
      if (n) {
        this.$refs.newFirstOrderQueryBtn.click()
        this.$store.commit(this.$types.MEMBER.END_NEW_ORDER_QUERY)
      }
    }
  },
  methods: {
    // async init() {
    //   this.loading = false
    // },
    newFirstOrderQuery () {
      this.show.edit = true
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
  .orderQuery-main {

  }
  .orderQuery-item {
    background-color: #f2f2f2;
  }
  .orderQuery-head {
    background-color: #f2f2f2;
    padding: 5px;
    display: flex;
    justify-content: space-between;
  }
  .orderQuery-head .o1{
    width: 100px;
    margin-left: 20px;
  }
  .orderQuery-head .op {
    display: flex;
    margin-right: 10px;
  }
  .orderQuery-body {
    background-color: #f2f2f2;

  }
</style>
