import { ResolveDictionary } from '../variable-dictionary';
/**
 * Provides an evaluator for re-evaluating the same variable string
 * against different variable values.
 */
export declare class VariableEvaluator<T = unknown> {
  private readonly variableString;
  private readonly parser;
  private readonly variableNamesFromLastEvaluate;
  constructor(variableString: string);
  /**
   * Does the evaluation, using the provided dictionary to perform any variable lookups
   */
  evaluate(dictionary: ResolveDictionary): EvaluationResult<T>;
  /**
   * Returns result indicating state before evaluation ocurred
   */
  unevaluate(): EvaluationResult<string>;
  private convertNodeToValue;
  private convertRootNodeToValue;
  private convertEscapedCharacterToValue;
  private convertTextToValue;
  private convertExpressionToValue;
  private mapAndJoinChildren;
  private combineErrors;
}
/**
 * The results of evaluating a particular expression
 */
export interface EvaluationResult<T> {
  /**
   * The resolved value of the evaluation
   */
  value?: T;
  /**
   * Any errors resulting from evaluation
   */
  error?: string;
  /**
   * Variable names used that were not used in the previous evaluation
   */
  variableNamesAdded: string[];
  /**
   * Variable names which were not used in this evaluation, but were on the previous evaluation
   */
  variableNamesRemoved: string[];
}
