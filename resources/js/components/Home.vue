<template>
  <div>
    <h1>Home</h1>
    <h2>Status: {{status}}</h2>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed:{
    status(){
      return this.$store.getters.authStatus
    }
  }
}
</script>

<style>

</style>