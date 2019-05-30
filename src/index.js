import Vue from 'vue'
import './styles/Hitalk.scss'
import hitalk from './hitalk'

class Hitalk {
  constructor(props) {
    Vue.prototype.$hitalk = this.props
    Vue.use(hitalk)

    new Vue({
      el: props.el || '#comment'
    })
  }
}

export default new Hitalk(window.HitalkConfig)
