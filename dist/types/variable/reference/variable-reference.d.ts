import { Subscription } from 'rxjs';
import { PropertyLocation } from '../../model/property/property-location';
import { EvaluationResult } from '../evaluator/variable-evaluator';
import { ResolveDictionary } from '../variable-dictionary';
/**
 * A reference to one or more variables at a specific location.
 */
export declare class VariableReference<T = unknown> {
  readonly location: PropertyLocation<T>;
  readonly autoCleanupSubscription: Subscription;
  private readonly evaluator;
  constructor(variableString: string, location: PropertyLocation<T>, autoCleanupSubscription: Subscription);
  /**
   * Using the provided dictionary, assigns the location with the resolved variable(s).
   */
  resolve(dictionary: ResolveDictionary): EvaluationResult<T>;
  /**
   * Returns the original variable expression value. Does not assign it.
   */
  unresolve(): EvaluationResult<string>;
}
