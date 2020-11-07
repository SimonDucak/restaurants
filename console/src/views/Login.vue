<template>
  <div class="layout">

    <div class="container d-flex flex-column">
      <div class="row align-items-center justify-content-center no-gutters min-vh-100">

        <div class="col-12 col-md-5 col-lg-4 py-8 py-md-11">

          <!-- Heading -->
          <h1 class="font-bold text-center">Sign in</h1>

          <!-- Text -->
          <p class="text-center mb-6">Welcome back.</p>

          <div class="alert alert-danger" role="alert" v-if="serviceError.length > 0">
            {{serviceError}}
          </div>

          <!-- Form -->
          <form id="sign-in-form" class="mb-6" @submit.prevent="signIn">

            <!-- Email -->
            <div class="form-group" v-validate="formErrors">
              <label for="email" class="sr-only">Email Address</label>
              <input v-model="email" type="email" class="form-control form-control-lg" id="email" placeholder="Enter your email">
              <div class="invalid-feedback">
                <div class="feedback-item" id="USER_EMAIL_0">Email is required field.</div>
                <div class="feedback-item" id="USER_EMAIL_1">Enter email in valid format.</div>
              </div>
            </div>

            <!-- Password -->
            <div class="form-group" v-validate="formErrors">
              <label for="password" class="sr-only">Password</label>
              <input v-model="password" type="password" class="form-control form-control-lg" id="password" placeholder="Enter your password">
              <div class="invalid-feedback">
                <div class="feedback-item" id="USER_PASSWORD_0">Password is required field.</div>
              </div>
            </div>

            <!-- Forgot password -->
            <div class="form-group">
              <p>I forgot password. <router-link tag="a" to="/signup">Reset password</router-link>.</p>
            </div>

            <!-- Submit -->
            <button class="btn btn-lg btn-block btn-primary" type="submit" v-show-errors="'sign-in-form'">Sign in</button>
          </form>

          <!-- Text -->
          <p class="text-center">
            Don't have an account yet <router-link tag="a" to="/signup">Sign up</router-link>.
          </p>

        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, Ref, computed, ComputedRef,
} from "vue";
import axios, { AxiosResponse } from "axios";
import { UserLoginReq, LoginRegisterRes } from "@/resources/models/User";
import { appLoaderVisible, appLoaderText } from "@/store/App";
import userSchema from "@/resources/schemas/userSchema";
import validate from "@/validator/";
import { token, user } from "@/store/User";
import { useRouter, Router } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    const serviceError: Ref<string> = ref<string>("");
    const email: Ref<string> = ref<string>("");
    const password: Ref<string> = ref<string>("");
    const router: Router = useRouter();

    /*
    * Validations
    * Computed returns array of error IDs.
    * */
    const formErrors: ComputedRef<string[]> = computed<string[]>(() => {
      const errors: string[] = [];
      // Email validations
      errors.push(validate(email.value, typeof userSchema.email !== "string" ? userSchema.email.validate : []));
      // Password validation
      if (password.value.length === 0) errors.push("USER_PASSWORD_0");
      // Returns error IDs
      return errors.filter((err) => !!err);
    });

    /*
    * Sign in request
    * */
    const signIn: Function = async (): Promise<void> => {
      try {
        if (formErrors.value.length === 0) {
          appLoaderText.value = "Authorization in progress, please wait ...";
          appLoaderVisible.value = true;
          const req: UserLoginReq = { email: email.value, password: password.value };
          const loginRes: AxiosResponse<LoginRegisterRes> = await axios.post("/api/user/login", req);
          console.log(loginRes);
          token.value = loginRes.data.token;
          user.value = loginRes.data.user;
          router.push("/");
        }
      } catch (e) {
        serviceError.value = e.response.data.message;
        window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
      } finally {
        appLoaderVisible.value = false;
      }
    };

    return {
      email,
      password,
      formErrors,
      serviceError,
      signIn,
    };
  },
});
</script>
