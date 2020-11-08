import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export interface Validator {
    validator: (value: any) => boolean;
    message: string;
}

/*
* Params has every Schema property
* */
interface SchemaProperty {
    required: boolean;
    validate?: Validator[];
    unique?: boolean;
    enum?: readonly string[];
}

/*
* String schema property must have type as string constructor
* and default value must be a string.
* */
export interface StringSchemaProperty extends SchemaProperty {
    type: StringConstructor;
    default?: string;
}

/*
* Number schema property must have type as number constructor
* and default value must be a number.
* */
export interface NumberSchemaProperty extends SchemaProperty {
    type: NumberConstructor;
    default?: number;
}

/*
* Boolean schema property must have type as boolean constructor
* and default value must be a boolean.
* */
export interface BooleanSchemaProperty extends SchemaProperty {
    type: BooleanConstructor;
    default?: boolean;
}

/*
* Date schema property must have type as date constructor
* and default value must be a date.
* */
export interface DateSchemaProperty extends SchemaProperty {
    type: DateConstructor;
    default?: Date | number;
}

/*
* Object schema property must have type as object constructor
* and default value must be a object.
* */
export interface ObjectSchemaProperty<T> extends SchemaProperty {
    type: ObjectConstructor;
    default?: T;
}

/*
* Object ID schema 1:N relationship schema property
* */
export interface ObjectIDSchemaProperty {
    type: typeof ObjectId;
    ref: string;
}

