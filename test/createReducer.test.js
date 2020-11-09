import { createReducer } from '../src/createReducer'

import { assert } from 'chai'
import sinon from 'sinon'

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

  it('delays the evaluation of initial state when provided a function', () => {
    const reducer = createReducer('hello')
      .transform((_oldState, newState) => newState)
      .initialState(() => notHereYet)

    global.notHereYet = 'hi!'

    assert.equal(reducer(), 'hi!')

    global.notHereYet = undefined
  })

  it('debbuging prints debugging info to log', () => {
    const reducer = createReducer('hello')
      .transform((_oldState, newState) => newState)
      .initialState('World')
    const log = sinon.fake()
    reducer.debug(log)

    const action = {type: 'hello', payload: 'world'}
    reducer('', action)
    assert.equal(reducer.log.firstArg, 'REDAXTED-DEBUG')
    assert.deepEqual(log.lastArg, {
      originalState: '',
      action: action,
      finalState: 'world'
    })
  })
})