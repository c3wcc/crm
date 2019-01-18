<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  created () {

  }
}
</script>

<style>
  .top-bar-height {
    height: 100px;
  }
  .top-bar-logo-width {
    width: 200px;
  }
  .top-bar-not-logo-width {
    width: calc(100vw - 200px);
  }
  /* .margin-top-by-top-bar {
    margin-top: 100px;
  } */
  .ovf {
    overflow-y: scroll;
  }
  .display-area-height {
    height: calc(100vh - 100px);
  }
  .aside-width {
    width: 198px;
  }
  .display-split {
    width: 2px;
    height: 100%;
    background-color: #f0f0f0;
  }
  .aside-height {
    height: calc(100vh - 100px);
  }
  .main-display-width {
    width: calc(100vw - 200px);
  }
  .main-display-height {
    height: calc(100vh - 100px);
  }
  .main-display2-height {
    height: calc(100vh - 170px);
  }

  .theme-color-defualt-general-btn {
    color: '#409eff';
  }
</style>
