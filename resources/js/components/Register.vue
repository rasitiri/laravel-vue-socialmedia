<template>
  <form
    @submit.prevent="registerMethod"
    class="w-full max-w-lg mx-auto my-20 bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
  >
    <h2 class="text-center text-3xl mt-2 mb-4 text-gray-300 uppercase">Register</h2>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
          for="name"
        >Name</label>
        <input
          class="shadow appearance-none block w-full bg-gray-800 text-sm focus:text-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="name"
          type="text"
          v-model="name"
          required
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
          for="surname"
        >Surname</label>
        <input
          class="shadow appearance-none block w-full focus:text-gray-700 text-gray-300 text-sm bg-gray-800 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="surname"
          type="text"
          v-model="surname"
          required
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
          for="email"
        >Email</label>
        <input
          class="shadow appearance-none block w-full bg-gray-800 focus:text-gray-700 text-gray-300 text-sm border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="email"
          type="email"
          v-model="email"
          required
        />
      </div>
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
          for="grid-password"
        >Password</label>
        <input
          class="shadow appearance-none block w-full bg-gray-800 focus:text-gray-700 text-gray-300 text-sm border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-password"
          type="password"
          placeholder="******************"
          v-model="password"
          required
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
          for="confirm-password"
        >Confirm Password</label>
        <input
          class="shadow appearance-none block w-full focus:text-gray-700 text-gray-300 bg-gray-800 text-sm border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="confirm-password"
          type="password"
          placeholder="******************"
          v-model="password_confirmation"
          required
        />
      </div>
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >Sign Up</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    registerMethod() {
      const data = {
        name: this.name,
        surname: this.surname,
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