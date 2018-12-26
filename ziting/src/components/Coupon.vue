<template>
    <div>
        <!-- modal -->
    <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">新增優惠券</h5>
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
                <button type="button" class="btn btn-primary" @click="update_coupon(coupon_list.id)">確定</button>
            </div>
            </div>
        </div>
    </div>
        <!-- 優惠券列表 -->
        <table class="table container mt-5">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>是否起用</th>
                    <th>折扣百分比</th>
                    <th>到期日</th>
                    <th>折扣碼</th>
                    <th><button class="btn" @click='show_modal(true)'>新增優惠券</button></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="list in coupon_list" :key="list.id">
                    <td>{{list.title}}</td>
                    <td>{{list.is_enabled}}</td>
                    <td>{{list.percent}}</td>
                    <td>{{list.due_date}}</td>
                    <td>{{list.code}}</td>
                    <td><button class="btn btn-danger" @click="delete_coupon(list.id)">刪除</button><button class="btn" @click="show_modal(list,false)">修改</button></td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data(){
        return{
            coupon:{},
            coupon_list:{},
            is_new:false
        }
    },
    methods:{
        show_modal(item,is_new){
            if(this.is_new){
                this.coupon = {}
                this.is_new=true
            }else if(!this.is_new){
                this.coupon = {...item}
                this.is_new=false
            }
            $('#exampleModal').modal('show')
        },
        update_coupon(id){
            let vm = this
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`
            let httpmethod = 'post'
            if(!this.is_new){
                httpmethod='put'
                url=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`
            }
            this.axios[httpmethod](url,{'data':vm.coupon}).then((res)=>{
                if(res.data.success){
                    $('#exampleModal').modal('hide')
                    vm.get_coupon()
                }else{
                    alert('更新失敗')
                }
            })
        },
        get_coupon(){
            let vm = this
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`
            this.axios.get(url,vm.coupon).then((res)=>{
                console.log('getCoupon',res)
                if(res.data.success){
                    vm.coupon_list = res.data.coupons
                    console.log('coupon_list',vm.coupon_list)

                }

            })
        },
        delete_coupon(id){
            let vm = this
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`
            this.axios.delete(url).then((res)=>{
            vm.get_coupon()
            })
        }
    },
    created(){
        this.get_coupon()
    }
}
</script>
