<template>
<div>
    <loading :active.sync="isLoading"></loading>
    <button class="btn btn-primary btn-sm return_button" @click="return_button">返回</button>
    <!-- 輸入優惠碼 -->
    <Input-coupon v-if="show_inputCoupon" @inputcoupon_bridge='return_back' @bridge_coupon='get_child_couponPrice'></Input-coupon>
    <div class="container-fluid cart_container" v-if="!show_inputCoupon">
        <div class="cart_header mt-5 mb-5">
            <div class="cart_title">購物車</div>
        </div>
        <div class="main" v-for="cart in add_to_cart_data" :key='cart.id'>
            <div class="row mt-4 mb-4">
                <div class="left_for_pic col-5" :style='cart_picture(cart.product.image)'></div>
                <div class="main_info col-4">
                    <div class="product_name mb-2">{{cart.product.title}}</div>
                    <div class="color_size mb-2">您購買了 <strong>{{cart.qty}}</strong> {{cart.product.unit}}</div>
                    <div class="product_num">庫存: {{cart.product.num}}{{cart.product.unit}}</div>
                </div>
                <div class="price_and_cancel col-3">
                    <div class="product_price">單項價: {{cart.product.price | currency}}</div>
                    <div class="single_total_price">總金額: {{cart.total | currency}}</div>
                    <button class="btn btn-danger btn-sm" @click="delete_cart(cart.id)"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
        <div class="cart_footer mt-5">
            <div class="row" v-if="add_to_cart_data.length!==0">
                <div class="col-5 text-right total_product">共{{add_to_cart_data.length}}件</div>
                <div class="col-4 text-right">
                    <div class="align-self-start mb-3">商品金額</div>
                    <div class="align-self-center mb-3">運費</div>
                    <div class="align-self-end mb-3">小計</div>
                    <div class="cheaper_price text-success" v-if="with_couponPrice!==0">套用優惠價格</div>
                </div>
                <div class="col-3 text-right">
                    <div class="align-self-start mb-3">{{cart_total_price | currency}}</div>
                    <div class="align-self-center mb-3">$60</div>
                    <div class="align-self-end mb-3">{{cart_total_price+60 | currency}}</div>
                    <div class="align-self-end-mb-3 text-success" v-if="with_couponPrice!==0">{{with_couponPrice+60 | currency}}</div>
                </div>
            </div>
            <div class="row justify-content-end mt-5 mb-5">
                <div class="col-8"><button class="btn btn-success input_coupons" @click="toggle_input_page" :disabled='add_to_cart_data.length==0'>輸入優惠碼</button></div>
                <div class="col-4 text-right"><button class="btn btn-danger" @click="togglePayorder" v-if="!add_to_cart_data.length==0">付款結帳去</button></div>
            </div>
            <div class="row empty_cart" v-if="add_to_cart_data.length==0"><h1>購物車是空的 QQ... </h1></div>
        </div>
    </div>
    <!-- 輸入個資 -->
    <div class="payOrder row justify-content-center" v-if="showInput">
        <form class="col-md-6" @submit.prevent="pay_orders">
            <div class="form-group">
            <label for="useremail">Email</label>
            <input v-validate="'required|email'" type="email" class="form-control" :class="{'is-invalid':errors.has('email')}" name="email" id="useremail"
                v-model="form.user.email" placeholder="請輸入 Email">
            <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
            </div>

            <div class="form-group">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" v-validate="'required'" name="name" id="username"
                v-model="form.user.name" placeholder="輸入姓名" :class="{'is-invalid':errors.has('name')}">
            <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
            </div>

                <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input v-validate="'required'" type="tel" name='tel' :class="{'is-invalid':errors.has('tel')}" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
            <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
            </div>

            <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input v-validate="'required'" type="address" class="form-control" :class="{'is-invalid':errors.has('address')}" name="address" id="useraddress" v-model="form.user.address"
                placeholder="請輸入地址">
            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>

            <div class="form-group">
            <label for="useraddress">留言</label>
            <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
            </div>
        </form>
    </div>
</div>

</template>

<script>
import InputCoupon from './InputCoupon'
import $ from 'jquery'
export default {
    components:{
        InputCoupon
    },
    props:['add_to_cart_data'],
    data:function(){
        return {
            show_inputCoupon:false,
            isLoading:false,
            with_couponPrice:0,
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:''
                },
                message:''
            },
            showInput:false
        }
    },

computed:{

    cart_total_price(){
        let vm = this
        let num = 0
        this.add_to_cart_data.forEach(item=>{
            num+=parseInt(item.total)
        })
        return num
    },
},

methods:{
        togglePayorder(){
            this.showInput = !this.showInput
        },
        get_child_couponPrice(p){
            // console.log('p',p)
            this.with_couponPrice=p
        },
        return_back(){
            this.show_inputCoupon=!this.show_inputCoupon
        },
        toggle_input_page(){
            this.show_inputCoupon=!this.show_inputCoupon
        },
        return_button(){
            this.$emit('child_return_button')
        },
        cart_picture(url){
            return {
                'background-image':'url('+url+')',
                'background-size':'cover',
                'background-position':'center center'
            }
        },
        delete_cart(id){ /* 此id為特定此list的id,不是product的id  cart.id 即可 */
                this.isLoading = true
                let vm = this
                let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
                this.axios.delete(url).then((res)=>{
                    vm.$emit('reload_data')
                    vm.isLoading=false
            })
        },
        pay_orders(){
                this.isLoading = true
                let vm = this
                let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
                // vm.$nextTick(()=>{
                //         $(window).animate({scrollTop:$('.payOrder').offset().top},1000)
                // })無作用
                this.$validator.validate().then((result) => {
                    if (result) {
                    this.axios.post(url,{data:vm.form}).then((res)=>{
                    console.log('payOrders',res)
                    if(res.data.success){
                        vm.isLoading=false
                        vm.$router.push(`/checkout/${res.data.orderId}`)
                    }

            })
                    }else{
                        alert('欄位不正確')
                        vm.isLoading=false
                    }
                });
        },
        

},
}

</script>




<style>
.empty_cart{
    color: #202020;
    opacity: 0.3;
}
.empty_cart h1{

    margin:auto;
}
.return_button{
    position: absolute;
    left:260px;
    top:170px;
}
.cart_container{
    width: 50%;
    margin-top: 20px;
    /* border: 1px solid #000; */
    /* position: absolute;
    top: 103px;
    left: 448px; */

}
/* header */
.cart_header{
    margin-top: 10px;
    width: 100%;
    height: 60px;
    /* background-color: #00AEEF;
     */
    border-bottom: 2px solid #1a1f1a11;
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
    color: #202020;
    padding: 0;
    display: inline-block;
    line-height: 60px;
}
.edit_cart{
    float: right;
    font-size: 15px;
    color: #202020;
    font-weight: 550;
    cursor: pointer;
    margin-top: 13px;
    margin-right: 12px;
}

/* main */
.main{
    position: relative;
    border-bottom: 2px solid #1a1f1a11;

}
.product_name{
    font-size: 28px;
    color: #202020;
    font-weight: 550;
}

.color_size{
    color: #f8911b9f
}
.product_num{
    color: #f8911b9f
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
.input_coupons{
    float:right;
}
.cart_footer{
    font-size: 20px;
    color: #ec3535;

}
.total_product{
    color: #25254b
}
@media(max-width: 767px){
    .return_button{
    position: absolute;
    left:278px;
    top:65px;
}
.cart_container{
    width: 100%;
    margin-top: 20px;
}
.color_size,.product_num{
    font-size: 15px;
}
.product_name{
    font-size: 15px;
}
.product_price,.single_total_price{
    font-size: 15px;
    float: left;
    margin-bottom: 5px;
}
.cart_footer{
    font-size: 14px;
}
}
</style>
