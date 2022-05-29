import { UnknownConstructable } from '../../util/constructable';
import { Logger } from '../../util/logging/logger';
/**
 * Renderer Library allows rendererer classes to be associated with model classes
 */
export declare class RendererLibrary {
  private readonly logger;
  private readonly rendererMetadata;
  private lastDeferredIndexRead;
  private currentlyProcessingDeferred;
  constructor(logger: Logger);
  /**
   * Registers the provided render class to a given model class. No action is taken if that
   * model already has a renderer.
   */
  registerRendererClass(
    rendererClass: UnknownConstructable,
    registrationInformation: RendererRegistrationInformation
  ): void;
  /**
   * Retrieves the renderer class associated with the provided model class. Returns
   * undefined if the model class has not been registered to a renderer.
   */
  lookupRenderer(modelClass: UnknownConstructable): UnknownConstructable | undefined;
  /**
   * Returns true if `modelClass` has a renderer, false otherwise.
   */
  hasRenderer(modelClass: UnknownConstructable): boolean;
  private processRegistrationQueue;
}
/**
 * Describes a model renderer
 */
export interface RendererRegistrationInformation {
  /**
   * The model class this renderer is associated with
   */
  modelClass: UnknownConstructable;
}
