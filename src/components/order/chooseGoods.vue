<template>
  <div class="chooseGoods-div">
    <div>
      <el-form label-width="100px" label-position="left">
        <el-form-item label="指定品牌">
          <el-popover
            placement="bottom"
            width="300"
            trigger="click">
            <div style="width: 300px;height: 300px;overflow-y: scroll;">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="width: 100%; height: 2px;background-color: #e4e4e4"></div>
              <div style="margin-top: 5px;" v-for="i in brandList" :key="i.id">
                <el-checkbox  v-model="param.brand" 
                  @change="handleCheckedItemChange(param.brand)" :label="i.id" 
                  >{{i.name}}
                </el-checkbox>
              </div>
            </div>
            <el-button slot="reference" type="primary" plain style="" >默认全选</el-button>
            <!-- <span slot="reference" style="color: #409eff;margin-left: 5px;">选择</span> -->
          </el-popover>
          <el-select style="margin-left: 5px;width: 150px;" v-model="form.t" placeholder="请选择">
            <el-option
              v-for="item in options.o1"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
          <el-popover
            placement="bottom"
            width="300"
            trigger="click">
            <div>
              <el-tree
                :data="options.tree"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current>
              </el-tree>
            </div>
            <el-button style="margin-left: 5px;" slot="reference" type="primary" plain >已选{{form.checkedTree.length}}</el-button>
            <!-- <span slot="reference" style="color: #409eff;margin-left: 5px;">选择</span> -->
          </el-popover>
          <el-input style="margin-left: 5px;width: 300px;" v-model="form.t" placeholder="商品名称/编码/id"></el-input>
          <el-button style="margin-left: 5px;" type="success" plain >查询</el-button>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select style="margin-left: 5px;width: 150px;" v-model="form.t" placeholder="请选择">
            <el-option
              v-for="item in options.o2"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
          <span style="margin-left: 20px;">价格</span>
          <el-input type="number" style="margin-left: 5px;width: 80px;" v-model.number="form.t"></el-input>
          ~
          <el-input type="number" style="width: 80px;" v-model="form.t"></el-input>
          <span style="margin-left: 5px;">元</span>
        </el-form-item>
        <el-form-item label="">
          <div style="width: 100%;display: flex;" v-if="reflesh">
            <div class="left">
              <div class="left-header">
                <div style="width: 100%;display: flex;justify-content: space-around;align-items: center;">
                  <span>全部商品</span>
                  <el-button :disabled="!canSelectAll" @click="selectAll"  style="margin-left: 5px;height: 26px;" slot="reference" size="mini" plain >全选</el-button>
                </div>
              </div>
              <div class="left-body">
                <div
                  v-for="(item, idx) in data.goodsList" :key="idx">
                  <div
                    class="goodsItem">
                    <div :class='item.disabled?"col1-disabled":"col1"'>
                      <img :src="item.img">
                    </div>
                    <div class="col2">
                      <div :class='item.disabled?"col21-disabled":"col21"' >
                        <span style="color: #949494;">{{item.name}}</span>
                        <div style="display: flex;justify-content: space-between;">
                          <span style="color: #949494;">{{item.id}}</span>
                          <span style="color: #ff0000;">{{item.price}}</span>
                        </div>
                      </div>
                      <div class="col22">
                        <el-button :disabled="item.disabled" @click="addGoods(item)" icon="el-icon-plus" circle></el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="right-header">
                <div style="width: 100%;display: flex;justify-content: space-around;align-items: center;">
                  <span>全部商品</span>
                  <el-button   @click="delAllGoods" style="margin-left: 5px;height: 26px;" slot="reference" size="mini" plain >清空(已选{{form.selectedGoods.length}})</el-button>
                </div>
              </div>
              <div class="right-body">
                <div v-for="(item, idx) in form.selectedGoods" :key="idx">
                  <div class="goodsItem">
                    <div class="col1">
                      <img :src="item.img">
                    </div>
                    <div class="col2">
                      <div class="col21">
                        <span style="color: #949494;">{{item.name}}</span>
                        <div style="display: flex;justify-content: space-between;">
                          <span style="color: #949494;">{{item.id}}</span>
                          <span style="color: #ff0000;">{{item.price}}</span>
                        </div>
                      </div>
                      <div class="col22">
                        <el-button  @click="delGoods(item)" icon="el-icon-minus" circle></el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="tr">
            <el-transfer
              ref='tr'
              style="text-align: left; display: inline-block"
              v-model="form.selectedGoods"
              :props="{
                key: 'id',
                name: 'name',
                price: 'price',
              }"
              :render-content="renderFunc"
              :titles="['全部商品', '已选商品']"
              :data="data.goodsList">
              <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
              <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
            </el-transfer>
          </div> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'
import exmpPic from '../../assets/goods.png'

export default {
  name: 'chooseGoods',
  components: {
  },
  props: {
    selectGoodsList: Array,
  },
  data () {
    return {
      loading: true,
      themeConf: themeConf,
      theme: 'theme-color-defualt',
      data: {
        goodsList: [],
      },
      brandList: [],
      param: {
        page: 1,
        brand: [],
      },
      form: {
        t: null,
        checkedTree: [],
        selectedGoods: [],
      },
      s: this.selectGoodsList,
      isIndeterminate: false,
      checkAll: true,
      reflesh: true,
      canSelectAll: true,
      options: {
        o1: [
          {
            id: 1,
            label: '淘宝类目',
          },
          {
            id: 2,
            label: '店铺类目',
          },
        ],
        o2: [
          {
            id: 1,
            label: '全部商品',
          },
          {
            id: 2,
            label: '在售',
          },
          {
            id: 3,
            label: '待售',
          },
        ],
        tree: [
          {
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }
          ],
        }],
      }
    }
  },
  computed: {
    // canSelectAll () {
    //   let flag = false
    //   for (let i of this.data.goodsList) {
    //     if (i.disabled === false) flag = true
    //   }
    //   return flag
    // }
  },
  methods: {
    async init() {
      await Promise.all([
        this.getBrandList(),
        this.getGoodsList(),
      ])
      this.loading = false
    },
    async getBrandList () {
      this.brandList = [
        {
          id: 1,
          name: '品牌1',
        },
        {
          id: 2,
          name: '品牌2',
        },
        {
          id: 3,
          name: '品牌2',
        },
        {
          id: 4,
          name: '品牌2',
        },
        {
          id: 5,
          name: '品牌2',
        },
      ]
      let arr = []
      for (const i of this.brandList) {
        arr.push(i.id)
      }
      this.param.brand = arr
    },
    async getGoodsList () {
      this.data.goodsList = [
        {
          name: '商品',
          img: exmpPic,
          id: '571600111179',
          price: '200',
        },
        {
          name: '商品2',
          img: exmpPic,
          id: '5716001111792',
          price: '200',
        },
      ]
      for (const i of this.data.goodsList) {
        i.disable = false
      }
    },
    updateChosen () {
      this.$emit('update:selectGoodsList', this.s)
    },

    handleCheckAllChange(val) {
      if (val) {
        let arr = []
        for (const i of this.brandList) {
          arr.push(i.id)
        }
        this.param.brand = arr
      } else {
        this.param.brand = []
      }
      this.isIndeterminate = false
    },
    handleCheckedItemChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.brandList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.brandList.length
    },
    getCheckedTree () {
      console.log(this.$refs.tree.getCheckedKeys());
      console.log(this.$refs.tree.getCheckedNodes());
    },
    selectAll () {
      // this.form.selectedGoods = [...this.form.selectedGoods, ...this.data.goodsList]
      // this.data.goodsList = []
      // this.reflesh = false
      // this.reflesh = true
      this.form.selectedGoods = [...this.form.selectedGoods, ...this.data.goodsList]
      for (let i of this.data.goodsList) {
        i.disabled = true
      }
      this.canSelectAll = false

      this.reflesh = false
      this.reflesh = true
    },
    addGoods (data) {
      // let arr = []
      // for (const i of this.data.goodsList) {
      //   if (i.id === data.id) continue
      //   arr.push(i)
      // }
      // this.data.goodsList = arr
      // this.form.selectedGoods.push(data)
      data.disabled = true
      this.form.selectedGoods.push(data)

      let flag = false
      for (let i of this.data.goodsList) {
        if (i.disabled === false) flag = true
      }
      this.canSelectAll = flag
      this.reflesh = false
      this.reflesh = true
    },
    delAllGoods () {
      this.form.selectedGoods = []
      for (let i of this.data.goodsList) {
        i.disabled = false
      }
      this.canSelectAll = true
      this.reflesh = false
      this.reflesh = true
    },
    delGoods (data) {
      // let arr = []
      // for (const i of this.form.selectedGoods) {
      //   if (i.id === data.id) continue
      //   arr.push(i)
      // }
      // this.form.selectedGoods = arr
      let arr = []
      for (const i of this.form.selectedGoods) {
        if (i.id === data.id) continue
        arr.push(i)
      }
      this.form.selectedGoods = arr
      data.disabled = false
      
      let flag = false
      for (let i of this.data.goodsList) {
        if (i.disabled === false) flag = true
      }
      this.canSelectAll = flag
      this.reflesh = false
      this.reflesh = true
    }
    // renderFunc(h, option) {
    //   // return <span>{ option.id } - { option.name }</span>;
    //   return  <div class="goodsItem" width='300px;'>
    //             <div class="col1">
    //               <img src={option.img} />
    //             </div>
    //             <div class="col2">
    //               <div class="col21">
    //                 <span style="color: #949494;">{option.name}</span>
    //                 <div style="display: flex;justify-content: space-between;">
    //                   <span style="color: #949494;">{option.id}</span>
    //                   <span style="color: #ff0000;">{option.price}</span>
    //                 </div>
    //               </div>
    //               <div class="col22">
    //                 <i class="el-icon-circle-plus-outline add"></i>
    //               </div>
    //             </div>
    //           </div>
    // },
  },
  created () {
    this.theme = unit.getTheme(this)
    
    
    this.init()
  },
}
</script>
<style scoped>
  .chooseGoods-div {
  }
  .chooseGoods-div .left {
    width: 400px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .chooseGoods-div .left .left-header{
    width: 100%;
    padding: 5px;
    background-color: #f2f2f2;
    display: flex;
    
  }
  .chooseGoods-div .left .left-body{
    width: 100%;
    
  }
  .chooseGoods-div .right {
    width: 400px;
    margin-left: 20px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .chooseGoods-div .right .right-header {
    width: 100%;
    padding: 5px;
    background-color: #f2f2f2;
    display: flex;
  }
  .chooseGoods-div .right  .right-body{
    width: 100%;
  }
  .goodsItem {
    display: flex;
    padding-bottom: 10px;
    padding-left: 3px;
    padding-top: 5px;
    padding-right: 5px;
    width: 100%;
    height: 60px;
    border: solid;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-top-width: 0px;
    border-left-width: 1px;
    border-color: #e4e4e4;
  }
  .goodsItem2 {
    display: flex;
    padding-bottom: 10px;
    padding-left: 3px;
    padding-top: 5px;
    padding-right: 5px;
    width: 100%;
    height: 60px;
    border: solid;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-top-width: 0px;
    border-left-width: 1px;
    border-color: #e4e4e4;
  }
  .goodsItem .col1 {
    display: flex;
    align-items: center;
    width: 70px;
  }
  .goodsItem .col1-disabled {
    display: flex;
    align-items: center;
    width: 70px;
    background-color:#fff;
    opacity:0.3;
  }
  .goodsItem .col1 img {
    height: 50px;
    width: 50px;
  }
  .goodsItem .col1-disabled img {
    height: 50px;
    width: 50px;
  }
  .goodsItem .col2 {
    width: calc(100% - 70px);
    display: flex;
  }
  .goodsItem .col21 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 70px);
  }
  .goodsItem .col21-disabled {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 70px);
    background-color:#fff;
    opacity:0.3;
  }
  .goodsItem .col22 {
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .goodsItem .col22 .add {
    cursor: pointer;
    width: 10px;
    height: 10px;
  }
  /* .tr .el-transfer {width: 500px;}
  .tr .el-transfer div{width: 500px;} */
</style>
