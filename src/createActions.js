const normalizePayload = (payload) => {
  if (payload === undefined || payload === null) {
    return {}
  }
  if (typeof payload === 'object') {
    return payload
  }
  return {
    value: payload
  }
}

export const createAction = (name) => {
  return (payload) => {
    return {
      type: name,
      payload: normalizePayload(payload)
    }
  }
}

export const createActions = (actionNames) => {
  return actionNames.reduce((actions, name) => {
    actions[name] = createAction(name)
    return actions
  }, {})
}