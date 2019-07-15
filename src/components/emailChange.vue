<template>
  <div class='fullScream'>
    <div class='model'>
      <div>
        <label for="oldEmail">邮箱:</label>
        <input name="oldEmail" id="oldEmail" type="text" v-model="emailAddress"/>
      </div>
      <div>
        <label for="newEmail">新邮箱:</label>
        <input name="newEmail" id="newEmail" type="text" v-model="newEmail"/>
      </div>
      <div>
        <label for="nowPassword">密码:</label>
        <input name="nowPassword" id="nowPassword" type="password" v-model="password"/>
      </div>
      <button @click="emailChange">确认</button>
      <button @click="cancelChange">取消</button>
    </div>
    <alertTip v-show="hasAlert" :alert-text="alertText" @closeAlert="closeAlert"></alertTip>
  </div>
</template>

<script>
import API from '../api/api'
import alertTip from './alert_tip'

export default {
  name: 'emailChange',

  components: {alertTip},

  data () {
    return {
      emailAddress: '',
      password: '',
      newEmail: '',
      hasAlert: false,
      alertText: ''
    }
  },

  methods: {
    closeAlert () {
      this.hasAlert = false
    },

    cancelChange () {
      this.$emit('cancelChangeEmail')
    },

    async emailChange () {
      let data = {
        email: this.emailAddress,
        password: this.password,
        newEmail: this.newEmail
      }
      let res = await API.emailChange(data)
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
