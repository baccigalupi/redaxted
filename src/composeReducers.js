export const composeReducers = (reducers) => {
  const reducer = (state = reducer.initial, actionData) => {
    return reducers.reduce((latestState, partial) => {
      if (reducer.debugging) partial.debug(reducer.log)
      return partial(latestState, actionData)
    }, state)
  }

  reducer.initialState = (state) => {
    reducer.initial = state
    return reducer
  }

  reducer.debug = (log = console.log) => {
    reducer.log = log
    reducer.debugging = true
    return reducer
  }

  return reducer
}
