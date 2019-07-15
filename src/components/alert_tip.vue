<template>
  <div class='fullScream'>
    <div class='model'>
      <button @click="handleClick">确认</button>
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
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30%;
    height: 40%;
    transform:translate(-50%, -50%);
    background-color: white;
  }
</style>
