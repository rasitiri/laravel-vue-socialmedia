import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
    posts: {}
};

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUser: state => state.user,
    getPosts: state => state.posts
};

const mutations = {
    auth_request(state) {
        state.status = "loading";
    },
    auth_success(state, token) {
        state.status = "success";
        state.token = token;
    },
    auth_error(state) {
        state.status = "error";
    },
    logout(state) {
        state.status = "";
        state.token = "";
    },
    user_info(state, user) {
        state.user = user;
    },
    posts_success(state,posts){
        state.posts = posts;
    }
};

const actions = {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit("auth_request");
            axios({ url: "/api/auth/login", data: user, method: "POST" })
                .then(res => {
                    const token = res.data.access_token;
                    const user = JSON.parse(res.config.data);
                    localStorage.setItem("token", token);
                    axios.defaults.headers.common["Authorization"] = token;
                    commit("auth_success", token);
                    resolve(res);
                })
                .catch(err => {
                    commit("auth_error");
                    localStorage.removeItem("token");
                    reject(err);
                });
        });
    },
    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit("auth_request");
            axios({
                url: "/api/auth/signup",
                data: user,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                }
            })
                .then(res => {
                    const token = res.data.access_token;
                    axios.defaults.headers.common["Authorization"] = token;
                    commit("auth_success", token);
                    resolve(res);
                })
                .catch(err => {
                    commit("auth_error", err);
                    localStorage.removeItem("token");
                    reject(err);
                });
        });
    },
    logout({ commit }) {
        const token = localStorage.getItem("token");
        axios({
            url: "/api/auth/logout",
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            commit("logout");
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
        });
    },
    user({ commit }) {
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios({
                url: "/api/auth/user",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(res => {
                    commit("user_info", res.data);
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    },
    posts({ commit }) {
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios({
                url: "/api/post",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(res => {
                    console.log("response posts:", res)
                    commit('posts_success',res.data)
                })
                .catch(err => console.log("error posts:", err));
        });
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;
