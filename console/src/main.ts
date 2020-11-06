import { createApp, DirectiveBinding } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router).mount("#app");

/*
* Hide or show validation messages in input.
* Returns true if input is valid.
* */
const validateInput: Function = (codes: string[], input: HTMLInputElement, elements: HTMLCollectionOf<Element>): boolean => {
  const inputValidationCodes: string[] = [];
  for (let i = 0; i < elements.length; i += 1) {
    const element: Element = elements[i];
    const { id } = element;
    if (codes.some((code) => code === id)) {
      inputValidationCodes.push(id);
      element.classList.add("show-feedback");
    } else element.classList.remove("show-feedback");
  }
  if (inputValidationCodes.length > 0) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  return true;
};

/*
* Validation directive.
* Function find element then find invalid-feedback validations codes
* and then compare with current form validators codes if is match
* show validation message
* */
app.directive("validate", {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // Get elements
    const input: HTMLInputElement = el.getElementsByTagName("input")[0];
    const validationHolder: Element = el.getElementsByClassName("invalid-feedback")[0];
    const validationsMessages: HTMLCollectionOf<Element> = validationHolder.getElementsByClassName("feedback-item");
    // Get current error codes
    const errorCodes = binding.value;
    // Validate input
    validateInput(errorCodes, input, validationsMessages);
    // Add blur event to input element. On blue set dirty to true.
    input.addEventListener("blur", () => {
      el.classList.add("dirty-input");
    });
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    // Get elements
    const input: HTMLInputElement = el.getElementsByTagName("input")[0];
    const validationHolder: Element = el.getElementsByClassName("invalid-feedback")[0];
    const validationsMessages: HTMLCollectionOf<Element> = validationHolder.getElementsByClassName("feedback-item");
    // Get current error codes
    const errorCodes = binding.value;
    // Validate input
    validateInput(errorCodes, input, validationsMessages);
    // Add blur event to input element. On blue set dirty to true.
    input.addEventListener("blur", () => {
      el.classList.add("dirty-input");
    });
  },
});

/*
* Show errors in specific form
* */
app.directive("show-errors", {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const formID: string = binding.value;
    const form: HTMLElement | null = document.getElementById(formID);
    el.addEventListener("click", () => {
      if (form) {
        const errorGroups: NodeListOf<Element> = form.querySelectorAll(".form-group,.form-check");
        for (let i = 0; i < errorGroups.length; i += 1) {
          const group: Element = errorGroups[i];
          group.classList.add("dirty-input");
        }
      }
    });
  },
});

export default app;
