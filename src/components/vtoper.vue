<template>
  <div>
    <router-link id="makePoint" to="/makePoint" tag="button">版图标注</router-link>
    <router-link id="watchPoint" to="/watchPoint" tag="button">我的版图</router-link>
    <router-link id="me" to="/myMessage" tag="button">我</router-link>
  </div>
</template>

<script>
export default {
  name: 'vtoper'
}
</script>

<style scoped>
  #makePoint, #watchPoint, #me {
    height: 50px;
    background-color: gray;
    float: left;
    border: none;
    padding: 0;
  }

  div {
    box-shadow: 0 7px 10px 0 rgba(0, 0, 0, .15);
    border-radius: 15px;
  }

  #makePoint {
    border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;
    width: 25%;
    outline: none;
  }

  #watchPoint {
    width: 50%;
    outline: none;
  }

  #me {
    width: 25%;
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    outline: none;
  }
</style>
