<template>
  <div class='fullScream'>
    <div class='model'>
      <div class="alertText">{{alertText}}</div>
      <hr/>
      <div class="close">
        <button @click="handleClick">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alert_tip',

  props: {
    alertText: ''
  },

  methods: {
    handleClick () { // 关闭
      this.$emit('closeAlert')
    }
  }
}
</script>

<style scoped>
  .fullScream {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .model {
    padding: 20px;
    position: absolute;
    z-index: 11;
    border-radius: 7px;
    left: 50%;
    top: 50%;
    width: 180px;
    height: 127px;
    transform:translate(-50%, -50%);
    background-color: white;
  }

  .alertText {
    text-align: center;
    margin-bottom: 30px;
  }

  button {
    width: 50px;
    height: 30px;
  }

  .close {
    width: 50px;
    position: relative;
    left: 50%;
    margin-top: 20px;
    transform:translate(-25px, 0);
  }
</style>
