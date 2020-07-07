<template>
  <div class="card mx-auto" style="width: 20rem;">
    <div class="card-body">
      <h5 class="card-title font-weight-bold">{{name}}</h5>
      <p class="card-text">{{email}}</p>
      <span class="badge bg-primary text-white float-right">joined {{moment(joinedDate).fromNow()}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "email", "joinedDate"]
};
</script>