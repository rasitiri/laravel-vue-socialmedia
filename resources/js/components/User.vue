<template>
  <div class="container mx-auto grid grid-cols-4 gap-4">
    <div class="lg:col-span-1 col-span-4 flex mx-auto ml-auto">
      <user-card
        :isLoggedInUser="false"
        :userId="$route.params.id"
        :name="`${user.name} ${user.surname}`"
        :email="user.email"
        :bio="user.bio"
        :joinedDate="user.created_at"
      ></user-card>
    </div>
    <div class="lg:col-span-3 col-span-4">
      <div v-if="posts">
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
      <div v-if="!posts">
        <p class="text-gray-200 text-4xl text-center">No posts here yet.</p>
      </div>
    </div>
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