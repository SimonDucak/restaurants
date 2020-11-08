<template>
  <div class="position-relative">
    <!-- Menu is empty -->
    <div class="card" v-if="!isMenuSectionsLocal">
      <div class="card-body">
        <h5 class="card-title">You haven't created menu yet.</h5>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button class="btn btn-primary" @click="addMenuSection">Create menu</button>
      </div>
    </div>

    <!-- New sections -->
    <button class="btn btn-success mb-8 mr-2" @click="saveMenu" v-if="isMenuSectionsLocal">Save menu</button>
    <button class="btn btn-secondary mb-8" @click="cancelChanges" v-if="isMenuSectionsLocal">Cancel changes</button>

    <div class="alert alert-danger col-12 col-md-8" role="alert" v-if="serviceError.length > 0">
      {{serviceError}}
    </div>

    <div class="alert alert-success col-12 col-md-8" role="alert" v-if="serviceSuccess.length > 0">
      {{serviceSuccess}}
    </div>

    <!-- Sections -->
    <div class="card-columns" v-if="isMenuSectionsLocal">
      <!-- Menu sections -->
      <div
        class="card mb-6 mb-lg-8 company-menu-section"
        v-for="(section, sectionIndex) in localMenu.menuSections"
        :key="sectionIndex + 1"
      >
        <label>
          <input v-model="section.name" class="clean-input clean-input-h2" type="text" placeholder="Enter section name">
        </label>
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="(item, itemIndex) in section.menuItems"
            :key="itemIndex + 1"
          >
            <div class="d-flex justify-content-between align-items-center company-menu-item">
              <div class="d-flex flex-column col-12 menu-item-detail">
                <input v-model="item.name" type="text" class="clean-input clean-input-h6" placeholder="Enter item name">
                <input v-model="item.description" type="text" class="clean-input clean-input-p" placeholder="Enter item description (optional)">
              </div>

              <div class="menu-item-price">
                <input @value="item.price" @input="item.price = +$event.target.value" type="number" class="clean-input clean-input-p" placeholder="0.00">
              </div>
            </div>

            <button @click="removeMenuItem(section, item)" v-if="section.menuItems.length > 1" type="button" class="btn btn-ico btn-danger btn-sm rounded-circle menu-item-remove">
              <i class="icon-sm fe-x"></i>
            </button>
          </li>
          <li class="list-group-item">
            <button class="btn btn-primary btn-sm mr-2" @click="addMenuItem(section)">Add new item</button>
            <button class="btn btn-secondary btn-sm" @click="removeMenuSection(section)">Remove section</button>
          </li>
        </ul>
      </div>
    </div>

    <!-- New sections -->
    <button @click="addMenuSection" class="btn btn-primary btn-sm" v-if="isMenuSectionsLocal">Add new section</button>

    <!-- Menu save loader -->
    <transition tag="div" name="fade">
      <div v-if="loaderVisible" class="local-loader">
        <div class="spinner-border text-primary mb-2" role="status"></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted, computed,
} from "vue";
import { Menu, MenuSection, MenuItem } from "@/resources/models/Menu";
import { companyMenu, company } from "@/store/Company";
import axios from "axios";
import { Company } from "@/resources/models/Company";

export default defineComponent({
  name: "Menu",
  setup() {
    const localMenu = ref<Menu>(new Menu());
    const loaderVisible = ref<boolean>(false);
    const serviceError = ref<string>("");
    const serviceSuccess = ref<string>("");

    /*
    * Computed returns true if exists any local menu section.
    * */
    const isMenuSectionsLocal = computed<boolean>((): boolean => localMenu.value.menuSections.length > 0);

    /*
    * Add menu section
    * */
    const addMenuSection: Function = (): void => {
      const newSection: MenuSection = new MenuSection();
      const newItem: MenuItem = new MenuItem();
      newSection.menuItems.push(newItem);
      localMenu.value.menuSections.push(newSection);
    };

    /*
    * Remove menu section
    * */
    const removeMenuSection: Function = (section: MenuSection): void => {
      localMenu.value.menuSections = localMenu.value.menuSections.filter((menuSection) => menuSection !== section);
    };

    /*
    * Add menu item
    * */
    const addMenuItem: Function = (section: MenuSection): void => {
      const newItem: MenuItem = new MenuItem();
      section.menuItems.push(newItem);
    };

    /*
    * Remove menu item
    * */
    const removeMenuItem: Function = (section: MenuSection, item: MenuItem): void => {
      const s = section;
      s.menuItems = s.menuItems.filter((menuItem) => menuItem !== item);
    };

    /*
    * Save menu
    * */
    const saveMenu: Function = async (): Promise<void> => {
      try {
        loaderVisible.value = true;
        serviceSuccess.value = "";
        serviceError.value = "";
        const request: Company = {
          ...company.value,
          menu: localMenu.value,
        };
        await axios.put(`/api/company/${company.value._id}`, { company: request });
        company.value.menu = JSON.parse(JSON.stringify(localMenu.value));
        serviceSuccess.value = "Company menu was successfully updated.";
        setTimeout(() => {
          serviceSuccess.value = "";
        }, 2000);
        loaderVisible.value = false;
      } catch (e) {
        serviceSuccess.value = "";
        serviceError.value = e.response.data.message;
        window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
      } finally {
        loaderVisible.value = false;
      }
    };

    /*
    * Cancel changes
    * */
    const cancelChanges: Function = (): void => {
      localMenu.value = JSON.parse(JSON.stringify(companyMenu.value));
    };

    /*
    * On mounted this view copy menu from store to localMenu
    * */
    onMounted((): void => {
      localMenu.value = JSON.parse(JSON.stringify(companyMenu.value));
    });

    return {
      localMenu,
      isMenuSectionsLocal,
      loaderVisible,
      serviceError,
      serviceSuccess,
      addMenuSection,
      removeMenuSection,
      addMenuItem,
      removeMenuItem,
      saveMenu,
      cancelChanges,
    };
  },
});
</script>

<style lang="scss" scoped>
  .company-menu-section {
    border: none;
    .company-menu-item {
      width: calc(100% - 100px);
      .menu-item-detail {
        padding-left: 0;
      }
      .menu-item-price {
        min-width: 100px;
        input {
          width: 100%;
          min-width: unset;
          text-align: right;
        }
      }
    }
    .menu-item-remove {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 6px;
      transform: translate(12px, 10px);
      i {
        transform: translate(-53%,-50%) scale(0.7);
        transform-origin: center;
      }
    }
  }

  input[type='number'] {
    -moz-appearance:textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>
