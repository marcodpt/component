import {component} from './index.js'

export default {
  title: 'Color component',
  samples: {
    red: {
      click: state => ({...state, color: 'red'})
    },
    green: {
      click: state => ({...state, color: 'green'})
    },
    blue: {
      click: state => ({...state, color: 'blue'})
    }
  },
  comp: (e, params) => component(e, 
    (h, text) => ({
      color,
      click
    }) =>
      h('div', {}, [
        h('p', {}, text('Current color is: '+(color || 'black'))),
        h('button', {
          class: 'btn btn-primary',
          onclick: click
        }, text('Change color'))
      ])
  , params, (state, color) => ({...state, color})),
  updates: {
    blue: 'blue',
    yellow: 'yellow',
    brown: 'brown'
  }
}
