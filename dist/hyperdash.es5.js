import { Subject, EMPTY, Observable } from 'rxjs';
import { filter, map, take, takeUntil, mapTo } from 'rxjs/operators';
import {
  isNil,
  uniq,
  without,
  cloneDeepWith,
  isEmpty,
  cloneDeep,
  defaults,
  startCase,
  mapValues,
  includes,
  min as min$2,
  difference,
  get as get$1,
  fromPairs
} from 'lodash-es';

/**
 * Dashboard event which supports observing and publishing itself. By default, the constructed instance is the key.
 * This can be changed at construction by providing an optional second argument.
 */
var DashboardEvent = /** @class */ (function () {
  function DashboardEvent(dashboardEventManager, eventKeyToUse) {
    this.dashboardEventManager = dashboardEventManager;
    this.eventKey = this;
    if (eventKeyToUse) {
      this.eventKey = eventKeyToUse;
    }
  }
  /**
   * Gets an observable for this event which will be notified when anyone publishes to it
   */
  DashboardEvent.prototype.getObservable = function () {
    return this.dashboardEventManager.getObservableForEvent(this.getKey());
  };
  /**
   * Publishes `data` to this event
   */
  DashboardEvent.prototype.publish = function (data) {
    this.dashboardEventManager.publishEvent(this.getKey(), data);
  };
  /**
   * Returns the event key being used for this event
   */
  DashboardEvent.prototype.getKey = function () {
    return this.eventKey;
  };
  return DashboardEvent;
})();

/**
 * Orchestrates publishing and subscribing to events throughout the dashboarding system,
 * provides weakly typed APIs for publishing and subscribing. Using these APIs directly is discouraged,
 * instead use typed APIs provided by specific events.
 */
var DashboardEventManager = /** @class */ (function () {
  function DashboardEventManager() {
    this.eventSubject = new Subject();
  }
  /**
   * Returns an `Observable` notifying when the provided eventKey is published to. This must be
   * manually disposed of, as events are an infinite stream and thus never terminate on their own.
   */
  DashboardEventManager.prototype.getObservableForEvent = function (eventKey) {
    return this.eventSubject.pipe(
      filter(function (keyedEvent) {
        return keyedEvent.key === eventKey;
      }),
      map(function (keyedEvent) {
        return keyedEvent.value;
      })
    );
  };
  /**
   * Publishes the provided value to the provided eventKey. Any registered subscribers will
   * be notified.
   */
  DashboardEventManager.prototype.publishEvent = function (eventKey, value) {
    this.eventSubject.next({
      key: eventKey,
      value: value
    });
  };
  return DashboardEventManager;
})();

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
  extendStatics =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (d, b) {
        d.__proto__ = b;
      }) ||
    function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== 'function' && b !== null)
    throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
    d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
    return Reflect.metadata(metadataKey, metadataValue);
}

function __read(o, n) {
  var m = typeof Symbol === 'function' && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error: error };
  } finally {
    try {
      if (r && !r.done && (m = i['return'])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}

var modelDestroyedEventKey = Symbol('Model destroyed');
/**
 * Fired after a model is destroyed and any destroy hooks are called.
 */
var ModelDestroyedEvent = /** @class */ (function (_super) {
  __extends(ModelDestroyedEvent, _super);
  function ModelDestroyedEvent(dashboardEventManager) {
    return _super.call(this, dashboardEventManager, modelDestroyedEventKey) || this;
  }
  /**
   * Returns a void observable that will notify once when the provided model is
   * destroyed, then complete.
   */
  ModelDestroyedEvent.prototype.getDestructionObservable = function (model) {
    return this.getObservable().pipe(
      filter(function (destroyedModel) {
        return destroyedModel === model;
      }),
      map(function (_) {
        return undefined;
      }),
      take(1)
    );
  };
  return ModelDestroyedEvent;
})(DashboardEvent);

/**
 * An event which is sourced from and scoped to a model. By default, the scope is the model
 * that generated the event.
 *
 * Decorated model event hooks will wrap and unwrap events of this type, respecting the provided scope.
 */
var ModelScopedDashboardEvent = /** @class */ (function (_super) {
  __extends(ModelScopedDashboardEvent, _super);
  function ModelScopedDashboardEvent(dashboardEventManager, eventKeyToUse) {
    return _super.call(this, dashboardEventManager, eventKeyToUse) || this;
  }
  /**
   * Returns an observable that extracts the data from any events originating from a model
   * that satisfies the `modelShouldReceiveEvent` predicate
   */
  ModelScopedDashboardEvent.prototype.getObservableForModel = function (model) {
    var _this = this;
    return this.getObservable().pipe(
      filter(function (value) {
        return _this.modelShouldReceiveEvent(model, value.source);
      }),
      map(function (value) {
        return value.data;
      }),
      takeUntil(
        this.dashboardEventManager.getObservableForEvent(modelDestroyedEventKey).pipe(
          filter(function (destroyedModel) {
            return destroyedModel === model;
          })
        )
      )
    );
  };
  /**
   * Returns true if an event originating from `eventSourceModel` should be propagated to a listener
   * from `listenerModel`
   */
  ModelScopedDashboardEvent.prototype.modelShouldReceiveEvent = function (listenerModel, eventSourceModel) {
    return listenerModel === eventSourceModel;
  };
  return ModelScopedDashboardEvent;
})(DashboardEvent);

// tslint:disable-next-line: completed-docs
var DefaultDashboard = /** @class */ (function () {
  function DefaultDashboard(
    root,
    variableManager,
    timeRangeManager,
    serializationManager,
    modelManager,
    dataRefreshEvent,
    dataSourceManager
  ) {
    this.root = root;
    this.variableManager = variableManager;
    this.timeRangeManager = timeRangeManager;
    this.serializationManager = serializationManager;
    this.modelManager = modelManager;
    this.dataRefreshEvent = dataRefreshEvent;
    this.dataSourceManager = dataSourceManager;
  }
  /**
   * @inheritdoc
   */
  DefaultDashboard.prototype.setVariable = function (variableName, value) {
    this.variableManager.set(variableName, value, this.root);
    return this;
  };
  /**
   * @inheritdoc
   */
  DefaultDashboard.prototype.setTimeRange = function (timeRange) {
    this.timeRangeManager.setRootTimeRange(this.root, timeRange);
    return this;
  };
  /**
   * @inheritdoc
   */
  DefaultDashboard.prototype.serialize = function () {
    return this.serializationManager.serialize(this.root);
  };
  /**
   * @inheritdoc
   */
  DefaultDashboard.prototype.destroy = function () {
    this.modelManager.destroy(this.root);
  };
  /**
   * @inheritdoc
   */
  DefaultDashboard.prototype.refresh = function () {
    this.dataRefreshEvent.publishRefresh(this.root);
    return this;
  };
  /**
   * @inheritdoc
   */
  DefaultDashboard.prototype.setRootDataSource = function (rootDataSource) {
    this.modelManager.destroy(this.getRootDataSource());
    this.dataSourceManager.setRootDataSource(rootDataSource, this.root);
    return this;
  };
  /**
   * @inheritdoc
   */
  DefaultDashboard.prototype.createAndSetRootDataFromModelClass = function (dataSourceModelClass) {
    return this.setRootDataSource(this.modelManager.create(dataSourceModelClass, this.root));
  };
  /**
   * @inheritdoc
   */
  // tslint:disable-next-line: no-any
  DefaultDashboard.prototype.getRootDataSource = function () {
    return this.dataSourceManager.getRootDataSource(this.root);
  };
  return DefaultDashboard;
})();

/**
 * External API for managing dashboards
 */
var DashboardManager = /** @class */ (function () {
  function DashboardManager(
    deserializationManager,
    modelManager,
    variableManager,
    serializationManager,
    dataSourceManager,
    dataRefreshEvent,
    timeRangeManager
  ) {
    this.deserializationManager = deserializationManager;
    this.modelManager = modelManager;
    this.variableManager = variableManager;
    this.serializationManager = serializationManager;
    this.dataSourceManager = dataSourceManager;
    this.dataRefreshEvent = dataRefreshEvent;
    this.timeRangeManager = timeRangeManager;
  }
  /**
   * Transforms the provided JSON into an instantiated dashboard that can be rendered
   */
  // tslint:disable-next-line: no-any
  DashboardManager.prototype.create = function (json) {
    var root = this.deserializationManager.deserialize(json);
    return new DefaultDashboard(
      root,
      this.variableManager,
      this.timeRangeManager,
      this.serializationManager,
      this.modelManager,
      this.dataRefreshEvent,
      this.dataSourceManager
    );
  };
  return DashboardManager;
})();

var dataSourceMarker = Symbol('Data Source Marker');

var dataRefreshEventKey = Symbol('Data refresh');
/**
 * Fired for each model when a refresh is requested
 */
var DataRefreshEvent = /** @class */ (function (_super) {
  __extends(DataRefreshEvent, _super);
  /* istanbul ignore next */
  function DataRefreshEvent(dashboardEventManager, modelManager) {
    var _this = _super.call(this, dashboardEventManager) || this;
    _this.modelManager = modelManager;
    return _this;
  }
  /**
   * Shorthand method to call `publish` for a model
   */
  DataRefreshEvent.prototype.publishRefresh = function (model) {
    this.publish({ data: undefined, source: model });
  };
  /**
   * @inheritdoc
   */
  DataRefreshEvent.prototype.modelShouldReceiveEvent = function (listenerModel, eventSourceModel) {
    // Broadcast- all listening descendents should be notified of a change
    return eventSourceModel === listenerModel || this.modelManager.isAncestor(listenerModel, eventSourceModel);
  };
  return DataRefreshEvent;
})(ModelScopedDashboardEvent);

/**
 * A property location represents a position in the model tree.
 */
var PropertyLocation = /** @class */ (function () {
  function PropertyLocation(parentModel, propertyKey, setter, getter) {
    this.parentModel = parentModel;
    this.propertyKey = propertyKey;
    this.setter = setter;
    this.getter = getter;
  }
  /**
   * Creates a property location for a direct property of a model
   */
  PropertyLocation.forModelProperty = function (model, property) {
    return new PropertyLocation(
      model,
      property,
      function (val) {
        return (model[property] = val);
      },
      function () {
        return model[property];
      }
    );
  };
  /**
   * Creates a property location for a newly created child model with no location assignment. This location will convey
   * the parent model, but will not allow setting or getting.
   */
  PropertyLocation.forUnassignedChildModel = function (parentModel) {
    return new PropertyLocation(
      parentModel,
      PropertyLocation.UNASSIGNED_LOCATION,
      function () {
        throw Error('Setter not supported for Unassigned child');
      },
      function () {
        throw Error('Getter not supported for Unassigned child');
      }
    );
  };
  /**
   * Adds validation function that will be run each time before invoking the setter
   */
  PropertyLocation.prototype.withValidator = function (validator) {
    this.validator = validator;
    return this;
  };
  /**
   * Sets the location with the provided value, first validating it if provided with a validator
   */
  PropertyLocation.prototype.setProperty = function (value) {
    if (this.validator) {
      this.validator(value);
    }
    this.setter(value);
  };
  /**
   * Gets the value from the provided location
   */
  PropertyLocation.prototype.getProperty = function () {
    return this.getter();
  };
  /**
   * Converts the location to a string representation. All
   * locations with the same parentModel will have a unique string
   * representation.
   */
  PropertyLocation.prototype.toString = function () {
    return String(this.propertyKey);
  };
  /**
   * Creates a property location nested from the current one. object represents the object in the current
   * location, `propertyKey` is the path from that object to the new location. The parent model is retained.
   * If object is a model, it should use `PropertyLocation.forModelProperty` instead.
   */
  PropertyLocation.prototype.buildChildFromObjectAndKey = function (object, propertyKey) {
    return new PropertyLocation(
      this.parentModel,
      this.toString() + ':' + String(propertyKey),
      function (value) {
        return (object[propertyKey] = value);
      },
      function () {
        return object[propertyKey];
      }
    );
  };
  PropertyLocation.UNASSIGNED_LOCATION = 'UNASSIGNED';
  return PropertyLocation;
})();

/**
 * Manages data sources and their associations with specific models
 */
var DataSourceManager = /** @class */ (function () {
  function DataSourceManager(modelManager) {
    this.modelManager = modelManager;
    this.dataSourceByModelInstance = new WeakMap();
    this.rootDataSourceByModelRoot = new WeakMap();
  }
  /**
   * Attaches a data source to the specified model. Overwrites any existing data source for
   * the specified model.
   */
  DataSourceManager.prototype.attach = function (dataSource, model) {
    this.dataSourceByModelInstance.set(model, dataSource);
  };
  /**
   * Removes the data source for the specified model. No action is taken if a data source is not defined
   * for this specific model.
   */
  DataSourceManager.prototype.detach = function (model) {
    this.dataSourceByModelInstance.delete(model);
  };
  /**
   * Retrieves the data source for this model, if it exists. Returns undefined otherwise.
   */
  DataSourceManager.prototype.get = function (model) {
    return this.dataSourceByModelInstance.get(model);
  };
  /**
   * Type predicate returning true if the provided model object is a data source
   */
  DataSourceManager.prototype.isDataSource = function (model) {
    if (model.dataSourceMarker && model.getData) {
      // tslint:disable-next-line:strict-type-predicates
      return typeof model.getData === 'function' && model.dataSourceMarker === dataSourceMarker;
    }
    return false;
  };
  /**
   * Returns true if the model JSON provided contains a data property
   */
  DataSourceManager.prototype.modelJsonHasData = function (modelJson) {
    return 'data' in modelJson && typeof modelJson.data === 'object' && modelJson.data !== null;
  };
  /**
   * Returns a property location corresponding to the data attached to the provided model
   */
  DataSourceManager.prototype.getPropertyLocationForData = function (instance) {
    var _this = this;
    return new PropertyLocation(
      instance,
      'data',
      function (value) {
        if (value === undefined) {
          _this.detach(instance);
        } else {
          _this.attach(value, instance);
        }
      },
      function () {
        return _this.get(instance);
      }
    );
  };
  /**
   * Retrieves the data source attached to this model, if it exists. If not, it recursively checks for data sources
   * attached to ancestors, returning the closest, or undefined if no ancestor has a data source.
   * If the provided model is a data source, it will skip checking its parent, which would return the original
   * data modelInstance, and start its search with a grandparent model, continuing upwards like a regular model.
   */
  DataSourceManager.prototype.getClosest = function (modelInstance) {
    var attachedDataSource = this.get(modelInstance);
    if (attachedDataSource) {
      return attachedDataSource;
    }
    var parent;
    if (this.isDataSource(modelInstance)) {
      // For a data source, its parent would have the original data source attached, so skip a level
      var attachedFromModel = this.modelManager.getParent(modelInstance);
      parent = attachedFromModel && this.modelManager.getParent(attachedFromModel);
    } else {
      parent = this.modelManager.getParent(modelInstance);
    }
    if (!parent) {
      var rootDataSource = this.getRootDataSource(modelInstance);
      // If the root data source is the requestor, then don't give itself back, return undefined
      return rootDataSource === modelInstance ? undefined : rootDataSource;
    }
    return this.getClosest(parent);
  };
  /**
   * Sets the root data source for the provided model tree. This data source will be used at the root of the resolution
   * tree.
   */
  DataSourceManager.prototype.setRootDataSource = function (dataSource, rootModelInstance) {
    this.rootDataSourceByModelRoot.set(rootModelInstance, dataSource);
  };
  /**
   * Retrieves the root data source for the tree containing the provided model, or undefined if missing.
   */
  DataSourceManager.prototype.getRootDataSource = function (modelInstance) {
    return this.rootDataSourceByModelRoot.get(this.modelManager.getRoot(modelInstance));
  };
  return DataSourceManager;
})();

/**
 * Fired for each model when the applicable time range is changed
 */
var TimeRangeChangedEvent = /** @class */ (function (_super) {
  __extends(TimeRangeChangedEvent, _super);
  /* istanbul ignore next */
  function TimeRangeChangedEvent(dashboardEventManager, modelManager) {
    var _this = _super.call(this, dashboardEventManager) || this;
    _this.modelManager = modelManager;
    return _this;
  }
  /**
   * Shorthand method to call `publish` for a model
   */
  TimeRangeChangedEvent.prototype.publishTimeRangeChange = function (model, newTimeRange) {
    this.publish({ data: newTimeRange, source: model });
  };
  /**
   * @inheritdoc
   */
  TimeRangeChangedEvent.prototype.modelShouldReceiveEvent = function (listenerModel, eventSourceModel) {
    // Broadcast- all listening descendents should be notified of a change
    return eventSourceModel === listenerModel || this.modelManager.isAncestor(listenerModel, eventSourceModel);
  };
  return TimeRangeChangedEvent;
})(ModelScopedDashboardEvent);

/**
 * Manages time ranges and their associations with specific models
 */
var TimeRangeManager = /** @class */ (function () {
  function TimeRangeManager(modelManager, timeRangeChangedEvent) {
    this.modelManager = modelManager;
    this.timeRangeChangedEvent = timeRangeChangedEvent;
    this.rootTimeRangeByModelRoot = new WeakMap();
  }
  /**
   * Sets the root time range for the provided model tree.
   */
  TimeRangeManager.prototype.setRootTimeRange = function (rootModel, timeRange) {
    this.rootTimeRangeByModelRoot.set(rootModel, timeRange);
    this.timeRangeChangedEvent.publishTimeRangeChange(rootModel, timeRange);
  };
  // TODO - setting time range for child models, serialization/deserialization, relative TRs
  /**
   * Retrieves the time range attached to the closest model in the tree to the provided model,
   * searching upwards.
   */
  TimeRangeManager.prototype.getClosest = function (modelInstance) {
    return this.rootTimeRangeByModelRoot.get(this.modelManager.getRoot(modelInstance));
  };
  return TimeRangeManager;
})();

/**
 * Default implementation of Model API
 */
var DefaultModelApi = /** @class */ (function () {
  function DefaultModelApi(
    model,
    logger,
    modelManager,
    dataSourceManager,
    modelChangedEvent,
    modelDestroyedEvent,
    themeManager,
    variableManager,
    deserializationManager,
    timeRangeManager
  ) {
    this.model = model;
    this.logger = logger;
    this.modelManager = modelManager;
    this.dataSourceManager = dataSourceManager;
    this.modelChangedEvent = modelChangedEvent;
    this.modelDestroyedEvent = modelDestroyedEvent;
    this.themeManager = themeManager;
    this.variableManager = variableManager;
    this.deserializationManager = deserializationManager;
    this.timeRangeManager = timeRangeManager;
    this.destroyed$ = this.modelDestroyedEvent.getDestructionObservable(this.model);
    this.change$ = this.modelChangedEvent.getObservableForModel(this.model).pipe(
      map(function (_) {
        return undefined;
      })
    );
  }
  /**
   * @inheritdoc
   */
  DefaultModelApi.prototype.createChild = function (child, parent) {
    if (parent === void 0) {
      parent = this.model;
    }
    if (typeof child === 'function') {
      return this.modelManager.create(child, parent);
    }
    return this.deserializationManager.deserialize(child, PropertyLocation.forUnassignedChildModel(parent));
  };
  /**
   * @inheritdoc
   */
  DefaultModelApi.prototype.destroyChild = function (child) {
    this.modelManager.destroy(child);
  };
  /**
   * @inheritdoc
   */
  DefaultModelApi.prototype.getData = function () {
    var dataSource = this.dataSourceManager.getClosest(this.model);
    if (!dataSource) {
      this.logger.warn('No data source found when trying to retrieve data for model');
      return EMPTY;
    }
    return dataSource.getData();
  };
  /**
   * @inheritdoc
   */
  DefaultModelApi.prototype.getTheme = function () {
    return this.themeManager.getThemeForModel(this.model);
  };
  /**
   * @inheritdoc
   */
  DefaultModelApi.prototype.setVariable = function (variableKey, value, modelScope) {
    if (modelScope === void 0) {
      modelScope = this.model;
    }
    this.variableManager.set(variableKey, value, modelScope);
  };
  /**
   * @inheritdoc
   */
  DefaultModelApi.prototype.setDataSource = function (value, modelScope) {
    if (modelScope === void 0) {
      modelScope = this.model;
    }
    this.dataSourceManager.attach(value, modelScope);
  };
  /**
   * @inheritdoc
   */
  DefaultModelApi.prototype.getTimeRange = function () {
    return this.timeRangeManager.getClosest(this.model);
  };
  return DefaultModelApi;
})();

/**
 * Default implementation of `ModelApiBuilder`
 */
var DefaultModelApiBuilder = /** @class */ (function () {
  function DefaultModelApiBuilder(
    logger,
    modelManager,
    dataSourceManager,
    modelChangedEvent,
    modelDestroyedEvent,
    themeManager,
    variableManager,
    deserializationManager,
    timeRangeManager
  ) {
    this.logger = logger;
    this.modelManager = modelManager;
    this.dataSourceManager = dataSourceManager;
    this.modelChangedEvent = modelChangedEvent;
    this.modelDestroyedEvent = modelDestroyedEvent;
    this.themeManager = themeManager;
    this.variableManager = variableManager;
    this.deserializationManager = deserializationManager;
    this.timeRangeManager = timeRangeManager;
  }
  /**
   * @inheritdoc
   */
  DefaultModelApiBuilder.prototype.matches = function () {
    return true;
  };
  /**
   * @inheritdoc
   */
  DefaultModelApiBuilder.prototype.build = function (model) {
    return new DefaultModelApi(
      model,
      this.logger,
      this.modelManager,
      this.dataSourceManager,
      this.modelChangedEvent,
      this.modelDestroyedEvent,
      this.themeManager,
      this.variableManager,
      this.deserializationManager,
      this.timeRangeManager
    );
  };
  return DefaultModelApiBuilder;
})();

/**
 * Default implementation of `EditorApi`
 */
var DefaultEditorApi = /** @class */ (function () {
  function DefaultEditorApi(
    label,
    propertyTypeInstance,
    model,
    validator,
    propertyLocation,
    modelChangedEvent,
    serializer,
    deserializer,
    modelManager,
    modelPropertyTypeLibrary
  ) {
    this.label = label;
    this.propertyTypeInstance = propertyTypeInstance;
    this.model = model;
    this.validator = validator;
    this.propertyLocation = propertyLocation;
    this.modelChangedEvent = modelChangedEvent;
    this.serializer = serializer;
    this.deserializer = deserializer;
    this.modelManager = modelManager;
    this.modelPropertyTypeLibrary = modelPropertyTypeLibrary;
    this.value = this.getValue();
  }
  /**
   * @inheritdoc
   */
  DefaultEditorApi.prototype.validate = function (newSerializedValue) {
    return this.validator(newSerializedValue);
  };
  /**
   * @inheritdoc
   */
  DefaultEditorApi.prototype.valueChange = function (newSerializedValue) {
    this.setValue(newSerializedValue);
    this.value = this.getValue();
  };
  DefaultEditorApi.prototype.getValue = function () {
    return this.serialize(this.propertyLocation.getProperty());
  };
  DefaultEditorApi.prototype.setValue = function (serializedValue) {
    // TODO variables
    if (this.validator(serializedValue) !== undefined) {
      return; // If non empty validation message, don't accept the change
    }
    this.modelManager.destroy(this.propertyLocation.getProperty());
    this.propertyLocation.setProperty(this.deserialize(serializedValue));
    this.modelChangedEvent.publishChange(this.model);
  };
  /**
   * @inheritdoc
   */
  DefaultEditorApi.prototype.serialize = function (value) {
    var customSerializer = this.modelPropertyTypeLibrary.getPropertySerializer(this.propertyTypeInstance);
    if (customSerializer) {
      return customSerializer(value, this.propertyLocation, this.propertyTypeInstance);
    }
    return this.serializer.serialize(value, this.propertyLocation);
  };
  /**
   * @inheritdoc
   */
  DefaultEditorApi.prototype.deserialize = function (value) {
    var customDeserializer = this.modelPropertyTypeLibrary.getPropertyDeserializer(this.propertyTypeInstance);
    if (customDeserializer) {
      return customDeserializer(value, this.propertyLocation, this.propertyTypeInstance);
    }
    return this.deserializer.deserialize(value, this.propertyLocation);
  };
  return DefaultEditorApi;
})();

/**
 * Factory for producing editor APIs
 */
var EditorApiFactory = /** @class */ (function () {
  function EditorApiFactory(
    modelChangedEvent,
    serializationManager,
    deserializationManager,
    modelManager,
    modelPropertyTypeLibrary
  ) {
    this.modelChangedEvent = modelChangedEvent;
    this.serializationManager = serializationManager;
    this.deserializationManager = deserializationManager;
    this.modelManager = modelManager;
    this.modelPropertyTypeLibrary = modelPropertyTypeLibrary;
  }
  /**
   * Produce a new editor API object for the provided model and leaf editor data
   */
  EditorApiFactory.prototype.buildLeafEditorApi = function (model, editorData) {
    var propertyLocation = PropertyLocation.forModelProperty(model, editorData.propertyMetadata.runtimeKey);
    return new DefaultEditorApi(
      editorData.title,
      editorData.propertyMetadata.type,
      model,
      editorData.validator,
      propertyLocation,
      this.modelChangedEvent,
      this.serializationManager,
      this.deserializationManager,
      this.modelManager,
      this.modelPropertyTypeLibrary
    );
  };
  /**
   * Produces a new editor API object for the provided model and composite editor data
   */
  EditorApiFactory.prototype.buildNestedEditorApi = function (model, editorData) {
    var noOpValidator = function () {
      return undefined;
    };
    var propertyLocation = editorData.getPropertyLocation(model);
    var api = new DefaultEditorApi(
      editorData.title,
      editorData.propertyTypeInstance,
      model,
      noOpValidator,
      propertyLocation,
      this.modelChangedEvent,
      this.serializationManager,
      this.deserializationManager,
      this.modelManager,
      this.modelPropertyTypeLibrary
    );
    if (api.value === undefined) {
      api.value = this.buildDefaultJson(editorData);
    }
    return api;
  };
  EditorApiFactory.prototype.buildDefaultJson = function (editorData) {
    var model = this.modelManager.create(editorData.modelClass);
    var json = this.serializationManager.serialize(model);
    this.modelManager.destroy(model);
    return json;
  };
  return EditorApiFactory;
})();

var modelPropertyEditorRegistrations = [];
/**
 * Registers the decorated editor to the provided property type
 */
// tslint:disable-next-line:only-arrow-functions
function ModelPropertyEditor(registrationInfo) {
  return function (editorClass) {
    modelPropertyEditorRegistrations.push({ editor: editorClass, info: registrationInfo });
  };
}

var typeofValidator = function (type) {
  return function (value, allowUndefinedOrNull) {
    if (allowUndefinedOrNull && isNil(value)) {
      return undefined;
    }
    if (isNil(value)) {
      return 'Required property got ' + value + ' value';
    }
    if (typeof value === type) {
      return undefined;
    }
    if (type === 'object') {
      return 'Provided value is not an ' + type + ', detected: ' + typeof value;
    }
    return 'Provided value is not a ' + type + ', detected: ' + typeof value;
  };
};
var STRING_PROPERTY = Object.freeze({
  type: 'string',
  validator: typeofValidator('string')
});
var NUMBER_PROPERTY = Object.freeze({
  type: 'number',
  validator: typeofValidator('number')
});
var BOOLEAN_PROPERTY = Object.freeze({
  type: 'boolean',
  validator: typeofValidator('boolean')
});
var PLAIN_OBJECT_PROPERTY = Object.freeze({
  type: 'plain-object',
  validator: function (value, allowUndefinedOrNull, propertyType) {
    if (Array.isArray(value)) {
      return 'Provided value is not a plain object, detected: Array';
    }
    return typeofValidator('object')(value, allowUndefinedOrNull, propertyType);
  }
});
var UNKNOWN_PROPERTY = Object.freeze({
  type: 'unknown',
  validator: function (value, allowUndefinedOrNull) {
    if (isNil(value) && !allowUndefinedOrNull) {
      return 'Required property got ' + value + ' value';
    }
    return undefined;
  }
});

var deferredModelDecoratorRegistrations = [];
/**
 * Registers the decorated model with the provided information
 */
// tslint:disable-next-line:only-arrow-functions
function Model(registrationInfo) {
  return function (modelClass) {
    deferredModelDecoratorRegistrations.push(function (modelLibrary) {
      return modelLibrary.registerModelClass(modelClass, registrationInfo);
    });
  };
}
/**
 * Registers the decorated property with the containing model
 */
// tslint:disable-next-line:only-arrow-functions
function ModelProperty(registrationInfo) {
  return function (modelPrototype, propertyKey) {
    deferredModelDecoratorRegistrations.push(function (modelLibrary) {
      return modelLibrary.registerModelProperty(modelPrototype.constructor, propertyKey, registrationInfo);
    });
  };
}

/**
 * A theme describing how to style a specific model.
 */
var Theme = /** @class */ (function () {
  function Theme() {}
  __decorate(
    [
      ModelProperty({
        key: 'background-color',
        type: STRING_PROPERTY.type,
        required: false
      }),
      __metadata('design:type', String)
    ],
    Theme.prototype,
    'backgroundColor',
    void 0
  );
  __decorate(
    [
      ModelProperty({
        key: 'text-color',
        type: STRING_PROPERTY.type,
        required: false
      }),
      __metadata('design:type', String)
    ],
    Theme.prototype,
    'textColor',
    void 0
  );
  Theme = __decorate(
    [
      Model({
        type: 'theme',
        displayName: 'Theme'
      })
    ],
    Theme
  );
  return Theme;
})();

/**
 * Model properties representing a nested model
 */
var ModelPropertyType = /** @class */ (function () {
  function ModelPropertyType(deserializationManager, modelManager) {
    this.deserializationManager = deserializationManager;
    this.modelManager = modelManager;
    /**
     * @inheritdoc
     */
    this.type = ModelPropertyType.TYPE;
  }
  /**
   * @inheritdoc
   */
  ModelPropertyType.prototype.validator = function (value, allowUndefinedOrNull) {
    if (allowUndefinedOrNull && isNil(value)) {
      return undefined;
    }
    if (isNil(value)) {
      return 'Required property got ' + value + ' value';
    }
    if (typeof value !== 'object') {
      return 'Provided value is not model JSON, detected type: ' + typeof value;
    }
    if (!('type' in value)) {
      return 'Provided value is missing model JSON required type field';
    }
    return undefined; // Can't detect if type is registered without access to library
  };
  /**
   * @inheritdoc
   */
  ModelPropertyType.prototype.deserializer = function (json, location, propertyInstance) {
    var defaultModelClass = propertyInstance.defaultModelClass;
    if (!json && defaultModelClass) {
      return this.modelManager.create(defaultModelClass, location.parentModel);
    }
    return this.deserializationManager.deserialize(json, location);
  };
  /**
   * Type key for model properties
   */
  ModelPropertyType.TYPE = 'model';
  return ModelPropertyType;
})();

/**
 * Thoughts:
 * Create a new property type for each enum. That way, we can also do validation around it, localize
 * and potentially reuse actual editors.
 *
 * Editor container should aggregate changes and send them in some standard format.
 * Editor container should correctly nest.
 *
 */
/**
 * Editor library allows registering editor renderers to property types, and builds
 * a tree of information for generating dynamic editors given a specific model constructor
 */
var EditorLibrary = /** @class */ (function () {
  function EditorLibrary(
    modelLibrary,
    modelPropertyTypeLibrary,
    logger,
    rendererLibrary,
    themeManager,
    dataSourceManager
  ) {
    this.modelLibrary = modelLibrary;
    this.modelPropertyTypeLibrary = modelPropertyTypeLibrary;
    this.logger = logger;
    this.rendererLibrary = rendererLibrary;
    this.themeManager = themeManager;
    this.dataSourceManager = dataSourceManager;
    this.editorMetadata = new Map();
    this.lastDecoratorIndexRead = 0;
  }
  /**
   * Registers the provided editor class to a given model property type. No action is taken if that
   * model property already has an editor.
   */
  EditorLibrary.prototype.registerEditorRenderer = function (editorRendererClass, registrationInformation) {
    this.processRegistrationQueue();
    this.registerEditorRendererInternal(editorRendererClass, registrationInformation);
  };
  /**
   * Gets data needed to build the editor for the provided model constructor, or undefined if the editor information
   * cannot be found.
   *  TODO Also show meta properties like data (maybe, more likely first-class), or theme
   */
  EditorLibrary.prototype.getEditorData = function (modelConstructor) {
    var _this = this;
    this.processRegistrationQueue();
    var metadata = this.modelLibrary.lookupModelMetadata(modelConstructor);
    if (!metadata) {
      this.logger.warn('Attempted to lookup editor data for unregistered model class: ' + modelConstructor.name);
      return undefined;
    }
    var modelPropertyEditors = Array.from(this.modelLibrary.lookupModelProperties(modelConstructor))
      .map(function (propertyMetadata) {
        return _this.getModelPropertyEditorData(propertyMetadata);
      })
      .filter(function (data) {
        return data !== undefined;
      });
    var compositeData = {
      title: metadata.displayName,
      subeditors: modelPropertyEditors,
      kind: EditorKind.Composite
    };
    var themeEditor = this.getThemeEditorForClass(modelConstructor);
    if (themeEditor) {
      compositeData.themeEditor = themeEditor;
    }
    var dataEditor = this.getDataEditorForClass(modelConstructor);
    if (dataEditor) {
      compositeData.dataEditor = dataEditor;
    }
    return compositeData;
  };
  EditorLibrary.prototype.getModelPropertyEditorData = function (modelPropertyMetadata) {
    var _this = this;
    var propertyTypeKey = modelPropertyMetadata.type.key;
    // We have a registered editor, use it
    if (this.editorMetadata.has(propertyTypeKey)) {
      return {
        title: modelPropertyMetadata.displayName,
        editor: this.editorMetadata.get(propertyTypeKey).renderer,
        validator: function (value) {
          return _this.modelPropertyTypeLibrary.getValidator(modelPropertyMetadata.type)(
            value,
            !modelPropertyMetadata.required,
            modelPropertyMetadata.type
          );
        },
        propertyMetadata: modelPropertyMetadata,
        kind: EditorKind.Leaf
      };
    }
    if (propertyTypeKey === ModelPropertyType.TYPE && modelPropertyMetadata.runtimeType !== undefined) {
      return this.getEditorMatchingModelClasses(
        [modelPropertyMetadata.runtimeType],
        modelPropertyMetadata.displayName,
        modelPropertyMetadata.type,
        function (model) {
          return PropertyLocation.forModelProperty(model, modelPropertyMetadata.runtimeKey);
        }
      );
    }
    return undefined;
  };
  /**
   * Internal version does not clear queue before proceeding
   */
  EditorLibrary.prototype.registerEditorRendererInternal = function (editorRendererClass, registrationInformation) {
    if (this.editorMetadata.has(registrationInformation.propertyType)) {
      this.logger.error(
        'Property types may only have one editor. ' +
          ('Attempted to register [' + editorRendererClass.name + '] ') +
          ('to [' + registrationInformation.propertyType + '], but already registered with ') +
          ('[' + this.editorMetadata.get(registrationInformation.propertyType).renderer.name + ']')
      );
      return;
    }
    this.editorMetadata.set(registrationInformation.propertyType, { renderer: editorRendererClass });
  };
  EditorLibrary.prototype.processRegistrationQueue = function () {
    // tslint:disable-next-line:max-line-length
    for (
      this.lastDecoratorIndexRead;
      this.lastDecoratorIndexRead < modelPropertyEditorRegistrations.length;
      this.lastDecoratorIndexRead++
    ) {
      var registration = modelPropertyEditorRegistrations[this.lastDecoratorIndexRead];
      this.registerEditorRendererInternal(registration.editor, registration.info);
    }
  };
  EditorLibrary.prototype.getEditorMatchingModelClasses = function (
    modelClasses,
    displayName,
    typeInstance,
    getPropertyLocation
  ) {
    var _this = this;
    var allMatchingEditors = this.getAllCompatibleModelClasses(modelClasses).map(function (compatibleConstructor) {
      return {
        title: _this.modelLibrary.lookupModelMetadata(compatibleConstructor).displayName,
        modelClass: compatibleConstructor,
        propertyTypeInstance: typeInstance,
        getPropertyLocation: getPropertyLocation,
        kind: EditorKind.Unresolved
      };
    });
    if (allMatchingEditors.length === 0) {
      return undefined;
    }
    if (allMatchingEditors.length === 1) {
      return __assign(__assign({}, allMatchingEditors[0]), { title: displayName });
    }
    return {
      title: displayName,
      compatibleEditors: allMatchingEditors,
      kind: EditorKind.Multiple
    };
  };
  EditorLibrary.prototype.getAllCompatibleModelClasses = function (modelClasses) {
    var _this = this;
    return uniq(
      modelClasses.flatMap(function (modeClass) {
        return _this.modelLibrary.getAllCompatibleModelClasses(modeClass);
      })
    );
  };
  EditorLibrary.prototype.getThemeEditorForClass = function (modelClass) {
    var _this = this;
    if (this.rendererLibrary.hasRenderer(modelClass)) {
      return this.getEditorMatchingModelClasses([Theme], 'Theme', { key: '_theme' }, function (model) {
        return _this.themeManager.getPropertyLocationForTheme(model);
      });
    }
    return undefined;
  };
  EditorLibrary.prototype.getDataEditorForClass = function (modelClass) {
    var _this = this;
    // Always defined, we've already done this lookup to get this far
    var modelMetadata = this.modelLibrary.lookupModelMetadata(modelClass);
    return this.getEditorMatchingModelClasses(
      modelMetadata.supportedDataSourceTypes,
      'Data',
      { key: '_data' },
      function (model) {
        return _this.dataSourceManager.getPropertyLocationForData(model);
      }
    );
  };
  return EditorLibrary;
})();
/**
 * Discriminating enum for editor subtypes
 */
var EditorKind;
(function (EditorKind) {
  /**
   * Indicates composite type
   * @see CompositeEditorData
   */
  EditorKind[(EditorKind['Composite'] = 0)] = 'Composite';
  /**
   * Indicates leaf type
   * @see LeafEditorData
   */
  EditorKind[(EditorKind['Leaf'] = 1)] = 'Leaf';
  /**
   * Indicates multiple type
   * @see MultipleEditorData
   */
  EditorKind[(EditorKind['Multiple'] = 2)] = 'Multiple';
  /**
   * Indicates unresolved type
   * @see UnresolvedCompositeEditorData
   */
  EditorKind[(EditorKind['Unresolved'] = 3)] = 'Unresolved';
})(EditorKind || (EditorKind = {}));

/**
 * Fired after a property of a model (or a child model) changes.
 */
var ModelChangedEvent = /** @class */ (function (_super) {
  __extends(ModelChangedEvent, _super);
  /* istanbul ignore next */
  function ModelChangedEvent(dashboardEventManager, modelManager) {
    var _this = _super.call(this, dashboardEventManager) || this;
    _this.modelManager = modelManager;
    return _this;
  }
  /**
   * Shorthand method to call `publish` for a model
   */
  ModelChangedEvent.prototype.publishChange = function (model) {
    this.publish({ data: model, source: model });
  };
  /**
   * @inheritdoc
   */
  ModelChangedEvent.prototype.modelShouldReceiveEvent = function (listenerModel, eventSourceModel) {
    // Bubble up - all listening ancestors should be notified of a change
    return eventSourceModel === listenerModel || this.modelManager.isAncestor(eventSourceModel, listenerModel);
  };
  return ModelChangedEvent;
})(ModelScopedDashboardEvent);

var modelCreatedEventKey = Symbol('Model created');
/**
 * Fired after a model is created, before its properties are set and its initialization hook is run
 */
var ModelCreatedEvent = /** @class */ (function (_super) {
  __extends(ModelCreatedEvent, _super);
  function ModelCreatedEvent(dashboardEventManager) {
    return _super.call(this, dashboardEventManager, modelCreatedEventKey) || this;
  }
  return ModelCreatedEvent;
})(DashboardEvent);

var beforeModelDestroyedEventKey = Symbol('Before model destroyed');
/**
 * Fired before a model is destroyed and any destroy hooks are called.
 */
var BeforeModelDestroyedEvent = /** @class */ (function (_super) {
  __extends(BeforeModelDestroyedEvent, _super);
  function BeforeModelDestroyedEvent(dashboardEventManager) {
    return _super.call(this, dashboardEventManager, beforeModelDestroyedEventKey) || this;
  }
  /**
   * Returns a void observable that will notify once when the provided model is
   * destroyed, then complete.
   */
  BeforeModelDestroyedEvent.prototype.getBeforeDestructionObservable = function (model) {
    return this.getObservable().pipe(
      filter(function (destroyedModel) {
        return destroyedModel === model;
      }),
      mapTo(undefined),
      take(1)
    );
  };
  return BeforeModelDestroyedEvent;
})(DashboardEvent);

// tslint:disable:strict-type-predicates TODO - re-enable, does not work well with unknowns
/**
 * Hooks up model event subscribers and publishers to the event system
 */
var ModelEventInstaller = /** @class */ (function () {
  function ModelEventInstaller(dashboardEventManager, modelDestroyedEvent, logger) {
    this.dashboardEventManager = dashboardEventManager;
    this.modelDestroyedEvent = modelDestroyedEvent;
    this.logger = logger;
    this.modelEventMetadata = new Map();
    this.lastDeferredIndexRead = 0;
  }
  /**
   *  Hooks up model event subscribers and publishers properties in modelInstance based on
   *  those registered to modelInstance's model type
   */
  ModelEventInstaller.prototype.decorate = function (modelInstance) {
    var _this = this;
    var eventMetadata = this.lookupModelEvents(modelInstance.constructor);
    eventMetadata.forEach(function (metadata) {
      var propertyKey = metadata.propertyKey;
      var eventKey = _this.resolveEventKey(metadata.eventKey);
      switch (metadata.type) {
        case 0 /* Subscriber */:
          _this.installEventSubscriber(modelInstance, eventKey, propertyKey);
          break;
        case 1 /* Publisher */:
          _this.installEventPublisher(modelInstance, eventKey, propertyKey);
          break;
      }
    });
  };
  /**
   * Registers a model event. This property will be hooked into the event system as a publisher or subscriber
   * of the specified event for each model instance instantiated of this type.
   */
  ModelEventInstaller.prototype.registerModelEvent = function (modelClass, propertyKey, eventKey, type) {
    if (!this.modelEventMetadata.has(modelClass)) {
      this.modelEventMetadata.set(modelClass, []);
    }
    var eventMetadataArray = this.modelEventMetadata.get(modelClass);
    eventMetadataArray.push({
      propertyKey: propertyKey,
      eventKey: eventKey,
      type: type
    });
  };
  /**
   * A hook to allow extended implementations to support other systems such as Dependency
   * Injection
   */
  ModelEventInstaller.prototype.resolveEventKey = function (providedKey) {
    return providedKey;
  };
  ModelEventInstaller.prototype.installEventSubscriber = function (modelInstance, eventKey, propertyKey) {
    this.getObservableForModel(modelInstance, eventKey)
      .pipe(takeUntil(this.modelDestroyedEvent.getDestructionObservable(modelInstance)))
      .subscribe(this.getSubscriberAsObserver(modelInstance, propertyKey));
  };
  ModelEventInstaller.prototype.installEventPublisher = function (modelInstance, eventKey, propertyKey) {
    var _this = this;
    var publisherPropertyValue = modelInstance[propertyKey];
    if (publisherPropertyValue instanceof Observable) {
      publisherPropertyValue
        .pipe(takeUntil(this.modelDestroyedEvent.getDestructionObservable(modelInstance)))
        .subscribe(function (value) {
          return _this.getPublishFunctionForModel(modelInstance, eventKey)(value);
        });
    } else {
      this.logger
        // tslint:disable-next-line:max-line-length
        .warn('Cannot publish from property [' + String(propertyKey) + '] - must be an instanceof Observable');
    }
  };
  ModelEventInstaller.prototype.getSubscriberAsObserver = function (modelInstance, subscriberKey) {
    var subscriberValue = modelInstance[subscriberKey];
    if (typeof subscriberValue === 'function') {
      return {
        next: subscriberValue
      };
    }
    if (this.isObserver(subscriberValue)) {
      return subscriberValue;
    }
    this.logger.warn('Cannot subscribe to property [' + String(subscriberKey) + '] - must be function or Observer');
    return {
      next: function () {
        /*NOOP*/
      }
    };
  };
  ModelEventInstaller.prototype.isObserver = function (value) {
    if (value === null || typeof value !== 'object') {
      return false;
    }
    if (typeof value.next === 'function') {
      return true;
    }
    if (typeof value.complete === 'function') {
      return true;
    }
    if (typeof value.error === 'function') {
      return true;
    }
    return false;
  };
  ModelEventInstaller.prototype.getObservableForModel = function (model, eventKey) {
    if (this.eventKeyIsModelScoped(eventKey)) {
      return eventKey.getObservableForModel(model);
    }
    return this.dashboardEventManager.getObservableForEvent(eventKey);
  };
  ModelEventInstaller.prototype.getPublishFunctionForModel = function (model, eventKey) {
    var _this = this;
    if (this.eventKeyIsModelScoped(eventKey)) {
      return function (data) {
        return eventKey.publish({
          data: data,
          source: model
        });
      };
    }
    return function (data) {
      return _this.dashboardEventManager.publishEvent(eventKey, data);
    };
  };
  ModelEventInstaller.prototype.eventKeyIsModelScoped = function (eventKey) {
    return eventKey instanceof ModelScopedDashboardEvent;
  };
  ModelEventInstaller.prototype.lookupModelEvents = function (modelClass) {
    var _this = this;
    this.processRegistrationQueue();
    return this.getConstructorChain(modelClass)
      .reverse()
      .reduce(function (metadata, constructor) {
        return metadata.concat(_this.modelEventMetadata.get(constructor) || []);
      }, []);
  };
  ModelEventInstaller.prototype.getConstructorChain = function (constructor) {
    var currentConstructor = constructor;
    var constructorChain = [];
    while (currentConstructor) {
      constructorChain.push(currentConstructor);
      currentConstructor = Object.getPrototypeOf(currentConstructor);
    }
    return constructorChain;
  };
  ModelEventInstaller.prototype.processRegistrationQueue = function () {
    for (
      this.lastDeferredIndexRead;
      this.lastDeferredIndexRead < deferredRegistrations.length;
      this.lastDeferredIndexRead++
    ) {
      var deferredRegistration = deferredRegistrations[this.lastDeferredIndexRead];
      deferredRegistration(this);
    }
  };
  return ModelEventInstaller;
})();
var deferredRegistrations = [];
/**
 * Registers the decorated property or method as a subscriber for the provided event key or event key provider.
 *
 * As a property, an event subscriber must be instantiated to an object that implements the RxJS `Observer` interface.
 * As a method, an event subscriber will be invoked on each `Observer.next`, and provided as an argument any data
 * included with the event.
 */
// tslint:disable-next-line:only-arrow-functions
function ModelEventSubscriber(event) {
  return function (modelPrototype, propertyKey) {
    deferredRegistrations.push(function (installer) {
      return installer.registerModelEvent(modelPrototype.constructor, propertyKey, event, 0 /* Subscriber */);
    });
  };
}
/**
 * Registers the decorated property or method as a publisher for the provided event key or event key provider.
 *
 * The property must be insantiated to an object that extends the RxJS `Observable` class.
 */
// tslint:disable-next-line:only-arrow-functions
function ModelEventPublisher(event) {
  return function (modelPrototype, propertyKey) {
    deferredRegistrations.push(function (installer) {
      return installer.registerModelEvent(modelPrototype.constructor, propertyKey, event, 1 /* Publisher */);
    });
  };
}

/**
 * Model Manager creates, destroys and tracks existing models. It is used to maintain relationships between
 * models.
 */
var ModelManager = /** @class */ (function () {
  function ModelManager(logger, modelCreatedEvent, modelDestroyedEvent, beforeModelDestroyedEvent) {
    this.logger = logger;
    this.modelCreatedEvent = modelCreatedEvent;
    this.modelDestroyedEvent = modelDestroyedEvent;
    this.beforeModelDestroyedEvent = beforeModelDestroyedEvent;
    this.modelInstanceMap = new WeakMap();
    this.apiBuilders = [];
    this.decorators = [];
  }
  /**
   * Constructs (@see `ModelManager.construct`) then initializes (@see `ModelManager.initialize`) it
   *
   * Throws Error if a parent is provided which is not tracked
   */
  ModelManager.prototype.create = function (modelClass, parent) {
    return this.initialize(this.construct(modelClass, parent));
  };
  /**
   * Initializes the provided model instance, calling appropriate lifecycle hooks and marking it
   * ready.
   */
  ModelManager.prototype.initialize = function (modelInstance) {
    if (this.modelHasInitHook(modelInstance)) {
      modelInstance.modelOnInit();
    }
    return modelInstance;
  };
  /**
   * Constructs the provided class, tracking its relationships to other models based on the provided
   * parent.
   *
   * Models must be created through this method and cannot take constructor parameters.
   *
   * This does not initialize the model, which must be done separately. @see `ModelManager.initialize`
   *
   * Throws Error if a parent is provided which is not tracked
   */
  ModelManager.prototype.construct = function (modelClass, parent) {
    var instance = new modelClass();
    this.modelInstanceMap.set(instance, {
      parent: parent,
      children: []
    });
    if (parent) {
      this.trackNewChild(parent, instance);
    }
    var modelApi = this.buildApiForModel(instance);
    this.decorators.forEach(function (decorator) {
      return decorator.decorate(instance, modelApi);
    });
    this.modelCreatedEvent.publish(instance);
    return instance;
  };
  /**
   * Untracks any model instances descending from the provided value.
   *
   * If `value` is a model, it will be untracked along with its descendents, starting from the leaf of the model tree.
   * That is, a child will always be destroyed before its parent.
   *
   * If `value` is an array, each of its object-typed values will be recursively passed to this function.
   *
   * If `value` is a non-model, non-array object, each of its object-typed values will be recursively passed to this
   * function.
   *
   * If the value is a primitve or no model is found, no action is taken.
   */
  ModelManager.prototype.destroy = function (value) {
    var _this = this;
    if (typeof value !== 'object' || !value) {
      return;
    }
    if (this.modelInstanceMap.has(value)) {
      this.destroyModel(value);
    } else if (Array.isArray(value)) {
      value.forEach(function (arrayValue) {
        return _this.destroy(arrayValue);
      });
    } else {
      Object.values(value).forEach(function (objectValue) {
        return _this.destroy(objectValue);
      });
    }
  };
  /**
   * Returns a copy of the children registered to the provided model.
   *
   * Throws Error if the provided instance is not tracked
   */
  ModelManager.prototype.getChildren = function (modelInstance) {
    return this.getInstanceDataOrThrow(modelInstance).children;
  };
  /**
   * Returns the parent registered to the provided model, or undefined if
   * no parent is registered.
   *
   * Throws Error if the provided instance is not tracked
   */
  ModelManager.prototype.getParent = function (modelInstance) {
    return this.getInstanceDataOrThrow(modelInstance).parent;
  };
  /**
   * Returns the root node in the model tree to which the provided instance
   * belongs. Returns itself if the provided node is a root.
   *
   * Throws Error if the provided instance is not tracked
   */
  ModelManager.prototype.getRoot = function (modelInstance) {
    var currentModel = modelInstance;
    var currentModelParent = this.getParent(currentModel);
    while (currentModelParent) {
      currentModel = currentModelParent;
      currentModelParent = this.getParent(currentModel);
    }
    return currentModel;
  };
  /**
   * Returns true if `potentialAncestor` is an ancestor of `model`.
   * Returns false otherwise, including if `model === potentialAncestor`.
   * Throws Error if `model` is not tracked
   */
  ModelManager.prototype.isAncestor = function (model, potentialAncestor) {
    var currentAncestor = model;
    while (currentAncestor) {
      currentAncestor = this.getParent(currentAncestor);
      if (currentAncestor === potentialAncestor) {
        return true;
      }
    }
    return false;
  };
  /**
   * Adds the provided API builder to the search list. The first builder that matches a given model,
   * in the order registered, will be used.
   */
  ModelManager.prototype.registerModelApiBuilder = function (modelApiBuilder) {
    this.apiBuilders.push(modelApiBuilder);
  };
  /**
   * Returns true if the provided value is a tracked model, false otherwise
   */
  ModelManager.prototype.isTrackedModel = function (value) {
    if (typeof value !== 'object' || value === null) {
      return false;
    }
    return this.modelInstanceMap.has(value);
  };
  /**
   * Registeres a ModelDecorator which will be called when creating all future
   * model instances. @see `ModelDecorator`
   */
  ModelManager.prototype.registerDecorator = function (decorator) {
    this.decorators.push(decorator);
  };
  ModelManager.prototype.removeChildFromParent = function (parent, childToRemove) {
    var originalParentData = this.getInstanceDataOrThrow(parent);
    var newParentData = __assign(__assign({}, originalParentData), {
      children: without(originalParentData.children, childToRemove)
    });
    this.modelInstanceMap.set(parent, newParentData);
  };
  ModelManager.prototype.trackNewChild = function (parent, newChild) {
    var originalParentData = this.getInstanceDataOrThrow(parent);
    var newParentData = __assign(__assign({}, originalParentData), {
      children: originalParentData.children.concat(newChild)
    });
    this.modelInstanceMap.set(parent, newParentData);
  };
  ModelManager.prototype.getInstanceDataOrThrow = function (instance) {
    var _this = this;
    if (!this.modelInstanceMap.has(instance)) {
      this.logger.warn('Could not retrieve data for provided instance, it has not been registered').throw();
    }
    // Make sure this isn't mutated by always returning a copy, only leaving actual models in tact
    var cloneFunction = function (value) {
      return _this.modelInstanceMap.has(value) ? value : undefined;
    };
    return cloneDeepWith(this.modelInstanceMap.get(instance), cloneFunction);
  };
  ModelManager.prototype.modelHasInitHook = function (model) {
    return typeof model.modelOnInit === 'function';
  };
  ModelManager.prototype.modelHasDestroyHook = function (model) {
    return typeof model.modelOnDestroy === 'function';
  };
  ModelManager.prototype.buildApiForModel = function (model) {
    var matchingBuilder = this.apiBuilders.find(function (builder) {
      return builder.matches(model);
    });
    if (!matchingBuilder) {
      return this.logger.error('No model API builder registered matching provided model').throw();
    }
    return matchingBuilder.build(model);
  };
  ModelManager.prototype.destroyModel = function (modelInstance) {
    var _this = this;
    var instanceData = this.getInstanceDataOrThrow(modelInstance);
    // Depth first, destroy children before self
    instanceData.children.forEach(function (child) {
      return _this.destroy(child);
    });
    this.beforeModelDestroyedEvent.publish(modelInstance);
    if (this.modelHasDestroyHook(modelInstance)) {
      modelInstance.modelOnDestroy();
    }
    if (instanceData.parent) {
      this.removeChildFromParent(instanceData.parent, modelInstance);
    }
    this.modelInstanceMap.delete(modelInstance);
    this.modelDestroyedEvent.publish(modelInstance);
  };
  return ModelManager;
})();

/**
 * Store of metadata information about supported property types
 */
var ModelPropertyTypeLibrary = /** @class */ (function () {
  function ModelPropertyTypeLibrary(logger) {
    this.logger = logger;
    this.propertyTypeMap = new Map();
  }
  /**
   * Registers the provided property type. No action is taken if the property type has
   * already been registered
   */
  ModelPropertyTypeLibrary.prototype.registerPropertyType = function (propertyTypeData) {
    if (this.propertyTypeMap.has(propertyTypeData.type)) {
      this.logger.error('Property type has already been registered: [' + propertyTypeData.type + ']');
      return;
    }
    this.propertyTypeMap.set(
      propertyTypeData.type,
      this.convertPropertyTypeRegistrationInfoToMetadata(propertyTypeData)
    );
  };
  /**
   * Retrieves the validator function for the provided property type. Returns NO-OP validator
   * if the property type has not been registered.
   */
  ModelPropertyTypeLibrary.prototype.getValidator = function (type) {
    var metadata = this.getMetadataOrLog(type);
    return metadata ? metadata.validator : ModelPropertyTypeLibrary.NO_OP_VALIDATOR;
  };
  /**
   * Retrieves the customer serializer function for the provided property type. Returns undefined if
   * the property type has not been registered, or if no serializer exists.
   */
  ModelPropertyTypeLibrary.prototype.getPropertySerializer = function (type) {
    var metadata = this.getMetadataOrLog(type);
    return metadata && metadata.serializer;
  };
  /**
   * Retrieves the customer deserializer function for the provided property type. Returns undefined if
   * the property type has not been registered, or if no deserializer exists.
   */
  ModelPropertyTypeLibrary.prototype.getPropertyDeserializer = function (type) {
    var metadata = this.getMetadataOrLog(type);
    return metadata && metadata.deserializer;
  };
  ModelPropertyTypeLibrary.prototype.convertPropertyTypeRegistrationInfoToMetadata = function (registrationInfo) {
    return {
      validator: this.bindPotentialFunction(registrationInfo, 'validator') || ModelPropertyTypeLibrary.NO_OP_VALIDATOR,
      serializer: this.bindPotentialFunction(registrationInfo, 'serializer'),
      deserializer: this.bindPotentialFunction(registrationInfo, 'deserializer')
    };
  };
  ModelPropertyTypeLibrary.prototype.getMetadataOrLog = function (type) {
    var typeKey = this.typeToKey(type);
    if (this.propertyTypeMap.has(typeKey)) {
      return this.propertyTypeMap.get(typeKey);
    }
    this.logger.warn('Requested property type has not been registered: ' + typeKey);
  };
  ModelPropertyTypeLibrary.prototype.typeToKey = function (type) {
    return typeof type === 'string' ? type : type.key;
  };
  // tslint:disable-next-line: ban-types
  ModelPropertyTypeLibrary.prototype.bindPotentialFunction = function (object, key) {
    var potentialFunction = object[key];
    // tslint:disable-next-line: strict-type-predicates
    if (typeof potentialFunction === 'function') {
      return potentialFunction.bind(object);
    }
    return potentialFunction;
  };
  ModelPropertyTypeLibrary.NO_OP_VALIDATOR = function () {
    return undefined;
  };
  return ModelPropertyTypeLibrary;
})();

var ARRAY_PROPERTY = Object.freeze({
  type: 'array',
  validator: function (value, allowUndefinedOrNull) {
    if (allowUndefinedOrNull && isNil(value)) {
      return undefined;
    }
    if (isNil(value)) {
      return 'Required property got ' + value + ' value';
    }
    if (Array.isArray(value)) {
      return undefined;
    }
    return 'Provided value is not an Array, detected: ' + typeof value;
  }
});

/**
 * Performs validation of a single value, warning or throwing an error based on configuration
 * if validation does not pass.
 */
var ModelPropertyValidator = /** @class */ (function () {
  function ModelPropertyValidator(modelPropertyTypeLibrary, logger) {
    this.modelPropertyTypeLibrary = modelPropertyTypeLibrary;
    this.logger = logger;
    this.strictSchema = true;
  }
  /**
   * Performs the validation, throwing an error in strict mode or logging a warning otherwise
   */
  ModelPropertyValidator.prototype.validate = function (value, propertyMetadata) {
    var validator = this.modelPropertyTypeLibrary.getValidator(propertyMetadata.type);
    var error = validator(value, !propertyMetadata.required, propertyMetadata.type);
    if (isEmpty(error)) {
      return;
    }
    var errorMessage = 'Validation error for property [' + String(propertyMetadata.runtimeKey) + ']: ' + error;
    if (this.strictSchema) {
      return this.logger.error(errorMessage).throw();
    }
    this.logger.warn(errorMessage);
  };
  /**
   * If true, any validation errors are thrown as runtime errors
   */
  ModelPropertyValidator.prototype.setStrictSchema = function (checkSchema) {
    this.strictSchema = checkSchema;
  };
  return ModelPropertyValidator;
})();

var commonjsGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {};

function createCommonjsModule(fn, module) {
  return (module = { exports: {} }), fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this;
  })() ||
  Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] != 7
  );
});

var functionBindNative = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = function () {
    /* empty */
  }.bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var call$1 = Function.prototype.call;

var functionCall = functionBindNative
  ? call$1.bind(call$1)
  : function () {
      return call$1.apply(call$1, arguments);
    };

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
var f$6 = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$1(this, V);
      return !!descriptor && descriptor.enumerable;
    }
  : $propertyIsEnumerable;

var objectPropertyIsEnumerable = {
  f: f$6
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var FunctionPrototype$1 = Function.prototype;
var bind$1 = FunctionPrototype$1.bind;
var call = FunctionPrototype$1.call;
var uncurryThis = functionBindNative && bind$1.bind(call, call);

var functionUncurryThis = functionBindNative
  ? function (fn) {
      return fn && uncurryThis(fn);
    }
  : function (fn) {
      return (
        fn &&
        function () {
          return call.apply(fn, arguments);
        }
      );
    };

var toString$1 = functionUncurryThis({}.toString);
var stringSlice = functionUncurryThis(''.slice);

var classofRaw = function (it) {
  return stringSlice(toString$1(it), 8, -1);
};

var Object$5 = global_1.Object;
var split = functionUncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$5('z').propertyIsEnumerable(0);
})
  ? function (it) {
      return classofRaw(it) == 'String' ? split(it, '') : Object$5(it);
    }
  : Object$5;

var TypeError$b = global_1.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError$b("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings

var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable = function (argument) {
  return typeof argument == 'function';
};

var isObject = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global_1[namespace]) : global_1[namespace] && global_1[namespace][method];
};

var objectIsPrototypeOf = functionUncurryThis({}.isPrototypeOf);

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process = global_1.process;
var Deno = global_1.Deno;
var versions = (process && process.versions) || (Deno && Deno.version);
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es-x/no-symbol -- required for testing */

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return (
      !String(symbol) ||
      !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (!Symbol.sham && engineV8Version && engineV8Version < 41)
    );
  });

/* eslint-disable es-x/no-symbol -- required for testing */

var useSymbolAsUid = nativeSymbol && !Symbol.sham && typeof Symbol.iterator == 'symbol';

var Object$4 = global_1.Object;

var isSymbol = useSymbolAsUid
  ? function (it) {
      return typeof it == 'symbol';
    }
  : function (it) {
      var $Symbol = getBuiltIn('Symbol');
      return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, Object$4(it));
    };

var String$3 = global_1.String;

var tryToString = function (argument) {
  try {
    return String$3(argument);
  } catch (error) {
    return 'Object';
  }
};

var TypeError$a = global_1.TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError$a(tryToString(argument) + ' is not a function');
};

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

var TypeError$9 = global_1.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable((fn = input.toString)) && !isObject((val = functionCall(fn, input)))) return val;
  if (isCallable((fn = input.valueOf)) && !isObject((val = functionCall(fn, input)))) return val;
  if (pref !== 'string' && isCallable((fn = input.toString)) && !isObject((val = functionCall(fn, input)))) return val;
  throw TypeError$9("Can't convert object to primitive value");
};

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$2 = Object.defineProperty;

var defineGlobalProperty = function (key, value) {
  try {
    defineProperty$2(global_1, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global_1[key] = value;
  }
  return value;
};

var SHARED = '__core-js_shared__';
var store$3 = global_1[SHARED] || defineGlobalProperty(SHARED, {});

var sharedStore = store$3;

var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.22.7',
    mode: 'global',
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.22.7/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });
});

var Object$3 = global_1.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object$3(requireObjectCoercible(argument));
};

var hasOwnProperty = functionUncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
var hasOwnProperty_1 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
  };

var id$1 = 0;
var postfix = Math.random();
var toString = functionUncurryThis((1.0).toString);

var uid = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id$1 + postfix, 36);
};

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : (Symbol$1 && Symbol$1.withoutSetter) || uid;

var wellKnownSymbol = function (name) {
  if (
    !hasOwnProperty_1(WellKnownSymbolsStore, name) ||
    !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')
  ) {
    var description = 'Symbol.' + name;
    if (nativeSymbol && hasOwnProperty_1(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (useSymbolAsUid && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }
  return WellKnownSymbolsStore[name];
};

var TypeError$8 = global_1.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = functionCall(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError$8("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine =
  !descriptors &&
  !fails(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return (
      Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function () {
          return 7;
        }
      }).a != 7
    );
  });

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
var f$5 = descriptors
  ? $getOwnPropertyDescriptor$1
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O);
      P = toPropertyKey(P);
      if (ie8DomDefine)
        try {
          return $getOwnPropertyDescriptor$1(O, P);
        } catch (error) {
          /* empty */
        }
      if (hasOwnProperty_1(O, P))
        return createPropertyDescriptor(!functionCall(objectPropertyIsEnumerable.f, O, P), O[P]);
    };

var objectGetOwnPropertyDescriptor = {
  f: f$5
};

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug =
  descriptors &&
  fails(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return (
      Object.defineProperty(
        function () {
          /* empty */
        },
        'prototype',
        {
          value: 42,
          writable: false
        }
      ).prototype != 42
    );
  });

var String$2 = global_1.String;
var TypeError$7 = global_1.TypeError;

// `Assert: Type(argument) is Object`
var anObject = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError$7(String$2(argument) + ' is not an object');
};

var TypeError$6 = global_1.TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
var f$4 = descriptors
  ? v8PrototypeDefineBug
    ? function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPropertyKey(P);
        anObject(Attributes);
        if (
          typeof O === 'function' &&
          P === 'prototype' &&
          'value' in Attributes &&
          WRITABLE in Attributes &&
          !Attributes[WRITABLE]
        ) {
          var current = $getOwnPropertyDescriptor(O, P);
          if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
              configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
              enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
              writable: false
            };
          }
        }
        return $defineProperty(O, P, Attributes);
      }
    : $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPropertyKey(P);
      anObject(Attributes);
      if (ie8DomDefine)
        try {
          return $defineProperty(O, P, Attributes);
        } catch (error) {
          /* empty */
        }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError$6('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

var objectDefineProperty = {
  f: f$4
};

var createNonEnumerableProperty = descriptors
  ? function (object, key, value) {
      return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
    }
  : function (object, key, value) {
      object[key] = value;
      return object;
    };

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = descriptors && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwnProperty_1(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER =
  EXISTS &&
  function something() {
    /* empty */
  }.name === 'something';
var CONFIGURABLE = EXISTS && (!descriptors || (descriptors && getDescriptor(FunctionPrototype, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var functionToString = functionUncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(sharedStore.inspectSource)) {
  sharedStore.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap$3 = global_1.WeakMap;

var nativeWeakMap = isCallable(WeakMap$3) && /native code/.test(inspectSource(WeakMap$3));

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$1 = {};

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$5 = global_1.TypeError;
var WeakMap$2 = global_1.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$5('Incompatible receiver, ' + TYPE + ' required');
    }
    return state;
  };
};

if (nativeWeakMap || sharedStore.state) {
  var store$2 = sharedStore.state || (sharedStore.state = new WeakMap$2());
  var wmget = functionUncurryThis(store$2.get);
  var wmhas = functionUncurryThis(store$2.has);
  var wmset = functionUncurryThis(store$2.set);
  set = function (it, metadata) {
    if (wmhas(store$2, it)) throw new TypeError$5(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store$2, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store$2, it) || {};
  };
  has = function (it) {
    return wmhas(store$2, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys$1[STATE] = true;
  set = function (it, metadata) {
    if (hasOwnProperty_1(it, STATE)) throw new TypeError$5(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwnProperty_1(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwnProperty_1(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var makeBuiltIn_1 = createCommonjsModule(function (module) {
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

  var enforceInternalState = internalState.enforce;
  var getInternalState = internalState.get;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  var defineProperty = Object.defineProperty;

  var CONFIGURABLE_LENGTH =
    descriptors &&
    !fails(function () {
      return (
        defineProperty(
          function () {
            /* empty */
          },
          'length',
          { value: 8 }
        ).length !== 8
      );
    });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn = (module.exports = function (value, name, options) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwnProperty_1(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      defineProperty(value, 'name', { value: name, configurable: true });
    }
    if (CONFIGURABLE_LENGTH && options && hasOwnProperty_1(options, 'arity') && value.length !== options.arity) {
      defineProperty(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwnProperty_1(options, 'constructor') && options.constructor) {
        if (descriptors) defineProperty(value, 'prototype', { writable: false });
        // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) {
      /* empty */
    }
    var state = enforceInternalState(value);
    if (!hasOwnProperty_1(state, 'source')) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
    return value;
  });

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn(function toString() {
    return (isCallable(this) && getInternalState(this).source) || inspectSource(this);
  }, 'toString');
});

var defineBuiltIn = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn_1(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    if (!options.unsafe) delete O[key];
    else if (O[key]) simple = true;
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  }
  return O;
};

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
var mathTrunc =
  Math.trunc ||
  function trunc(x) {
    var n = +x;
    return (n > 0 ? floor : ceil)(n);
  };

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : mathTrunc(number);
};

var max$1 = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1fffffffffffff) : 0; // 2 ** 53 - 1 == 9007199254740991
};

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike = function (obj) {
  return toLength(obj.length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
      }
    else
      for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$1(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$1(false)
};

var indexOf = arrayIncludes.indexOf;

var push$3 = functionUncurryThis([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwnProperty_1(hiddenKeys$1, key) && hasOwnProperty_1(O, key) && push$3(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i)
    if (hasOwnProperty_1(O, (key = names[i++]))) {
      ~indexOf(result, key) || push$3(result, key);
    }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
var f$3 =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys);
  };

var objectGetOwnPropertyNames = {
  f: f$3
};

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
var f$2 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
  f: f$2
};

var concat$1 = functionUncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys =
  getBuiltIn('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
  };

var copyConstructorProperties = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwnProperty_1(target, key) && !(exceptions && hasOwnProperty_1(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};

var normalize = (isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
});

var data = (isForced.data = {});
var NATIVE = (isForced.NATIVE = 'N');
var POLYFILL = (isForced.POLYFILL = 'P');

var isForced_1 = isForced;

var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target)
    for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      defineBuiltIn(target, key, sourceProperty, options);
    }
};

var createProperty = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var Array$2 = global_1.Array;
var max = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = Array$2(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};

/* eslint-disable es-x/no-object-getownpropertynames -- safe */

var $getOwnPropertyNames = objectGetOwnPropertyNames.f;

var windowNames =
  typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySliceSimple(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var f$1 = function getOwnPropertyNames(it) {
  return windowNames && classofRaw(it) == 'Window' ? getWindowNames(it) : $getOwnPropertyNames(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
  f: f$1
};

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it

var arrayBufferNonExtensible = fails(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});

// eslint-disable-next-line es-x/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () {
  $isExtensible(1);
});

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
var objectIsExtensible =
  FAILS_ON_PRIMITIVES || arrayBufferNonExtensible
    ? function isExtensible(it) {
        if (!isObject(it)) return false;
        if (arrayBufferNonExtensible && classofRaw(it) == 'ArrayBuffer') return false;
        return $isExtensible ? $isExtensible(it) : true;
      }
    : $isExtensible;

var freezing = !fails(function () {
  // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = createCommonjsModule(function (module) {
  var defineProperty = objectDefineProperty.f;

  var REQUIRED = false;
  var METADATA = uid('meta');
  var id = 0;

  var setMetadata = function (it) {
    defineProperty(it, METADATA, {
      value: {
        objectID: 'O' + id++, // object ID
        weakData: {} // weak collections IDs
      }
    });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!hasOwnProperty_1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!objectIsExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
      // return object ID
    }
    return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!hasOwnProperty_1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!objectIsExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
      // return the store of weak collections IDs
    }
    return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (freezing && REQUIRED && objectIsExtensible(it) && !hasOwnProperty_1(it, METADATA)) setMetadata(it);
    return it;
  };

  var enable = function () {
    meta.enable = function () {
      /* empty */
    };
    REQUIRED = true;
    var getOwnPropertyNames = objectGetOwnPropertyNames.f;
    var splice = functionUncurryThis([].splice);
    var test = {};
    test[METADATA] = 1;

    // prevent exposing of metadata key
    if (getOwnPropertyNames(test).length) {
      objectGetOwnPropertyNames.f = function (it) {
        var result = getOwnPropertyNames(it);
        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice(result, i, 1);
            break;
          }
        }
        return result;
      };

      _export(
        { target: 'Object', stat: true, forced: true },
        {
          getOwnPropertyNames: objectGetOwnPropertyNamesExternal.f
        }
      );
    }
  };

  var meta = (module.exports = {
    enable: enable,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  });

  hiddenKeys$1[METADATA] = true;
});
internalMetadata.enable;
internalMetadata.fastKey;
internalMetadata.getWeakData;
internalMetadata.onFreeze;

var bind = functionUncurryThis(functionUncurryThis.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable(fn);
  return that === undefined
    ? fn
    : functionBindNative
    ? bind(fn, that)
    : function (/* ...args */) {
        return fn.apply(that, arguments);
      };
};

var iterators = {};

var ITERATOR$4 = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$4] === it);
};

var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG$2] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
var Object$2 = global_1.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS =
  classofRaw(
    (function () {
      return arguments;
    })()
  ) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = toStringTagSupport
  ? classofRaw
  : function (it) {
      var O, tag, result;
      return it === undefined
        ? 'Undefined'
        : it === null
        ? 'Null'
        : // @@toStringTag case
        typeof (tag = tryGet((O = Object$2(it)), TO_STRING_TAG$1)) == 'string'
        ? tag
        : // builtinTag case
        CORRECT_ARGUMENTS
        ? classofRaw(O)
        : // ES3 arguments fallback
        (result = classofRaw(O)) == 'Object' && isCallable(O.callee)
        ? 'Arguments'
        : result;
    };

var ITERATOR$3 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR$3) || getMethod(it, '@@iterator') || iterators[classof(it)];
};

var TypeError$4 = global_1.TypeError;

var getIterator = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(functionCall(iteratorMethod, argument));
  throw TypeError$4(tryToString(argument) + ' is not iterable');
};

var iteratorClose = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = functionCall(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

var TypeError$3 = global_1.TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = functionBindContext(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }
    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError$3(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && objectIsPrototypeOf(ResultPrototype, result)) return result;
      }
      return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = functionCall(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && objectIsPrototypeOf(ResultPrototype, result)) return result;
  }
  return new Result(false);
};

var TypeError$2 = global_1.TypeError;

var anInstance = function (it, Prototype) {
  if (objectIsPrototypeOf(Prototype, it)) return it;
  throw TypeError$2('Incorrect invocation');
};

var ITERATOR$2 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    return: function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$2] = function () {
    return this;
  };
  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$2] = function () {
      return {
        next: function () {
          return { done: (ITERATION_SUPPORT = true) };
        }
      };
    };
    exec(object);
  } catch (error) {
    /* empty */
  }
  return ITERATION_SUPPORT;
};

var defineProperty$1 = objectDefineProperty.f;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var setToStringTag = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwnProperty_1(target, TO_STRING_TAG)) {
    defineProperty$1(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

var String$1 = global_1.String;
var TypeError$1 = global_1.TypeError;

var aPossiblePrototype = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError$1("Can't set " + String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
var objectSetPrototypeOf =
  Object.setPrototypeOf ||
  ('__proto__' in {}
    ? (function () {
        var CORRECT_SETTER = false;
        var test = {};
        var setter;
        try {
          // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
          setter = functionUncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
          setter(test, []);
          CORRECT_SETTER = test instanceof Array;
        } catch (error) {
          /* empty */
        }
        return function setPrototypeOf(O, proto) {
          anObject(O);
          aPossiblePrototype(proto);
          if (CORRECT_SETTER) setter(O, proto);
          else O.__proto__ = proto;
          return O;
        };
      })()
    : undefined);

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    objectSetPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable((NewTarget = dummy.constructor)) &&
    NewTarget !== Wrapper &&
    isObject((NewTargetPrototype = NewTarget.prototype)) &&
    NewTargetPrototype !== Wrapper.prototype
  )
    objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = functionUncurryThis(NativePrototype[KEY]);
    defineBuiltIn(
      NativePrototype,
      KEY,
      KEY == 'add'
        ? function add(value) {
            uncurriedNativeMethod(this, value === 0 ? 0 : value);
            return this;
          }
        : KEY == 'delete'
        ? function (key) {
            return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
          }
        : KEY == 'get'
        ? function get(key) {
            return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
          }
        : KEY == 'has'
        ? function has(key) {
            return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
          }
        : function set(key, value) {
            uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
            return this;
          }
    );
  };

  var REPLACE = isForced_1(
    CONSTRUCTOR_NAME,
    !isCallable(NativeConstructor) ||
      !(
        IS_WEAK ||
        (NativePrototype.forEach &&
          !fails(function () {
            new NativeConstructor().entries().next();
          }))
      )
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.enable();
  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
      new NativeConstructor(iterable);
    });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO =
      !IS_WEAK &&
      fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, NativePrototype);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  _export({ global: true, constructor: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
var objectKeys =
  Object.keys ||
  function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
var f =
  descriptors && !v8PrototypeDefineBug
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        anObject(O);
        var props = toIndexedObject(Properties);
        var keys = objectKeys(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while (length > index) objectDefineProperty.f(O, (key = keys[index++]), props[key]);
        return O;
      };

var objectDefineProperties = {
  f: f
};

var html = getBuiltIn('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }
  NullProtoObject =
    typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys$1[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
var objectCreate =
  Object.create ||
  function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties.f(result, Properties);
  };

var defineBuiltIns = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};

var correctPrototypeGetter = !fails(function () {
  function F() {
    /* empty */
  }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO = sharedKey('IE_PROTO');
var Object$1 = global_1.Object;
var ObjectPrototype = Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter
  ? Object$1.getPrototypeOf
  : function (O) {
      var object = toObject(O);
      if (hasOwnProperty_1(object, IE_PROTO)) return object[IE_PROTO];
      var constructor = object.constructor;
      if (isCallable(constructor) && object instanceof constructor) {
        return constructor.prototype;
      }
      return object instanceof Object$1 ? ObjectPrototype : null;
    };

var ITERATOR$1 = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es-x/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE =
  IteratorPrototype$2 == undefined ||
  fails(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$1].call(test) !== test;
  });

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype$2[ITERATOR$1])) {
  defineBuiltIn(IteratorPrototype$2, ITERATOR$1, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var returnThis$1 = function () {
  return this;
};

var createIteratorConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
    next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var PROPER_FUNCTION_NAME = functionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var IteratorPrototype = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () {
  return this;
};

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };
      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };
      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }
    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator =
    IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || (DEFAULT && IterablePrototype[DEFAULT]);
  var defaultIterator = (!BUGGY_SAFARI_ITERATORS && nativeIterator) || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() {
        return functionCall(nativeIterator, this);
      };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED)
      for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
        }
      }
    else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  iterators[NAME] = defaultIterator;

  return methods;
};

var SPECIES$1 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$1]) {
    defineProperty(Constructor, SPECIES$1, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};

var defineProperty = objectDefineProperty.f;

var fastKey = internalMetadata.fastKey;

var setInternalState$1 = internalState.set;
var internalStateGetterFor$1 = internalState.getterFor;

var collectionStrong = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState$1(that, {
        type: CONSTRUCTOR_NAME,
        index: objectCreate(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!descriptors) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
        // create new entry
      } else {
        state.last = entry = {
          index: (index = fastKey(key, true)),
          key: key,
          value: value,
          previous: (previous = state.last),
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (descriptors) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      }
      return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    defineBuiltIns(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (descriptors) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      delete: function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (descriptors) state.size--;
          else that.size--;
        }
        return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        var entry;
        while ((entry = entry ? entry.next : state.first)) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    defineBuiltIns(
      Prototype,
      IS_MAP
        ? {
            // `Map.prototype.get(key)` method
            // https://tc39.es/ecma262/#sec-map.prototype.get
            get: function get(key) {
              var entry = getEntry(this, key);
              return entry && entry.value;
            },
            // `Map.prototype.set(key, value)` method
            // https://tc39.es/ecma262/#sec-map.prototype.set
            set: function set(key, value) {
              return define(this, key === 0 ? 0 : key, value);
            }
          }
        : {
            // `Set.prototype.add(value)` method
            // https://tc39.es/ecma262/#sec-set.prototype.add
            add: function add(value) {
              return define(this, (value = value === 0 ? 0 : value), value);
            }
          }
    );
    if (descriptors)
      defineProperty(Prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
    return Constructor;
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(
      Constructor,
      CONSTRUCTOR_NAME,
      function (iterated, kind) {
        setInternalState$1(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      },
      function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return { value: undefined, done: true };
        }
        // return step by kind
        if (kind == 'keys') return { value: entry.key, done: false };
        if (kind == 'values') return { value: entry.value, done: false };
        return { value: [entry.key, entry.value], done: false };
      },
      IS_MAP ? 'entries' : 'values',
      !IS_MAP,
      true
    );

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};
collectionStrong.getConstructor;
collectionStrong.setStrong;

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
collection(
  'Map',
  function (init) {
    return function Map() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  },
  collectionStrong
);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe
var isArray =
  Array.isArray ||
  function isArray(argument) {
    return classofRaw(argument) == 'Array';
  };

var noop = function () {
  /* empty */
};
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = functionUncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor =
  !construct ||
  fails(function () {
    var called;
    return (
      isConstructorModern(isConstructorModern.call) ||
      !isConstructorModern(Object) ||
      !isConstructorModern(function () {
        called = true;
      }) ||
      called
    );
  })
    ? isConstructorLegacy
    : isConstructorModern;

var SPECIES = wellKnownSymbol('species');
var Array$1 = global_1.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array$1 || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }
  return C === undefined ? Array$1 : C;
};

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var push$2 = functionUncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (; length > index; index++)
      if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result)
            switch (TYPE) {
              case 3:
                return true; // some
              case 5:
                return value; // find
              case 6:
                return index; // findIndex
              case 2:
                push$2(target, value); // filter
            }
          else
            switch (TYPE) {
              case 4:
                return false; // every
              case 7:
                push$2(target, value); // filterReject
            }
        }
      }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};

var getWeakData = internalMetadata.getWeakData;

var setInternalState = internalState.set;
var internalStateGetterFor = internalState.getterFor;
var find = arrayIteration.find;
var findIndex = arrayIteration.findIndex;
var splice = functionUncurryThis([].splice);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  delete: function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) splice(this.entries, index, 1);
    return !!~index;
  }
};

var collectionWeak = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    defineBuiltIns(Prototype, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      delete: function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && hasOwnProperty_1(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && hasOwnProperty_1(data, state.id);
      }
    });

    defineBuiltIns(
      Prototype,
      IS_MAP
        ? {
            // `WeakMap.prototype.get(key)` method
            // https://tc39.es/ecma262/#sec-weakmap.prototype.get
            get: function get(key) {
              var state = getInternalState(this);
              if (isObject(key)) {
                var data = getWeakData(key);
                if (data === true) return uncaughtFrozenStore(state).get(key);
                return data ? data[state.id] : undefined;
              }
            },
            // `WeakMap.prototype.set(key, value)` method
            // https://tc39.es/ecma262/#sec-weakmap.prototype.set
            set: function set(key, value) {
              return define(this, key, value);
            }
          }
        : {
            // `WeakSet.prototype.add(value)` method
            // https://tc39.es/ecma262/#sec-weakset.prototype.add
            add: function add(value) {
              return define(this, value, true);
            }
          }
    );

    return Constructor;
  }
};
collectionWeak.getConstructor;

var enforceInternalState = internalState.enforce;

var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = collection('WeakMap', wrapper, collectionWeak);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (nativeWeakMap && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  internalMetadata.enable();
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = functionUncurryThis(WeakMapPrototype['delete']);
  var nativeHas = functionUncurryThis(WeakMapPrototype.has);
  var nativeGet = functionUncurryThis(WeakMapPrototype.get);
  var nativeSet = functionUncurryThis(WeakMapPrototype.set);
  defineBuiltIns(WeakMapPrototype, {
    delete: function (key) {
      if (isObject(key) && !objectIsExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete(this, key) || state.frozen['delete'](key);
      }
      return nativeDelete(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !objectIsExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) || state.frozen.has(key);
      }
      return nativeHas(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !objectIsExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
      }
      return nativeGet(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !objectIsExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
      } else nativeSet(this, key, value);
      return this;
    }
  });
}

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var Map$2 = getBuiltIn('Map');
var WeakMap$1 = getBuiltIn('WeakMap');
var push$1 = functionUncurryThis([].push);

var metadata = shared('metadata');
var store$1 = metadata.store || (metadata.store = new WeakMap$1());

var getOrCreateMetadataMap$1 = function (target, targetKey, create) {
  var targetMetadata = store$1.get(target);
  if (!targetMetadata) {
    if (!create) return;
    store$1.set(target, (targetMetadata = new Map$2()));
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return;
    targetMetadata.set(targetKey, (keyMetadata = new Map$2()));
  }
  return keyMetadata;
};

var ordinaryHasOwnMetadata$3 = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap$1(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};

var ordinaryGetOwnMetadata$2 = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap$1(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};

var ordinaryDefineOwnMetadata$2 = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap$1(O, P, true).set(MetadataKey, MetadataValue);
};

var ordinaryOwnMetadataKeys$2 = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap$1(target, targetKey, false);
  var keys = [];
  if (metadataMap)
    metadataMap.forEach(function (_, key) {
      push$1(keys, key);
    });
  return keys;
};

var toMetadataKey$9 = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};

var reflectMetadata = {
  store: store$1,
  getMap: getOrCreateMetadataMap$1,
  has: ordinaryHasOwnMetadata$3,
  get: ordinaryGetOwnMetadata$2,
  set: ordinaryDefineOwnMetadata$2,
  keys: ordinaryOwnMetadataKeys$2,
  toKey: toMetadataKey$9
};

// TODO: Remove from `core-js@4`

var toMetadataKey$8 = reflectMetadata.toKey;
var ordinaryDefineOwnMetadata$1 = reflectMetadata.set;

// `Reflect.defineMetadata` method
// https://github.com/rbuckton/reflect-metadata
_export(
  { target: 'Reflect', stat: true },
  {
    defineMetadata: function defineMetadata(metadataKey, metadataValue, target /* , targetKey */) {
      var targetKey = arguments.length < 4 ? undefined : toMetadataKey$8(arguments[3]);
      ordinaryDefineOwnMetadata$1(metadataKey, metadataValue, anObject(target), targetKey);
    }
  }
);

var toMetadataKey$7 = reflectMetadata.toKey;
var getOrCreateMetadataMap = reflectMetadata.getMap;
var store = reflectMetadata.store;

// `Reflect.deleteMetadata` method
// https://github.com/rbuckton/reflect-metadata
_export(
  { target: 'Reflect', stat: true },
  {
    deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey$7(arguments[2]);
      var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
      if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
      if (metadataMap.size) return true;
      var targetMetadata = store.get(target);
      targetMetadata['delete'](targetKey);
      return !!targetMetadata.size || store['delete'](target);
    }
  }
);

// TODO: Remove from `core-js@4`

var ordinaryHasOwnMetadata$2 = reflectMetadata.has;
var ordinaryGetOwnMetadata$1 = reflectMetadata.get;
var toMetadataKey$6 = reflectMetadata.toKey;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata$2(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata$1(MetadataKey, O, P);
  var parent = objectGetPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

// `Reflect.getMetadata` method
// https://github.com/rbuckton/reflect-metadata
_export(
  { target: 'Reflect', stat: true },
  {
    getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey$6(arguments[2]);
      return ordinaryGetMetadata(metadataKey, anObject(target), targetKey);
    }
  }
);

var Map$1 = getBuiltIn('Map');
var MapPrototype = Map$1.prototype;
var mapForEach = functionUncurryThis(MapPrototype.forEach);
var mapHas = functionUncurryThis(MapPrototype.has);
var mapSet = functionUncurryThis(MapPrototype.set);
var push = functionUncurryThis([].push);

// `Array.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
var arrayUniqueBy$1 = function uniqueBy(resolver) {
  var that = toObject(this);
  var length = lengthOfArrayLike(that);
  var result = arraySpeciesCreate(that, 0);
  var map = new Map$1();
  var resolverFunction =
    resolver != null
      ? aCallable(resolver)
      : function (value) {
          return value;
        };
  var index, item, key;
  for (index = 0; index < length; index++) {
    item = that[index];
    key = resolverFunction(item);
    if (!mapHas(map, key)) mapSet(map, key, item);
  }
  mapForEach(map, function (value) {
    push(result, value);
  });
  return result;
};

// TODO: Remove from `core-js@4`

var arrayUniqueBy = functionUncurryThis(arrayUniqueBy$1);
var concat = functionUncurryThis([].concat);
var ordinaryOwnMetadataKeys$1 = reflectMetadata.keys;
var toMetadataKey$5 = reflectMetadata.toKey;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys$1(O, P);
  var parent = objectGetPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? (oKeys.length ? arrayUniqueBy(concat(oKeys, pKeys)) : pKeys) : oKeys;
};

// `Reflect.getMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
_export(
  { target: 'Reflect', stat: true },
  {
    getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
      var targetKey = arguments.length < 2 ? undefined : toMetadataKey$5(arguments[1]);
      return ordinaryMetadataKeys(anObject(target), targetKey);
    }
  }
);

// TODO: Remove from `core-js@4`

var ordinaryGetOwnMetadata = reflectMetadata.get;
var toMetadataKey$4 = reflectMetadata.toKey;

// `Reflect.getOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
_export(
  { target: 'Reflect', stat: true },
  {
    getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey$4(arguments[2]);
      return ordinaryGetOwnMetadata(metadataKey, anObject(target), targetKey);
    }
  }
);

// TODO: Remove from `core-js@4`

var ordinaryOwnMetadataKeys = reflectMetadata.keys;
var toMetadataKey$3 = reflectMetadata.toKey;

// `Reflect.getOwnMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
_export(
  { target: 'Reflect', stat: true },
  {
    getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
      var targetKey = arguments.length < 2 ? undefined : toMetadataKey$3(arguments[1]);
      return ordinaryOwnMetadataKeys(anObject(target), targetKey);
    }
  }
);

// TODO: Remove from `core-js@4`

var ordinaryHasOwnMetadata$1 = reflectMetadata.has;
var toMetadataKey$2 = reflectMetadata.toKey;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata$1(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = objectGetPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

// `Reflect.hasMetadata` method
// https://github.com/rbuckton/reflect-metadata
_export(
  { target: 'Reflect', stat: true },
  {
    hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey$2(arguments[2]);
      return ordinaryHasMetadata(metadataKey, anObject(target), targetKey);
    }
  }
);

// TODO: Remove from `core-js@4`

var ordinaryHasOwnMetadata = reflectMetadata.has;
var toMetadataKey$1 = reflectMetadata.toKey;

// `Reflect.hasOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
_export(
  { target: 'Reflect', stat: true },
  {
    hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
      var targetKey = arguments.length < 3 ? undefined : toMetadataKey$1(arguments[2]);
      return ordinaryHasOwnMetadata(metadataKey, anObject(target), targetKey);
    }
  }
);

var toMetadataKey = reflectMetadata.toKey;
var ordinaryDefineOwnMetadata = reflectMetadata.set;

// `Reflect.metadata` method
// https://github.com/rbuckton/reflect-metadata
_export(
  { target: 'Reflect', stat: true },
  {
    metadata: function metadata(metadataKey, metadataValue) {
      return function decorator(target, key) {
        ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetadataKey(key));
      };
    }
  }
);

// tslint:disable-next-line:no-import-side-effect no-submodule-imports
var PROPERTY_TYPE_METADATA_KEY = 'design:type';
/**
 * Returns any design type metadata for the requested property. Returns undefined if
 * type cannot be resolved. Certain types, like intersections, unions and interfaces
 * will always return Object, as they do not have a runtime representation.
 */
var getReflectedPropertyType = function (classConstructor, propertyKey) {
  var reflectedResult = Reflect.getMetadata(PROPERTY_TYPE_METADATA_KEY, classConstructor.prototype, propertyKey);
  return reflectedResult;
};

/**
 * Model Library represents a story of metadata information describing the models in the system and their properties.
 */
var ModelLibrary = /** @class */ (function () {
  function ModelLibrary(logger) {
    this.logger = logger;
    this.modelConstructorByType = new Map();
    this.modelClassMetadata = new Map();
    this.modelPropertyMetadata = new Map();
    this.lastDeferredIndexRead = 0;
    this.currentlyProcessingDeferred = false;
  }
  /**
   * Registers a model class with the provieded information
   *
   * No action is taken if the model class or type has already been registered
   */
  ModelLibrary.prototype.registerModelClass = function (modelClass, registrationInformation) {
    this.processRegistrationQueue();
    this.trackNewModelType(modelClass, registrationInformation.type);
    if (this.modelClassMetadata.has(modelClass)) {
      this.logger.error('Model classes may not be registered more than once: ' + modelClass.name);
      return;
    }
    this.modelClassMetadata.set(modelClass, this.convertModelRegistrationInfoToMetadata(registrationInformation));
  };
  /**
   * Associates a model property identified by the provided key with a model class.
   *
   * No action is taken if the property key has already been registered
   */
  ModelLibrary.prototype.registerModelProperty = function (modelClass, runtimeKey, registrationInfo) {
    this.processRegistrationQueue();
    var propertyKey = registrationInfo.key;
    if (!this.modelPropertyMetadata.has(modelClass)) {
      this.modelPropertyMetadata.set(modelClass, new Map());
    }
    var propertyMetadataSet = this.modelPropertyMetadata.get(modelClass);
    if (propertyMetadataSet.has(propertyKey)) {
      this.logger.error(
        'Model properties may not be registered more than once: ' + modelClass.name + '.' + propertyKey
      );
      return;
    }
    propertyMetadataSet.set(
      propertyKey,
      this.convertPropertyRegistrationToMetadata(runtimeKey, registrationInfo, modelClass)
    );
  };
  /**
   * Looks up and returns the constructor of the model class associated with the provided string.
   * Returns undefined if no class is found.
   */
  ModelLibrary.prototype.lookupModelClass = function (modelType) {
    this.processRegistrationQueue();
    if (this.modelConstructorByType.has(modelType)) {
      return this.modelConstructorByType.get(modelType);
    }
    this.logger.info('No class registered matching type: ' + modelType);
    return undefined;
  };
  /**
   * Looks up and returns the model metadata for the provided model class.
   * Returns undefined if no type is found.
   */
  ModelLibrary.prototype.lookupModelMetadata = function (modelClass) {
    this.processRegistrationQueue();
    if (this.modelClassMetadata.has(modelClass)) {
      return this.modelClassMetadata.get(modelClass);
    }
    this.logger.info('No type registered matching class: ' + modelClass.name);
    return undefined;
  };
  /**
   * Returns an array of properties registered to the provided model class.
   *
   * Returns empty array if class is not found.
   */
  ModelLibrary.prototype.lookupModelProperties = function (modelClass) {
    this.processRegistrationQueue();
    var modelProperties = [];
    this.getMetadataChain(modelClass, this.modelPropertyMetadata).forEach(function (propertyMetadataMap) {
      Array.from(propertyMetadataMap.values())
        .map(cloneDeep)
        .forEach(function (propertyMetadata) {
          return modelProperties.push(propertyMetadata);
        });
    });
    return modelProperties;
  };
  /**
   * Returns all model classes that contain `modelClass` on their prototype chain, including
   * the provided class if registered.
   */
  ModelLibrary.prototype.getAllCompatibleModelClasses = function (modelClass) {
    this.processRegistrationQueue();
    return Array.from(this.modelClassMetadata.keys()).filter(function (registeredClass) {
      return registeredClass === modelClass || registeredClass.prototype instanceof modelClass;
    });
  };
  ModelLibrary.prototype.trackNewModelType = function (modelClass, modelType) {
    if (this.modelConstructorByType.has(modelType)) {
      this.logger.error('Model types may not be registered more than once: ' + modelType);
      return;
    }
    if (!this.modelPropertyMetadata.has(modelClass)) {
      // Model property should be empty in case no properties were registered
      this.modelPropertyMetadata.set(modelClass, new Map());
    }
    this.modelConstructorByType.set(modelType, modelClass);
  };
  ModelLibrary.prototype.convertModelRegistrationInfoToMetadata = function (registrationInfo) {
    return {
      type: registrationInfo.type,
      displayName: registrationInfo.displayName || this.formatAsDisplayName(registrationInfo.type),
      supportedDataSourceTypes: registrationInfo.supportedDataSourceTypes || []
    };
  };
  /**
   * Each discovered metadata object, in descending order (i.e. `[modelClassParent, modelClass]`)
   */
  ModelLibrary.prototype.getMetadataChain = function (modelClass, metadataMap) {
    var metadataChain = [];
    var constructor = modelClass;
    while (constructor) {
      if (metadataMap.has(constructor)) {
        metadataChain.unshift(metadataMap.get(constructor));
      }
      constructor = Object.getPrototypeOf(constructor);
    }
    return metadataChain;
  };
  ModelLibrary.prototype.convertPropertyRegistrationToMetadata = function (propertyKey, registrationInfo, modelClass) {
    var registrationInfoWithConvertedType = __assign(__assign({}, registrationInfo), {
      type:
        typeof registrationInfo.type === 'string' ? { key: registrationInfo.type } : __assign({}, registrationInfo.type)
    });
    return defaults(registrationInfoWithConvertedType, {
      displayName: this.formatAsDisplayName(registrationInfo.key),
      required: false,
      runtimeKey: propertyKey,
      runtimeType: getReflectedPropertyType(modelClass, propertyKey)
    });
  };
  ModelLibrary.prototype.processRegistrationQueue = function () {
    if (this.currentlyProcessingDeferred) {
      return; // Lazy shortcut lock to prevent infinitely looping on this
    }
    this.currentlyProcessingDeferred = true;
    // tslint:disable-next-line:max-line-length
    for (
      this.lastDeferredIndexRead;
      this.lastDeferredIndexRead < deferredModelDecoratorRegistrations.length;
      this.lastDeferredIndexRead++
    ) {
      var deferredRegistration = deferredModelDecoratorRegistrations[this.lastDeferredIndexRead];
      deferredRegistration(this);
    }
    this.currentlyProcessingDeferred = false;
  };
  ModelLibrary.prototype.formatAsDisplayName = function (input) {
    return startCase(input);
  };
  return ModelLibrary;
})();

/**
 * Handles deserialization of an array type, recursing back to the manager for each value
 */
var ArrayDeserializer = /** @class */ (function () {
  function ArrayDeserializer(deserializationManager) {
    this.deserializationManager = deserializationManager;
  }
  /**
   * @inheritdoc
   */
  ArrayDeserializer.prototype.canDeserialize = function (json) {
    return Array.isArray(json);
  };
  /**
   * @inheritdoc
   */
  ArrayDeserializer.prototype.deserialize = function (array, location) {
    var _this = this;
    var newArray = [];
    var deserializeModelValue = function (value, index) {
      return _this.deserializationManager.deserialize(value, location.buildChildFromObjectAndKey(newArray, index));
    };
    newArray.push.apply(newArray, __spread(array.map(deserializeModelValue)));
    return newArray;
  };
  return ArrayDeserializer;
})();

/**
 * Handles deserialization of a primitive JSON object, recursing back to the manager for each value
 */
var ObjectDeserializer = /** @class */ (function () {
  function ObjectDeserializer(deserializationManager) {
    this.deserializationManager = deserializationManager;
  }
  /**
   * @inheritdoc
   */
  ObjectDeserializer.prototype.canDeserialize = function (json) {
    return typeof json === 'object' && json !== null && Object.getPrototypeOf(json) === Object.prototype;
  };
  /**
   * @inheritdoc
   */
  ObjectDeserializer.prototype.deserialize = function (object, location) {
    var _this = this;
    var newObject = {};
    var deserializeModelValue = function (value, key) {
      return _this.deserializationManager.deserialize(value, location.buildChildFromObjectAndKey(newObject, key));
    };
    // tslint:disable-next-line:prefer-object-spread seems like a questionable rule, breaks behavior here
    return Object.assign(newObject, mapValues(object, deserializeModelValue));
  };
  return ObjectDeserializer;
})();

/**
 * Allows dynamic registration of deserializers, delegating to the first matching
 * Deserializer, by order of registration, for deserialization
 */
var DeserializationManager = /** @class */ (function () {
  function DeserializationManager(logger) {
    this.logger = logger;
    this.deserializers = [];
  }
  /**
   * Adds a new deserialier to the lookup path for deserialization with highest priority
   */
  DeserializationManager.prototype.registerDeserializer = function (deserializer) {
    this.deserializers.unshift(deserializer);
  };
  /**
   * Searches for the first matching deserializer and delegates to it
   *
   * Throws Error if no deserializer can be determined or deserialization fails
   */
  DeserializationManager.prototype.deserialize = function (json, location) {
    return this.getMatchingDeserializer(json).deserialize(json, location);
  };
  DeserializationManager.prototype.getMatchingDeserializer = function (json) {
    var deserializer = this.deserializers.find(function (potentialDeserializer) {
      return potentialDeserializer.canDeserialize(json);
    });
    if (deserializer) {
      return deserializer;
    }
    return this.logger.error('No deserializer registered matching provided json value').throw();
  };
  return DeserializationManager;
})();

/**
 * Handles deserialization of a JSON object with a registered type property,
 * instantiating the associated model class
 */
var ModelDeserializer = /** @class */ (function () {
  function ModelDeserializer(
    deserializationManager,
    modelLibrary,
    modelManager,
    modelPropertyValidator,
    logger,
    dataSourceManager,
    variableManager,
    themeManager,
    modelPropertyTypeLibrary
  ) {
    this.deserializationManager = deserializationManager;
    this.modelLibrary = modelLibrary;
    this.modelManager = modelManager;
    this.modelPropertyValidator = modelPropertyValidator;
    this.logger = logger;
    this.dataSourceManager = dataSourceManager;
    this.variableManager = variableManager;
    this.themeManager = themeManager;
    this.modelPropertyTypeLibrary = modelPropertyTypeLibrary;
  }
  /**
   * @inheritdoc
   */
  ModelDeserializer.prototype.canDeserialize = function (json) {
    return this.isObjectWithTypeProperty(json) && this.isRegisteredModelType(json.type);
  };
  /**
   * @inheritdoc
   */
  ModelDeserializer.prototype.deserialize = function (json, location) {
    var _this = this;
    var modelClass = this.modelLibrary.lookupModelClass(json.type);
    var parentModel = location && location.parentModel;
    var instance = this.modelManager.construct(modelClass, parentModel);
    this.modelLibrary.lookupModelProperties(modelClass).forEach(function (propMetdata) {
      var serializedValue = json[propMetdata.key];
      _this.validateProperty(serializedValue, propMetdata);
      try {
        var deserializedValue = _this.getDeserializationFunctionForProperty(propMetdata)(
          serializedValue,
          PropertyLocation.forModelProperty(instance, propMetdata.runtimeKey).withValidator(function (valueToValidate) {
            // Currently variables are allowed to be undefined. May change this in the future
            return _this.modelPropertyValidator.validate(
              valueToValidate,
              __assign(__assign({}, propMetdata), { required: false })
            );
          }),
          propMetdata.type
        );
        if (deserializedValue !== undefined) {
          instance[propMetdata.runtimeKey] = deserializedValue;
        }
      } catch (untypedErr) {
        return _this.logger.error('Error deserializing property [' + propMetdata.key + ']', untypedErr).throw();
      }
    });
    if (this.dataSourceManager.modelJsonHasData(json)) {
      var dataLocation = this.dataSourceManager.getPropertyLocationForData(instance);
      dataLocation.setProperty(this.deserializationManager.deserialize(json.data, dataLocation));
    }
    if (this.themeManager.modelJsonHasTheme(json)) {
      var themeLocation = this.themeManager.getPropertyLocationForTheme(instance);
      themeLocation.setProperty(this.deserializationManager.deserialize(json.theme, themeLocation));
    }
    this.modelManager.initialize(instance);
    return instance;
  };
  ModelDeserializer.prototype.getDeserializationFunctionForProperty = function (metadata) {
    var propertyTypeOverride = this.modelPropertyTypeLibrary.getPropertyDeserializer(metadata.type);
    var defaultDeserialize = this.deserializationManager.deserialize.bind(this.deserializationManager);
    return propertyTypeOverride || defaultDeserialize;
  };
  ModelDeserializer.prototype.isObjectWithTypeProperty = function (json) {
    return (
      typeof json === 'object' &&
      json !== null &&
      Object.getPrototypeOf(json) === Object.prototype &&
      'type' in json &&
      typeof json.type === 'string'
    );
  };
  ModelDeserializer.prototype.isRegisteredModelType = function (modelType) {
    return !!this.modelLibrary.lookupModelClass(modelType);
  };
  ModelDeserializer.prototype.validateProperty = function (value, propertyMetadata) {
    if (typeof value === 'string' && this.variableManager.isVariableExpression(value)) {
      return; // Variable expressions are validated at resolve time
    }
    this.modelPropertyValidator.validate(value, propertyMetadata);
  };
  return ModelDeserializer;
})();

/**
 * Handles deserialization of basic primitives: string, number, boolean, undefined and null.
 */
var PrimitiveDeserializer = /** @class */ (function () {
  function PrimitiveDeserializer() {}
  /**
   * @inheritdoc
   */
  PrimitiveDeserializer.prototype.canDeserialize = function (json) {
    return json === null || includes(PrimitiveDeserializer.ALLOWED_PRIMITIVE_TYPES, typeof json);
  };
  /**
   * @inheritdoc
   */
  PrimitiveDeserializer.prototype.deserialize = function (json) {
    return json;
  };
  PrimitiveDeserializer.ALLOWED_PRIMITIVE_TYPES = ['string', 'number', 'boolean', 'undefined'];
  return PrimitiveDeserializer;
})();

/**
 * Handles deserialization for variable strings representing any type of value
 */
var VariableDeserializer = /** @class */ (function () {
  function VariableDeserializer(variableManager) {
    this.variableManager = variableManager;
  }
  /**
   * @inheritdoc
   */
  VariableDeserializer.prototype.canDeserialize = function (json) {
    return typeof json === 'string' && this.variableManager.isVariableExpression(json);
  };
  /**
   * @inheritdoc
   */
  VariableDeserializer.prototype.deserialize = function (json, location) {
    return this.variableManager.registerReference(location, json);
  };
  return VariableDeserializer;
})();

/**
 * Handles serialization of an array type, recursing back to the manager for each value
 */
var ArraySerializer = /** @class */ (function () {
  function ArraySerializer(serializationManager) {
    this.serializationManager = serializationManager;
  }
  /**
   * @inheritdoc
   */
  ArraySerializer.prototype.canSerialize = function (value) {
    return Array.isArray(value);
  };
  /**
   * @inheritdoc
   */
  ArraySerializer.prototype.serialize = function (array, location) {
    var _this = this;
    var newArray = [];
    var serializeModelValue = function (value, index) {
      return _this.serializationManager.serialize(value, location.buildChildFromObjectAndKey(array, index));
    };
    newArray.push.apply(newArray, __spread(array.map(serializeModelValue)));
    return newArray;
  };
  return ArraySerializer;
})();

/**
 * Handles serialization of a primitive JSON object, recursing back to the manager for each value
 */
var ObjectSerializer = /** @class */ (function () {
  function ObjectSerializer(serializationManager) {
    this.serializationManager = serializationManager;
  }
  /**
   * @inheritdoc
   */
  ObjectSerializer.prototype.canSerialize = function (value) {
    return typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype;
  };
  /**
   * @inheritdoc
   */
  ObjectSerializer.prototype.serialize = function (sourceObject, location) {
    var _this = this;
    var newObject = {};
    var serializeModelValue = function (value, key) {
      return _this.serializationManager.serialize(value, location.buildChildFromObjectAndKey(sourceObject, key));
    };
    // tslint:disable-next-line:prefer-object-spread seems like a questionable rule, breaks behavior here
    return Object.assign(newObject, mapValues(sourceObject, serializeModelValue));
  };
  return ObjectSerializer;
})();

/**
 * Handles serializaation of a model object into a dehydrated
 * JSON representation
 */
var ModelSerializer = /** @class */ (function () {
  function ModelSerializer(
    modelManager,
    modelLibrary,
    serializationManager,
    dataSourceManager,
    themeManager,
    modelPropertyTypeLibrary
  ) {
    this.modelManager = modelManager;
    this.modelLibrary = modelLibrary;
    this.serializationManager = serializationManager;
    this.dataSourceManager = dataSourceManager;
    this.themeManager = themeManager;
    this.modelPropertyTypeLibrary = modelPropertyTypeLibrary;
  }
  /**
   * @inheritdoc
   */
  ModelSerializer.prototype.canSerialize = function (value) {
    return this.modelManager.isTrackedModel(value);
  };
  /**
   * @inheritdoc
   */
  ModelSerializer.prototype.serialize = function (modelObject) {
    var _this = this;
    var modelClass = modelObject.constructor;
    var modelJson = {
      type: this.modelLibrary.lookupModelMetadata(modelClass).type
    };
    this.modelLibrary.lookupModelProperties(modelClass).forEach(function (propMetdata) {
      var serializedValue = _this.getSerializationFunctionForProperty(propMetdata)(
        modelObject[propMetdata.runtimeKey],
        PropertyLocation.forModelProperty(modelObject, propMetdata.runtimeKey),
        propMetdata.type
      );
      if (serializedValue !== undefined) {
        modelJson[propMetdata.key] = serializedValue;
      }
    });
    this.serializeThemeIfExists(modelJson, modelObject);
    this.serializeDataIfExists(modelJson, modelObject);
    return modelJson;
  };
  ModelSerializer.prototype.serializeThemeIfExists = function (modelJson, modelObject) {
    var theme = this.themeManager.getThemeOverrideObjectProvidedByModel(modelObject);
    if (theme) {
      var serializedTheme = this.serializationManager.serialize(
        theme,
        this.themeManager.getPropertyLocationForTheme(modelObject)
      );
      modelJson.theme = serializedTheme;
    }
  };
  ModelSerializer.prototype.serializeDataIfExists = function (modelJson, modelObject) {
    var dataSource = this.dataSourceManager.get(modelObject);
    if (dataSource) {
      var serializedDataSource = this.serializationManager.serialize(
        dataSource,
        this.dataSourceManager.getPropertyLocationForData(modelObject)
      );
      modelJson.data = serializedDataSource;
    }
  };
  // tslint:disable-next-line: max-line-length
  ModelSerializer.prototype.getSerializationFunctionForProperty = function (metadata) {
    var propertyTypeOverride = this.modelPropertyTypeLibrary.getPropertySerializer(metadata.type);
    var defaultSerialization = this.serializationManager.serialize.bind(this.serializationManager);
    return propertyTypeOverride || defaultSerialization;
  };
  return ModelSerializer;
})();

/**
 * Handles serialization of basic primitives: string, number, boolean, undefined and null.
 */
var PrimitiveSerializer = /** @class */ (function () {
  function PrimitiveSerializer() {}
  /**
   * @inheritdoc
   */
  PrimitiveSerializer.prototype.canSerialize = function (value) {
    return value === null || includes(PrimitiveSerializer.ALLOWED_PRIMITIVE_TYPES, typeof value);
  };
  /**
   * @inheritdoc
   */
  PrimitiveSerializer.prototype.serialize = function (value) {
    return value;
  };
  PrimitiveSerializer.ALLOWED_PRIMITIVE_TYPES = ['string', 'number', 'boolean', 'undefined'];
  return PrimitiveSerializer;
})();

/**
 * Allows dynamic registration of serializers, delegating to the first matching
 * serializer, by order of registration, for serialization
 */
var SerializationManager = /** @class */ (function () {
  function SerializationManager(logger) {
    this.logger = logger;
    this.serializers = [];
  }
  /**
   * Adds a new serializer to the lookup path for serialization
   */
  SerializationManager.prototype.registerSerializer = function (serializer) {
    this.serializers.push(serializer);
  };
  /**
   * Searches for the first matching serializer and delegates to it
   *
   * Throws Error if no serializer can be determined or serialization fails
   */
  SerializationManager.prototype.serialize = function (value, location) {
    return this.getMatchingSerializer(value, location).serialize(value, location);
  };
  SerializationManager.prototype.getMatchingSerializer = function (value, location) {
    var serializer = this.serializers.find(function (potentialSerializer) {
      return potentialSerializer.canSerialize(value, location);
    });
    if (serializer) {
      return serializer;
    }
    return this.logger.error('No serializer registered matching provided value').throw();
  };
  return SerializationManager;
})();

/**
 * Handles deserialization for variable strings representing any type of value
 */
var VariableSerializer = /** @class */ (function () {
  function VariableSerializer(variableManager) {
    this.variableManager = variableManager;
  }
  /**
   * @inheritdoc
   */
  VariableSerializer.prototype.canSerialize = function (_value, location) {
    return location ? this.variableManager.isVariableReference(location) : false;
  };
  /**
   * @inheritdoc
   */
  VariableSerializer.prototype.serialize = function (_value, location) {
    return this.variableManager.getVariableExpressionFromLocation(location);
  };
  return VariableSerializer;
})();

var deferredRendererDecoratorRegistrations = [];
/**
 * Registers the decorated renderer with the provided information
 */
// tslint:disable-next-line:only-arrow-functions
function Renderer(registrationInfo) {
  return function (rendererClass) {
    deferredRendererDecoratorRegistrations.push(function (rendererLibrary) {
      return rendererLibrary.registerRendererClass(rendererClass, registrationInfo);
    });
  };
}

/**
 * Renderer Library allows rendererer classes to be associated with model classes
 */
var RendererLibrary = /** @class */ (function () {
  function RendererLibrary(logger) {
    this.logger = logger;
    this.rendererMetadata = new Map();
    this.lastDeferredIndexRead = 0;
    this.currentlyProcessingDeferred = false;
  }
  /**
   * Registers the provided render class to a given model class. No action is taken if that
   * model already has a renderer.
   */
  RendererLibrary.prototype.registerRendererClass = function (rendererClass, registrationInformation) {
    if (this.hasRenderer(registrationInformation.modelClass)) {
      this.logger.error(
        'Model classes may only have one renderer. Attempted to register [' +
          rendererClass.name +
          '] ' +
          ('to [' + registrationInformation.modelClass.name + '], but model already registered with ') +
          ('[' + this.rendererMetadata.get(registrationInformation.modelClass).name + ']')
      );
      return;
    }
    this.rendererMetadata.set(registrationInformation.modelClass, rendererClass);
  };
  /**
   * Retrieves the renderer class associated with the provided model class. Returns
   * undefined if the model class has not been registered to a renderer.
   */
  RendererLibrary.prototype.lookupRenderer = function (modelClass) {
    if (this.hasRenderer(modelClass)) {
      return this.rendererMetadata.get(modelClass);
    }
    this.logger.warn('No renderer registered for model: [' + modelClass.name + ']');
    return undefined;
  };
  /**
   * Returns true if `modelClass` has a renderer, false otherwise.
   */
  RendererLibrary.prototype.hasRenderer = function (modelClass) {
    this.processRegistrationQueue();
    return this.rendererMetadata.has(modelClass);
  };
  RendererLibrary.prototype.processRegistrationQueue = function () {
    if (this.currentlyProcessingDeferred) {
      return; // Lazy shortcut lock to prevent infinitely looping on this
    }
    this.currentlyProcessingDeferred = true;
    // tslint:disable-next-line:max-line-length
    for (
      this.lastDeferredIndexRead;
      this.lastDeferredIndexRead < deferredRendererDecoratorRegistrations.length;
      this.lastDeferredIndexRead++
    ) {
      var deferredRegistration = deferredRendererDecoratorRegistrations[this.lastDeferredIndexRead];
      deferredRegistration(this);
    }
    this.currentlyProcessingDeferred = false;
  };
  return RendererLibrary;
})();

/**
 * Manages themes for dashboards, allowing assigning retrieving hierarchical themes
 * tied to specific model instances.
 */
var ThemeManager = /** @class */ (function () {
  function ThemeManager(modelManager, modelLibrary, globalTheme) {
    this.modelManager = modelManager;
    this.modelLibrary = modelLibrary;
    this.themeByModel = new WeakMap();
    this.setGlobalTheme(globalTheme);
  }
  /**
   * Sets the global theme
   */
  ThemeManager.prototype.setGlobalTheme = function (theme) {
    this.globalTheme = theme;
  };
  /**
   * Sets specific overrides for the given model instance
   */
  ThemeManager.prototype.setThemeForModel = function (theme, model) {
    this.themeByModel.set(model, theme);
  };
  /**
   * Removes theme overrides for provided model
   */
  ThemeManager.prototype.removeThemeForModel = function (model) {
    this.themeByModel.delete(model);
  };
  /**
   * Retrieves a merged theme for the provided model applying
   * overrides in order of specificity.
   */
  ThemeManager.prototype.getThemeForModel = function (model) {
    return Object.assign.apply(Object, __spread([{}], this.getThemeHierarchy(model)));
  };
  /**
   * Returns true if the model JSON provided contains a theme property
   */
  ThemeManager.prototype.modelJsonHasTheme = function (modelJson) {
    return 'theme' in modelJson && typeof modelJson.theme === 'object' && modelJson.theme !== null;
  };
  /**
   * Returns a property location corresponding to the theme attached to the provided model
   */
  ThemeManager.prototype.getPropertyLocationForTheme = function (instance) {
    var _this = this;
    return new PropertyLocation(
      instance,
      'theme',
      function (value) {
        if (value === undefined) {
          _this.removeThemeForModel(instance);
        } else {
          _this.setThemeForModel(value, instance);
        }
      },
      function () {
        return _this.getThemeOverrideObjectProvidedByModel(instance);
      }
    );
  };
  /**
   * Retrieves the value of the theme property associated with the provided key for this model.
   * Note: the propertyKey is not necessarily the same as the runtime key. It is the serialization key.
   */
  ThemeManager.prototype.getThemePropertyForModel = function (model, propertyKey) {
    var _this = this;
    var matchedTheme = this.getThemeHierarchy(model)
      .reverse()
      .find(function (theme) {
        if (!theme) {
          return false;
        }
        var runtimeKeyForTheme = _this.getThemeRuntimeKey(theme, propertyKey);
        if (!runtimeKeyForTheme) {
          return false;
        }
        return runtimeKeyForTheme in theme;
      });
    return matchedTheme && matchedTheme[this.getThemeRuntimeKey(matchedTheme, propertyKey)];
  };
  /**
   * Returns the original Theme object provided for this model, if any. This does not include
   * any resolved theme properties from parents or globals.
   */
  ThemeManager.prototype.getThemeOverrideObjectProvidedByModel = function (model) {
    return this.themeByModel.get(model);
  };
  ThemeManager.prototype.getThemeRuntimeKey = function (theme, propertyKey) {
    var properties = this.modelLibrary.lookupModelProperties(theme.constructor);
    var matchingMetadata = Array.from(properties).find(function (themePropMetadata) {
      return themePropMetadata.key === propertyKey;
    });
    return matchingMetadata && matchingMetadata.runtimeKey;
  };
  ThemeManager.prototype.getThemeHierarchy = function (model) {
    var themeHierarchy = [];
    var currModel = model;
    while (currModel) {
      themeHierarchy.unshift(this.themeByModel.get(currModel));
      currModel = this.modelManager.getParent(currModel);
    }
    // Always add global theme as first in hierarchy
    themeHierarchy.unshift(this.globalTheme);
    return themeHierarchy;
  };
  return ThemeManager;
})();

/**
 * Default log message outputting to console
 */
var DefaultLogMessage = /** @class */ (function () {
  function DefaultLogMessage(level, message, source) {
    this.level = level;
    this.message = message;
    this.source = source;
  }
  /**
   * Convert the message, and any sources to a stack string
   */
  DefaultLogMessage.prototype.toString = function () {
    return this.level + ': ' + this.getMessageWithStack();
  };
  /**
   * Perform the actual logging, sending the result of toString to console.
   */
  DefaultLogMessage.prototype.log = function () {
    this.getLogMethod()(this.toString());
  };
  /**
   * Throws the log message as an error
   */
  DefaultLogMessage.prototype.throw = function () {
    throw Error(this.getMessageWithStack());
  };
  DefaultLogMessage.prototype.getMessageWithStack = function () {
    var stack = this.getFormattedSourceStack();
    var lineSeparatorIfStack = stack.length === 0 ? '' : '\n';
    return '' + this.message + lineSeparatorIfStack + stack;
  };
  DefaultLogMessage.prototype.getFormattedSourceStack = function () {
    var _this = this;
    if (!this.source) {
      return '';
    }
    return this.getSourceMessages()
      .map(function (message, index) {
        return _this.getIndent(index + 1) + message;
      })
      .join('\n');
  };
  DefaultLogMessage.prototype.getSourceMessages = function () {
    var sourceMessages = [];
    var currentSourceObject = this.source;
    while (currentSourceObject) {
      sourceMessages.push(currentSourceObject.message);
      currentSourceObject = currentSourceObject.source;
    }
    return sourceMessages;
  };
  DefaultLogMessage.prototype.getIndent = function (count) {
    return DefaultLogMessage.DEFAULT_INDENT.repeat(count).replace(/  $/, '↳ ');
  };
  DefaultLogMessage.prototype.getLogMethod = function () {
    /* tslint:disable:no-console */
    switch (this.level) {
      case 'WARN' /* Warn */:
        return console.warn;
      case 'ERROR' /* Error */:
        return console.error;
      case 'DEBUG' /* Debug */:
        return console.debug;
      case 'INFO' /* Info */:
      default:
        return console.info;
    }
    /* tslint:enable:no-console */
  };
  DefaultLogMessage.DEFAULT_INDENT = '    ';
  return DefaultLogMessage;
})();

/**
 * Logging utility
 */
var Logger = /** @class */ (function () {
  function Logger(loggerName) {
    if (loggerName === void 0) {
      loggerName = '';
    }
    this.loggerName = loggerName;
    this.logLevel = 'INFO' /* Info */;
    this.logMessageBuilder = Logger.DEFAULT_LOG_MESSAGE_BUILDER;
  }
  /**
   * Log provided message at info level
   */
  Logger.prototype.info = function (message, source) {
    return this.log('INFO' /* Info */, message, source);
  };
  /**
   * Log provided message at debug level
   */
  Logger.prototype.debug = function (message, source) {
    return this.log('DEBUG' /* Debug */, message, source);
  };
  /**
   * Log provided message at error level
   */
  Logger.prototype.error = function (message, source) {
    return this.log('ERROR' /* Error */, message, source);
  };
  /**
   * Log provided message at warn level
   */
  Logger.prototype.warn = function (message, source) {
    return this.log('WARN' /* Warn */, message, source);
  };
  /**
   * Log provided message at requested level
   */
  Logger.prototype.log = function (logLevel, message, source) {
    var loggerNamePrefix = this.loggerName.length > 0 ? '[' + this.loggerName + '] ' : '';
    var logMessage = this.logMessageBuilder(
      logLevel,
      '' + loggerNamePrefix + message,
      this.convertSourceToLogMessageOrUndefined(source)
    );
    if (this.shouldLogMessage(this.logLevel, logMessage)) {
      logMessage.log();
    }
    return logMessage;
  };
  /**
   * Set the minimum log level. Any log statements that are at a more verbose level are not logged..
   */
  Logger.prototype.setLogLevel = function (level) {
    this.logLevel = level;
  };
  /**
   * Provides a log message builder to implement custom logging behavior
   */
  Logger.prototype.setLogMessageBuilder = function (builder) {
    this.logMessageBuilder = builder;
  };
  Logger.prototype.shouldLogMessage = function (minimumLevel, logMessage) {
    return Logger.LOG_PRIORITY.indexOf(logMessage.level) >= Logger.LOG_PRIORITY.indexOf(minimumLevel);
  };
  Logger.prototype.convertSourceToLogMessageOrUndefined = function (source) {
    if (source && source instanceof Error) {
      return this.logMessageBuilder('ERROR' /* Error */, source.message);
    }
    return source;
  };
  Logger.LOG_PRIORITY = ['DEBUG' /* Debug */, 'INFO' /* Info */, 'WARN' /* Warn */, 'ERROR' /* Error */];
  Logger.DEFAULT_LOG_MESSAGE_BUILDER = function (level, message, source) {
    return new DefaultLogMessage(level, message, source);
  };
  return Logger;
})();

/**
 * Represents a parsed expression which can detect and replace variables.
 * Parsing is done lazily.
 * TODO: revisit this...
 */
var ExpressionParser = /** @class */ (function () {
  function ExpressionParser(expression) {
    var _this = this;
    this.expression = expression;
    this.rootRule = {
      // Partial because a root rule doesn't have a start condition
      type: 'root' /* Root */,
      endBefore: function () {
        return _this.expression.length === 0;
      },
      endAfter: function (index) {
        return index === _this.lastIndexOfLength(_this.expression.length);
      },
      parsedUntil: function () {
        return _this.lastIndexOfLength(_this.expression.length);
      }
    };
    this.parseRules = [
      {
        type: 'escape' /* EscapedCharacter */,
        startWith: this.isEscapeSequence.bind(this),
        beginParseFrom: function (startingIndex) {
          return startingIndex + ExpressionParser.ESCAPE.length;
        },
        endBefore: function () {
          return true;
        },
        parsedUntil: function (endingIndex) {
          return min$2([endingIndex, _this.lastIndexOfLength(_this.expression.length)]);
        },
        errorOn: function (index) {
          return index > _this.lastIndexOfLength(_this.expression.length)
            ? 'Cannot end with escape character'
            : undefined;
        }
      },
      {
        type: 'expression' /* Expression */,
        startWith: this.isExpressionOpen.bind(this),
        beginParseFrom: function (startingIndex) {
          return startingIndex + ExpressionParser.EXPRESSION_OPEN_LENGTH;
        },
        endBefore: this.isExpressionClose.bind(this),
        parsedUntil: function (index) {
          return _this.lastIndexOfLength(ExpressionParser.EXPRESSION_CLOSE_LENGTH, index);
        }
      },
      {
        type: 'text' /* Text */,
        // "default" state - always start a text node if not in one
        startWith: function (_index, currentNodeType) {
          return currentNodeType !== 'text' /* Text */;
        },
        endBefore: function (index, parentNodeType) {
          return (
            _this.isEscapeSequence(index) ||
            _this.isExpressionOpen(index) ||
            (parentNodeType === 'expression' /* Expression */ && _this.isExpressionClose(index))
          );
        },
        endAfter: function (index) {
          return index === _this.lastIndexOfLength(_this.expression.length);
        },
        parsedUntil: function (endingIndex, parentNodeType) {
          return _this.isEscapeSequence(endingIndex) ||
            _this.isExpressionOpen(endingIndex) ||
            (parentNodeType === 'expression' /* Expression */ && _this.isExpressionClose(endingIndex))
            ? endingIndex - 1
            : endingIndex;
        }
      }
    ];
  }
  /**
   * Transform source string into parse tree
   */
  ExpressionParser.prototype.parse = function () {
    if (!this.parsed) {
      this.parsed = this.parseByRule(0, this.rootRule);
    }
    return this.parsed;
  };
  ExpressionParser.prototype.isEscapeSequence = function (index) {
    return this.expression.startsWith(ExpressionParser.ESCAPE, index);
  };
  ExpressionParser.prototype.isExpressionOpen = function (index) {
    return this.expression.startsWith(ExpressionParser.START + ExpressionParser.OPEN, index);
  };
  ExpressionParser.prototype.isExpressionClose = function (index) {
    return this.expression.startsWith(ExpressionParser.CLOSE, index);
  };
  ExpressionParser.prototype.lengthBetween = function (startIndex, endIndex) {
    return endIndex - startIndex + 1;
  };
  ExpressionParser.prototype.lastIndexOfLength = function (length, startIndex) {
    if (startIndex === void 0) {
      startIndex = 0;
    }
    return startIndex + length - 1;
  };
  ExpressionParser.prototype.parseByRule = function (startingFrom, currentRule, parentRule) {
    var currentIndex = currentRule.beginParseFrom ? currentRule.beginParseFrom(startingFrom) : startingFrom;
    var result = {
      type: currentRule.type,
      start: startingFrom,
      children: []
    };
    do {
      var error = currentRule.errorOn && currentRule.errorOn(currentIndex);
      if (error) {
        return __assign(__assign({}, result), {
          length: this.lengthBetween(
            startingFrom,
            currentRule.parsedUntil(currentIndex, parentRule && parentRule.type)
          ),
          error: error
        });
      }
      if (currentRule.endBefore && currentRule.endBefore(currentIndex, parentRule && parentRule.type)) {
        return __assign(__assign({}, result), {
          length: this.lengthBetween(startingFrom, currentRule.parsedUntil(currentIndex, parentRule && parentRule.type))
        });
      }
      var newRule = this.parseRules.find(function (rule) {
        return rule.startWith(currentIndex, currentRule.type);
      });
      if (newRule) {
        var child = this.parseByRule(currentIndex, newRule, currentRule);
        result.children.push(child);
        currentIndex = this.lastIndexOfLength(child.length, child.start);
        if (child.error) {
          return __assign(__assign({}, result), {
            length: this.lengthBetween(startingFrom, currentIndex),
            error: 'Parse error in child node'
          });
        }
      }
      if (currentRule.endAfter && currentRule.endAfter(currentIndex, parentRule && parentRule.type)) {
        return __assign(__assign({}, result), {
          length: this.lengthBetween(startingFrom, currentRule.parsedUntil(currentIndex, parentRule && parentRule.type))
        });
      }
      currentIndex += 1;
    } while (currentIndex < this.expression.length);
    return __assign(__assign({}, result), {
      length: this.expression.length - startingFrom,
      error: 'Reached end of expression without completing parsing'
    });
  };
  ExpressionParser.ESCAPE = '\\';
  ExpressionParser.START = '$';
  ExpressionParser.OPEN = '{';
  ExpressionParser.CLOSE = '}';
  ExpressionParser.EXPRESSION_OPEN_LENGTH = ExpressionParser.START.length + ExpressionParser.OPEN.length;
  ExpressionParser.EXPRESSION_CLOSE_LENGTH = ExpressionParser.CLOSE.length;
  return ExpressionParser;
})();

/**
 * Provides an evaluator for re-evaluating the same variable string
 * against different variable values.
 */
var VariableEvaluator = /** @class */ (function () {
  function VariableEvaluator(variableString) {
    this.variableString = variableString;
    this.variableNamesFromLastEvaluate = new Set();
    this.parser = new ExpressionParser(variableString);
  }
  /**
   * Does the evaluation, using the provided dictionary to perform any variable lookups
   */
  VariableEvaluator.prototype.evaluate = function (dictionary) {
    var variablesBeforeEvaluate = __spread(this.variableNamesFromLastEvaluate);
    this.variableNamesFromLastEvaluate.clear();
    var result = {
      variableNamesAdded: [],
      variableNamesRemoved: []
    };
    try {
      var value = this.convertNodeToValue(this.parser.parse(), dictionary);
      result.value = value;
    } catch (e) {
      result.error = e && e.message;
    }
    var variablesAfterEvaluate = __spread(this.variableNamesFromLastEvaluate);
    result.variableNamesRemoved = difference(variablesBeforeEvaluate, variablesAfterEvaluate);
    result.variableNamesAdded = difference(variablesAfterEvaluate, variablesBeforeEvaluate);
    return result;
  };
  /**
   * Returns result indicating state before evaluation ocurred
   */
  VariableEvaluator.prototype.unevaluate = function () {
    var variableNamesFromLastEvaluate = __spread(this.variableNamesFromLastEvaluate);
    this.variableNamesFromLastEvaluate.clear();
    return {
      variableNamesAdded: [],
      variableNamesRemoved: variableNamesFromLastEvaluate,
      value: this.variableString
    };
  };
  VariableEvaluator.prototype.convertNodeToValue = function (node, dictionary) {
    if (node.error) {
      throw new Error(node.error);
    }
    // tslint:disable-next-line:switch-default https://github.com/palantir/tslint/issues/2104
    switch (node.type) {
      case 'root' /* Root */:
        return this.convertRootNodeToValue(node, dictionary);
      case 'escape' /* EscapedCharacter */:
        return this.convertEscapedCharacterToValue(node);
      case 'text' /* Text */:
        return this.convertTextToValue(node);
      case 'expression' /* Expression */:
        return this.convertExpressionToValue(node, dictionary);
    }
  };
  VariableEvaluator.prototype.convertRootNodeToValue = function (node, dictionary) {
    if (node.children.length === 1) {
      return this.convertNodeToValue(node.children[0], dictionary);
    }
    return this.mapAndJoinChildren(node, dictionary);
  };
  VariableEvaluator.prototype.convertEscapedCharacterToValue = function (node) {
    return this.variableString.charAt(node.start + node.length - 1); // Last char of node
  };
  VariableEvaluator.prototype.convertTextToValue = function (node) {
    return this.variableString.substr(node.start, node.length); // Last char of node
  };
  VariableEvaluator.prototype.convertExpressionToValue = function (node, dictionary) {
    var propertyPath = this.mapAndJoinChildren(node, dictionary).trim();
    this.variableNamesFromLastEvaluate.add(propertyPath.split('.')[0]);
    var result = get$1(dictionary, propertyPath);
    if (result !== undefined) {
      // Treat undefined as unable to look up. We don't allow assignment of undefined.
      return result;
    }
    throw new Error('Could not lookup variable value: ' + propertyPath);
  };
  VariableEvaluator.prototype.mapAndJoinChildren = function (node, dictionary) {
    var _this = this;
    var caughtErrors = [];
    var mappedValues = node.children.map(function (child) {
      try {
        return _this.convertNodeToValue(child, dictionary);
      } catch (e) {
        caughtErrors.push(e);
      }
    });
    if (caughtErrors.length > 0) {
      throw this.combineErrors(caughtErrors);
    }
    return mappedValues.join('');
  };
  VariableEvaluator.prototype.combineErrors = function (errorArray) {
    return Error(
      errorArray
        .map(function (error) {
          return error.message;
        })
        .join('; ')
    );
  };
  return VariableEvaluator;
})();

/**
 * A reference to one or more variables at a specific location.
 */
var VariableReference = /** @class */ (function () {
  function VariableReference(variableString, location, autoCleanupSubscription) {
    this.location = location;
    this.autoCleanupSubscription = autoCleanupSubscription;
    this.evaluator = new VariableEvaluator(variableString);
  }
  /**
   * Using the provided dictionary, assigns the location with the resolved variable(s).
   */
  VariableReference.prototype.resolve = function (dictionary) {
    var result = this.evaluator.evaluate(dictionary);
    this.location.setProperty(result.value);
    return result;
  };
  /**
   * Returns the original variable expression value. Does not assign it.
   */
  VariableReference.prototype.unresolve = function () {
    return this.evaluator.unevaluate();
  };
  return VariableReference;
})();

/**
 * Variable manager handles read, write and update of variable values,
 * supporting serialization and deserialization to convert variables into
 * values and back.
 */
var VariableManager = /** @class */ (function () {
  function VariableManager(logger, modelManager, modelChangedEvent, beforeModelDestroyedEvent) {
    this.logger = logger;
    this.modelManager = modelManager;
    this.modelChangedEvent = modelChangedEvent;
    this.beforeModelDestroyedEvent = beforeModelDestroyedEvent;
    this.variableDictionaries = new WeakMap();
    this.variableReferences = new WeakMap();
  }
  /**
   * Assign a value to the given key and scope. Scope should be a model object.
   */
  VariableManager.prototype.set = function (key, value, modelScope) {
    if (!this.variableDictionaries.has(modelScope)) {
      this.variableDictionaries.set(modelScope, new Map());
    }
    var variableDictionary = this.variableDictionaries.get(modelScope);
    if (variableDictionary.has(key)) {
      variableDictionary.get(key).currentValue = value;
    } else {
      var newValue = this.createVariableValue(key, value);
      this.shadowExistingReferencesIfNeeded(modelScope, newValue);
      variableDictionary.set(key, newValue);
    }
    this.updateAllReferences(variableDictionary.get(key));
  };
  /**
   * Retrieves a value for the given key. If that value has been assigned in this scope,
   * it will be returned. Otherwise, scopes will be searched upwards in the model tree
   * returning undefined if no match is found.
   */
  VariableManager.prototype.get = function (key, modelScope) {
    var variableValue = this.getVariableValue(key, modelScope);
    if (!variableValue) {
      this.logger.warn('Attempting to lookup unassigned variable: ' + key);
    }
    return variableValue && variableValue.currentValue;
  };
  /**
   * Indicates whether the provided key is registered, accessible at the given scope
   * and returns a defined value.
   */
  VariableManager.prototype.has = function (key, modelScope) {
    var variableValue = this.getVariableValue(key, modelScope);
    return variableValue ? variableValue.currentValue !== undefined : false;
  };
  /**
   * Begin tracking the provided expression at `location`. The value will be set based on
   * variables, and updated as variables changed.
   *
   * Throws Error if the provided location is already being tracked
   */
  VariableManager.prototype.registerReference = function (location, variableExpression) {
    var _this = this;
    var referenceMap = this.getOrCreateReferenceMapForModelContainingLocation(location);
    if (referenceMap.has(location.toString())) {
      this.logger.error('Attempting to register reference which has already been declared at ' + location.toString());
    } else {
      var autoCleanupSubscription = this.beforeModelDestroyedEvent
        .getBeforeDestructionObservable(location.parentModel)
        .subscribe(function () {
          return _this.deregisterReference(location);
        });
      referenceMap.set(
        location.toString(),
        new VariableReference(variableExpression, location, autoCleanupSubscription)
      );
    }
    var reference = referenceMap.get(location.toString());
    return this.updateReference(reference);
  };
  /**
   * Indicates whether the value at `location` is currently being tracked as a variable reference
   */
  VariableManager.prototype.isVariableReference = function (location) {
    return !!this.getReferenceAtLocation(location);
  };
  /**
   * Indicates whether the provided string should be treated as a variable expression
   */
  VariableManager.prototype.isVariableExpression = function (potentialExpression) {
    var parsed = new ExpressionParser(potentialExpression).parse();
    return parsed.children.some(function (child) {
      return child.type === 'expression' /* Expression */;
    });
  };
  /**
   * Ends tracking for the variable at `location`. Returns the original variable string.
   * The value at `location` is left as is.
   *
   * Throws Error if the provided location is not being tracked
   */
  VariableManager.prototype.deregisterReference = function (location) {
    var reference = this.getReferenceAtLocation(location);
    if (!reference) {
      return this.logger
        .error(
          'Attempted to deregister reference at ' +
            location.toString() +
            ' which does not contain a registered reference'
        )
        .throw();
    }
    this.getOrCreateReferenceMapForModelContainingLocation(location).delete(reference.location.toString());
    var result = reference.unresolve();
    reference.autoCleanupSubscription.unsubscribe();
    this.updateValueReferenceTrackingFromEvaluationResult(reference, result);
    return result.value;
  };
  /**
   * Retrieves the original variable expression from `location`. This value will continue
   * to be tracked.
   *
   * Throws Error if the provided location is not being tracked
   */
  VariableManager.prototype.getVariableExpressionFromLocation = function (location) {
    var reference = this.getReferenceAtLocation(location);
    if (!reference) {
      return this.logger
        .error(
          'Attempted to resolve reference at ' + location.toString() + ' which does not contain a registered reference'
        )
        .throw();
    }
    /* Unresolve is stateful, but it *should* be OK. on the following resolution, it will think new variables are being
           used, but we're using sets so the extra references should be deduped
        */
    var expression = reference.unresolve().value;
    return expression;
  };
  VariableManager.prototype.getParentModelScope = function (modelScope) {
    var parentModel = this.modelManager.getParent(modelScope);
    if (!parentModel) {
      return undefined;
    }
    return this.variableDictionaries.has(parentModel) ? parentModel : this.getParentModelScope(parentModel);
  };
  VariableManager.prototype.createVariableValue = function (key, value) {
    return {
      key: key,
      currentValue: value,
      references: new Set()
    };
  };
  VariableManager.prototype.updateAllReferences = function (value) {
    var _this = this;
    value.references.forEach(function (reference) {
      return _this.updateReference(reference);
    });
  };
  VariableManager.prototype.updateReference = function (reference) {
    var modelScope = reference.location.parentModel;
    var result = reference.resolve(this.getResolveDictionaryForModel(modelScope));
    this.updateValueReferenceTrackingFromEvaluationResult(reference, result);
    this.modelChangedEvent.publishChange(reference.location.parentModel);
    return result.value;
  };
  VariableManager.prototype.getReferenceAtLocation = function (location) {
    var referenceMapForModel = this.variableReferences.get(location.parentModel);
    if (referenceMapForModel) {
      return referenceMapForModel.get(location.toString());
    }
    return undefined;
  };
  VariableManager.prototype.getDictionaryContainingKey = function (key, modelScope) {
    var dictionaryWithRequestedScope = this.variableDictionaries.get(modelScope);
    if (dictionaryWithRequestedScope && dictionaryWithRequestedScope.has(key)) {
      return dictionaryWithRequestedScope;
    }
    var parent = this.getParentModelScope(modelScope);
    return parent ? this.getDictionaryContainingKey(key, parent) : undefined;
  };
  VariableManager.prototype.getOrCreateReferenceMapForModelContainingLocation = function (location) {
    if (!this.variableReferences.has(location.parentModel)) {
      this.variableReferences.set(location.parentModel, new Map());
    }
    return this.variableReferences.get(location.parentModel);
  };
  VariableManager.prototype.getResolveDictionaryForModel = function (modelScope) {
    var variablePairs = [];
    var nextModelScope = this.variableDictionaries.has(modelScope) ? modelScope : this.getParentModelScope(modelScope);
    while (nextModelScope) {
      // Later takes precedence, so we always unshift on to beginning
      variablePairs.unshift.apply(variablePairs, __spread(this.variableDictionaries.get(nextModelScope)));
      nextModelScope = this.getParentModelScope(nextModelScope);
    }
    return fromPairs(
      variablePairs.map(function (_a) {
        var _b = __read(_a, 2),
          key = _b[0],
          value = _b[1];
        return [key, value.currentValue];
      })
    );
  };
  VariableManager.prototype.getVariableValue = function (key, modelScope) {
    var dictionaryWithKey = this.getDictionaryContainingKey(key, modelScope);
    return dictionaryWithKey && dictionaryWithKey.get(key);
  };
  VariableManager.prototype.updateValueReferenceTrackingFromEvaluationResult = function (reference, evaluationResult) {
    var _this = this;
    var modelScope = reference.location.parentModel;
    evaluationResult.variableNamesRemoved.forEach(function (name) {
      // Every variable name previously referenced should have a placeholder
      _this.getVariableValue(name, modelScope).references.delete(reference);
    });
    evaluationResult.variableNamesAdded.forEach(function (name) {
      if (!_this.has(name, modelScope)) {
        _this.addPlaceholderVariable(name, modelScope);
      }
      _this.getVariableValue(name, modelScope).references.add(reference);
    });
  };
  VariableManager.prototype.shadowExistingReferencesIfNeeded = function (modelScope, newVariableValue) {
    var _this = this;
    // References registered before this new value may be inside this scope and should be switched over
    var parentModelScope = this.getParentModelScope(modelScope);
    var parentDictionary = parentModelScope && this.getDictionaryContainingKey(newVariableValue.key, parentModelScope);
    if (!parentDictionary) {
      return; // This variable is not shadowing any other
    }
    var existingReferences = parentDictionary.get(newVariableValue.key).references;
    var referencesToUpdate = [];
    existingReferences.forEach(function (reference) {
      if (
        reference.location.parentModel === modelScope ||
        _this.modelManager.isAncestor(reference.location.parentModel, modelScope)
      ) {
        referencesToUpdate.push(reference);
      }
    });
    referencesToUpdate.forEach(function (referenence) {
      existingReferences.delete(referenence);
      newVariableValue.references.add(referenence);
    });
  };
  VariableManager.prototype.addPlaceholderVariable = function (variableName, modelScope) {
    this.set(variableName, undefined, this.modelManager.getRoot(modelScope));
  };
  return VariableManager;
})();

export {
  ARRAY_PROPERTY,
  ArrayDeserializer,
  ArraySerializer,
  BOOLEAN_PROPERTY,
  BeforeModelDestroyedEvent,
  DashboardEvent,
  DashboardEventManager,
  DashboardManager,
  DataRefreshEvent,
  DataSourceManager,
  DefaultModelApiBuilder,
  DeserializationManager,
  EditorApiFactory,
  EditorKind,
  EditorLibrary,
  Logger,
  Model,
  ModelChangedEvent,
  ModelCreatedEvent,
  ModelDeserializer,
  ModelDestroyedEvent,
  ModelEventInstaller,
  ModelEventPublisher,
  ModelEventSubscriber,
  ModelLibrary,
  ModelManager,
  ModelProperty,
  ModelPropertyEditor,
  ModelPropertyType,
  ModelPropertyTypeLibrary,
  ModelPropertyValidator,
  ModelScopedDashboardEvent,
  ModelSerializer,
  NUMBER_PROPERTY,
  ObjectDeserializer,
  ObjectSerializer,
  PLAIN_OBJECT_PROPERTY,
  PrimitiveDeserializer,
  PrimitiveSerializer,
  PropertyLocation,
  Renderer,
  RendererLibrary,
  STRING_PROPERTY,
  SerializationManager,
  Theme,
  ThemeManager,
  TimeRangeChangedEvent,
  TimeRangeManager,
  UNKNOWN_PROPERTY,
  VariableDeserializer,
  VariableManager,
  VariableSerializer,
  beforeModelDestroyedEventKey,
  dataRefreshEventKey,
  dataSourceMarker,
  modelCreatedEventKey,
  modelDestroyedEventKey
};
//# sourceMappingURL=hyperdash.es5.js.map
