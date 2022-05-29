import { VariableValue } from './value/variable-value';
export declare type VariableDictionary = Map<string, VariableValue<unknown>>;
/**
 * A dictionary used for resolving a variable
 */
export interface ResolveDictionary {
  [key: string]: unknown;
}
