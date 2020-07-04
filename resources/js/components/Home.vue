<template>
  <div>
    <publish></publish>
    <post v-for="post in posts" :key="post.id" :body="post.post">      
    </post>
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
  computed:{
    posts(){
      return this.$store.getters.getPosts
    }
  },
  created() {
    this.$store.dispatch("user");
    this.$store.dispatch("posts");
  }
};
</script>

<style>
</style>