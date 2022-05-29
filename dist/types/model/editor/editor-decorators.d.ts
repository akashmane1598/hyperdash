import { ObjectConstructable } from '../../util/constructable';
import { EditorRegistrationInformation } from './editor-library';
export declare const modelPropertyEditorRegistrations: {
  editor: ObjectConstructable;
  info: EditorRegistrationInformation;
}[];
/**
 * Registers the decorated editor to the provided property type
 */
export declare function ModelPropertyEditor(
  registrationInfo: EditorRegistrationInformation
): (target: ObjectConstructable) => void;
