<template>
  <div id="app">
    <div class="loginHead"></div>
    <div align="center" class="loginCenter">
      <h2>Mappin</h2>
      <div>
        <label for="userName"></label>
        <input placeholder="用户名" name="userName" id="userName" type="text" v-model="username"/>
      </div>
      <div>
        <label for="password"></label>
        <input placeholder="密码" name="password" id="password" type="password" v-model="password"/>
      </div>
      <div v-show="isRegister">
        <label for="captchaCode"></label>
        <input placeholder="验证码" name="password" id="captchaCode" type="text" v-model="captchaCode"/>
        <label for="ResisterEmail"></label>
        <input placeholder="邮箱" name="ResisterEmail" id="ResisterEmail" type="text" v-model="ResisterEmail"/>
      </div>
    </div>
    <div class="loginFoot">
      <div @click="loginOrRegister">{{isRegister ? '去登录' : '去注册'}}</div>
      <div align="center" v-show="isRegister">
        <img @click="getCaptchaCode" :src=this.captchaCodeImg alt="img is wrong"/>
        <button class="defaultButton" v-show="isRegister === true" @click="accountRegister">注册</button>
      </div>
      <div align="center">
        <button class="defaultButton" v-show="isRegister === false" @click="accountLogin">登录</button>
      </div>
      <button v-show="isRegister === false" @click="resetPassword">重置密码</button>
      <alert v-show="hasAlert" :alert-text="alertText" @closeAlert="closeAlert"></alert>
      <login-change v-show="hasChange" @cancelChange="cancelChange"></login-change>
    </div>
  </div>
</template>

<script>
import API from '../../../api/api'
import Alert from '../../../components/alert_tip'
import LoginChange from '../../../components/loginChange'
import { mapActions } from 'vuex'

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
      emailHasChange: false,
      ResisterEmail: ''
    }
  },

  created () {
    this.getCaptchaCode()
  },

  methods: {
    ...mapActions(['login']),

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
      this.login() // 测试!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        password: this.password,
        email: this.ResisterEmail
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
  #app {
    height: 100%;
    /*background-image: url("../../../../static/login.jpg");*/
    /*background-repeat: no-repeat;*/
    /*background-size: 100% 100%;*/
  }

  h2 {
    font-weight: bold;
    color: black;
  }

  input {
    height: 10px;
    width: 80%;
    padding: 10px;
    outline: none;
    border-radius: 15px;
    border: 1px solid black;
    margin-bottom: 10px;
  }

  .loginCenter {
    height: 30%;
  }

  .defaultButton {
    width: 80%;
    height: 52px;
    border-radius: 52px;
    border: none;
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.15);
    display: block;
  }

  .loginHead {
    height: 90px;
    position: relative;
  }
</style>
