import { Observable } from 'rxjs';
import { DataSource } from '../../data/data-source/data-source';
import { DataSourceManager } from '../../data/data-source/manager/data-source-manager';
import { TimeRangeManager } from '../../data/time-range/manager/time-range-manager';
import { TimeRange } from '../../data/time-range/time-range';
import { DeserializationManager } from '../../persistence/deserialization/deserialization-manager';
import { ModelJson } from '../../persistence/model-json';
import { MergedTheme, Theme } from '../../theming/theme';
import { ThemeManager } from '../../theming/theme-manager';
import { Constructable } from '../../util/constructable';
import { Logger } from '../../util/logging/logger';
import { VariableManager } from '../../variable/manager/variable-manager';
import { ModelChangedEvent } from '../events/model-changed-event';
import { ModelDestroyedEvent } from '../events/model-destroyed-event';
import { ModelManager } from '../manager/model-manager';
import { ModelApi } from './model-api';
/**
 * Default implementation of Model API
 */
export declare class DefaultModelApi implements ModelApi {
  private readonly model;
  private readonly logger;
  private readonly modelManager;
  private readonly dataSourceManager;
  private readonly modelChangedEvent;
  private readonly modelDestroyedEvent;
  private readonly themeManager;
  private readonly variableManager;
  private readonly deserializationManager;
  private readonly timeRangeManager;
  constructor(
    model: object,
    logger: Logger,
    modelManager: ModelManager,
    dataSourceManager: DataSourceManager,
    modelChangedEvent: ModelChangedEvent,
    modelDestroyedEvent: ModelDestroyedEvent,
    themeManager: ThemeManager,
    variableManager: VariableManager,
    deserializationManager: DeserializationManager,
    timeRangeManager: TimeRangeManager
  );
  /**
   * @inheritdoc
   */
  readonly destroyed$: Observable<void>;
  /**
   * @inheritdoc
   */
  readonly change$: Observable<void>;
  /**
   * @inheritdoc
   */
  createChild<T extends object>(child: Constructable<T> | ModelJson, parent?: object): T;
  /**
   * @inheritdoc
   */
  destroyChild(child: object): void;
  /**
   * @inheritdoc
   */
  getData<T>(): Observable<T>;
  /**
   * @inheritdoc
   */
  getTheme<T extends Theme>(): MergedTheme<T>;
  /**
   * @inheritdoc
   */
  setVariable(variableKey: string, value: unknown, modelScope?: object): void;
  /**
   * @inheritdoc
   */
  setDataSource(value: DataSource<unknown>, modelScope?: object): void;
  /**
   * @inheritdoc
   */
  getTimeRange(): TimeRange | undefined;
}
