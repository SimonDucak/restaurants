<template>
  <div class="chat">
    <!-- Chat: body -->
    <div class="chat-body">
      <!-- Chat: Header -->
      <div class="chat-header border-bottom py-4 py-lg-6 px-lg-8">
        <div class="container-xxl">

          <div class="row align-items-center">

            <!-- Close chat(mobile) -->
            <div class="col-3 d-xl-none">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <router-link tag="a" to="/" class="text-muted px-0" data-chat="open">
                    <i class="icon-md fe-chevron-left"></i>
                  </router-link>
                </li>
              </ul>
            </div>

            <!-- Chat photo -->
            <div class="col-6 col-xl-6">
              <div class="media text-center text-xl-left">
                <div class="media-body align-self-center text-truncate">
                  <h6 class="text-truncate mb-n1">Restaurant settings</h6>
                  <small class="text-muted">Update your restaurant</small>
                </div>
              </div>
            </div>

          </div><!-- .row -->

        </div>
      </div>
      <!-- Chat: Header -->

      <!-- Chat: Content-->
      <div class="chat-content px-lg-8">
        <div class="container-xxl py-6 py-lg-10">
          <ul class="nav nav-tabs mb-8">
            <li class="nav-item">
              <router-link tag="a" to="/settings/menu" class="nav-link">Restaurant menu</router-link>
            </li>
            <li class="nav-item">
              <router-link tag="a" to="/settings/users" class="nav-link">Restaurant users</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#!">Invite user</a>
            </li>
          </ul>

          <router-view></router-view>
        </div>
      </div>
      <!-- Chat: Content-->
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Settings",
});
</script>

<style lang="scss" scoped>
  .nav-item .router-link-active {
    color: #fff;
    background-color: #29242a;
    border-color: #dee2e6 #dee2e6 #29242a;
  }
</style>
