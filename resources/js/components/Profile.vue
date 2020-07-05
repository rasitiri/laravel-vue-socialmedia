<template>
  <div>
    <h2 class="text-center">My Posts</h2>
    <post
      v-for="post in profilePosts"
      :body="post.post"
      :key="post.id"
      author="me"
      :postedTime="post.created_at"
    ></post>
  </div>
</template>

<script>
import Post from "./Post";

export default {
  components: {
    Post
  },
  computed: {
    profilePosts() {
      return this.$store.getters.getProfilePosts;
    }
  },
  created() {
    this.$store.dispatch("profilePosts");
  }
};
</script>

<style>
</style>