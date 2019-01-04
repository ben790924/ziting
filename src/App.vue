<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import Login from './components/pages/Login'

export default {
  name: 'App',
  components: {
    // Login
  },
  created(){
    let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`
    this.axios.get(url).then((res)=>{
      // console.log(res)
    })
  }
}
</script>

<style lang='scss'>
@import './assets/all.scss';
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC');
</style>
