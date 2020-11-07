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
                  <h6 class="text-truncate mb-n1">Profile</h6>
                  <small class="text-muted">Update your profile details</small>
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

          <!-- Accordion -->
          <div class="accordion modified-accordion mb-n6 mb-lg-8" id="profile-settings">
            <div class="card-columns">
              <!-- Card -->
              <div class="card mb-6 mb-lg-8">
                <div class="card-header position-relative">
                  <div  class="text-reset d-block stretched-link collapsed">
                    <div class="row no-gutters align-items-center">
                      <!-- Title -->
                      <div class="col">
                        <h5>Account</h5>
                        <p>Update your profile details.</p>
                      </div>

                      <!-- Icon -->
                      <div class="col-auto">
                        <i class="text-muted icon-md fe-user"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="profile-settings-account" class="collapse show" data-parent="#profile-settings">
                  <div class="card-body">
                    <div class="alert alert-danger" role="alert" v-if="profileServiceError.length > 0">
                      {{profileServiceError}}
                    </div>

                    <div class="alert alert-success" role="alert" v-if="profileServiceSuccess.length > 0">
                      {{profileServiceSuccess}}
                    </div>

                    <form id="profile-form" @submit.prevent="updateProfile">

                      <!-- Forename -->
                      <div class="form-group" v-validate="profileErrors">
                        <label for="forename" class="sr-only">Forename</label>
                        <input v-model="profileUser.forename" type="text" class="form-control form-control-lg" id="forename" placeholder="Enter your forename">
                        <div class="invalid-feedback">
                          <div class="feedback-item" id="USER_FORENAME_0">Forename is required field.</div>
                          <div class="feedback-item" id="USER_FORENAME_1">Enter least two letters.</div>
                        </div>
                      </div>

                      <!-- Surname -->
                      <div class="form-group" v-validate="profileErrors">
                        <label for="surname" class="sr-only">Surname</label>
                        <input v-model="profileUser.surname" type="text" class="form-control form-control-lg" id="surname" placeholder="Enter your surname">
                        <div class="invalid-feedback">
                          <div class="feedback-item" id="USER_SURNAME_0">Surname is required field.</div>
                          <div class="feedback-item" id="USER_SURNAME_1">Enter least two letters.</div>
                        </div>
                      </div>

                      <button class="btn btn-lg btn-primary btn-block" type="submit" v-show-errors="'profile-form'">Update profile</button>
                    </form>

                    <!-- Profile update loader -->
                    <transition tag="div" name="fade">
                      <div v-if="profileLoaderVisible" class="local-loader">
                        <div class="spinner-border text-primary mb-2" role="status"></div>
                      </div>
                    </transition>
                  </div>
                </div><!-- .collapse -->
              </div>

              <!-- Card -->
              <div class="card mb-6 mb-lg-8">
                <div class="card-header position-relative">
                  <a href="#" class="text-reset d-block stretched-link collapsed" data-toggle="collapse" data-target="#profile-settings-security" aria-expanded="true" aria-controls="profile-settings-security">
                    <div class="row no-gutters align-items-center">
                      <!-- Title -->
                      <div class="col">
                        <h5>Security</h5>
                        <p>Update your password.</p>
                      </div>

                      <!-- Icon -->
                      <div class="col-auto">
                        <i class="text-muted icon-md fe-shield"></i>
                      </div>
                    </div>
                  </a>
                </div>

                <div id="profile-settings-security" class="collapse show" data-parent="#profile-settings">
                  <div class="card-body">
                    <div class="alert alert-danger" role="alert" v-if="securityServiceError.length > 0">
                      {{securityServiceError}}
                    </div>

                    <div class="alert alert-success" role="alert" v-if="securityServiceSuccess.length > 0">
                      {{securityServiceSuccess}}
                    </div>

                    <form id="security-form" @submit.prevent="updatePassword">
                      <!-- Password -->
                      <div class="form-group" v-validate="securityErrors">
                        <label for="current-password" class="sr-only">Current password</label>
                        <input v-model="currentPassword" type="password" class="form-control form-control-lg" id="current-password" placeholder="Enter your current password.">
                        <div class="invalid-feedback">
                          <div class="feedback-item" id="USER_CURRENT_PASSWORD_0">Password is required field.</div>
                        </div>
                      </div>

                      <!-- Password -->
                      <div class="form-group" v-validate="securityErrors">
                        <label for="password" class="sr-only">New password</label>
                        <input v-model="newPassword" type="password" class="form-control form-control-lg" id="password" placeholder="Enter your new password">
                        <div class="invalid-feedback">
                          <div class="feedback-item" id="USER_PASSWORD_0">Password is required field.</div>
                          <div class="feedback-item" id="USER_PASSWORD_1">Enter least six letters.</div>
                        </div>
                      </div>

                      <!-- Repeat password -->
                      <div class="form-group" v-validate="securityErrors">
                        <label for="repeat-password" class="sr-only">Password</label>
                        <input v-model="repeatPassword" type="password" class="form-control form-control-lg" id="repeat-password" placeholder="Repeat password">
                        <div class="invalid-feedback">
                          <div class="feedback-item" id="USER_REPEAT_PASSWORD_0">Passwords don't match.</div>
                        </div>
                      </div>

                      <button class="btn btn-lg btn-primary btn-block" type="submit" v-show-errors="'security-form'">
                        Change Password
                      </button>
                    </form>

                    <!-- Password update loader -->
                    <transition tag="div" name="fade">
                      <div v-if="securityLoaderVisible" class="local-loader">
                        <div class="spinner-border text-primary mb-2" role="status"></div>
                      </div>
                    </transition>
                  </div>
                </div><!-- .collapse -->

              </div>
            </div>
          </div>
          <!-- Accordion -->
        </div>
      </div>
      <!-- Chat: Content -->
    </div>
    <!-- Chat: body -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent, Ref, ref, onMounted,
  computed, ComputedRef,
} from "vue";
import { User, UserUpdatePasswordRequest } from "@/resources/models/User";
import { user } from "@/store/User";
import validate from "@/validator/";
import userSchema from "@/resources/schemas/userSchema";
import axios from "axios";

export default defineComponent({
  name: "Profile",
  setup() {
    // Profile data
    const profileUser: Ref<User> = ref<User>(new User());
    const profileLoaderVisible: Ref<boolean> = ref<boolean>(false);
    const profileServiceError: Ref<string> = ref<string>("");
    const profileServiceSuccess: Ref<string> = ref<string>("");
    // Security data
    const currentPassword: Ref<string> = ref<string>("");
    const newPassword: Ref<string> = ref<string>("");
    const repeatPassword: Ref<string> = ref<string>("");
    const securityLoaderVisible: Ref<boolean> = ref<boolean>(false);
    const securityServiceError: Ref<string> = ref<string>("");
    const securityServiceSuccess: Ref<string> = ref<string>("");

    /*
    * Profile update validations
    * */
    const profileErrors: ComputedRef<string[]> = computed<string[]>(() => {
      const profileData = profileUser.value;
      const { forename, surname } = userSchema;
      const errors: Array<string> = [];
      // Forename
      errors.push(validate(profileData.forename, typeof forename !== "string" ? forename.validate : []));
      // Surname
      errors.push(validate(profileData.surname, typeof surname !== "string" ? surname.validate : []));
      return errors.filter((err) => !!err);
    });

    /*
    * Update profile method.
    * Trigger service if user forename or surname is different as in store
    * */
    const updateProfile: Function = async (): Promise<void> => {
      try {
        const { forename, surname } = profileUser.value;
        const isDifferent = forename !== user.value.forename || surname !== user.value.surname;
        if (!isDifferent) {
          profileServiceSuccess.value = "";
          profileServiceError.value = "Surname and forename are same as before. For update please change it.";
        }
        if (isDifferent && profileErrors.value.length === 0) {
          profileServiceError.value = "";
          profileLoaderVisible.value = true;
          await axios.put("/api/user/profile-update", { user: profileUser.value });
          profileServiceSuccess.value = "Profile data was updated.";
          user.value.forename = forename;
          user.value.surname = surname;
        }
      } catch (e) {
        profileServiceSuccess.value = "";
        profileServiceError.value = e.response.data.message;
        window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
      } finally {
        profileLoaderVisible.value = false;
      }
    };

    /*
    * Password update validations
    * */
    const securityErrors: ComputedRef<string[]> = computed<string[]>(() => {
      const { password } = userSchema;
      const errors: Array<string> = [];
      // Current password
      if (!currentPassword.value) errors.push("USER_CURRENT_PASSWORD_0");
      // New password
      errors.push(validate(newPassword.value, typeof password !== "string" ? password.validate : []));
      // Repeat password
      if (!newPassword.value || newPassword.value !== repeatPassword.value) errors.push("USER_REPEAT_PASSWORD_0");
      return errors.filter((err) => !!err);
    });

    /*
    * Update password method
    * */
    const updatePassword: Function = async (): Promise<void> => {
      try {
        if (securityErrors.value.length === 0) {
          securityServiceError.value = "";
          securityLoaderVisible.value = true;
          const updatePasswordReg: UserUpdatePasswordRequest = { password: currentPassword.value, newPassword: newPassword.value };
          await axios.put("/api/user/password-update", updatePasswordReg);
          securityServiceSuccess.value = "Password was updated.";
        }
      } catch (e) {
        securityServiceSuccess.value = "";
        securityServiceError.value = e.response.data.message;
        window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
      } finally {
        securityLoaderVisible.value = false;
      }
    };

    /*
    * On mounted profile view get data user forename and surname from store.
    * */
    onMounted((): void => {
      const { forename, surname } = user.value;
      profileUser.value.forename = forename;
      profileUser.value.surname = surname;
    });

    return {
      securityLoaderVisible,
      securityServiceError,
      securityServiceSuccess,
      profileUser,
      profileErrors,
      profileLoaderVisible,
      profileServiceError,
      profileServiceSuccess,
      securityErrors,
      currentPassword,
      newPassword,
      repeatPassword,
      updateProfile,
      updatePassword,
    };
  },
});
</script>
