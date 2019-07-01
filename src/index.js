import Vue from 'vue'
import './styles/Hitalk.scss'
import hitalk from './hitalk'

class Hitalk {
  constructor(props) {
    Vue.prototype.$Hitalk = props

    Vue.use(hitalk)
    new Vue({
      el: props.el || '#comment',
      render: h => h('hitalk')
    })
  }
}

export default new Hitalk(window.HitalkConfig)
