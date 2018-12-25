<template>
    <div class="container-fluid cprs">
        <ul class="nav nav_bg">
            <li class="nav-item">
                <router-link class="nav-link nav_text" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link nav_text" to="/lists">管理員介面</router-link>
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
                            <button class="btn btn-danger" @click="add_to_cart(item.id,item.qty,$event,item.image),bus_emit_data()">加入購物車</button>
                        </div>
                    </div>
                </div>
            </div>
            <Shopping-cart :add_to_cart_data='cart_datas' @reload_data='parent_reload_data' @child_return_button='cart_button' v-if="show_cart"></Shopping-cart>
            <div class="fly_box" :style="picture(flypicture)" v-if="flypicture"></div>
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
            flypicture:null
        }
    },
    methods:{
        bus_emit_data(){
            console.log('cart_datas',this.cart_datas)
            this.$bus.$emit('bridge',{arraydata:this.cart_datas})
        },
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
            })
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
    padding: 0;
    margin: 0;
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
    background-color: #00aeef;
    width: 100%;
    height: 100px;

}
.nav_text{
color: #feffff;
}
.footer{
    position: absolute;
    right: 150px;
    top: 25px;
    width: 80px;
    height: 80px;
    z-index: 1000;
}
.cprs{
    position: relative;
}
.cart_btn{
    margin: 0;
    padding: 0;
    background-color: #00aeef;
    
}

</style>
