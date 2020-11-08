import axios, { AxiosResponse } from "axios";
import { UserRes, User } from "@/resources/models/User";
import {
  ref, Ref, computed, ComputedRef, watchEffect,
} from "vue";
import { CompanyRes } from "@/resources/models/Company";
import { company } from "@/store/Company";

/*
* Init store reference for user
* */
export const user: Ref<UserRes> = ref<UserRes>({ ...new User(), _id: "" });

/*
* Init store reference for token
* */
export const token: Ref<string> = ref<string>("");

/*
* Computed function returns boolean if user is auth ( token is not empty )
* */
export const isAuth: ComputedRef<boolean> = computed<boolean>(() => token.value.length > 0);

/*
* Computed function returns boolean if user is admin
* */
export const isAdmin: ComputedRef<boolean> = computed<boolean>(() => user.value.role === "ADMIN");

/*
* 1. Watch token change is token exists set bearer token
* else remove token from api header
* */
watchEffect(async (): Promise<void> => {
  if (token.value) {
    axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
  } else delete axios.defaults.headers.common.Authorization;
});
