<template>
  <section class="py-8 py-md-11">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12 col-md-6 pt-10 col-lg-5 aos-init aos-animate" data-aos="fade-up">

          <!-- Heading -->
          <h2 class="font-weight-bold">
            Welcome back,
            <span class="text-success">ready to login?</span>.
          </h2>

          <!-- Text -->
          <p class="font-size-lg text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed feugiat nunc at ante fermentum mattis.
          </p>

          <!-- Form -->
          <div class="mb-8">
            <div class="form-row">
              <div class="col-12 col-md-auto">

                <!-- Submit -->
                <router-link tag="button" to="/signup" class="btn btn-success-soft">
                  I haven't an account?
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

                <h3 class="mb-4">Sign in</h3>

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
                        v-model="loginData.email"
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
                        v-model="loginData.password"
                        type="password"
                        class="form-control form-control-sm"
                        id="password"
                        placeholder="Password"
                        :class="{'is-invalid': error}"
                      >
                    </div>
                  </div>
                </div>

                <div class="align-items-center d-flex">
                  <button type="submit" class="btn btn-primary mr-4">Sign in</button>

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
import { defineComponent, ref } from "vue";
import axios, { AxiosResponse } from "axios";
import { ILoginRegisterRes } from "@/models/User";
import { user, token } from "@/store/User";
import { useRouter, Router } from "vue-router";

export class Login {
  public constructor(
    public email: string = "",
    public password: string = "",
  ) {}
}

export default defineComponent({
  name: "Login",
  setup() {
    const loginData = ref<Login>(new Login());
    const error = ref<string>("");
    const loading = ref<boolean>(false);
    const router: Router = useRouter();

    /*
    * On submit form try login user.
    * If is error show error alert and scroll up.
    * */
    const submit: Function = async (): Promise<void> => {
      try {
        // Show loader
        loading.value = true;
        // Call login service then save user and token to store
        const { email, password } = loginData.value;
        const loginRes: AxiosResponse<ILoginRegisterRes> = await axios.post("/api/user/login", { email, password });
        user.value = loginRes.data.user;
        token.value = loginRes.data.token;
        // Go to dashboard
        router.push({ name: "Dashboard" });
      } catch (e) {
        // Show error and scroll up
        error.value = e.response.data.message;
        window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
      } finally {
        // Hide loader
        loading.value = false;
      }
    };

    return {
      loginData,
      submit,
      error,
      loading,
    };
  },
});
</script>
