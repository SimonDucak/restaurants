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
  #app-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
  }

  .local-loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
  }

  /*
    Fade in/out vue animations
  */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
