<template>
  <section class="py-8 py-md-11">
    <div class="container">
      <div class="row align-items-start">
        <div class="col-12 col-md-6 pt-10 col-lg-5 aos-init aos-animate" data-aos="fade-up">

          <!-- Heading -->
          <h2 class="font-weight-bold">
            Hello, welcome to restaurant NoCR.
            <span class="text-success">We will happy work with you</span>.
          </h2>

          <!-- Text -->
          <p class="font-size-lg text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed feugiat nunc at ante fermentum mattis. Sed at eros vitae magna convallis vestibulum.
          </p>

          <!-- Form -->
          <div class="mb-8">
            <div class="form-row">
              <div class="col-12 col-md-auto">

                <!-- Submit -->
                <router-link tag="button" to="/login" class="btn btn-success-soft">
                  I have an account?
                </router-link>

              </div>
            </div>
          </div>

        </div>

        <div class="col-12 col-md-6 col-lg-6 offset-lg-1">

          <!-- Card -->
          <div
            class="card card-border shadow-lg mb-5 aos-init aos-animate"
            data-aos="fade-up"
            :class="{
              'border-success': !error,
              'border-warning': error,
            }"
          >
            <div class="card-body">
              <form @submit.prevent="submit">
                <div v-if="error" class="alert alert-warning" role="alert">
                  {{error}}
                </div>

                <h3 class="mb-4">Sign up</h3>

                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-5">
                      <label for="email">
                        Email
                      </label>
                      <input
                        type="email"
                        class="form-control form-control-sm"
                        id="email"
                        placeholder="Email"
                        v-model="signUpData.email"
                        @blur="checkEmail"
                        :class="{'is-invalid': error || !emailValid}"
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-5">
                      <label for="forename">
                        Forename
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="forename"
                        placeholder="Forename"
                        v-model="signUpData.forename"
                        :class="{'is-invalid': error}"
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-5">
                      <label for="surname">
                        Surname
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="surname"
                        placeholder="Surname"
                        tabindex="0"
                        v-model="signUpData.surname"
                        :class="{'is-invalid': error}"
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-5">
                      <label for="password">
                        Password
                      </label>
                      <input
                        v-model="signUpData.password"
                        type="password"
                        class="form-control form-control-sm"
                        id="password"
                        placeholder="Password"
                        :class="{'is-invalid': error}"
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-5">
                      <label for="repeat-password">
                        Repeat password
                      </label>
                      <input
                        type="password"
                        class="form-control form-control-sm"
                        id="repeat-password"
                        placeholder="Repeat password"
                        v-model="signUpData.repeatPassword"
                        :class="{'is-invalid': error}"
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="form-check mb-5">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="agreement"
                        v-model="signUpData.agreement"
                        :class="{'is-invalid': error}"
                      >
                      <label class="form-check-label" for="agreement">
                        I am accepted personal information policy. Full document here.
                      </label>
                    </div>
                  </div>
                </div>

                <div class="align-items-center d-flex">
                  <button type="submit" class="btn btn-primary mr-4">Sign up</button>

                  <div v-if="loading" class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export class SignUp {
  public constructor(
    public email: string = "",
    public forename: string = "",
    public surname: string = "",
    public password: string = "",
    public repeatPassword: string = "",
    public agreement: boolean = false,
  ) {}
}

export default defineComponent({
  name: "Signup",
  setup() {
    const signUpData = ref<SignUp>(new SignUp());
    const error = ref<string>("");
    const loading = ref<boolean>(false);
    const emailValid = ref<boolean>(true);

    const submit: Function = async (): Promise<void> => {
      try {
        if (signUpData.value.password !== signUpData.value.repeatPassword) {
          error.value = "Password don't match!";
          window.scrollTo({
            behavior: "smooth",
            left: 0,
            top: 0,
          });
        } else if (signUpData.value.email && !emailValid.value) {
          error.value = "Email doesn't exists.";
          window.scrollTo({
            behavior: "smooth",
            left: 0,
            top: 0,
          });
        } else {
          loading.value = true;
          await axios.post("/api/user/register", { user: signUpData.value });
        }
      } catch (e) {
        error.value = e.message;
        window.scrollTo({
          behavior: "smooth",
          left: 0,
          top: 0,
        });
      } finally {
        loading.value = false;
      }
    };

    const checkEmail: Function = async (): Promise<void> => {
      try {
        emailValid.value = await axios.post("/api/user/email", { email: signUpData.value.email });
      } catch (e) {
        emailValid.value = false;
      }
    };

    return {
      signUpData,
      submit,
      error,
      loading,
      checkEmail,
      emailValid,
    };
  },
});
</script>
