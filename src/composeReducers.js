export const composeReducers = (reducers) => {
  const reducer = (state = reducer.initial, actionData) => {
    return reducers.reduce((latestState, reducer) => {
      return reducer(latestState, actionData)
    }, state)
  }

  reducer.initialState = (state) => {
    reducer.initial = state
    return reducer
  }

  return reducer
}
