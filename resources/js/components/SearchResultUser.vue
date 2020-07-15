<template>
  <div class="flex items-center bg-gray-600 rounded py-4 px-4 my-3">
    <img :src="`https://picsum.photos/id/93/100`" class="rounded-full h-12 mr-2" alt="image" />
    <div class="mx-6">
      <p class="text-gray-300 text-xl">{{name}}</p>
      <small class="text-xs text-gray-300">{{email}}</small>
    </div>
    <button
      class="bg-blue-500 hover:bg-green-600 focus:outline-none focus:shadow-outline ml-auto border-none py-4 px-5 text-white rounded-full"
    >
      <i class="fas fa-user-plus"></i>
    </button>
  </div>
</template>

<script>
export default {
  props:['name', 'email']
};
</script>