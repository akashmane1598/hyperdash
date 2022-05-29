import { ModelPropertyTypeInstance, PropertyValidatorFunction } from '../model-property-type-library';
export declare const STRING_PROPERTY: Readonly<{
  type: string;
  validator: PropertyValidatorFunction;
}>;
export declare const NUMBER_PROPERTY: Readonly<{
  type: string;
  validator: PropertyValidatorFunction;
}>;
export declare const BOOLEAN_PROPERTY: Readonly<{
  type: string;
  validator: PropertyValidatorFunction;
}>;
export declare const PLAIN_OBJECT_PROPERTY: Readonly<{
  type: string;
  validator: (
    value: unknown,
    allowUndefinedOrNull: boolean,
    propertyType: ModelPropertyTypeInstance
  ) => string | undefined;
}>;
export declare const UNKNOWN_PROPERTY: Readonly<{
  type: string;
  validator: (value: unknown, allowUndefinedOrNull: boolean) => string | undefined;
}>;
