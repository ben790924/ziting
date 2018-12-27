<template>
<div>
    <button class="btn btn-primary btn-lg return_button" @click="return_carts">返回</button>
    <div class="container cart_container">
        <div class="cart_header mt-5 mb-5">
            <div class="cart_title">套用優惠券</div>
        </div>
        <div class="main">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" v-model="coupon_codes">
                <div class="input-group-append">
                    <button class="btn btn-success" type="button" @click="input_coupon">確認</button>
                </div>
            </div>

        </div>
    </div>

</div>

</template>

<script>
export default {

data(){
    return{
        coupon_codes:'',
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
            console.log(res)
            })
        },
    return_carts(){
        this.$emit('inputcoupon_bridge')
    }
    },

}



</script>




<style>

</style>
