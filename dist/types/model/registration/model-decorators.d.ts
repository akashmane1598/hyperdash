import { ObjectConstructable } from '../../util/constructable';
import { ModelLibrary, ModelPropertyRegistrationInformation, ModelRegistrationInformation } from './model-registration';
export declare type DeferredModelDecoratorRegistration = (modelLibrary: ModelLibrary) => void;
export declare const deferredModelDecoratorRegistrations: DeferredModelDecoratorRegistration[];
/**
 * Registers the decorated model with the provided information
 */
export declare function Model(registrationInfo: ModelRegistrationInformation): (target: ObjectConstructable) => void;
/**
 * Registers the decorated property with the containing model
 */
export declare function ModelProperty(registrationInfo: ModelPropertyRegistrationInformation): PropertyDecorator;
