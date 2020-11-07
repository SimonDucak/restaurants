import {
  createRouter, createWebHashHistory, RouteRecordRaw,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import axios, { AxiosResponse } from "axios";
import { isAuth, user, token } from "@/store/User";
import { appLoaderVisible, appLoaderText } from "@/store/App";
import { LoginRegisterRes } from "@/resources/models/User";

// Views
import Signup from "@/views/Signup.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      loginRequired: true,
    },
    children: [
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
          loginRequired: true,
        },
      },
    ],
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/*
* Return boolean. True if user is verified.
* */
let userWasVerified = false;
const verifyUser: Function = async (): Promise<void> => {
  try {
    // Show loader
    appLoaderVisible.value = true;
    appLoaderText.value = "Loading ...";
    // Try verify user
    const tokenRes: AxiosResponse<LoginRegisterRes> = await axios.post("/api/user/token");
    // User is verified then set user.
    user.value = tokenRes.data.user;
    token.value = tokenRes.data.token;
  } catch (e) {
    // Token doesn't exists
  } finally {
    appLoaderVisible.value = false;
    userWasVerified = true;
  }
};

/*
* Routes guard
* If route has property loginRequired user must be logged in
* If route has property questRequired user mustn't be logged in
* */
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  // If route hasn't define guards
  if (!to.meta?.guestRequired && !to.meta?.loginRequired) {
    next();
    return;
  }

  // If route required quest or logged user
  if (to.meta.guestRequired || to.meta.loginRequired) {
    // If user wasn't verified try it.
    if (!userWasVerified) await verifyUser();
    // If route required guest
    if (to.meta.guestRequired) {
      if (!isAuth.value) next();
      else next("/");
      return;
    }
    // If route required logged user
    if (to.meta.loginRequired) {
      if (isAuth.value) next();
      else next("/login");
      return;
    }
  }

  next();
});

export default router;
