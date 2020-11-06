import { Validator } from "@/resources/mongooseTypes";

/*
* Function accept array of validator and value. Then loop validators
* and return first invalid validator.
* If all validators are valid return null.
* */
const validate: Function = (value: any, validators: Validator[]): string => {
  let validationMessageID = "";
  for (let i = 0; i < validators.length; i += 1) {
    const validatorObj: Validator = validators[i];
    const isValid: boolean = validatorObj.validator(value);
    if (!isValid) {
      validationMessageID = validatorObj.message;
      break;
    }
  }
  return validationMessageID;
};

export default validate;
