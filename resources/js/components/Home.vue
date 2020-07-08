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
    <div class="lg:col-span-1 col-span-3 p-2">
      <ul class="mx-auto border-t border-r border-l rounded border-gray-600 w-5/6">
        <li class="border-b border-gray-500 text-center px-2 py-4 text-sm text-gray-300">Raşit</li>
        <li class="border-b border-gray-500 text-center px-2 py-4 text-sm text-gray-300">Raşit</li>
        <li class="border-b border-gray-500 text-center px-2 py-4 text-sm text-gray-300">Raşit</li>
        <li class="border-b border-gray-500 text-center px-2 py-4 text-sm text-gray-300">Raşit</li>
      </ul>
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