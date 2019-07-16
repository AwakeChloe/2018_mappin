<template>
  <div class="myMessage">
    <div class="myMessageTop"></div>
    <div class="myMessageCenter">
      <div @click="login" class="loginOrMine">
        <img id="head" alt="头像" src="../../../../static/头像.jpg">

      </div>
    </div>
    <div @click="emailChange">修改邮箱</div>
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
    height: 100%;
    background-color: white;
  }

  .myMessageTop {
    height: 90px;
    position: relative;
  }

  .myMessageCenter {
    background-color: white;
  }

  #head {
    position: relative;
    top: 50%;
    left: 20px;
    height: 60px;
    width: 60px;
    transform:translate(0, -50%);
  }

  .loginOrMine {
    box-shadow: 0 3px 30px 6px rgba(0, 0, 0, .15);
    border-radius: 15px;
    position: relative;
    width: 80%;
    height: 97px;
    left: 50%;
    transform:translate(-50%, 0);
  }
</style>
