<template>
    <div>
        <!-- modal -->
    <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="formGroupExampleInput">標題</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input" v-model="coupon.title">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">是否啟用</label>
                        <input type="checkbox" class="form-control" id="formGroupExampleInput2" placeholder="Another input" v-model="coupon.is_enabled">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput3">折扣百分比</label>
                        <input type="text" class="form-control" id="formGroupExampleInput3" placeholder="Another input" v-model="coupon.percent">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput4">到期日</label>
                        <input type="text" class="form-control" id="formGroupExampleInput4" placeholder="Another input" v-model="coupon.due_date">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput5">優惠馬</label>
                        <input type="text" class="form-control" id="formGroupExampleInput5" placeholder="Another input" v-model="coupon.code">
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="confirm_coupon">確定</button>
            </div>
            </div>
        </div>
    </div>
        <button class="btn" @click="add_coupon">新增優惠券</button>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data(){
        return{
            coupon:{
                "title": "超級特惠價格",
                "is_enabled": 1,
                "percent": 80,
                "due_date": 6547658,
                "code": "testCode"
            },
            coupon_list:[]
        }
    },
    methods:{
        add_coupon(){
            let vm = this
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`
            this.axios.post(url,{data:vm.coupon}).then((res)=>{
                console.log('coupon',res)
                
                $('#exampleModal').modal('show')
            })
        },
        confirm_coupon(page=1){
            let vm = this
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`
            this.axios.get(url,{coupons:[vm.coupon]}).then((res)=>{
                console.log('getCoupon',res)
                if(res.data.success){
                    vm.coupon_list = res.data.coupons
                    console.log('coupon_list',vm.coupon_list)
                    $('#exampleModal').modal('hide')
                }
                
            })
        }
    }
}
</script>
