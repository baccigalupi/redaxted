import { createReducer, combineReducers } from '../index'

import { assert } from 'chai'
import sinon from 'sinon'

describe('combineReducers', () => {
  it('works with one reducer', () => {
    const thingsReducer = createReducer('addToThings')
      .transform((state, payload) => [...state, payload])

    const reducer = combineReducers({
      things: thingsReducer
    })

    const newState = reducer({things: []}, {type: 'addToThings', payload: 'thing 1'})
    assert.deepEqual(newState, {things: ['thing 1']})
  })

  it('combines many reducers per key', () => {
    const thingsReducer = createReducer('addToThings')
      .transform((state, payload) => [...state, payload])

    const toggleThangReducer = createReducer('toggleThang')
      .transform((state) => !state)

    const reducer = combineReducers({
      things: thingsReducer,
      thang: toggleThangReducer
    })

    const initialState = {
      things: [],
      thang: true
    }

    let state = reducer(initialState, {type: 'addToThings', payload: 'thing 1'})
    
    assert.deepEqual(state, {
      things: ['thing 1'],
      thang: true
    })

    state = reducer(state, {type: 'toggleThang'})
    
    assert.deepEqual(state, {
      things: ['thing 1'],
      thang: false
    })
  })
})