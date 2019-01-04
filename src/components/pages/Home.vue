<template>
<div>
    <loading :active.sync="isLoading"></loading>
    <div class="container-fluid cprs">
        <ul class="nav nav_bg">
            <li class="nav-item">
                <router-link class="nav-link nav_text" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link nav_text" to="/lists">管理員</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link nav_text" to="/login">登入</router-link>
            </li>
            <li class="footer" v-if="show_detail && !show_cart">
                <button class="btn btn-lg cart_btn" @click="cart_button">
                <i class="fas fa-shopping-cart"></i>
                </button>
                <div class="cart_num">{{cart_datas.length}}</div>
            </li>
        </ul>

        <!-- jumbotron -->
        <div class="jumbotron jumbotron-fluid mt-5 jumbotronEdit"  v-show="show_detail && !show_cart">
                <div class="container">
                    <h1 class="display-2">享受嘴上的奢華!</h1>
                    <p class="lead">This is a modified jumbotron that occupies
                                    the entire horizontal space of its parent.</p>
                </div>
        </div>


        <div class="container-fluid mt-5">
            <!-- DetailPage元件 -->
            <Detail-page v-if="!show_detail" :detail_data='detail_datas' @bridge='parent_method'></Detail-page>
            <!--  原有的購物頁面 -->
            <div class="row" v-show="show_detail && !show_cart">
                <div class="col">
                    <div class="row">
                        <div class="col-md-3 text-center" v-for="item in products" :key="item.id">
                            <div class="out_cover">
                                <div class="cover listMg" :style='picture(item.image)'></div>
                            </div>
                            <div class="title listMg">產品名稱: {{item.title}}</div>
                            <div class="price listMg">原價: {{item.origin_price | currency}}</div>
                            <div class="forsale listMg">特價: {{item.price | currency}}</div>
                            <button class="btn btn-success btn-sm" @click="detail_page(item.id)">查看詳情</button>
                            <button class="btn btn-danger btn-sm" @click="add_to_cart(item.id,item.qty,$event,item.image)">加入購物車</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- shoppingCart -->
            <Shopping-cart :add_to_cart_data='cart_datas' @reload_data='parent_reload_data' @child_return_button='cart_button' v-if="show_cart"></Shopping-cart>
            <div class="fly_box" :style="picture(flypicture)" v-if="flypicture"></div>
        </div>
    </div>
    <!-- footer -->
    <div class="home_footer container-fluid">
        <span>© Copyright 2018 Ziting蛋糕專賣店</span>
        <a href="#"><i class="fab fa-facebook-square"></i>FACEBOOK</a>
        <a href="#"><i class="fab fa-instagram"></i>INSTAGRAM</a>
        <a href="#"><i class="fab fa-twitter-square"></i>TWITTER</a>
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
            flypicture:null,
            isLoading:false
        }
    },
    methods:{
        // bus_emit_data(){
        //     console.log('cart_datas',this.cart_datas)
        //     this.$bus.$emit('bridge',{arraydata:this.cart_datas})
        // },
        cart_button(){
            this.show_cart =! this.show_cart
            this.get_carts()
        },
        parent_reload_data(){
            this.get_carts()
        },
        cart_need_data(){
            return this.products
        },
        parent_method(){
            this.show_detail = !this.show_detail
            this.get_carts()
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
            this.isLoading=true
            // console.log('homepage show_detail',this.show_detail)
            // console.log(id) 一串英文字
            let vm = this
            let url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`
            this.axios.get(url).then((res)=>{
                // console.log('單一商品',res)
                vm.detail_datas = res.data.product
                vm.isLoading=false
            })
        },
        add_to_cart(id,qty=1,evt,image){
            this.flypicture = image
            let vm = this
            let target = evt.target
            console.log(evt)
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
            let cart = {
                product_id:id,
                qty
            }
            this.$nextTick(()=>{
                TweenMax.from('.fly_box',1,{
                left:$(target).offset().left,
                top:$(target).offset().top,
                opacity:1,
                width: 10,
                height: 15,
            })
            })
            this.axios.post(url,{data:cart}).then((res)=>{
                // console.log('add_to_cart,HOME',res)
                vm.get_carts()
                console.log('加入購物車',res)
            })
        },
        get_carts(){
            let vm = this
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
            this.axios.get(url).then((res)=>{
                // console.log('getcarts',res)
                vm.cart_datas = res.data.data.carts
                console.log('vm.cart_datas',vm.cart_datas)
            })
        },
        delete_carts(id){
                let vm = this
                this.isLoading=true
                let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
                this.axios.delete(url).then((res)=>{
                    vm.get_carts()
                    vm.isLoading=false
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
    font-family: 'Noto Sans TC';
    font-size: 14px;
    /* position: relative; */
    padding: 0;
    margin: 0;
}
.home_footer{
    width: 100%;
    height: 150px;
    position: relative;
    bottom: 0;
    /* margin-top: 170px; */
    background-color: #E9ECEF;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
}
.home_footer span{
    font-size: 20px;
    font-family:'Noto Sans TC';
    transition: 0.5s;
}
.home_footer a{
    margin-left: 10px;
    color:black;
    transition: 0.5s;
}
.home_footer a:hover{
    transform: scale(1.1);
    transition: 0.5s;
}
.home_footer i{
    margin-right: 5px;
}
.home_footer a::after{
    content: '|';
    margin-left: 10px;
}
.jumbotronEdit{
    background-image: url('../../assets/brooke-lark-176362-unsplash.jpg');
    background-size: cover;
    background-position: center center
}
.jumbotronEdit h1{
    font-weight: bold;
    text-shadow: 3px 3px rgb(25, 26, 27);
    color: #F8F9FA
}
.jumbotronEdit p{
    color: rgb(255, 145, 2);
    text-shadow:2px 2px black;
    font-size: 25px;
    font-weight: bold;
}
.cprs{
    background-color: #F8F9FA;
    height: 100%;
    /* position: relative; */
    /* padding-bottom: 170px; */
}
.fly_box{
    width: 60px;
    height: 80px;
    /* background-color: #004040; */
    position: fixed;
    right: 200px;
    top: 16px;
    opacity: 0;
    /* z-index: 2; */

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
    /* position: absolute;
    right: 4px;
    top: 1px; */
    border: 1px solid #a80000;
    background-color:#a80000;
    color: #feffff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 8px;
    line-height: 20px;
    text-align: center;
    display: inline-block;
    font-weight: 700;
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
    background-color: #1b1b1b;
    width: 100%;
    height: 50px;
    text-align: center;
    position: fixed;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center
}
.nav_text{
color: #feffff;
}
.footer{
    position: absolute;
    right: 150px;
    top: 10px;
    width: 80px;
    height: 80px;
    z-index: 1000;
}

.cart_btn{
    margin: 0;
    padding: 0;
    background-color: #00aeef;

}

</style>
