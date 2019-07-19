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
    margin: 0;
    height: 100%;
  }

  .vtoper {
    position: absolute;
    height: 60px;
    z-index: 10;
    top: 10px;
    left: 50%;
    transform:translate(-50%, 0);
    width: 90%;
  }
</style>
