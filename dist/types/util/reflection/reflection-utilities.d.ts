import 'core-js/proposals/reflect-metadata';
import { Constructable, UnknownConstructable } from '../constructable';
/**
 * Returns any design type metadata for the requested property. Returns undefined if
 * type cannot be resolved. Certain types, like intersections, unions and interfaces
 * will always return Object, as they do not have a runtime representation.
 */
export declare const getReflectedPropertyType: <T extends object>(
  classConstructor: Constructable<T>,
  propertyKey: keyof T
) => UnknownConstructable | undefined;
