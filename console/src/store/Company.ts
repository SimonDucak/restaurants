import {
  Ref, ref, computed,
} from "vue";
import { CompanyRes, Company } from "@/resources/models/Company";
import { Menu } from "@/resources/models/Menu";

/*
* Init store reference for company
* */
export const company: Ref<CompanyRes> = ref<CompanyRes>({ ...new Company(), _id: "" });

/*
* Computed function returns company menu.
* */
export const companyMenu = computed<Menu>((): Menu => company.value.menu);
