import Vue from 'vue'
import App from './App.vue'
import router from './router'
// qiankun
import { registerMicroApps, start, initGlobalState, MicroAppStateActions } from 'qiankun'

Vue.config.productionTip = false

// qiankun，注册微应用
registerMicroApps(
	[
	  {
	    name: 'vue-history',// qiankun，给微应用起名
	    entry: '//localhost:8082',// qiankun，微应用的域名
	    container: '#microapp',// qiankun，主应用用于放置微应用的容器，在app.vue
	    activeRule: '/vue-history',// qiankun，主应用用来映射微应用的路由，这里采用的是pathname方式，例如主应用是http://localhost:8080，则子应用是http://localhost:8080/vue-history。也能配置成hash模式例如http://localhost:8080/#/vue-history
	  },
	  {
	    name: 'vue-hash',
	    entry: '//localhost:8081',
	    container: '#microapp',
	    activeRule: '/vue-hash',
	  }
	],
	{
		beforeLoad: [// qiankun，主应用的生命周期
		  app => {
		    console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
		  },
		],
		beforeMount: [
		  app => {
		    console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
		  },
		],
		afterUnmount: [
		  app => {
		    console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
		  },
		],
	}
)

// qiankun，应用间通信。初始化 state
const actions = initGlobalState({
  user: 'name1',
});
// qiankun，在当前应用监听全局状态
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
// qiankun，更改状态，如果需要每次进入主应用都更改状态，可以放到主应用的生命周期中
actions.setGlobalState({
  user: {
    name: 'name2',
  },
  age: 18
});
// qiankun，移除当前应用的状态监听，主应用如果不需要一直监听状态时调用，否则不调用，微应用 umount 时会默认调用
actions.offGlobalStateChange();
// 启动 qiankun
start()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
