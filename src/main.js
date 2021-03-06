// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax"
import VeeValidate from 'vee-validate'
import VeeCht from '../node_modules/vee-validate/dist/locale/zh_TW'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import eventBus from './setup/eventBus'
import currencyFilter from '../src/filter/currency'
import timestapmFilter from '../src/filter/timestamp'
import mapobjectFilter from '../src/filter/mapobject'
Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh-TW',VeeCht)
Vue.component('Loading',Loading)
Vue.config.productionTip = false
Vue.filter('currency',currencyFilter)
Vue.filter('timestamp',timestapmFilter)
Vue.filter('mapfilter',mapobjectFilter)
axios.defaults.withCredentials = true
/* eslint-disable no-new */

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  data(){
    return{
      bus:eventBus
    }
  }
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