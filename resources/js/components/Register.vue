<template>
  <div class="container w-25 mt-3">
    <h4 class="text-weight-bold text-uppercase">Register</h4>
    <form @submit.prevent="registerMethod">
      <div class="mb-3 mt-5">
        <input type="text" class="form-control" v-model="name" placeholder="Name" required />
      </div>
      <div class="mb-3">
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
      <div class="mb-3">
        <input
          v-model="password_confirmation"
          type="password"
          class="form-control"
          placeholder="Confirm Password"
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
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    registerMethod() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      };
      this.$store
        .dispatch("register", data)
        .then(() => {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Register",
            text: "The account was created successfully.",
            duration: 1500
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 1500);
        })
        .catch(err => {
          const errors = err.response.data.errors;
          const errorList = Object.entries(errors);
          errorList.map(error => {
            this.$notify({
              group: "foo",
              title: "Error",
              type: "error",
              text: error[1][0],
              duration: 2000
            });
          });
          setTimeout(() => window.location.reload(), 2100);
        });
    }
  }
};
</script>