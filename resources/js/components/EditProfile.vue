<template>
  <form @submit.prevent="edit" class="flex flex-col">
    <div class="w-1/3 flex mx-auto items-center border-b border-teal-500 py-2 my-5">
      <label for="name" class="mr-6 text-gray-200 capitalize">name</label>
      <input
        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Jane Doe"
        id="name"
        v-model="name"
      />
    </div>
    <div class="w-1/3 flex mx-auto items-center border-b border-teal-500 py-2 my-5">
      <label for="surname" class="mr-6 text-gray-200 capitalize">surname</label>
      <input
        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Jane Doe"
        id="surname"
        v-model="surname"
      />
    </div>
    <div class="w-1/3 mx-auto flex items-center border-b border-teal-500 py-2 my-5">
      <label for="email" class="mr-6 text-gray-200 capitalize">email</label>
      <input
        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="email"
        placeholder="Jane Doe"
        id="email"
        v-model="email"
      />
    </div>
    <div class="w-1/3 mx-auto flex items-center border-b border-teal-500 py-2 my-5">
      <label for="bio" class="mr-6 text-gray-200 capitalize">bio</label>
      <textarea
        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        placeholder="Jane Doe"
        id="bio"
        v-model="bio"
      ></textarea>
    </div>
    <button
      type="submit"
      class="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
    >Save</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      bio: ""
    };
  },
  created() {
    this.$store.dispatch("user");
  },
  methods: {
    edit() {
      const token = localStorage.getItem("token");
      const { name, surname, email, bio } = this;
      this.$http
        .patch(
          "api/auth/user/" + this.$store.getters.getUser.id,
          {
            name,
            surname,
            email,
            bio
          },
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        )
        .then(res => console.log("update res:", res))
        .catch(err => console.log("update err:", err.response));
    }
  }
};
</script>
