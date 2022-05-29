import { DeserializationManager } from '../../../persistence/deserialization/deserialization-manager';
import { JsonPrimitive, ModelJson } from '../../../persistence/model-json';
import { SerializationManager } from '../../../persistence/serialization/serialization-manager';
import { ModelChangedEvent } from '../../events/model-changed-event';
import { ModelManager } from '../../manager/model-manager';
import { ModelPropertyTypeLibrary } from '../../property/model-property-type-library';
import { LeafEditorData, UnresolvedCompositeEditorData } from '../editor-library';
import { EditorApi } from './editor-api';
/**
 * Factory for producing editor APIs
 */
export declare class EditorApiFactory {
  private readonly modelChangedEvent;
  private readonly serializationManager;
  private readonly deserializationManager;
  private readonly modelManager;
  private readonly modelPropertyTypeLibrary;
  constructor(
    modelChangedEvent: ModelChangedEvent,
    serializationManager: SerializationManager,
    deserializationManager: DeserializationManager,
    modelManager: ModelManager,
    modelPropertyTypeLibrary: ModelPropertyTypeLibrary
  );
  /**
   * Produce a new editor API object for the provided model and leaf editor data
   */
  buildLeafEditorApi<T extends JsonPrimitive>(model: object, editorData: LeafEditorData): EditorApi<T>;
  /**
   * Produces a new editor API object for the provided model and composite editor data
   */
  buildNestedEditorApi(model: object, editorData: UnresolvedCompositeEditorData): EditorApi<ModelJson>;
  private buildDefaultJson;
}
