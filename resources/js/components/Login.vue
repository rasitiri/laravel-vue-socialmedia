<template>
  <div class="w-full max-w-xs mx-auto my-20">
    <form @submit.prevent="loginMethod" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-center text-3xl mt-2 mb-4 text-gray-700 uppercase">Login</h2>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          required
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >Sign In</button>
      </div>
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