<template>
  <modal name="post-detail">
    <div class="px-8 py-24">
      <p class="text-gray-200 mb-4 text-lg text-center">{{body}}</p>
      <div class="text-xs text-gray-600 text-center">
        {{moment(postedTime).fromNow()}} -
        {{moment(postedTime).format('HH:mm a')}}
        {{moment(postedTime).format('Do MMM YY')}}
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: ["body", "postedTime"],
  computed: {
    post() {
      return this.$store.getters.getPostById;
    }
  },
  created() {
    this.$store.dispatch("getPostById", this.$route.params.id);
  }
};
</script>