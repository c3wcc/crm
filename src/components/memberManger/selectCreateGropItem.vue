<template>
  <div v-if="reflash" class="selectCreateGroupItem">
    <div :key="item.id" v-for="item in optionList">
      <div class="top">
        <span><b>{{item.label}}</b></span>
        <span style="cursor: pointer;" @click="alterShow(item.id)">
          {{showList[item.id]?'收起':'打开'}}
        </span>
      </div>
      <div class="bottom">
        <el-collapse-transition>
          <div v-show="showList[item.id]">
            <el-checkbox-group @change="updateScene" class="checkbox-group"
              :key="`checkbox-group${index}`" 
              v-for="(checkboxList, index) in item.children"
              v-model="s" size="small">
              <span
                v-for="checkboxItem in checkboxList"
                :key="checkboxItem">
                <el-checkbox-button
                  v-if="checkboxItem==='订单查询'"
                  @change="test"
                  class="checkbox-item"
                  :label="checkboxItem" >
                </el-checkbox-button>
                <el-checkbox-button
                  v-else
                  class="checkbox-item"
                  :label="checkboxItem" >
                </el-checkbox-button>
              </span>
            </el-checkbox-group>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'

export default {
  name: 'membermanger-selectCreateGroupItem',
  components: {
  },
  props: {
    scene: Array,
  },
  data () {
    return {
      reflash: true,
      loading: true,
      themeConf: themeConf,
      theme: 'theme-color-defualt',
      data: {
      },
      t: true,
      s: this.scene,
      optionList: [
        {
          id: 0,
          label: '场景筛选',
          children: [
            ['活跃客户', '沉睡客户', '流失客户',],
            ['双十一客户', '6.18会员',],
          ],
        },
        {
          id: 1,
          label: '基本属性',
          children: [
            ['会员等级', '淘宝标签', '买家印象',],
            ['性别', '职业', '生日'],
            ['年龄', 'QQ', '微信'],
            ['旺旺昵称', '买家姓名', '星座'],
            ['邮箱', '手机号段', '所在地区气温'],
            ['省市'],
          ],
        },
        {
          id: 2,
          label: '交易属性',
          children: [
            ['详细地址', '邮费', '订单查询',],
          ],
        },
        {
          id: 3,
          label: 'RFM 模型属性',
          children: [
            ['第一次下单', '第一次付款', '第一次成功时间',],
            ['最后下单时间', '最后付款时间', '最后成功时间',],
            ['成功次数', '下单休眠时间', '成功休眠时间',],
            ['下单次数', '客户复购周期', '退款成功次数',],
            ['客单价', '客件数', '下单总额',],
            ['成功交易额', '退款成功金额', '付款休眠时间',],
            ['交易主动关闭次数', '交易主动关闭金额',],
          ],
        },
        {
          id: 4,
          label: '营销属性',
          children: [
            ['短信营销复购', '短信营销次数', '最后短信营销时间',],
            ['短信营销休眠天数', '营销链接点击客户',],
            ['聚划算敏感度', '万人团敏感度',],
            ['链接最后点击时间',],
          ],
        },
      ],
      showList: [true, true, true, true, true],
    }
  },
  computed: {

  },
  methods: {
    async init() {
      this.loading = false
    },
    
    updateScene () {
      this.$emit('update:scene', this.s)
    },
    test (s, node) {
      if (s && node.target._value==='订单查询') {
        this.$store.commit(this.$types.MEMBER.NEW_ORDER_QUERY)
      }
    },
    alterShow (idx) {
      this.showList[idx] = !this.showList[idx]
      this.reflash = false
      this.reflash = true
    }
  },
  created () {
    this.theme = unit.getTheme(this)
    this.init()
  },
}
</script>
<style scoped>
  .selectCreateGroupItem {
    padding: 20px;
    width: 100%;
  }
  .selectCreateGroupItem .top{
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: #f2f2f2;
  }
  .selectCreateGroupItem .bottom {
    margin-top: 5px;
    margin-bottom: 15px;
  }
  .selectCreateGroupItem .bottom .checkbox-group {
    margin-bottom: 2px;
  }
  /* .selectCreateGroupItem .bottom .checkbox-item {
    margin: 3px;
  } */
</style>
