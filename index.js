"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeReducers = void 0;

const composeReducers = reducers => {
  const reducer = (state = reducer.initial, actionData) => {
    return reducers.reduce((latestState, partial) => {
      if (reducer.debugging) partial.debug(reducer.log);
      return partial(latestState, actionData);
    }, state);
  };

  reducer.initialState = state => {
    reducer.initial = state;
    return reducer;
  };

  reducer.debug = log => {
    reducer.log = log || console.log;
    reducer.debugging = true;
    return reducer;
  };

  return reducer;
};

exports.composeReducers = composeReducers;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createActions = exports.createAction = void 0;

const normalizePayload = payload => {
  if (payload === undefined || payload === null) {
    return {};
  }

  if (typeof payload === 'object') {
    return payload;
  }

  return {
    value: payload
  };
};

const createAction = name => {
  return payload => {
    return {
      type: name,
      payload: normalizePayload(payload)
    };
  };
};

exports.createAction = createAction;

const createActions = actionNames => {
  return actionNames.reduce((actions, name) => {
    actions[name] = createAction(name);
    return actions;
  }, {});
};

exports.createActions = createActions;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReducer = void 0;

const createReducer = event => {
  if (typeof event === 'function') {
    event = event().type;
  }

  const reducer = (originalState = reducer.initial, action = {}) => {
    if (typeof originalState === 'function') originalState = originalState();
    const {
      type,
      payload
    } = action;
    if (type !== event || !reducer.transformer) return originalState;
    const finalState = reducer.transformer(originalState, payload);

    if (reducer.debugging) {
      reducer.log('REDAXTED-DEBUG', {
        originalState,
        action,
        finalState
      });
    }

    return finalState;
  };

  reducer.transform = transformer => {
    reducer.transformer = transformer;
    return reducer;
  };

  reducer.initialState = state => {
    reducer.initial = state;
    return reducer;
  };

  reducer.debug = (log = console.log) => {
    reducer.log = log;
    reducer.debugging = true;
    return reducer;
  };

  return reducer;
};

exports.createReducer = createReducer;
