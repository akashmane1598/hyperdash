import { ModelJson } from '../persistence/model-json';
/**
 * A theme describing how to style a specific model.
 */
export declare class Theme {
  /**
   * Background color. Accessible via key `background-color`.
   */
  backgroundColor?: string;
  /**
   * Text color. Accessible via key `text-color`.
   */
  textColor?: string;
}
/**
 * A JSON object representing a model with associated theme JSON
 */
export interface ModelJsonWithTheme extends ModelJson {
  /**
   * Theme JSON
   */
  theme: ModelJson;
}
export declare type MergedTheme<T extends Theme> = Required<T>;
