<template>
  <div id="app">
    <fieldset>
      <div>
        <label for="userName">username:</label>
        <input name="userName" id="userName" type="text" v-model="username"/>
      </div>
      <div>
        <label for="password">password:</label>
        <input name="password" id="password" type="password" v-model="password"/>
      </div>
      <div v-show="isRegister">
        <label for="captchaCode">验证码:</label>
        <input name="password" id="captchaCode" type="text" v-model="captchaCode"/>
      </div>
    </fieldset>
    <div @click="loginOrRegister">{{isRegister ? '去登录' : '去注册'}}</div>
    <div v-show="isRegister">
      <img @click="getCaptchaCode" :src=this.captchaCodeImg alt="img is wrong"/>
      <button v-show="isRegister === true" @click="accountRegister">注册</button>
    </div>
    <div>
      <button v-show="isRegister === false" @click="accountLogin">登录</button>
      <button v-show="isRegister === false" @click="resetPassword">重置密码</button>
    </div>
    <alert v-show="hasAlert" :alert-text="alertText" @closeAlert="closeAlert"></alert>
    <login-change v-show="hasChange" @cancelChange="cancelChange"></login-change>
    <router-view></router-view>
  </div>
</template>

<script>
import API from '../../../api/api'
import Alert from '../../../components/alert_tip'
import LoginChange from '../../../components/loginChange'

export default {
  name: 'app',

  components: {
    LoginChange,
    Alert
  },

  data () {
    return {
      isRegister: false,
      password: '',
      username: '',
      captchaCode: '',
      captchaCodeImg: '',
      hasAlert: false,
      alertText: '',
      userInfo: '',
      hasChange: false,
      emailHasChange: false
    }
  },

  created () {
    this.getCaptchaCode()
    this.login()
  },

  methods: {
    closeAlert () {
      this.hasAlert = false
    },

    cancelChange () {
      this.hasChange = false
    },

    resetPassword () {
      this.hasChange = true
    },

    loginOrRegister () {
      this.isRegister = !this.isRegister
    },

    async getCaptchaCode () {
      let res = await API.getCaptchaCode()
      this.captchaCodeImg = res.code
    },

    async accountLogin () {
      let data = {
        username: this.username,
        password: this.password
      }
      let userInfo = await API.accountLogin(data)
      if (userInfo.tip) {
        this.hasAlert = true
        this.alertText = userInfo.tip
      } else if (userInfo.response.message !== 'OK') {
        this.alertText = userInfo.response.message
        this.hasAlert = true
      } else if (userInfo.response.message === 'OK') {
        localStorage.setItem('token', userInfo.token)
        this.$router.push({name: 'makePoint'})
      }
    },

    async accountRegister () {
      let data = {
        captcha_code: this.captchaCode,
        username: this.username,
        password: this.password
      }
      this.userInfo = await API.CaptchaCode(data)
      if (this.userInfo.response.message === '验证码不正确') {
        this.alertText = this.userInfo.response.message
        this.hasAlert = true
      } else if (this.userInfo.response.message !== '验证码不正确') {
        let res = await API.accountRegister(data)
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
}
</script>

<style scoped>

  input {
    width: 200px;
    border-radius: 20px;
    border: 1px solid black;
  }

</style>
