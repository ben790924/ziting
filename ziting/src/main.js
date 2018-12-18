// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import 'bootstrap'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})

router.beforeResolve((to, from, next) => {
  if(to.meta.requiresAuth){

    let url = `${process.env.APIPATH}/api/user/check`
    axios.post(url).then((res)=>{
      console.log('check',res)
      if(res.data.success){
        next()
      }else{
        next({
          path:'/login'
        })
      }
    })
  }else{
    next()
  }
})