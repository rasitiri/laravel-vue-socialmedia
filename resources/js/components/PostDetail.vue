<template>
  <div>
    <div v-for="p in post" :key="p.id" class="p-2 text-center container">
      <h2>{{p.post}}</h2>
      <h6>{{p.created_at}}</h6>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    post(){
      return this.$store.getters.getPostById;
    }
  },
  created(){
    this.$store.dispatch("getPostById",this.$route.params.id);
  }
}
</script>