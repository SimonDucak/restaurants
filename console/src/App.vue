<template>
  <router-view />
  <!-- App loader -->
  <transition tag="div" name="fade">
    <div id="app-loader" v-if="appLoaderVisible">
      <div class="spinner-border text-primary mb-2" role="status"></div>
      <span>{{appLoaderText}}</span>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { appLoaderVisible, appLoaderText } from "@/store/App";

export default defineComponent({
  name: "App",
  setup() {
    /*
    * Hide loader if app is loaded.
    * */
    onMounted(() => {
      appLoaderVisible.value = false;
    });

    return {
      appLoaderVisible,
      appLoaderText,
    };
  },
});
</script>

<style lang="scss">
  /*
   * App loader/spinner
   */
  #app-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #29242a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
  }

  /*
   * Local spinner wrap to any element
   */
  .local-loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #29242a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
  }

  /*
   * Form group validations
   */
  .form-group {
    .is-invalid, .is-valid {
      border-width: 0;
      background-image: unset;
    }

    .invalid-feedback {
      display: none;
      .feedback-item {
        display: none;
        &.show-feedback { display: block; }
      }
    }

    &.dirty-input {
      .invalid-feedback { display: block; }
      .is-invalid, .is-valid { border-width: 1px; }
      .is-valid {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2342ba96' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
      }
    }
  }

  .form-check-input.is-invalid~.form-check-label, .was-validated .form-check-input:invalid~.form-check-label {
    color: #a7a7a7;
  }
  .form-check {
    &.dirty-input {
      .form-check-input.is-invalid~.form-check-label, .was-validated .form-check-input:invalid~.form-check-label {
        color: #dc3545;
      }
    }
  }

  /*
   * Disable autocomplete background in inputs
   */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px #2d3238 inset!important;
    -webkit-text-fill-color: #a7a7a7!important;
  }

  /*
   * Remove cross from in-valid inputs
   */
  .form-control.is-invalid, .was-validated .form-control:invalid {
    background-image: none!important;
  }

  /*
   * Fade in/out vue animations
   */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
