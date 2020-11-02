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
  <section class="pt-4 pt-md-4 pb-8 pb-md-14">
    <div class="container">
      <div class="row">
        <div class="col-12">

          <div class="card card-border border-primary shadow-light-lg">
            <div class="card-body">

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
                    <button type="submit" class="btn btn-primary mb-6 mb-md-0 lift mr-2">
                      Add company
                    </button>
                    <router-link tag="button" to="/dashboard" class="btn btn-primary-soft">Go back</router-link>
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
import axios from "axios";
import Company from "@/models/Company";
import Address from "@/components/Address.vue";

export default defineComponent({
  name: "CreateCompany",
  components: {
    Address,
  },
  setup() {
    const company = ref<Company>(new Company());

    const addCompany: Function = async (): Promise<void> => {
      try {
        /*
        * TODO: REFACTOR REQUEST AND REDIRECT TO COMPANY SETTINGS
        * */
        const req: any = company.value;
        req.users = undefined;
        req.tables = undefined;
        req.orders = undefined;
        req.subscriptionExpiredDate = undefined;
        req.subscriptionType = undefined;
        await axios.post("/api/company", { company: req });
      } catch (e) {
        // TODO: HANDLE ERROR
        console.log(e);
      }
    };

    return {
      company,
      addCompany,
    };
  },
});
</script>
