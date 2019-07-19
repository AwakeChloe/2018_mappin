<template>
  <div>
    <router-link id="makePoint" to="/makePoint" tag="button">
      <p ref="makePoint">版图标注</p>
      <img ref="makePointImg" alt="makePoint" src="../../static/flag.svg">
    </router-link>
    <router-link id="watchPoint" to="/watchPoint" tag="button">
      <p ref="watchPoint">我的版图</p>
      <img ref="watchPointImg" alt="watchPoint" src="../../static/fiveSideShape.svg">
    </router-link>
    <router-link id="me" to="/myMessage" tag="button">
      <p ref="me">我</p>
      <img ref="meImg" alt="me" src="../../static/me.svg">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'vtoper',

  computed: {
    route: function () {
      return this.$store.state.routeName
    }
  },

  watch: {
    route: function () {
      switch (this.route) {
        case 'makePoint':
          this.$refs.makePoint.style.color = 'rgb(255,170,0)'
          this.$refs.watchPoint.style.color = 'black'
          this.$refs.me.style.color = 'black'
          this.$refs.makePointImg.src = '../../static/flag.svg'
          this.$refs.watchPointImg.src = '../../static/fiveSideShape.svg'
          this.$refs.meImg.src = '../../static/me.svg'
          break
        case 'watchPoint':
          this.$refs.makePoint.style.color = 'black'
          this.$refs.watchPoint.style.color = 'rgb(255,170,0)'
          this.$refs.me.style.color = 'black'
          this.$refs.makePointImg.src = '../../static/blackFlag.svg'
          this.$refs.watchPointImg.src = '../../static/yellowFive.svg'
          this.$refs.meImg.src = '../../static/me.svg'
          break
        case 'me':
          this.$refs.makePoint.style.color = 'black'
          this.$refs.watchPoint.style.color = 'black'
          this.$refs.me.style.color = 'rgb(255,170,0)'
          this.$refs.makePointImg.src = '../../static/blackFlag.svg'
          this.$refs.watchPointImg.src = '../../static/fiveSideShape.svg'
          this.$refs.meImg.src = '../../static/yellowMe.svg'
      }
    }
  }
}
</script>

<style scoped>
  #makePoint, #watchPoint, #me {
    height: 60px;
    background-color: white;
    float: left;
    border: none;
    padding: 0;
  }

  img {
    height: 23px;
    width: 23px;
    position: relative;
    bottom: 57px;
  }

  div {
    box-shadow: 0 7px 10px 0 rgba(0, 0, 0, .15);
    border-radius: 15px;
  }

  #makePoint {
    border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;
    width: 20%;
    outline: none;
  }

  p {
    margin-top: 34px;
  }

  #watchPoint {
    width: 60%;
    outline: none;
  }

  #me {
    width: 20%;
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    outline: none;
  }
</style>
