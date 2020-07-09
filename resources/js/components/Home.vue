<template>
  <div class="container mx-auto grid grid-cols-3 gap-4">
    <div class="lg:col-span-2 col-span-3 py-3">
      <publish></publish>
      <post
        v-for="post in posts"
        :key="post.id"
        :body="post.post"
        :author="post.user.name"
        :postedTime="post.created_at"
        :postId="post.id"
        :authorId="post.user.id"
      ></post>
    </div>
    <friends-list></friends-list>
  </div>
</template>

<script>
import Publish from "./Publish";
import Post from "./Post";
import FriendsList from "./FriendsList";

export default {
  components: {
    Publish,
    Post,
    FriendsList
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