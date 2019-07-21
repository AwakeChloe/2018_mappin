<template>
  <div class="app">
    <vtoper class="vtoper"/>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import vtoper from '../../components/vtoper'
import API from '../../api/api'
import { mapActions } from 'vuex'

export default {
  name: 'index',

  created () {
    this.tokenVerify()
  },

  methods: {
    ...mapActions(['login']),

    async tokenVerify () {
      let data = {
        token: window.localStorage['token']
      }
      let userInfo = await API.tokenVerify(data)
      if (userInfo.status === 1) {
        this.login()
        this.$router.push({name: 'makePoint'})
      }
    }
  },

  components: {
    vtoper
  }
}
</script>

<style>
  html, body, .app {
    margin: 0;
    height: 100%;
  }

  .vtoper {
    position: absolute;
    height: 60px;
    z-index: 10;
    top: 10px;
    left: 50%;
    transform:translate(-50%, 0);
    width: 90%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .slide-enter-active {
    transition: all .3s ease;
  }

  .slide-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-enter, .slide-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
