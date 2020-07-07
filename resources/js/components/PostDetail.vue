<template>
  <div>
    <div class="p-2 text-center container">
      <h2>{{post.post}}</h2>
      <small>
        {{moment(post.created_at).fromNow()}} -
        {{moment(post.created_at).format('HH:mm a')}}
        {{moment(post.created_at).format('Do MMM YY')}}
      </small>
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