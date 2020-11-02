/*
* Returns mongoose Query from URL params.
* If URL has not any query returns empty object.
* Use try catch!
* */
export const queryBuilder = (URL: string): object => {
    const [url, ...paramsStrings]: string[] = decodeURI(URL).split("?");
    const paramsString: string = paramsStrings.join("");
    const params = paramsString.split("&");
    return params.reduce((acc: object, param: string) => {
        const [key, value] = param.split("=");
        acc[key] = value;
        return acc;
    }, {});
};
