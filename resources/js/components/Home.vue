<template>
  <div class="d-flex">
    <div class="col-9">
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
    <div class="col-3">
      <friends-list></friends-list>
    </div>
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