import { DeserializationManager } from '../../../persistence/deserialization/deserialization-manager';
import { JsonPrimitive } from '../../../persistence/model-json';
import { SerializationManager } from '../../../persistence/serialization/serialization-manager';
import { ModelChangedEvent } from '../../events/model-changed-event';
import { ModelManager } from '../../manager/model-manager';
import { ModelPropertyTypeInstance, ModelPropertyTypeLibrary } from '../../property/model-property-type-library';
import { PropertyLocation } from '../../property/property-location';
import { EditorApi } from './editor-api';
/**
 * Default implementation of `EditorApi`
 */
export declare class DefaultEditorApi<TSerialized extends JsonPrimitive, TDeserialized>
  implements EditorApi<TSerialized, TDeserialized>
{
  readonly label: string;
  readonly propertyTypeInstance: ModelPropertyTypeInstance;
  private readonly model;
  private readonly validator;
  private readonly propertyLocation;
  private readonly modelChangedEvent;
  private readonly serializer;
  private readonly deserializer;
  private readonly modelManager;
  private readonly modelPropertyTypeLibrary;
  /**
   * @inheritdoc
   */
  value: TSerialized;
  constructor(
    label: string,
    propertyTypeInstance: ModelPropertyTypeInstance,
    model: object,
    validator: (value: unknown) => string | undefined,
    propertyLocation: PropertyLocation<TDeserialized>,
    modelChangedEvent: ModelChangedEvent,
    serializer: SerializationManager,
    deserializer: DeserializationManager,
    modelManager: ModelManager,
    modelPropertyTypeLibrary: ModelPropertyTypeLibrary
  );
  /**
   * @inheritdoc
   */
  validate(newSerializedValue: TSerialized): string | undefined;
  /**
   * @inheritdoc
   */
  valueChange(newSerializedValue: TSerialized): void;
  private getValue;
  private setValue;
  /**
   * @inheritdoc
   */
  serialize(value: TDeserialized): TSerialized;
  /**
   * @inheritdoc
   */
  deserialize(value: TSerialized): TDeserialized;
}
