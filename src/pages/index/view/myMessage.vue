<template>
  <div class="myMessage">
    <div class="myMessageTop"></div>
    <div class="myMessageCenter">
      <div @click="login" class="loginOrMine">
        <img id="head" alt="头像" src="../../../../static/head.jpg">
      </div>
    </div>
    <div class="choiceThings">
      <div @click="personMessage" class="personMessage">
        <img id="personMessage" src="../../../../static/personMessage.svg" alt="personMessage">
        <strong>个人信息</strong>
        <img class="enter" src="../../../../static/enter.svg" alt="enter">
      </div>
      <hr/>
      <div class="useHelp">
        <img id="useHelp" src="../../../../static/useHelp.svg" alt="useHelp">
        <strong>使用帮助</strong>
        <img class="enter" src="../../../../static/enter.svg" alt="enter">
      </div>
      <hr/>
      <div @click="accountSafe" class="accountSafe">
        <img id="accountSafe" src="../../../../static/accountSafe.svg" alt="accountSafe">
        <strong>账号安全</strong>
        <img class="enter" src="../../../../static/enter.svg" alt="enter">
      </div>
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

    personMessage () {
      this.$router.push({path: '/myMessage/personalMessage'})
    },

    accountSafe () {
      this.$router.push({path: '/myMessage/accountSafe'})
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

  strong {
    margin-left: 30px;
  }

  .enter {
    position: absolute;
    top: 50%;
    right: 20px;
    height: 20px;
    width: 20px;
    transform:translate(0, -50%);
  }

  .myMessageTop {
    height: 90px;
    position: relative;
  }

  .myMessageCenter {
    background-color: white;
  }

  .choiceThings {
    height: 35%;
    width: 90%;
    margin: 50px auto;

  }

  .choiceThings div {
    width: 100%;
    height: 30%;
    position: relative;
  }

  #personMessage {
    position: relative;
    top: 50%;
    left: 20px;
    height: 45px;
    width: 45px;
    transform:translate(0, -50%);
  }

  #head {
    position: relative;
    top: 50%;
    left: 20px;
    height: 60px;
    width: 60px;
    transform:translate(0, -50%);
  }

  #accountSafe {
    position: relative;
    top: 50%;
    left: 20px;
    height: 45px;
    width: 45px;
    transform:translate(0, -50%);
  }

  #useHelp {
    position: relative;
    top: 50%;
    left: 20px;
    height: 45px;
    width: 45px;
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
