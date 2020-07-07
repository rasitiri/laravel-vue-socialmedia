<template>
  <div>
    <div class="col-12 d-flex">
      <textarea
        class="form-control m-auto w-50 d-block"
        rows="4"
        v-model="body"
        @keyup="countCharacter()"
      ></textarea>
    </div>
    <div class="col-12 d-flex">
      <span class="m-auto">{{totalCharacter}}</span>
    </div>
    <div class="col-12 d-flex mt-1">
      <button :disabled="totalCharacter >= 255" type="submit" class="m-auto btn btn-success" @click="publish">Publish</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      body: "",
      totalCharacter: 0
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
    },
    countCharacter() {
      this.totalCharacter = this.body.length;
    }
  }
};
</script>

<style>
textarea {
  resize: none;
}
</style>