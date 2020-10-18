
export const createReducer = (event) => {
  if (typeof event === 'function') {
    event = event().type
  }

  const reducer = (originalState = reducer.initial, action = {}) => {
    const { type, payload } = action
    if (type !== event || !reducer.transformer) return originalState

    return reducer.transformer(originalState, payload)
  }

  reducer.transform = (transformer) => {
    reducer.transformer = transformer
    return reducer
  }

  reducer.initialState = (state) => {
    reducer.initial = state
    return reducer
  }

  return reducer
}