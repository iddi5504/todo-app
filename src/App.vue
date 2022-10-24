<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data(){
    return {
      username:"",
      password:""
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: 700px;
  background: #f4edf5;
}


</style>
