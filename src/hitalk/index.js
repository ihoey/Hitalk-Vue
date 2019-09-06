import Hitalk from './index.vue'

Hitalk.install = function(Vue, props) {
  Vue.prototype.$Hitalk = props
  // @ts-ignore
  Vue.component(Hitalk.name, Hitalk)
}

export default Hitalk
