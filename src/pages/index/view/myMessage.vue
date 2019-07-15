<template>
  <div class="myMessage">
    <div class="myMessageTop">
      <div class="name"></div>
    </div>
    <div class="myMessage">
      <div @click="login">登录</div>
      <div @click="emailChange">修改邮箱</div>
    </div>
    <email-change v-show="emailHasChange" @cancelChangeEmail="cancelChangeEmail"></email-change>
  </div>
</template>

<script>
import EmailChange from '../../../components/emailChange'

export default {
  name: 'myMessage',

  components: {
    EmailChange
  },

  data () {
    return {
      emailHasChange: false
    }
  },

  methods: {
    login () {
      this.$router.push({name: 'login'})
    },

    emailChange () {
      this.emailHasChange = true
    },

    cancelChangeEmail () {
      this.emailHasChange = false
    }
  }
}
</script>

<style scoped>
  .myMessage {
    height: 80%;
    background-color: skyblue;
  }

  .myMessageTop {
    height: 30%;
    position: relative;
  }
</style>
