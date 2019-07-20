<template>
  <div>
    <div class="head">
      <img @click="goBack" class="enter" src="../../../../static/enter.svg" alt="enter">
      <div class="title">账号安全</div>
    </div>
    <div align="center" class="center">
    </div>
  </div>
</template>

<script>
export default {
  name: 'accountSafe',

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
