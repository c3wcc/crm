<template>
  <el-date-picker
    v-model="t"
    type="datetimerange"
    range-separator="至"
    :start-placeholder="s"
    :end-placeholder="e">
  </el-date-picker>
</template>

<script>
import themeConf from '../common/theme.conf.js'

export default {
  name: 'inittemplate',
  components: {

  },
  props: {
    time: Array,
    startText: String,
    endText: String,
  },
  data () {
    return {
      t: this.time,
      s: '开始日期',
      e: '结束日期',
      themeConf: themeConf,
      theme: 'theme-color-defualt',
    }
  },
  computed: {

  },
  methods: {
    updateTime () {
      this.$emit('update:time', this.t)
    },
  },
  created () {
    this.startText!==''?this.s=this.startText:false
    this.endText!==''?this.e=this.endText:false
  },
}
</script>
<style scoped>
  .inittemplate-main {
  }
</style>
