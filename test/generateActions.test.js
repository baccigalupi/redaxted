import { createActions } from '../src/createActions'

import { assert } from 'chai'

describe('createActions', () => {
  it('creates action data generators with the right type', () => {
    const actions = createActions([
      'hello',
      'goodbye'
    ])

    assert.equal(actions.hello().type, 'hello')
    assert.equal(actions.goodbye().type, 'goodbye')
  })

  it('normalizes the action data shape to have just a type and a payload', () => {
    const actions = createActions([
      'hello',
      'goodbye'
    ])

    assert.deepEqual(Object.keys(actions.hello()), ['type', 'payload'])
  })

  it('normalizes undefined payloads to be an object', () => {
    const actions = createActions([
      'hello',
      'goodbye'
    ])

    assert.deepEqual(actions.hello(undefined).payload, {})
  })

  it('normalizes null payloads to be an object', () => {
    const actions = createActions([
      'hello',
      'goodbye'
    ])

    assert.deepEqual(actions.hello(null).payload, {})
  })

  it('normalizes null payloads to be an object', () => {
    const actions = createActions([
      'hello',
      'goodbye'
    ])

    assert.deepEqual(actions.hello(null).payload, {})
  })

  it('leaves array payloads alone', () => {
    const actions = createActions([
      'hello',
      'goodbye'
    ])

    assert.deepEqual(actions.hello([1]).payload, [1])
  })

  it('leaves object payloads alone', () => {
    const actions = createActions([
      'hello',
      'goodbye'
    ])

    assert.deepEqual(
      actions.hello({greeting: 'world'}).payload, 
      {greeting: 'world'}
    )
  })

  it('converts strings into object with a value', () => {
    const actions = createActions([
      'hello',
      'goodbye'
    ])

    assert.deepEqual(
      actions.hello('world').payload, 
      {value: 'world'}
    )
  })

  it('converts numbers into object with a value', () => {
    const actions = createActions([
      'hello',
      'goodbye'
    ])

    assert.deepEqual(
      actions.hello(1).payload, 
      {value: 1}
    )
  })

  it('converts booleans into object with a value', () => {
    const actions = createActions([
      'hello',
      'goodbye'
    ])

    assert.deepEqual(
      actions.hello(false).payload, 
      {value: false}
    )
  })
})