<template>
  <div class='fullScream'>
    <div class='model'>
      <button @click="confirmEmailChange">确认</button>
    </div>
    <alertTip v-show="hasAlert" :alert-text="alertText" @closeAlert="closeAlert"></alertTip>
  </div>
</template>

<script>
import API from '../../../api/api'
import alertTip from '../../../components/alert_tip'

export default {
  name: 'secretChange',

  components: {alertTip},

  data () {
    return {
      hasAlert: false,
      alertText: ''
    }
  },

  methods: {
    async confirmEmailChange () {
      let res = await API.confirmEmailChange()
      if (res.tip) {
        this.hasAlert = true
        this.alertText = res.tip
      } else if (res.response.message !== 'OK') {
        this.alertText = res.response.message
        this.hasAlert = true
      }
    },

    closeAlert () {
      this.hasAlert = false
    }
  }
}
</script>

<style scoped>

</style>
