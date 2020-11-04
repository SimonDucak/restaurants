<template>
  <!-- Companies search -->
  <section :style="{ opacity: !loaderVisible ? 1 : 0  }" class="py-6">
    <div class="container">
      <div class="row">
        <div class="col-12">

          <!-- Form -->
          <form class="rounded shadow">
            <div class="input-group input-group-lg">

              <!-- Prepend -->
              <div class="input-group-prepend">
                  <span class="input-group-text border-0 pr-1">
                    <i class="fe fe-search"></i>
                  </span>
              </div>

              <!-- Input -->
              <input
                type="text"
                class="form-control border-0 px-1"
                aria-label="Search your companies"
                placeholder="Search your companies"
              >

              <!-- Append -->
              <div class="input-group-append">
                  <span class="input-group-text border-0 py-0 pl-1 pr-3">

                    <!-- Text -->
                    <span class="h6 text-uppercase text-muted d-none d-md-block mb-0 mr-5">
                      0 results
                    </span>

                    <!-- Button -->
                    <button type="submit" class="btn btn-sm btn-primary">
                      Search
                    </button>

                  </span>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  </section>

  <!-- All companies -->
  <section class="position-relative">
    <div class="container" :style="{ opacity: !loaderVisible ? 1 : 0  }">
      <div class="row">
        <!-- Add new company -->
        <div class="col-12 col-md-6 col-lg-4 d-flex">
          <router-link tag="div" to="/dashboard/create-company" class="card mb-6 shadow-light-lg lift lift-lg">
            <!-- Image -->
            <div class="card-img-top">

              <!-- Image -->
              <img src="https://landkit.goodthemes.co/assets/img/illustrations/illustration-4.png" alt="Create company" class="card-img-top">

              <!-- Shape -->
              <div class="position-relative">
                <div class="shape shape-bottom shape-fluid-x svg-shim text-white">
                  <svg viewBox="0 0 2880 480" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z" fill="currentColor"></path></svg>
                </div>
              </div>

            </div>

            <!-- Body -->
            <div class="card-body">

              <!-- Heading -->
              <h3>
                Add new company
              </h3>

              <!-- Text -->
              <p class="mb-0 text-muted">
                Add new company with few clicks in 2 minutes.
                Lorem ipsum dolor sit amet.
              </p>

            </div>

            <!-- Meta -->
            <div class="card-meta mt-auto">

              <!-- Divider -->
              <hr class="card-meta-divider">

              <router-link tag="button" to="/dashboard/create-company" type="button" class="btn btn-sm btn-outline-primary">
                Add new company
              </router-link>

            </div>
          </router-link>
        </div>

        <!-- Companies -->
        <div
          class="col-12 col-md-6 col-lg-4 d-flex"
          v-for="company in companies"
          :key="company._id"
        >
          <router-link tag="div" to="/dashboard/create-company" class="card mb-6 shadow-light-lg lift lift-lg">
            <!-- Image -->
            <div class="card-img-top">

              <!-- Image -->
              <img src="https://landkit.goodthemes.co/assets/img/photos/photo-4.jpg" alt="Company" class="card-img-top">

              <!-- Shape -->
              <div class="position-relative">
                <div class="shape shape-bottom shape-fluid-x svg-shim text-white">
                  <svg viewBox="0 0 2880 480" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z" fill="currentColor"></path></svg>
                </div>
              </div>

            </div>

            <!-- Body -->
            <div class="card-body">

              <!-- Heading -->
              <h3>
                {{company.name}}
              </h3>

              <!-- Text -->
              <p v-if="company.desc" class="mb-0 text-muted">
                {{company.desc}}
              </p>

            </div>

            <!-- Meta -->
            <div class="card-meta mt-auto">

              <!-- Divider -->
              <hr class="card-meta-divider">

              <router-link tag="button" to="/dashboard/create-company" type="button" class="btn btn-sm btn-primary">
                Show company
              </router-link>

            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Companies loader -->
    <transition tag="div" name="fade">
      <div class="local-loader" v-if="loaderVisible">
        <div class="spinner-border text-primary mb-2" role="status"></div>
        <span>Loading companies ...</span>
      </div>
    </transition>
  </section>

  <!-- Load more -->
  <section :style="{ opacity: !loaderVisible ? 1 : 0  }" class="py-7 py-md-10">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-9 col-lg-8 col-xl-7">

          <!-- Button -->
          <a href="#!" class="btn btn-block btn-outline-gray-300 d-flex align-items-center">
            <span class="mx-auto">Load more</span> <i class="fe fe-arrow-right"></i>
          </a>

        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios, { AxiosResponse } from "axios";
import { ICompanyRes } from "@/models/Company";

export default defineComponent({
  name: "Companies",
  setup() {
    const loaderVisible = ref<boolean>(true);
    const companies = ref<ICompanyRes[]>([]);

    /*
    * TODO: CALL COUNT SERVICE FOR SHOWING "LOAD MORE" BUTTON
    * TODO: THEN CREATE LIMITATION OF GETTING COMPANIES.
    * */

    /*
    * On view load call service to get all user companies
    * */
    onMounted(async () => {
      try {
        const companiesRes: AxiosResponse<ICompanyRes[]> = await axios.get("/api/company/user-companies");
        companies.value = companiesRes.data;
      } catch (e) {
        // TODO: HANDLE ERROR
        console.log(e);
      } finally {
        loaderVisible.value = false;
      }
    });

    return {
      loaderVisible,
      companies,
    };
  },
});
</script>
