<template>
  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  components: { NavBar }
}
</script>

<style lang="scss">
body {
  background: #f2f2f2
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #008cff;
  padding: 0px 10px;
}
a {
  text-decoration: none;
  color: #008cff;

}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    

    &.router-link-exact-active {
      color: #008cff;
    }
  }
}

button {
  border-radius: 6px;
  display: block;
  margin-top: 30px;
  background: #008cff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  margin: 20px 0;
  cursor: pointer;
}
</style>
