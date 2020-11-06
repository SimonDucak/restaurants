<template>
  <div class="layout">

    <div class="container d-flex flex-column">
      <div class="row align-items-center justify-content-center no-gutters min-vh-100">

        <div class="col-12 col-md-5 col-lg-4 py-8 py-md-11">

          <!-- Heading -->
          <h1 class="font-bold text-center">Sign up</h1>

          <!-- Text -->
          <p class="text-center mb-6">Welcome to the official Restaurant platform.</p>

          <div class="alert alert-danger" role="alert" v-if="serviceError.length > 0">
            {{serviceError}}
          </div>

          <!-- Form -->
          <form id="sign-up-form" class="mb-6" @submit.prevent="signUp">

            <!-- Email -->
            <div class="form-group" v-validate="formErrors">
              <label for="email" class="sr-only">Email Address</label>
              <input v-model="signUpUser.email" type="email" class="form-control form-control-lg" id="email" placeholder="Enter your email">
              <div class="invalid-feedback">
                <div class="feedback-item" id="USER_EMAIL_0">Email is required field.</div>
                <div class="feedback-item" id="USER_EMAIL_1">Enter email in valid format.</div>
              </div>
            </div>

            <!-- Forename -->
            <div class="form-group" v-validate="formErrors">
              <label for="forename" class="sr-only">Forename</label>
              <input v-model="signUpUser.forename" type="text" class="form-control form-control-lg" id="forename" placeholder="Enter your forename">
              <div class="invalid-feedback">
                <div class="feedback-item" id="USER_FORENAME_0">Forename is required field.</div>
                <div class="feedback-item" id="USER_FORENAME_1">Enter least two letters.</div>
              </div>
            </div>

            <!-- Surname -->
            <div class="form-group" v-validate="formErrors">
              <label for="surname" class="sr-only">Surname</label>
              <input v-model="signUpUser.surname" type="text" class="form-control form-control-lg" id="surname" placeholder="Enter your surname">
              <div class="invalid-feedback">
                <div class="feedback-item" id="USER_SURNAME_0">Surname is required field.</div>
                <div class="feedback-item" id="USER_SURNAME_1">Enter least two letters.</div>
              </div>
            </div>

            <!-- Password -->
            <div class="form-group" v-validate="formErrors">
              <label for="password" class="sr-only">Password</label>
              <input v-model="signUpUser.password" type="password" class="form-control form-control-lg" id="password" placeholder="Enter your password">
              <div class="invalid-feedback">
                <div class="feedback-item" id="USER_PASSWORD_0">Password is required field.</div>
                <div class="feedback-item" id="USER_PASSWORD_1">Enter least six letters.</div>
              </div>
            </div>

            <!-- Repeat password -->
            <div class="form-group" v-validate="formErrors">
              <label for="repeat-password" class="sr-only">Password</label>
              <input v-model="repeatPassword" type="password" class="form-control form-control-lg" id="repeat-password" placeholder="Repeat password">
              <div class="invalid-feedback">
                <div class="feedback-item" id="USER_REPEAT_PASSWORD_0">Passwords don't match.</div>
              </div>
            </div>

            <!-- Agreement -->
            <div class="form-check mb-6" v-validate="formErrors">
              <input v-model="signUpUser.agreement" class="form-check-input" type="checkbox" id="agreement">
              <label class="form-check-label" for="agreement">
                I hereby declare I read the Basic Information on Personal Data Protection.
              </label>
              <div class="invalid-feedback">
                <div class="feedback-item" id="USER_AGREEMENT_0"></div>
              </div>
            </div>

            <!-- Submit -->
            <button class="btn btn-lg btn-block btn-primary" type="submit" v-show-errors="'sign-up-form'">Sign up</button>
          </form>

          <!-- Text -->
          <p class="text-center">
            Already have an account? <router-link tag="a" to="/login">Sign in</router-link>.
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
import { User, LoginRegisterRes } from "@/resources/models/User";
import validate from "@/validator/";
import userSchema from "@/resources/schemas/userSchema";
import { appLoaderVisible, appLoaderText } from "@/store/App";
import { token, user } from "@/store/User";
import { useRouter, Router } from "vue-router";

export default defineComponent({
  name: "Signup",
  setup() {
    const signUpUser: Ref<User> = ref<User>(new User());
    const repeatPassword: Ref<string> = ref<string>("");
    const serviceError: Ref<string> = ref<string>("");
    const router: Router = useRouter();

    /*
    * Validations
    * Computed returns array of error IDs.
    * */
    const formErrors: ComputedRef<string[]> = computed<string[]>(() => {
      const userData = signUpUser.value;
      const {
        email, forename, surname, password, agreement,
      } = userSchema;
      const errors: Array<string> = [];
      // Email validations
      errors.push(validate(userData.email, typeof email !== "string" ? email.validate : []));
      // Forename
      errors.push(validate(userData.forename, typeof forename !== "string" ? forename.validate : []));
      // Surname
      errors.push(validate(userData.surname, typeof surname !== "string" ? surname.validate : []));
      // Password
      errors.push(validate(userData.password, typeof password !== "string" ? password.validate : []));
      // Repeat password
      if (!userData.password || userData.password !== repeatPassword.value) errors.push("USER_REPEAT_PASSWORD_0");
      // Agreement
      errors.push(validate(userData.agreement, typeof agreement !== "boolean" ? agreement.validate : []));
      // Returns error IDs
      return errors.filter((err) => !!err);
    });

    /*
    * Signup request
    * */
    const signUp: Function = async (): Promise<void> => {
      try {
        if (formErrors.value.length === 0) {
          appLoaderText.value = "Registration in progress, please wait ...";
          appLoaderVisible.value = true;
          const req = signUpUser.value;
          const registerRes: AxiosResponse<LoginRegisterRes> = await axios.post(
            `/api/user/register/${req.company}`,
            { user: req },
          );
          token.value = registerRes.data.token;
          user.value = registerRes.data.user;
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
      signUpUser,
      formErrors,
      repeatPassword,
      serviceError,
      signUp,
    };
  },
});
</script>
