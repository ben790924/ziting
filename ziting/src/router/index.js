import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '@/components/pages/Login'
import Home from '@/components/pages/Home'
import ProductList from '@/components/pages/ProductList'
import DetailPage from '../components/DetailPage'
export default new VueRouter({
    routes:[
        {

            path:'*',
            redirect:'/login'
        },
        {
            name:'Login',
            path:'/login',
            component:Login
        },
        {
            name:'Home',
            path:'/',
            component:Home,
            children:[
                
            ]
        },
        {
            name:'DetailPage',
            path:'/detailpage',
            component:DetailPage,
        },
        {
            name:'Lists',
            path:'/lists',
            component:ProductList,
            meta: { requiresAuth: true }
        },
    ]
})