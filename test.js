import component from './index.js'
import source from './source.js'
import view from './views/bootstrap5.js'

export default (e, params) => {
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
