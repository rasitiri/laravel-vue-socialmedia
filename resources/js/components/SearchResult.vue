<template>
  <div class="flex">
    <div class="my-3 mx-auto w-2/5">
      <search-result-user name="Raşit" email="rasitiri3@gmail.com"></search-result-user>
      {{results}}
    </div>
  </div>
</template>

<script>
import SearchResultUser from "./SearchResultUser";

export default {
  components: {
    SearchResultUser
  },
  data() {
    return {
      results: []
    };
  },
  methods: {
    searchUsers() {
      console.log(this.$route.params.query)
      const token = localStorage.getItem("token");
      this.$http({
        url: "api/auth/users",
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        },
        params: {
          query: this.$route.params.query
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error));
    }
  },
  mounted() {
    this.searchUsers();
  }
};
</script>

<style>
</style>