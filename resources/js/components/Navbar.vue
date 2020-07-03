<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
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
          <li class="nav-item">
            <a class="nav-link">{{userEmail}}</a>
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
    },
    userEmail() {
      return this.$store.getters.getUser.email;
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => setTimeout(() => this.$router.push("/login"), 100));
    }
  }
};
</script>

<style>
a {
  cursor: pointer;
}
</style>