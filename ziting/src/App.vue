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
    let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`
    this.axios.get(url).then((res)=>{
      console.log(res)
    })
  }
}
</script>

<style lang='scss'>
@import './assets/all.scss'
</style>
