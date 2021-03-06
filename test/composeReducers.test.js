import { createReducer, composeReducers } from '../index'

import { assert } from 'chai'
import sinon from 'sinon'

describe('composeReducers', () => {
  it('works with one reducer', () => {
    const addReducer = createReducer('addToThings')
      .transform((state, payload) => [...state, payload])

    const reducer = composeReducers([
      addReducer
    ])

    const newState = reducer([], {type: 'addToThings', payload: 'thing 1'})
    assert.deepEqual(newState, ['thing 1'])
  })

  it('combines many reducers', () => {
    const addReducer = createReducer('addToThings')
      .transform((state, payload) => [...state, payload])

    const removeReducer = createReducer('removeFromThings')
      .transform((state, payload) => {
        return state.filter((element) => element !== payload)
      })

    const reducer = composeReducers([
      addReducer,
      removeReducer
    ])

    let newState = reducer([], {type: 'addToThings', payload: 'thing 1'})
    newState = reducer(newState, {type: 'removeFromThings', payload: 'thing 1'})
    assert.deepEqual(newState, [])
  })

  it('allows setting the initial state', () => {
    const addReducer = createReducer('addToThings')
      .transform((state, payload) => [...state, payload])

    const removeReducer = createReducer('removeFromThings')
      .transform((state, payload) => {
        return state.filter((element) => element !== payload)
      })

    const reducer = composeReducers([
      addReducer,
      removeReducer
    ]).initialState(['solid gold!'])

    assert.deepEqual(reducer(), ['solid gold!'])
  })

  it('ignores individual initial state, when has own', () => {
    const addReducer = createReducer('addToThings')
      .transform((state, payload) => [...state, payload])
      .initialState(['first'])

    const removeReducer = createReducer('removeFromThings')
      .transform((state, payload) => {
        return state.filter((element) => element !== payload)
      })
      .initialState([])

    const reducer = composeReducers([
      addReducer,
      removeReducer
    ]).initialState(['solid gold!'])

    assert.deepEqual(reducer(), ['solid gold!'])
  })

  it('will log when debugging', () => {
    const addReducer = createReducer('addToThings')
      .transform((state, payload) => [...state, payload])

    const removeReducer = createReducer('removeFromThings')
      .transform((state, payload) => {
        return state.filter((element) => element !== payload)
      })

    const reducer = composeReducers([
      addReducer,
      removeReducer
    ])


    const log = sinon.fake()
    reducer.debug(log)

    const newState = reducer([], {type: 'addToThings', payload: 'thing 1'})
    reducer(newState, {type: 'removeFromThings', payload: 'thing 1'})

    assert.equal(log.callCount, 2)
  })
})