<template>
  <div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'watchPoint',

  mounted () {
    this.changeRoute('watchPoint')
  },

  methods: {
    ...mapActions(['changeRoute'])
  }
}
</script>

<style scoped>

</style>
