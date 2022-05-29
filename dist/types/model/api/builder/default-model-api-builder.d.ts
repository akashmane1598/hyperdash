import { DataSourceManager } from '../../../data/data-source/manager/data-source-manager';
import { TimeRangeManager } from '../../../data/time-range/manager/time-range-manager';
import { DeserializationManager } from '../../../persistence/deserialization/deserialization-manager';
import { ThemeManager } from '../../../theming/theme-manager';
import { Logger } from '../../../util/logging/logger';
import { VariableManager } from '../../../variable/manager/variable-manager';
import { ModelChangedEvent } from '../../events/model-changed-event';
import { ModelDestroyedEvent } from '../../events/model-destroyed-event';
import { ModelManager } from '../../manager/model-manager';
import { ModelApi } from '../model-api';
import { ModelApiBuilder } from './model-api-builder';
/**
 * Default implementation of `ModelApiBuilder`
 */
export declare class DefaultModelApiBuilder implements ModelApiBuilder<ModelApi> {
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
  matches(): boolean;
  /**
   * @inheritdoc
   */
  build(model: object): ModelApi;
}
