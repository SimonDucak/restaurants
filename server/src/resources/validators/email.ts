/*
* Returns true if email is in the correct format
* */
export const emailFormat = (email: any): boolean => {
    if (typeof email !== "string") return false;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email)
};
