<template>
<div>
    <button class="btn btn-primary btn-lg return_button" @click="return_carts">返回</button>
    <div class="container cart_container">
        <div class="cart_header mt-5 mb-5">
            <div class="cart_title">套用優惠券</div>
        </div>
        <div class="main">
            <div class="input-group">
                <input type="text" class="form-control inputCinput" placeholder="" aria-label="" aria-describedby="basic-addon1" v-model="coupon_codes">
                <div class="input-group-append">
                    <button class="btn btn-success" type="button" @click="input_coupon">確認</button>
                </div>
            </div>
        </div>
        <div class="ok_icon mt-5">
            <i class="fas fa-check-circle" v-show="is_show"></i>
            <span class="ml-2" v-if="is_show">已套用優惠券</span>
            <i class="fas fa-times-circle" v-show="has_coupon && !is_show"></i>
            <span class="ml-2" v-if="has_coupon && !is_show">找不到優惠券</span>
        </div>
    </div>

</div>

</template>

<script>
import $ from 'jquery'
export default {

data(){
    return{
        coupon_codes:'',
        is_show:false,
        has_coupon:false,
        coupon_price:0
    }
},

methods:{
    input_coupon(){
        let vm = this

        let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
        let coupon = {
            code:vm.coupon_codes
        }
        this.axios.post(url,{data:coupon}).then((res)=>{
            console.log('inputCoupon',res)
            if(res.data.success){
                vm.is_show=true
                vm.coupon_price = res.data.data.final_total
                console.log('vm.coupon_price',vm.coupon_price)
                vm.$emit('bridge_coupon',vm.coupon_price)
            }else{
                vm.has_coupon = true
            }
            })
        },
    return_carts(){
        this.$emit('inputcoupon_bridge')
    }
    },

}

</script>




<style>
.ok_icon{
    display: flex;
    justify-content: center;
    transition: 1s;
    align-items: center;
    font-weight: bold;
}
.fa-check-circle{
    font-size: 40px;
}
.fa-times-circle{
    font-size: 40px;
}
.inputCinput{
    width: 100px;
}
</style>
