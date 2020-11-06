import { ref, Ref } from "vue";

/*
* Boolean reference if is true app loader is visible
* */
export const appLoaderVisible: Ref<boolean> = ref<boolean>(true);

/*
* Text inside app loader
* */
export const appLoaderText: Ref<string> = ref<string>("Loading ...");
