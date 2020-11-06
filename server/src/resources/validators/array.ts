/*
* Returns boolean if value is in Array of string
* Function compare only string with strings array.
* */
export const someStringArray: Function = (value: any, enumeration: string[]): boolean => {
    if (typeof value !== "string") return false;
    return enumeration.some((item) => item === value);
};
