<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <HelloWorld/>
    -->
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created(){
    let url = 'https://randomuser.me/api/'
    this.axios.get(url).then((res)=>{
      // console.log(res.data.results[0].email)
    })
  }
}
</script>

<style lang='scss'>
@import './assets/all.scss'
</style>
