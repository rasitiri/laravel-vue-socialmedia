<template>
  <div>
    <navbar></navbar>
    <notifications group="foo" position="top center" />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./Navbar";

export default {
  components: {
    Navbar
  }
};
</script>

<style>
</style>