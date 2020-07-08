<template>
  <!-- <div class="card mx-auto" style="width: 20rem;">
    <div class="card-body">
      <h5 class="card-title font-weight-bold">{{name}}</h5>
      <p class="card-text">{{email}}</p>
      <span class="badge bg-primary text-white float-right">joined {{moment(joinedDate).fromNow()}}</span>
    </div>
  </div>-->
  <div class="max-w-sm rounded overflow-hidden bg-gray-700 shadow-lg my-10">
    <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="user-profile-photo" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 text-gray-400">{{name}}</div>
      <p
        class="text-gray-300 text-sm"
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
    </div>
    <div class="flex">
      <button
        class="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-md"
      >{{isLoggedInUser ? 'Edit Profile' : 'Following'}}</button>
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
  props: ["name", "email", "joinedDate", "isLoggedInUser"],
  created(){
    console.log(this.$props.isLoggedInUser)
  }
};
</script>