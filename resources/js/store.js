import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
    posts: {},
    profilePosts: {},
    postById: {},
    userInfo: {},
    usersPosts: {},
    followStatus: ".........",
    friends: [],
    searchResultsVisible: false
};

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUser: state => state.user,
    getPosts: state => state.posts,
    getProfilePosts: state => state.profilePosts,
    getPostById: state => state.postById,
    getUserById: state => state.userInfo,
    getUsersPosts: state => state.usersPosts,
    isFollow: state => state.followStatus,
    getFriends: state => state.friends,
    getSearchResultsVisible: state => state.searchResultsVisible
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
    posts_success(state, posts) {
        state.posts = posts;
    },
    profile_posts_success(state, posts) {
        state.profilePosts = posts;
    },
    get_by_id_success(state, post) {
        state.postById = post;
    },
    get_user_by_id_success(state, user) {
        state.userInfo = user;
    },
    get_users_post_success(state, posts) {
        state.usersPosts = posts;
    },
    delete_post(state, id) {
        let index = state.posts.findIndex(post => post.id == id);
        state.posts.splice(index, 1);
    },
    follow_status(state, status) {
        state.followStatus = status ? "Unfollow" : "Follow";
    },
    friends_success(state, friends) {
        state.friends = friends;
    },
    search_results_visible(state, type) {
        console.log("type:", type);
        state.searchResultsVisible = type;
    }
};

const actions = {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit("auth_request");
            axios({ url: "/api/auth/login", data: user, method: "POST" })
                .then(res => {
                    const token = res.data.access_token;
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
                    console.log("res.data:", res.data);
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
                    commit("posts_success", res.data);
                    resolve(res.data);
                })
                .catch(err => {
                    console.log("error friends posts:", err.response);
                    reject(err);
                });
        });
    },
    profilePosts({ commit }) {
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios({
                url: "/api/profile",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(res => commit("profile_posts_success", res.data))
                .catch(err => console.log("error profile posts:", err));
        });
    },
    getPostById({ commit }, id) {
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios({
                url: "/api/post/" + id,
                method: "GET",
                headers: { Authorization: "Bearer " + token }
            })
                .then(res => commit("get_by_id_success", res.data))
                .catch(err => console.log(err));
        });
    },
    getUserById({ commit }, id) {
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios({
                url: "/api/auth/user/" + id,
                method: "GET",
                headers: { Authorization: "Bearer " + token }
            })
                .then(res => commit("get_user_by_id_success", res.data))
                .catch(err => console.log(err));
        });
    },
    getUsersPost({ commit }, id) {
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios({
                url: "/api/user/" + id,
                method: "GET",
                headers: { Authorization: "Bearer " + token }
            })
                .then(res => commit("get_users_post_success", res.data))
                .catch(err => console.log(err));
        });
    },
    deletePost({ commit }, id) {
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios({
                url: "/api/post/" + id,
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(res => {
                    console.log(res);
                    commit("delete_post", res.data.data);
                })
                .catch(err => console.log(err));
        });
    },
    follow({ commit }, id) {
        const token = localStorage.getItem("token");
        axios({
            url: "/api/user/" + id + "/follow",
            method: "POST",
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res => {
                console.log("follow response:", res);
            })
            .catch(err => console.log("follow error:", err));
    },
    isFollow({ commit }, id) {
        const token = localStorage.getItem("token");

        axios({
            url: "/api/user/" + id + "/follow",
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res => {
                console.log("isfollow:", res.data);
                commit("follow_status", res.data);
            })
            .catch(err => err.response.data);
    },
    getFriends({ commit }) {
        const token = localStorage.getItem("token");

        axios({
            url: "/api/friends",
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res => {
                console.log("friends:", res.data);
                commit("friends_success", res.data);
            })
            .catch(err => err.response);
    },
    publish({ commit }, body) {
        const token = localStorage.getItem("token");
        axios({
            url: "/api/post",
            method: "POST",
            headers: {
                Authorization: "Bearer " + token
            },
            data: { body }
        })
            .then(res => window.location.reload())
            .catch(err => console.log("publish error:", err.response));
    },
    searchResultsVisible({ commit }, type) {
        console.log("type:", type);
        commit("search_results_visible", type);
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;
