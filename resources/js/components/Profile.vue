<template>
  <div class="container mx-auto grid grid-cols-4 gap-4">
    <div class="lg:col-span-1 col-span-4 flex mx-auto ml-auto">
      <user-card
        :isLoggedInUser="true"
        :userId="user.id"
        :name="`${user.name} ${user.surname}`"
        :email="user.email"
        :bio="user.bio"
        :joinedDate="user.created_at"
      ></user-card>
    </div>
    <div class="lg:col-span-3 col-span-4">
      <div>
        <post
          v-for="post in profilePosts"
          :key="post.id"
          :body="post.post"
          :author="user.name"
          :postedTime="post.created_at"
          :postId="post.id"
          :authorId="user.id"
        ></post>
      </div>
      <div v-if="profilePosts.length <= 0 || !profilePosts">
        <p class="text-gray-200 text-4xl text-center">No posts here yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "./Post";
import UserCard from "./UserCard";

export default {
  components: {
    Post,
    UserCard
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    profilePosts() {
      return this.$store.getters.getProfilePosts;
    }
  },
  created() {
    this.$store.dispatch("profilePosts");
    this.$store.dispatch("user");
  }
};
</script>

<style>
</style>