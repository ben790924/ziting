<template>
<div>
    <div class="container cart_container">
        <div class="cart_header mt-5 mb-5">
            <div class="cart_title">購物車</div>
            <button class="edit_cart btn btn-white">修改</button>
        </div>
        <div class="main">
            <div class="row mt-4 mb-4">
                <img class="left_for_pic col-3" src='../assets/logo.png'>
                <div class="main_info col-7">
                    <div class="product_name mb-2">羊毛大衣</div>
                    <div class="color_size mb-2">黑色-M</div>
                    <div class="product_num">5個</div>
                </div>
                <div class="price_and_cancel col-2">
                    <div class="product_price">$2,929</div>
                    <div class="cancel_button"><i class="far fa-trash-alt"></i></div>
                </div>
            </div>
        </div>
        <div class="cart_footer mt-5">
            <div class="row">
                <div class="col-6 text-right total_product">共1件商品</div>
                <div class="col-3 text-right">
                    <div class="align-self-start mb-3">商品金額</div>
                    <div class="align-self-center mb-3">運費</div>
                    <div class="align-self-end mb-3">小計</div>
                </div>
                <div class="col-3 text-right">
                    <div class="align-self-start mb-3">$2,929</div>
                    <div class="align-self-center mb-3">60</div>
                    <div class="align-self-end mb-3">$2,989</div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
    props:['cart_data'],

methods:{
    cart_picture(url){
            return {
                'background-image':'url('+url+')',
                'background-size':'cover',
                'background-position':'center center'
            }
        },
}
}

</script>




<style>
html,body{
    font-family: '微軟正黑體';
    padding: 10px;
    position: relative;
}
.cart_container{
    width: 50%;
    margin-top: 20px;
    /* border: 1px solid #000; */
    position: absolute;
    top: 600px;
    left: 564px;
}
/* header */
.cart_header{
    margin-top: 10px;
    width: 100%;
    height: 60px;
    /* background-color: #00AEEF;
     */
    border-bottom: 2px solid #495057;
    text-align: center;
    /* vertical-align: center; */
    /* border-radius: 10px; */
    /* box-shadow: 5px 3px 10px; */
    /* background: linear-gradient(#fff,rgba(54, 59, 55, 0.623)) */
}
.cart_title{
    vertical-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #495057;
    padding: 0;
    display: inline-block;
    line-height: 60px;
}
.edit_cart{
    float: right;
    font-size: 15px;
    color: #495057;
    font-weight: 550;
    cursor: pointer;
    margin-top: 13px;
    margin-right: 12px;
}

/* main */
.main{
    position: relative;
    border-bottom: 2px solid #495057;
}
.product_name{
    font-size: 28px;
    color: #495057;
    font-weight: 550;
}
.left_for_pic{
    height: 140px;
    background-size: cover;
    background-position: center center;
}
.color_size{
    color: rgba(54, 59, 55, 0.623)
}
.product_num{
    color: rgba(54, 59, 55, 0.623)
}
.cancel_button{
    font-size: 40px;
    position: absolute;
    cursor: pointer;
    bottom: 14px;
    right:108px
}
.product_price{
    font-size: 20px;
}
/* footer */

.cart_footer{
    font-size: 20px;
    color: #495057;
}
.total_product{
    color: rgba(54, 59, 55, 0.623)
}
</style>
