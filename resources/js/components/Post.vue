<template>
  <div class="lg:w-2/3 mx-2 w-auto bg-gray-700 rounded overflow-hidden shadow-lg lg:mx-auto mt-10">
    <div class="px-6 py-4">
      <router-link
        tag="span"
        class="font-bold text-xl text-gray-400 cursor-pointer"
        :to="{path:'/user/'+authorId}"
      >{{author}}</router-link>
      <p class="text-gray-300 mt-4 mb-2 text-sm">{{body}}</p>
      <span class="flex justify-end">
        <router-link
          class="cursor-pointer text-xs text-right text-gray-600"
          :to="{path:'/post/' + postId}"
          tag="span"
        >
          {{moment(postedTime).fromNow()}} -
          {{moment(postedTime).format('HH:mm a')}}
        </router-link>
        <span
          class="cursor-pointer ml-2 text-gray-600"
          v-if="loggedInUser()"
          @click="deletePost(postId)"
        >
          <svg
            width=".9em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-trash"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import PostDetail from "./PostDetail";

export default {
  props: ["body", "author", "postedTime", "postId", "authorId"],
  components: {
    PostDetail
  },
  methods: {
    loggedInUser() {
      if (this.$store.state.user.id === this.$props.authorId) {
        return true;
      } else {
        return false;
      }
    },
    deletePost(postId) {
      this.$store.dispatch("deletePost", postId);
    }
  }
};
</script>

<style>
.bg-ccc {
  background-color: rgb(240, 233, 233);
}
.author {
  color: rgb(168, 168, 168);
  font-size: 0.9em;
}
.pointer {
  cursor: pointer;
}
</style>