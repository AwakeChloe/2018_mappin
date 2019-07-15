<template>
  <div class="app">
    <vtoper class="vtoper"/>
    <router-view></router-view>
  </div>
</template>

<script>
import vtoper from '../../components/vtoper'
export default {
  name: 'index',

  components: {
    vtoper
  }
}
</script>

<style>
  html, body, .app {
    margin:0;
    height:100%;
  }

  .vtoper {
    height: 5%;
  }
</style>
