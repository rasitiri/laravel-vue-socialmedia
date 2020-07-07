<template>
  <div>
    <user-card :name="user.name" :email="user.email" :joinedDate="user.created_at"></user-card>
    <post
      v-for="post in posts"
      :key="post.id"
      :body="post.post"
      :author="user.name"
      :postedTime="post.created_at"
      :postId="post.id"
      :authorId="user.id"
    ></post>
  </div>
</template>

<script>
import UserCard from "./UserCard";
import Post from "./Post";

export default {
  components: {
    UserCard,
    Post
  },
  computed: {
    user() {
      return this.$store.getters.getUserById;
    },
    posts() {
      return this.$store.getters.getUsersPosts;
    }
  },
  created() {
    this.$store.dispatch("getUserById", this.$route.params.id);
    this.$store.dispatch("getUsersPost", this.$route.params.id);
  }
};
</script>