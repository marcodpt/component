import {
  app, h, text
} from 'https://cdn.jsdelivr.net/npm/hyperapp@2.0.18/index.min.js'
import {
  createNanoEvents
} from 'https://cdn.jsdelivr.net/npm/nanoevents@6.0.0/index.js'

export default (e, view, params, update) => {
  e.innerHTML = '<div></div>'
  const A = {
    node: e.querySelector('div'),
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
