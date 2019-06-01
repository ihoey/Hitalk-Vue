import Vue from 'vue'
import './styles/Hitalk.scss'
import hitalk from './hitalk'
import App from './App.vue'

class Hitalk {
  constructor(props) {
    Vue.prototype.$Hitalk = props

    Vue.use(hitalk)
    new Vue({
      el: props.el || '#comment',
      render: h => h(App)
    })
  }
}

export default new Hitalk(window.HitalkConfig)
