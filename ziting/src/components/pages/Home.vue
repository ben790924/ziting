<template>
    <div>
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
            <div class="row" v-if="show_detail">
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
                            <button class="btn btn-danger">加入購物車</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Shopping-cart :cart_data='detail_datas'></Shopping-cart>
    </div>
</template>

<script>
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

        }
    },
    methods:{
        parent_method(){
            this.show_detail = !this.show_detail
        },
        getProduct(id){
            let vm = this
			let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
            this.axios.get(url).then((res)=>{
                vm.products = res.data.products
                // vm.detail_datas = res.data.products
                console.log(res.data)
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
        }
    },

    created(){
        this.getProduct()
        // console.log(this.products)
    }
}
</script>
<style scoped>
/* *{
    border: 1px solid;
} */
html,body{
    font-family: '微軟正黑體';
    font-size: 14px;
    background-color: #f6f5f2;
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
</style>
