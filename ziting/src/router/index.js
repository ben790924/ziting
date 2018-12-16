import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/components/HelloWorld'


export default new VueRouter({
    routes:[
        {
            name:'home',
            path:'/',
            component:Home
        },
    ]
})