<template>
  <div>
    <publish></publish>
  </div>
</template>

<script>
import Publish from "./Publish";
export default {
  components: {
    Publish
  },
  created() {
    this.$store.dispatch("user");
  }
};
</script>

<style>
</style>