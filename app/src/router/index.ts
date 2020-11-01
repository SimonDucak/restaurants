import {
  createRouter, createWebHashHistory, RouteRecordRaw, NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import { isAuth } from "@/store/User";
import Signup from "@/views/Signup.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      guestRequired: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guestRequired: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      loginRequired: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/*
* Routes guard
* If route has property loginRequired user must be logged in
* If route has property questRequired user mustn't be logged in
* */
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // If route hasn't define guards
  if (!to.meta?.guestRequired && !to.meta?.loginRequired) {
    next();
    return;
  }

  // If route is quest only
  if (to.meta.guestRequired) {
    if (!isAuth.value) {
      next();
    } else {
      next("/dashboard");
    }
    return;
  }

  // If route is for logged user only
  if (to.meta.loginRequired) {
    if (isAuth.value) {
      next();
    } else {
      next("/login");
    }
    return;
  }

  next();
});

export default router;
