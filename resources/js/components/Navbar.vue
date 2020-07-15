<template>
  <div class="font-sans antialiased">
    <nav class="flex items-center justify-between flex-wrap border-b border-gray-600 p-5">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <svg
          class="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
          />
        </svg>
        <router-link
          tag="span"
          class="font-semibold text-xl tracking-tight cursor-pointer"
          to="/"
        >Hang Out</router-link>
      </div>
      <div class="block sm:hidden">
        <button
          @click="toggle"
          class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
        >
          <svg
            class="fill-current h-3 w-3 text-white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        :class="open ? 'block': 'hidden'"
        class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
      >
        <div class="text-sm flex sm:flex-grow">
          <div class="relative mx-auto lg:mx-auto lg:m-0 mt-3">
            <input
              v-model.trim="query"
              type="text"
              class="mx-auto text-gray-300 bg-gray-800 text-sm rounded-full w-64 px-4 pl-8 py-1 focus:outline-none focus:shadow-outline"
            />
            <router-link
              tag="div"
              :to="{path:query.length > 0 ? '/search/query/'+query :'/'}"
              class="absolute top-0"
            >
              <svg
                class="fill-current w-4 text-gray-500 mt-2 ml-2 cursor-pointer"
                viewBox="0 0 24 24"
              >
                <path
                  class="heroicon-ui"
                  d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z"
                />
              </svg>
            </router-link>

            <div class="z-50 absolute bg-gray-800 text-sm rounded w-64 mt-4">
              <ul v-if="results.length > 0 && query">
                <li
                  class="border-b border-gray-700 flex p-2 items-center"
                  v-for="result in results.slice(0,10)"
                  :key="result.searchable.id"
                >
                  <img
                    :src="`https://picsum.photos/id/${result.searchable.id}/50/50`"
                    alt="image"
                    class="rounded-full mx-1"
                  />
                  <router-link
                    :to="authUser.id === result.searchable.id ? {path:'/profile'} :{path:'/user/'+result.searchable.id}"
                    tag="a"
                    class="text-gray-300 px-3 py-3 flex items-center cursor-pointer transition ease-in-out duration-150"
                  >{{result.searchable.name}}  {{result.searchable.surname}}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex" v-if="!isLoggedIn">
          <div class="mx-auto lg:ml-auto">
            <router-link
              to="/login"
              tag="span"
              class="no-underline block mt-4 mx-1 text-sm sm:inline-block sm:mt-0 text-teal-lighter text-white hover:text-gray-300 cursor-pointer"
            >Login</router-link>
            <router-link
              to="/register"
              tag="span"
              class="no-underline block mt-4 mx-1 text-sm sm:inline-block sm:mt-0 text-teal-lighter text-white hover:text-gray-300 cursor-pointer"
            >Register</router-link>
          </div>
        </div>
        <div class="flex" v-if="isLoggedIn">
          <div class="mx-auto lg:ml-auto">
            <router-link
              to="/profile"
              tag="span"
              class="no-underline block mt-4 mx-1 sm:inline-block sm:mt-0 text-teal-lighter text-sm text-white hover:text-gray-300 cursor-pointer"
            >{{authUser.name}} {{authUser.surname}}</router-link>
            <a
              @click="logout"
              class="no-underline block mt-4 mx-1 sm:inline-block sm:mt-0 text-teal-lighter text-white text-sm hover:text-gray-300 cursor-pointer"
            >Logout</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      query: "",
      results: []
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    authUser() {
      return this.$store.getters.getUser;
    }
  },
  watch: {
    query(after, before) {
      this.users();
    },
    $route(to, from) {
      this.query = "";
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => setTimeout(() => this.$router.push("/login"), 100));
    },
    toggle() {
      this.open = !this.open;
    },
    users() {
      const token = localStorage.getItem("token");
      this.$http({
        url: "api/auth/users",
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        },
        params: {
          query: this.query
        }
      })
        .then(response => (this.results = response.data))
        .catch(error => console.log(error));
    }
  }
};
</script>