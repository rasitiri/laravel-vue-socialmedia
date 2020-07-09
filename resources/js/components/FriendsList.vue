<template>
  <div class="lg:col-span-1 col-span-3 p-2">
    <h1 class="text-center text-xl text-gray-300 my-2">Friends</h1>
    <div v-if="friends.length <= 0">
      <p class="text-center text-gray-300 text-lg">No friends. :/</p>
    </div>
    <ul
      v-if="friends.length > 0"
      class="mx-auto border-t border-r border-l rounded border-gray-600 w-5/6"
    >
      <li
        v-for="friend in friends"
        :key="friend.id"
        class="border-b flex items-center border-gray-500 text-center px-2 py-4 text-sm text-gray-300"
      >
        <img :src="`https://picsum.photos/id/${friend.id}/200`" class="rounded-full h-16 w-1/5" alt="image" />
        <router-link
          tag="span"
          class="font-bold text-gray-400 mx-2 cursor-pointer"
          :to="{path:'/user/'+friend.id}"
        >{{friend.name}}</router-link>
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

<style>
</style>