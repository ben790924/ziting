import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '@/components/pages/Login'
import Home from '@/components/pages/Home'

export default new VueRouter({
    routes:[
        {
            name:'Login',
            path:'/login',
            component:Login
        },
        {
            name:'Home',
            path:'/',
            component:Home
        },
    ]
})