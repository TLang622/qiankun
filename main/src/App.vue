<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/vue-hash/">APP1</router-link> |
      <router-link to="/vue-history">APP2</router-link> |
      <a @click="push('/vue-hash/')">history</a>
    </div>
    <div id="microapp"></div>
    <router-view/>
  </div>
</template>
<script>


export default {
  name: 'App',
  methods:{
  	push(subapp) {
  	  // 官方推荐的应用跳转方式，当点击浏览器后退前进按钮，导致应用切换跳转失败时，可解决
      history.pushState(null, subapp, subapp)
    },
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
