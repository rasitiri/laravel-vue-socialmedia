<template>
  <div class="container w-25 mt-3">
    <h4 class="text-weight-bold text-uppercase">Login</h4>
    <form @submit.prevent="loginMethod">
      <div class="mb-3 mt-5">
        <input type="email" class="form-control" v-model="email" placeholder="Email" required />
      </div>
      <div class="mb-3">
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginMethod() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(res => {
          console.log("login response => ", res.data.message);
          this.$router.push("/");
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            title: "Error",
            type: "error",
            text: err.response.data.message,
            duration: 2000
          });
          setTimeout(() => window.location.reload(), 2100);
        });
    }
  }
};
</script>

<style>
</style>