import { DataSource } from '../data/data-source/data-source';
import { DataRefreshEvent } from '../data/data-source/events/data-refresh-event';
import { DataSourceManager } from '../data/data-source/manager/data-source-manager';
import { TimeRangeManager } from '../data/time-range/manager/time-range-manager';
import { TimeRange } from '../data/time-range/time-range';
import { ModelManager } from '../model/manager/model-manager';
import { SerializationManager } from '../persistence/serialization/serialization-manager';
import { Constructable } from '../util/constructable';
import { VariableManager } from '../variable/manager/variable-manager';
import { Dashboard } from './dashboard';
export declare class DefaultDashboard<TRoot extends object> implements Dashboard<TRoot> {
  readonly root: TRoot;
  private readonly variableManager;
  private readonly timeRangeManager;
  private readonly serializationManager;
  private readonly modelManager;
  private readonly dataRefreshEvent;
  private readonly dataSourceManager;
  constructor(
    root: TRoot,
    variableManager: VariableManager,
    timeRangeManager: TimeRangeManager,
    serializationManager: SerializationManager,
    modelManager: ModelManager,
    dataRefreshEvent: DataRefreshEvent,
    dataSourceManager: DataSourceManager
  );
  /**
   * @inheritdoc
   */
  setVariable(variableName: string, value: unknown): this;
  /**
   * @inheritdoc
   */
  setTimeRange(timeRange: TimeRange): this;
  /**
   * @inheritdoc
   */
  serialize(): object;
  /**
   * @inheritdoc
   */
  destroy(): void;
  /**
   * @inheritdoc
   */
  refresh(): this;
  /**
   * @inheritdoc
   */
  setRootDataSource<T>(rootDataSource: DataSource<T>): this;
  /**
   * @inheritdoc
   */
  createAndSetRootDataFromModelClass<T>(dataSourceModelClass: Constructable<DataSource<T>>): this;
  /**
   * @inheritdoc
   */
  getRootDataSource<T extends DataSource<any>>(): T | undefined;
}
