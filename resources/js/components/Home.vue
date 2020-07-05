<template>
  <div>
    <publish></publish>
    <post
      v-for="post in posts"
      :key="post.id"
      :body="post.post"
      :author="post.user.name"
      :postedTime="post.created_at"
    ></post>
  </div>
</template>

<script>
import Publish from "./Publish";
import Post from "./Post";

export default {
  components: {
    Publish,
    Post
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    }
  },
  created() {
    this.$store.dispatch("user");
    this.$store.dispatch("posts");
  }
};
</script>