import { composeReducers } from './composeReducers.js'

const createPartialReducer = (reducer, key) => (state, action) => {
  const partialState = state[key]
  return {
    ...state,
    [key]: reducer(partialState, action)
  }
}

export const combineReducers = (reducers) => {
  const scoped = Object.keys(reducers).map((key) => {
    const reducer = reducers[key]
    return createPartialReducer(reducer, key)
  })

  return composeReducers(scoped)
}
