import {
  app, h, text
} from 'https://cdn.jsdelivr.net/npm/hyperapp@2.0.18/index.min.js'
import view from './views/bootstrap5.js'
import {
  createNanoEvents
} from 'https://cdn.jsdelivr.net/npm/nanoevents@6.0.0/index.js'

const source = X => {
  const ident = A => A.join(',\n').split('\n').join('\n  ')
  if (X instanceof Array) {
    return !X.length ? '[]' : `[\n  ${
      ident(X.map(x => source(x)))
    }\n]`
  } else if (typeof X == 'function') {
    return X.toString()
  } else if (X && typeof X == 'object') {
    const K = Object.keys(X)
    return !K.length ? '{}' : `{\n  ${
      ident(K.map(key => `${key}: ${source(X[key])}`))
    }\n}`
  } else {
    return JSON.stringify(X)
  }

  return data
}

const component = (e, view, params, update) => {
  const A = {
    node: e,
    view: view(h, text),
    init: params
  }
  var F = () => {}
  if (update != null) {
    const emitter = createNanoEvents()
    A.subscriptions = () => [[
      dispatch => {
        const unbind = emitter.on('update', query => {
          requestAnimationFrame(() => dispatch(state => update(state, query)))
        })
        return () => unbind()
      }
    ]]
    F = query => {
      emitter.emit('update', query)
    }
  }

  app(A)

  return F
}

const test = (e, params) => {
  const set = (params, target, comp) => {
    const app = document.querySelector(target)
    if (app) {
      const e = app.cloneNode(false)
      app.replaceWith(e)
      if (params) {
        return comp(e, params)
      }
    }
    return null
  }
  const s = Object.keys(params.samples)[0]
  const p = params.samples[s]

  return component(e, view, {
    ...params,
    sample: s,
    update: set(p, params.target, params.comp),
    raw: source(p),
    set: set
  })
}

export {source, component, test}
