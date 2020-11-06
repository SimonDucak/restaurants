import axios from "axios";
import { UserRes } from "@/resources/models/User";
import {
  ref, Ref, computed, ComputedRef, watchEffect,
} from "vue";

/*
* Init store reference for user
* */
export const user: Ref<UserRes> = ref<UserRes>({
  forename: "",
  surname: "",
  email: "",
  role: "WAITER",
  createdAt: new Date(),
  agreement: false,
  company: "5fa32129a86d03290c6f1721",
  _id: "",
});

/*
* Init store reference for token
* */
export const token: Ref<string> = ref<string>("");

/*
* Computed function returns boolean if user is auth ( token is not empty )
* */
export const isAuth: ComputedRef<boolean> = computed<boolean>(() => token.value.length > 0);

/*
* Watch token change is token exists set bearer token
* else remove token from api header
* */
watchEffect(() => {
  if (token.value) axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
  else delete axios.defaults.headers.common.Authorization;
});
