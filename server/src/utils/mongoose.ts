import { SchemaDefinition, SchemaTypeOpts } from "mongoose";

export interface IExtendedSchemaTypeOpts<T> extends SchemaTypeOpts<T> {
    secret?: boolean;
}

/*
* Returns secret key names of schema
* */
export const getSecretKeys: Function = (schemaDefinition: SchemaDefinition): string[] => {
    const foundKeys: string[] = [];
    // Loop through schema and try find secret key
    JSON.parse(JSON.stringify(schemaDefinition), (key: string, value: IExtendedSchemaTypeOpts<any>) => {
        // Value is Object
        if (!!value && typeof value === "object") {
            // If inside object is secret property return push key to foundKeys variable.
            if (value.secret) foundKeys.push(key);
        }
        return value;
    });
    return foundKeys;
};

/*
* Sanitize request - remove all secret values
* */
export const sanitizeRequest: Function = <T>(req: T, secretKeys: string[]): any => {
    return JSON.parse(JSON.stringify(req), (key: string, value: any) => {
       if (secretKeys.some((secretKey) => secretKey === key)) return undefined;
       return value;
    });
};
