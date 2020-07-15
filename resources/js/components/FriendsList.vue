<template>
  <div class="lg:col-span-1 col-span-3 p-2">
    <h1 class="text-center text-xl text-gray-300 my-2">Friends</h1>
    <div v-if="friends.length <= 0">
      <p class="text-center text-gray-300 text-lg">No friends. :/</p>
    </div>
    <ul
      v-if="friends.length > 0"
      class="mx-auto border rounded border-gray-600 w-5/6 h-56 overflow-auto style-3"
    >
      <li
        v-for="friend in friends"
        :key="friend.id"
        class="border flex items-center border-gray-600 text-center px-1 py-3 text-sm text-gray-300"
      >
        <img
          :src="`https://picsum.photos/id/${friend.id}/100`"
          class="rounded-full h-12"
          alt="image"
        />
        <router-link
          tag="span"
          class="font-bold text-gray-400 mx-2 cursor-pointer"
          :to="{path:'/user/'+friend.id}"
        >{{friend.name}} {{friend.surname}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    friends() {
      return this.$store.getters.getFriends;
    }
  },
  created() {
    this.$store.dispatch("getFriends");
  }
};
</script>

<style scoped>
.style-3::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #1a202c;
}

.style-3::-webkit-scrollbar {
  width: 6px;
  background-color: #1a202c;
}

.style-3::-webkit-scrollbar-thumb {
  background-color: #718096;
  border-radius: 6px;
}
</style>