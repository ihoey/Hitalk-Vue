import Vue from 'vue'
import './styles/Hitalk.scss'
import hitalk from './hitalk'

class Hitalk {
  constructor(props) {
    Vue.use(hitalk, props)
    new Vue({
      el: props.el || '#comment',
      render: h => h('hitalk')
    })
  }
}

export default new Hitalk(window.HitalkConfig)
