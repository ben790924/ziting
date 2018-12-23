<template>
    <div class="container posr">
        <ul class="nav mt-4 nav_bg">
            <li class="nav-item">
                <router-link class="nav-link active nav_text" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link nav_text" to="/lists">管理員介面</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link nav_text" to="/login">登入</router-link>
            </li>
        </ul>
        <div class="container mt-5">
            <!-- DetailPage元件 -->
            <Detail-page v-if="!show_detail" :detail_data='detail_datas' @bridge='parent_method'></Detail-page>

            <!-- 原有的購物頁面 -->
            <div class="row" v-show="show_detail && !show_cart">
                <div class="col">
                    <div class="row">
                        <div class="col-md-3 text-center" v-for="item in products" :key="item.id">
                            <div class="out_cover">
                                <div class="cover listMg" :style='picture(item.image)'></div>
                            </div>
                            <div class="title listMg">產品名稱: {{item.title}}</div>
                            <div class="price listMg">原價: ${{item.origin_price}}</div>
                            <div class="forsale listMg">特價: ${{item.price}}</div>
                            <button class="btn btn-success btn-sm" @click="detail_page(item.id)">查看詳情</button>
                            <button class="btn btn-danger" @click="add_to_cart(item.id)">加入購物車</button>
                        </div>
                    </div>
                </div>
            </div>
            <Shopping-cart :add_to_cart_data='cart_datas' @reload_data='parent_reload_data' @child_return_button='cart_button' v-if="show_cart"></Shopping-cart>
        </div>
        <!-- 購物車component -->

        <div class="footer container" v-if="show_detail && !show_cart">
            <div class="shop_car"><button class="btn btn-lg" @click="cart_button">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart_num">{{cart_datas.length}}</span>
                </button></div>
        </div>

    </div>
</template>

<script>
import $ from 'jquery'
import DetailPage from '../DetailPage.vue'
import ShoppingCart from '../ShoppingCart.vue'
export default {
    components:{
        DetailPage,ShoppingCart
    },
    data(){
        return{
            products:[],
            show_detail:true,
            detail_datas:{},
            cart_datas:[],
            show_cart:false,
        }
    },
    methods:{
        cart_button(){
            this.show_cart =! this.show_cart
        },
        parent_reload_data(){
            this.get_carts()
        },
        cart_need_data(){
            return this.products
        },
        parent_method(){
            this.show_detail = !this.show_detail
        },
        getProduct(id){
            let vm = this
			let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
            this.axios.get(url).then((res)=>{
                vm.products = res.data.products
                // vm.detail_datas = res.data.products
                // console.log(res.data)
            })
        },
        picture(url){
            return {
                'background-image':'url('+url+')',
                'background-size':'cover',
                'background-position':'center center'
            }
        },
        detail_page(id){
            this.show_detail=false
            // console.log('homepage show_detail',this.show_detail)
            // console.log(id) 一串英文字
            let vm = this
            let url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`
            this.axios.get(url).then((res)=>{
                // console.log('單一商品',res)
                vm.detail_datas = res.data.product
            })
        },
        add_to_cart(id,qty=1){
            let vm = this
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
            let cart = {
                product_id:id,
                qty
            }
            this.axios.post(url,{data:cart}).then((res)=>{
                // console.log('add_to_cart,HOME',res)
                vm.get_carts()
            })
            $('.out_cover')
        },
        get_carts(){
            let vm = this
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
            this.axios.get(url).then((res)=>{
                // console.log('getcarts',res)
                vm.cart_datas = res.data.data.carts
                // console.log('vm.cart_datas',vm.cart_datas)
            })
        },
        delete_carts(id){
            let vm = this
                let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
                this.axios.delete(url).then((res)=>{
                    vm.get_carts()

            })
        },
    },

    created(){
        this.getProduct()
        // console.log(this.products)
        this.get_carts()
    },

}
</script>
<style scoped>

html,body{
    font-family: '微軟正黑體';
    font-size: 14px;
    background-color: #f6f5f2;
    position: relative;

}
.shop_car{
    position: relative;
    width: 60px;
    height: 50px;
    transition: 0.5s;
    transform: scale(1.8)
}
.shop_car:hover{
    transform: scale(2.4);
    transition: 0.5s
}
.cart_num{
    position: absolute;
    right: 4px;
    top: 1px;
    border: 1px solid #a80000;
    background-color:#a80000;
    color: #feffff;
    border-radius: 50%;
    width: 16px;
    height: 17px;
    font-size: 8px;
    line-height: 17px;
}

.createPD{
    float:right;
}
.out_cover{
    width: 250px;
    height: 190px;
    overflow: hidden;
    margin: auto;
    border-radius: 10px;
}
.cover{
    display: block;
    width: 100%;
    height: 100%;
    margin: auto;
    /* border: 1px solid #ccec4a; */
    /* border-radius: 10px; */
    /* padding: 4px; */
    transition: 0.5s;
}
.cover:hover{
    transform: scale(1.2);
    transition: 0.5s;
    /* transform: translateY(-5px) */
}
.listMg{
    margin-top: 5px;
}
.nav_bg{
    background-color: #00aeef;
    width: 100%;
    height: 100px;

}
.nav_text{
color: #feffff;
}
.footer{
    position: fixed;
    right: -820px;
    top:280px;
    display: flex;
    padding: 5px;
}
</style>
