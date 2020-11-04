<template>
  <!-- Header -->
  <section class="pt-8 pt-md-11">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12 col-md">

          <!-- Link -->
          <router-link to="/dashboard" tag="a" class="font-weight-bold font-size-sm text-decoration-none mb-3">
            <i class="fe fe-arrow-left mr-3"></i> All companies
          </router-link>

          <!-- Heading -->
          <h1 class="display-4 mb-2">
            Add new company
          </h1>

          <!-- Text -->
          <p class="font-size-lg text-gray-700 mb-5 mb-md-0">
            Write our form is just 2 minutes.
          </p>

        </div>
      </div>
      <div class="row">
        <div class="col-12">

          <!-- Divider -->
          <hr class="my-6 my-md-8 border-gray-300">

        </div>
      </div>
    </div>
  </section>
  <!-- Form -->
  <section id="create-company-form" class="pt-4 pt-md-4 pb-8 pb-md-14">
    <div class="container">
      <div class="row">
        <div class="col-12">

          <div
            class="card card-border border-primary shadow-light-lg"
            :class="{
              'border-primary': !error,
              'border-warning': error,
            }"
          >
            <div class="card-body">
              <div v-if="error" class="alert alert-warning" role="alert">
                {{error}}
              </div>

              <!-- Form -->
              <form @submit.prevent="addCompany">
                <!-- Company name -->
                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="form-group mb-5">
                      <label for="company-name">
                        Company name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="company-name"
                        placeholder="Company name"
                        v-model="company.name"
                      >
                    </div>
                  </div>
                </div>

                <!-- Address -->
                <Address :address="company.address"></Address>

                <!-- Company description -->
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-5">
                      <label for="company-description">
                        Company description (optional)
                      </label>
                      <textarea
                        id="company-description"
                        rows="5"
                        class="form-control"
                        placeholder="Write description of company"
                        v-model="company.desc"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Submit -->
                <div class="row align-items-center">
                  <div class="col-12 col-md">
                    <div class="align-items-center d-flex">
                      <button type="submit" class="btn btn-primary mb-6 mb-md-0 lift mr-2">
                        Add company
                      </button>

                      <div v-if="loading" class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
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
import Company, { ICompanyReq, ICompanyRes } from "@/models/Company";
import Address from "@/components/Address.vue";
import { useRouter, Router } from "vue-router";

export default defineComponent({
  name: "CreateCompany",
  components: {
    Address,
  },
  setup() {
    const company = ref<Company>(new Company());
    const error = ref<string>("");
    const loading = ref<boolean>(false);
    const router: Router = useRouter();

    /*
    * Add new company to DB
    * If company added successfully redirect to company settings
    * else scroll to error.
    * */
    const addCompany: Function = async (): Promise<void> => {
      try {
        loading.value = true;
        const {
          name, address, desc, menu, tables,
        } = company.value;
        const req: ICompanyReq = {
          name, address, desc, menu, tables,
        };
        const addedCompany: AxiosResponse<ICompanyRes> = await axios.post("/api/company", { company: req });
        router.push(`/dashboard/company/${addedCompany.data._id}`);
      } catch (e) {
        error.value = e.response.data.message;
        const form: HTMLElement | null = document.getElementById("create-company-form");
        if (form) form.scrollIntoView({ behavior: "smooth" });
      } finally {
        loading.value = false;
      }
    };

    return {
      company,
      error,
      loading,
      addCompany,
    };
  },
});
</script>
