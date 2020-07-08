<template>
  <div class="lg:w-5/12 mx-2 w-auto bg-gray-700 rounded overflow-hidden shadow-lg lg:mx-auto mt-10">
    <div class="px-6 py-4 container">
      <p class="text-gray-300 text-center mt-4 mb-2 text-2xl">{{post.post}}</p>
      <div class="flex mt-6">
        <span class="ml-auto text-xs text-gray-600">
          {{moment(post.created_at).fromNow()}} -
          {{moment(post.created_at).format('HH:mm a')}}
          {{moment(post.created_at).format('Do MMM YY')}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    post() {
      return this.$store.getters.getPostById;
    }
  },
  created() {
    this.$store.dispatch("getPostById", this.$route.params.id);
  }
};
</script>