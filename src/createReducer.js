export const createReducer = (event) => {
  if (typeof event === 'function') {
    event = event().type
  }

  const reducer = (originalState = reducer.initial, action = {}) => {
    if (typeof originalState === 'function') originalState = originalState()
    
    const { type, payload } = action
    if (type !== event || !reducer.transformer) return originalState

    const finalState = reducer.transformer(originalState, payload)

    if (reducer.debugging) {
      reducer.log('REDAXTED-DEBUG', {
        originalState,
        action,
        finalState
      })
    }

    return finalState
  }

  reducer.transform = (transformer) => {
    reducer.transformer = transformer
    return reducer
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
