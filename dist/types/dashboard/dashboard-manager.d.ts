import { DataRefreshEvent } from '../data/data-source/events/data-refresh-event';
import { DataSourceManager } from '../data/data-source/manager/data-source-manager';
import { TimeRangeManager } from '../data/time-range/manager/time-range-manager';
import { ModelManager } from '../model/manager/model-manager';
import { DeserializationManager } from '../persistence/deserialization/deserialization-manager';
import { ModelJson } from '../persistence/model-json';
import { SerializationManager } from '../persistence/serialization/serialization-manager';
import { VariableManager } from '../variable/manager/variable-manager';
import { Dashboard } from './dashboard';
/**
 * External API for managing dashboards
 */
export declare class DashboardManager {
  private readonly deserializationManager;
  private readonly modelManager;
  private readonly variableManager;
  private readonly serializationManager;
  private readonly dataSourceManager;
  private readonly dataRefreshEvent;
  private readonly timeRangeManager;
  constructor(
    deserializationManager: DeserializationManager,
    modelManager: ModelManager,
    variableManager: VariableManager,
    serializationManager: SerializationManager,
    dataSourceManager: DataSourceManager,
    dataRefreshEvent: DataRefreshEvent,
    timeRangeManager: TimeRangeManager
  );
  /**
   * Transforms the provided JSON into an instantiated dashboard that can be rendered
   */
  create<TRoot extends object>(json: ModelJson): Dashboard<TRoot>;
}
