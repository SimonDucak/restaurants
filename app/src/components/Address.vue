<template>
  <!-- City and state -->
  <div class="row">
    <div class="col-12 col-md-6">
      <div class="form-group mb-5">
        <label for="city">
          City
        </label>
        <input
          type="text"
          class="form-control"
          id="city"
          placeholder="City"
          v-model="address.city"
        >
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="form-group mb-5">
        <label for="state">
          State
        </label>
        <input
          type="text"
          class="form-control"
          id="state"
          placeholder="State"
          v-model="address.state"
        >
      </div>
    </div>
  </div>

  <!-- Street and zip -->
  <div class="row">
    <div class="col-12 col-md-6">
      <div class="form-group mb-5">
        <label for="street">
          Street
        </label>
        <input
          type="text"
          class="form-control"
          id="street"
          placeholder="Street"
          v-model="address.street"
        >
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="form-group mb-5">
        <label for="zip">
          Zip
        </label>
        <input
          type="text"
          class="form-control"
          id="zip"
          placeholder="Zip"
          v-model="address.zip"
        >
      </div>
    </div>
  </div>

  <!-- Street number -->
  <div class="row">
    <div class="col-12 col-md-6">
      <div class="form-group mb-5">
        <label for="street-number">
          Street number
        </label>
        <input
          type="text"
          class="form-control"
          id="street-number"
          placeholder="Street number"
          v-model="address.streetNumber"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Address",
  props: {
    address: {
      required: true,
      type: Object,
    },
  },
});
</script>
