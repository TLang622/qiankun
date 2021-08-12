import './public-path'// qiankun
import Vue from 'vue'
import App from './App.vue'
import routes from './router'// qiankun，这里是路由的配置
import VueRouter from 'vue-router'// qiankun

Vue.config.productionTip = false

// qiankun
let router = null
let instance = null
// qiankun，渲染子应用
function render(props = {}) {
  const { container } = props
  // qiankun，配置路由base，如果是通过主应用访问的，base要设置成和主应用的activeRule一致，只有history模式才需要设置base
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vue-history/' : '/',
    mode: 'history',
    routes,
  })

  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')// qiankun，在主应用的容器内选择#app作为子应用的容器，即#microapp #app，避免有很多标签的id选择器都是#app时出错
}

// qiankun，独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// qiankun，子应用生命周期
export async function bootstrap() {
  console.log('[vue-history] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue-history] props from main framework', props)
  // qiankun，在当前应用监听全局状态
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev)
  })
	// qiankun，更改状态
  props.setGlobalState({
	user: {
	    name: 'name3',
	  },
	  age: 21
  })
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
