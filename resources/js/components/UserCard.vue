<template>
  <div class="max-w-sm rounded overflow-hidden bg-gray-700 shadow-lg my-10">
    <img
      class="w-full object-contain"
      :src="`https://picsum.photos/id/${userId}/400`"
      alt="user-profile-photo"
    />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 text-gray-400">{{name}}</div>
      <p class="text-gray-300 text-sm">{{bio}}</p>
    </div>
    <div class="flex">
      <button
        v-if="!isLoggedInUser"
        class="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-md"
        @click="follow()"
      >{{isFollow}}</button>
      <router-link
        v-if="isLoggedInUser"
        tag="button"
        to="/edit-profile"
        class="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-md"
      >Edit Profile</router-link>
    </div>
    <div class="px-6 py-4 my-2 flex">
      <span
        class="inline-block bg-gray-800 my-1 mx-auto rounded-full px-3 py-1 text-xs font-semibold text-gray-400"
      >joined {{moment(joinedDate).fromNow()}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "email", "bio", "joinedDate", "isLoggedInUser", "userId"],

  methods: {
    follow() {
      this.$store.dispatch("follow", this.$props.userId);
      this.$store.dispatch("isFollow", this.$props.userId);
    }
  },
  computed: {
    isFollow() {
      return this.$store.getters.isFollow;
    }
  },
  created() {
    this.$store.dispatch("isFollow", this.$props.userId);
    this.$store.dispatch("user");
  }
};
</script>