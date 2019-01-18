<template>
  <div class="inittemplate-div">
    <div style="padding: 30px;">

    </div>
  </div>
</template>

<script>
import unit from '../common/unit.js'
import themeConf from '../common/theme.conf.js'

export default {
  name: 'inittemplate',
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
  .inittemplate-div {
  }
</style>
