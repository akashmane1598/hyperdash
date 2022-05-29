import { UnknownConstructable } from '../../util/constructable';
import { RendererLibrary, RendererRegistrationInformation } from './renderer-registration';
export declare type DeferredRendererDecoratorRegistration = (rendererLibrary: RendererLibrary) => void;
export declare const deferredRendererDecoratorRegistrations: DeferredRendererDecoratorRegistration[];
/**
 * Registers the decorated renderer with the provided information
 */
export declare function Renderer(
  registrationInfo: RendererRegistrationInformation
): (target: UnknownConstructable) => void;
