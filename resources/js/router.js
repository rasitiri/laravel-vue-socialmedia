import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Home from "./components/Home.vue";
import Profile from "./components/Profile";
import PostDetail from "./components/PostDetail.vue";
import User from "./components/User.vue";

import store from "./store";

Vue.use(VueRouter);

const ifUserLoggedIn = (to, from, next) => {
    if (localStorage.getItem("token")) {
        next("/");
    } else {
        next();
    }
};

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            beforeEnter: ifUserLoggedIn
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            beforeEnter: ifUserLoggedIn
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/post/:id",
            name: "post",
            component: PostDetail,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/user/:id",
            name: "user",
            component: User,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

export default router;
