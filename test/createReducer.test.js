import { createReducer } from '../src/createReducer'

import { assert } from 'chai'

describe('createReducer', () => {
  it('returns original state without a transformer', () => {
    const reducer = createReducer('hello')
    const newState = reducer('World', {type: 'hello', payload: 'Bob'})
    assert.equal(newState, 'World')
  })

  it('returns transformed state with a transformer', () => {
    const reducer = createReducer('hello')
      .transform((_oldState, newState) => newState)

    const newState = reducer('World', {type: 'hello', payload: 'Bob'})
    assert.equal(newState, 'Bob')
  })

  it('accepts an action instead of an action type', () => {
    const action = () => ({type: 'hello'})
    const reducer = createReducer(action)
      .transform((_oldState, newState) => newState)

    const newState = reducer('World', {type: 'hello', payload: 'Bob'})
    assert.equal(newState, 'Bob')
  })

  it('returns original state if the events to match the type', () => {
    const reducer = createReducer('hello')
      .transform((_oldState, newState) => newState)

    const newState = reducer('World', {type: 'halp', payload: 'Bob'})
    assert.equal(newState, 'World')
  })

  it('accepts initial state', () => {
    const reducer = createReducer('hello')
      .transform((_oldState, newState) => newState)
      .initialState('World')

    const newState = reducer()
    assert.equal(newState, 'World')
  })
})