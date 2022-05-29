import { DashboardEventKey, DashboardEventManager } from '../../communication/dashboard-event-manager';
import { Constructable } from '../../util/constructable';
import { Logger } from '../../util/logging/logger';
import { ModelDecorator } from '../manager/model-manager';
import { ModelDestroyedEvent } from './model-destroyed-event';
/**
 * Hooks up model event subscribers and publishers to the event system
 */
export declare class ModelEventInstaller implements ModelDecorator {
  private readonly dashboardEventManager;
  private readonly modelDestroyedEvent;
  private readonly logger;
  private readonly modelEventMetadata;
  private lastDeferredIndexRead;
  constructor(dashboardEventManager: DashboardEventManager, modelDestroyedEvent: ModelDestroyedEvent, logger: Logger);
  /**
   *  Hooks up model event subscribers and publishers properties in modelInstance based on
   *  those registered to modelInstance's model type
   */
  decorate(modelInstance: object): void;
  /**
   * Registers a model event. This property will be hooked into the event system as a publisher or subscriber
   * of the specified event for each model instance instantiated of this type.
   */
  registerModelEvent<T extends object>(
    modelClass: Constructable<T>,
    propertyKey: keyof T,
    eventKey: DashboardEventKey,
    type: ModelEventMetadataType
  ): void;
  /**
   * A hook to allow extended implementations to support other systems such as Dependency
   * Injection
   */
  protected resolveEventKey(providedKey: DashboardEventKey): DashboardEventKey;
  private installEventSubscriber;
  private installEventPublisher;
  private getSubscriberAsObserver;
  private isObserver;
  private getObservableForModel;
  private getPublishFunctionForModel;
  private eventKeyIsModelScoped;
  private lookupModelEvents;
  private getConstructorChain;
  private processRegistrationQueue;
}
/**
 * Registers the decorated property or method as a subscriber for the provided event key or event key provider.
 *
 * As a property, an event subscriber must be instantiated to an object that implements the RxJS `Observer` interface.
 * As a method, an event subscriber will be invoked on each `Observer.next`, and provided as an argument any data
 * included with the event.
 */
export declare function ModelEventSubscriber(event: DashboardEventKey): MethodDecorator & PropertyDecorator;
/**
 * Registers the decorated property or method as a publisher for the provided event key or event key provider.
 *
 * The property must be insantiated to an object that extends the RxJS `Observable` class.
 */
export declare function ModelEventPublisher(event: DashboardEventKey): PropertyDecorator;
/**
 * Metadata describing an event system hook on a model property
 */
export interface ModelEventMetadata {
  /**
   * Key for the referenced event
   */
  eventKey: DashboardEventKey;
  /**
   * Runtime key for the referencing model property
   */
  propertyKey: string | symbol | number;
  /**
   * Type of event system hook
   */
  type: ModelEventMetadataType;
}
/**
 * Indicates the type of event action metadata registered for a model
 */
export declare const enum ModelEventMetadataType {
  /**
   * An event subscriber
   */
  Subscriber = 0,
  /**
   * An event publisher
   */
  Publisher = 1
}
