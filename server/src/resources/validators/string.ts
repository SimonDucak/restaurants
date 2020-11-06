/*
* Returns true if string length is equal or greater than min param.
* */
export const minLength = (value: any, min: number): boolean => {
  if (typeof value !== "string") return false;
  return value.length >= min;
};

/*
* Returns true if string is not empty
* */
export const requiredString = (value: any): boolean => {
  if (typeof value !== "string") return false;
  return value.length > 0;
};
