<template>
  <div class="msgEditor-div">
    <div>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
    </div>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'

export default {
  name: 'msgEditor',
  components: {

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
      textarea: '',
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
  .msgEditor-main {
  }
</style>
