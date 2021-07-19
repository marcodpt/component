import source from '../source.js'

export default (h, text) => ({
  title,
  samples,
  sample,
  target,
  comp,
  update,
  updates,
  tab,
  error,
  raw,
  set,
  gh
}) =>
  h('div', {}, [
    !gh ? null : h('a', {
      class: 'github-fork-ribbon',
      href: gh,
      'data-ribbon': 'Fork me on GitHub',
      title: 'Fork me on GitHub'
    }, text('Fork me on GitHub')),
    h('h1', {}, text(title)),
    h('div', {
      class: 'input-group mb-3'
    }, [
      h('button', {
        class: [
          'btn btn-danger dropdown-toggle',
          !update ? 'disabled' : ''
        ],
        'data-bs-toggle': 'dropdown'
      }, text('Hot updates!')),
      h('ul', {
        class: 'dropdown-menu'
      }, Object.keys(updates || {}).map(key =>
        h('li', {}, [
          h('a', {
            class: 'dropdown-item',
            onclick: state => {
              update(updates[key])
              return state
            }
          }, text(key))
        ])
      )),
      h('select', {
        class: 'form-control',
        onchange: (state, ev) => {
          const v = ev.target.value
          const u = set(samples[v], target, comp)

          return {
            ...state,
            raw: source(samples[v]),
            sample: v,
            update: updates ? u : null,
            error: ''
          }
        },
        value: sample || ''
      }, Object.keys(samples).map(key => 
        h('option', {
          value: key,
          label: key
        })
      )),
      tab == 'show' ? null : h('button', {
        class: 'btn btn-info',
        onclick: state => ({...state, tab: 'show'})
      }, text('Show')),
      tab == 'edit' ? null : h('button', {
        class: 'btn btn-warning',
        onclick: state => ({...state, tab: 'edit'})
      }, text('Edit')),
      !tab ? null : h('button', {
        class: 'btn btn-secondary',
        onclick: state => ({...state, tab: ''})
      }, text('Hide'))
    ]),
    !tab ? null : h('div', {
      class: 'mt-3',
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, [
      tab != 'show' ? null : text(
        sample ? raw : 'Nothing to show!'
      ), tab != 'edit' ? null : h('textarea', {
        class: [
          'form-control',
          error ? 'is-invalid' : 'is-valid'
        ],
        rows: 10,
        value: raw,
        onchange: (state, ev) => {
          const v = ev.target.value
          var u = null
          try {
            set(eval('u = '+v), target, comp)
            return {
              ...state,
              raw: v,
              update: u,
              error: ''
            }
          } catch (err) {
            return {
              ...state,
              raw: v,
              error: err.toString()
            }
          }
        }
      }), tab != 'edit' || !error ? null : h('div', {
        class: 'invalid-feedback',
        style: {
          whiteSpace: 'pre-wrap'
        }
      }, text(error))
    ])
  ])
