<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link tag="a" class="navbar-brand" to="/">Navbar</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul v-if="!isLoggedIn" class="navbar-nav ml-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" tag="a" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" tag="a" to="/register">Register</router-link>
          </li>
        </ul>
        <ul v-if="isLoggedIn" class="navbar-nav ml-auto mb-2 mb-lg-0">
          <li>
            <a class="nav-link">Welcome</a>
          </li>
          <li>
            <a class="nav-link">User</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
a {
  cursor: pointer;
}
</style>