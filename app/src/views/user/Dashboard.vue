<template>
  <div>
    <!-- Dashboard header -->
    <header class="bg-dark pt-6 pb-6 d-none d-md-block">
      <div class="container-md">
        <div class="row align-items-center">
          <div class="col">

            <!-- Heading -->
            <h1 class="font-weight-bold text-white mb-2">
              Welcome {{user.forename}} {{user.surname}}
            </h1>

            <!-- Text -->
            <p class="font-size-lg text-white-75 mb-0">
              We are happy for your return.
            </p>

          </div>
          <div class="col-auto">

            <!-- Button -->
            <!--
              TODO: LOG OUT FUNCTIONALITY MISSING
            -->
            <button class="btn btn-sm btn-gray-300-20">
              Log Out
            </button>

          </div>
        </div>
      </div>
    </header>

    <!-- Dashboard Breadcrumb -->
    <nav class="bg-gray-200">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <ol class="breadcrumb breadcrumb-scroll">
              <li class="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>

              <li class="breadcrumb-item active" aria-current="page">
                Companies
              </li>
            </ol>
          </div>
        </div>
      </div>
    </nav>

    <!-- Dashboard views -->
    <router-view></router-view>

    <!-- Shape -->
    <div class="position-relative">
      <div class="shape shape-bottom shape-fluid-x svg-shim text-gray-200">
        <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"></path></svg>
      </div>
    </div>

    <!-- Footer -->
    <footer class="py-8 py-md-11 bg-gray-200">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4 col-lg-3">

            <!-- Brand -->
            <img src="https://landkit.goodthemes.co/assets/img/brand.svg" alt="..." class="footer-brand img-fluid mb-2">

            <!-- Text -->
            <p class="text-gray-700 mb-2">
              A better way to build.
            </p>

            <!-- Social -->
            <ul class="list-unstyled list-inline list-social mb-6 mb-md-0">
              <li class="list-inline-item list-social-item mr-3">
                <a href="#!" class="text-decoration-none">
                  <img src="https://landkit.goodthemes.co/assets/img/icons/social/instagram.svg" class="list-social-icon" alt="...">
                </a>
              </li>
              <li class="list-inline-item list-social-item mr-3">
                <a href="#!" class="text-decoration-none">
                  <img src="https://landkit.goodthemes.co/assets/img/icons/social/facebook.svg" class="list-social-icon" alt="...">
                </a>
              </li>
              <li class="list-inline-item list-social-item mr-3">
                <a href="#!" class="text-decoration-none">
                  <img src="https://landkit.goodthemes.co/assets/img/icons/social/twitter.svg" class="list-social-icon" alt="...">
                </a>
              </li>
              <li class="list-inline-item list-social-item">
                <a href="#!" class="text-decoration-none">
                  <img src="https://landkit.goodthemes.co/assets/img/icons/social/pinterest.svg" class="list-social-icon" alt="...">
                </a>
              </li>
            </ul>

          </div>
          <div class="col-6 col-md-4 col-lg-2">

            <!-- Heading -->
            <h6 class="font-weight-bold text-uppercase text-gray-700">
              Products
            </h6>

            <!-- List -->
            <ul class="list-unstyled text-muted mb-6 mb-md-8 mb-lg-0">
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Page Builder
                </a>
              </li>
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  UI Kit
                </a>
              </li>
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Styleguide
                </a>
              </li>
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#!" class="text-reset">
                  Changelog
                </a>
              </li>
            </ul>

          </div>
          <div class="col-6 col-md-4 col-lg-2">

            <!-- Heading -->
            <h6 class="font-weight-bold text-uppercase text-gray-700">
              Services
            </h6>

            <!-- List -->
            <ul class="list-unstyled text-muted mb-6 mb-md-8 mb-lg-0">
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Documentation
                </a>
              </li>
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Changelog
                </a>
              </li>
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Pagebuilder
                </a>
              </li>
              <li>
                <a href="#!" class="text-reset">
                  UI Kit
                </a>
              </li>
            </ul>

          </div>
          <div class="col-6 col-md-4 offset-md-4 col-lg-2 offset-lg-0">

            <!-- Heading -->
            <h6 class="font-weight-bold text-uppercase text-gray-700">
              Connect
            </h6>

            <!-- List -->
            <ul class="list-unstyled text-muted mb-0">
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Page Builder
                </a>
              </li>
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  UI Kit
                </a>
              </li>
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Styleguide
                </a>
              </li>
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Documentation
                </a>
              </li>
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Changelog
                </a>
              </li>
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#!" class="text-reset">
                  Changelog
                </a>
              </li>
            </ul>

          </div>
          <div class="col-6 col-md-4 col-lg-2">

            <!-- Heading -->
            <h6 class="font-weight-bold text-uppercase text-gray-700">
              Legal
            </h6>

            <!-- List -->
            <ul class="list-unstyled text-muted mb-0">
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Documentation
                </a>
              </li>
              <li class="mb-3">
                <a href="#!" class="text-reset">
                  Changelog
                </a>
              </li>
              <li>
                <a href="#!" class="text-reset">
                  Pagebuilder
                </a>
              </li>
            </ul>

          </div>
        </div> <!-- / .row -->
      </div> <!-- / .container -->
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { user } from "@/store/User";

export default defineComponent({
  name: "Dashboard",
  setup() {
    return {
      user,
    };
  },
});
</script>
