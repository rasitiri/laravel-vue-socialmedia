<template>
  <div class="g-3">
    <div class="col-12 d-flex">
      <textarea class="form-control m-auto w-50 d-block" rows="4" v-model="body"></textarea>
    </div>
    <div class="col-12 d-flex mt-1">
      <button type="submit" class="m-auto btn btn-success" @click="publish">Publish</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      body: ""
    };
  },
  methods: {
    publish() {
      const token = localStorage.getItem("token");
      axios({
        url: "/api/post",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        },
        data: {
          body: this.body
        }
      })
        .then(res => {
          console.log("publish response:", res);
          this.body = "";
          window.location.reload();
        })
        .catch(err => console.log("publish error:", err.response));
    }
  }
};
</script>

<style>
textarea {
  resize: none;
}
</style>