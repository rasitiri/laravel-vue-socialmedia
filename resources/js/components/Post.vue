<template>
  <div class="container">
    <div class="row m-2 d-flex">
      <div class="col-sm-6 mx-auto bg-ccc">
        <p class="px-4 py-2 m-1">{{body}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["body"]
};
</script>

<style>
.bg-ccc {
  background-color: rgb(240, 233, 233);
}
</style>