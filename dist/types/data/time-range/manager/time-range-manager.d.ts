import { ModelManager } from '../../../model/manager/model-manager';
import { TimeRangeChangedEvent } from '../events/time-range-changed-event';
import { TimeRange } from '../time-range';
/**
 * Manages time ranges and their associations with specific models
 */
export declare class TimeRangeManager {
  private readonly modelManager;
  private readonly timeRangeChangedEvent;
  constructor(modelManager: ModelManager, timeRangeChangedEvent: TimeRangeChangedEvent);
  private readonly rootTimeRangeByModelRoot;
  /**
   * Sets the root time range for the provided model tree.
   */
  setRootTimeRange(rootModel: object, timeRange: TimeRange): void;
  /**
   * Retrieves the time range attached to the closest model in the tree to the provided model,
   * searching upwards.
   */
  getClosest(modelInstance: object): TimeRange | undefined;
}
