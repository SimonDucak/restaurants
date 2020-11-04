/*
* Returns true if zip is in the correct format
* */
export const zipFormat = (value: any): boolean => {
    if (typeof value !== "string") return false;
    const regex1 = /[0-9]{3} [0-9]{2}$/;
    const regex2 = /[0-9]{5}$/;
    let valid: boolean = true;
    if (!regex1.test(value) && !regex2.test(value)) valid = false;
    return valid;
};
