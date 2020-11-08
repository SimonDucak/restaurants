<template>
  <div class="position-relative pb-10">
    <ul class="list-group list-group-flush">
      <!-- Member -->
      <li class="list-group-item py-6 user-item">

        <div class="media align-items-center">
          <div class="avatar avatar-sm mr-5 d-flex align-items-center justify-content-center font-medium">
            S
          </div>
          <div class="media-body">
            <h6 class="mb-0"><a href="#" class="text-reset">Anna Bridges</a></h6>
            <small class="text-muted">Online</small>
          </div>

          <div class="align-self-center ml-5">
            <div class="dropdown user-dropdown">
              <a href="#" class="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fe-more-vertical"></i>
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item d-flex align-items-center" href="#">
                  Change to admin <span class="ml-2 fe-trending-up"></span>
                </a>
                <a class="dropdown-item d-flex align-items-center" href="#">
                  Change to waiter <span class="ml-2 fe-trending-down"></span>
                </a>
                <a class="dropdown-item d-flex align-items-center" href="#">
                  Delete user <span class="ml-2 fe-user-x"></span>
                </a>
              </div>
            </div>
            <div class="d-flex user-panel">
              <select class="form-control form-control-sm col-6 col-md-3 mr-2" style="min-width: 150px;">
                <option value="WAITER">WAITER</option>
                <option value="ADMIN">ADMIN</option>
              </select>

              <button type="button" class="btn btn-sm btn-ico btn-danger">
                <i class="fe-x"></i>
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <!-- Menu save loader -->
    <transition tag="div" name="fade">
      <div v-if="loaderVisible" class="local-loader">
        <div class="spinner-border text-primary mb-2" role="status"></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Users",
  setup() {
    const loaderVisible = ref<boolean>(false);

    return {
      loaderVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
  .user-item {
    .user-dropdown { display: none!important; }
    @media (max-width: 768px) {
      .user-panel { display: none!important; }
      .user-dropdown { display: block!important; }
    }
  }
</style>
