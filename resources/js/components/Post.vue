<template>
  <div class="container mb-2 mt-2">
    <div class="row m-2 d-flex">
      <div class="col-sm-6 mx-auto bg-ccc">
        <p class="px-3 py-1">{{body}}</p>
        <span class="float-right m-1 author">
          {{author}} -
          <span>{{postedTime}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["body", "author", "postedTime"]
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
</style>