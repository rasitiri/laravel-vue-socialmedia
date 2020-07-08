<template>
  <div>
    <!-- <div class="col-12 d-flex">
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
    </div>-->
    <!-- <div class="mx-auto">
      <textarea
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/4"
        rows="4"
        @keyup="countCharacter()"
      ></textarea>
    </div>-->
    <form class="lg:mx-auto mt-3 lg:w-2/3 w-auto mx-4">
      <div class="flex items-center border-b border-teal-500 py-2">
        <textarea
          class="appearance-none bg-transparent border-none w-full text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none text-sm"
          type="text"
          rows="3"
          v-model="body"
          @keyup="countCharacter()"
        ></textarea>
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded total"
          type="button"
          :disabled="totalCharacter >= 255 && totalCharacter < 6"
          @click="publish"
        >Publish</button>
      </div>
      <p :class="warningClass()">{{totalCharacter}}</p>
    </form>
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
    warningClass() {
      return {
        "text-red-600 text-center text-sm": this.totalCharacter >= 200,
        "text-gray-400 text-center text-sm": this.totalCharacter < 200
      };
    },
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