<template>
  <div>
    <div class="head">
      <img @click="goBack" class="enter" src="../../../../static/enter.svg" alt="enter">
      <div class="title">个人信息</div>
    </div>
    <div align="center" class="center">
      <img src="../../../../static/smallOldBrother.jpg" class="smallOldBrother" alt="smallOldBrother"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personalMessage',

  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .head {
    height: 77px;
    position: relative;
    z-index: 11;
    background-color: white;
  }

  .center img {
    height: 121px;
    width: 121px;
    margin-top: 23px;
  }

  .title {
    position: absolute;
    margin-top: 30px;
    left: 50%;
    transform:translate(-50%, 0);
  }

  .enter {
    position: absolute;
    top: 30px;
    left: 10px;
    height: 20px;
    width: 20px;
  }
</style>
