import User from "@/models/User";
import {
  ref, Ref, computed, ComputedRef,
} from "vue";

/*
* Init store reference for user
* */
export const user: Ref<User> = ref<User>(new User());

/*
* Init store reference for token
* */
export const token: Ref<string> = ref<string>("");

/*
* Computed function returns boolean if user is auth ( token is not empty )
* */
export const isAuth: ComputedRef<boolean> = computed<boolean>(() => token.value.length > 0);
