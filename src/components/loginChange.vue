<template>
  <div class='fullScream'>
    <div class='model'>
      <label for="email">邮箱:</label>
      <input name="email" id="email" type="text" v-model="emailAddress"/>
      <button @click="resetPassword">确认</button>
      <button @click="cancelChange">取消</button>
    </div>
    <alertTip v-show="hasAlert" :alert-text="alertText" @closeAlert="closeAlert"></alertTip>
  </div>
</template>

<script>
import API from '../api/api'
import alertTip from './alert_tip'
export default {
  name: 'loginChange',

  components: {alertTip},

  data () {
    return {
      emailAddress: '',
      hasAlert: false,
      alertText: ''
    }
  },

  methods: {
    closeAlert () {
      this.hasAlert = false
    },

    cancelChange () {
      this.$emit('cancelChange')
    },

    async resetPassword () {
      let data = {
        email: this.emailAddress
      }
      let res = await API.resetPassword(data)
      if (res.tip) {
        this.hasAlert = true
        this.alertText = res.tip
      } else if (res.response.message !== 'OK') {
        this.alertText = res.response.message
        this.hasAlert = true
      }
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
