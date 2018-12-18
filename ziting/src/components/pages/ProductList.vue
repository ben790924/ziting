<template>
    <div>
        <div class="container">
            <button class="btn btn-success" @click="logout">登出</button>

            <hr>
            <!-- 輪播圖 -->
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner" v-for="(pic,num) in products" :key="pic.id">
                    <div class="carousel-item" :class="{'active':num+1===products_length}">
                        <img class="d-block w-100" :src="pic.image">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true" @click="minus_length"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true" @click="plus_length"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <!-- 表個內容 -->
            <table class="table table-lg-responsive">
                <thead>
                    <tr>
                        <td width='150'>產品名稱</td>
                        <td width='100'>分類</td>
                        <td width='150'>原價</td>
                        <td width='150'>售價</td>
                        <td width='70'>數量</td>
                        <td width='100'>操作</td>
                        <td><button class="btn btn-secondary" @click.prevent="show_modal(true)">新增產品</button></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in products" :key="item.id">
                        <td>{{item.title}}</td>
                        <td>{{item.category}}</td>
                        <td class="text-right">${{item.origin_price}}</td>
                        <td class="text-right">${{item.price}}</td>
                        <td>{{item.num}}/{{item.unit}}</td>
                        <td><button class="btn btn-sm btn-outline-primary" @click.prevent="show_modal(false,item)">編輯</button></td>
                        <td><button class="btn btn-danger btn-sm" @click="delete_product(item.id)">刪除產品</button></td>
                    </tr>
                </tbody>
            </table>
        </div>



    <!-- Modal -->
    <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModal3Label">修改產品</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <!-- first -->
                    <div class="form-group">
                        <label for="formGroupExampleInput">產品名稱</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="產品名稱" v-model="temp_product.title">
                    </div>
                    <!-- second -->
                    <div class="form-group">
                        <label for="formGroupExampleInput1">分類</label>
                        <input type="text" class="form-control" id="formGroupExampleInput1" placeholder="分類" v-model="temp_product.category">
                    </div>
                    <!-- second -->
                    <div class="form-group">
                        <label for="formGroupExampleInput2">原價</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="原價" v-model="temp_product.origin_price">
                    </div>
                    <!-- forth -->
                    <div class="form-group">
                        <label for="formGroupExampleInput3">售價</label>
                        <input type="text" class="form-control" id="formGroupExampleInput3" placeholder="售價" v-model="temp_product.price">
                    </div>
                    <!-- fifth -->
                    <div class="form-group">
                        <label for="formGroupExampleInput4">數量</label>
                        <input type="text" class="form-control" id="formGroupExampleInput4" placeholder="數量" v-model="temp_product.num">
                    </div>
                    <!-- sixth -->
                    <div class="form-group">
                        <label for="formGroupExampleInput5">單位</label>
                        <input type="text" class="form-control" id="formGroupExampleInput5" placeholder="單位" v-model="temp_product.unit">
                    </div>
                    <!-- seventh -->
                    <div class="form-group">
                        <label for="formGroupExampleInput6">圖片</label>
                        <input type="text" class="form-control" id="formGroupExampleInput6" placeholder="圖片網址" v-model="temp_product.image">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.prevent='update_product'>確認</button>
            </div>
            </div>
        </div>
    </div>

    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data(){
        return{
            products:[],
            temp_product:{},
            is_new:false,
            products_length:1
        }
    },
    methods:{
        getProduct(){
            let vm = this
			let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
            this.axios.get(url).then((res)=>{
                vm.products = res.data.products
            })
        },
        show_modal(is_new,item){
            if(this.is_new){
                this.temp_product = {}
                this.is_new = true
            }else{
                this.temp_product = {...item}
                this.is_new=false
            }
            $('#exampleModal3').modal('show')
        },
        update_product(){
            let vm = this
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
            let http_method ='post'
            if(this.is_new){
                http_method = 'put',
                url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.temp_product.id}`
            }
            this.axios[http_method](url,{data:vm.temp_product}).then((res)=>{
                // console.log(res)
                if(res.data.success){
                    console.log('新增產品',res)
                    $('#exampleModal3').modal('hide')
                    vm.getProduct()
                }else{
                    vm.getProduct()
                }

            })
        },
        delete_product(id){
                let vm = this
                let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${id}`
                this.axios.delete(url).then((res)=>{
                    // console.log('delete',res)
                    vm.getProduct()
            })
        },
        minus_length(){
            if(this.products_length>1){
                console.log('minus',this.products_length)
                this.products_length--
            }


        },
        plus_length(){
            if(this.products_length<this.products.length){
                console.log('plus',this.products_length)
                this.products_length++
            }
        },
        logout(){
            let vm = this
            let url = `${process.env.APIPATH}/logout`
            this.axios.post(url).then((res)=>{
                console.log('登出',res.data)
                this.$router.push('/login')
            })
        }
    },

    created(){
        this.getProduct()
        // console.log(this.products)
    }
}
</script>
<style>
.carousel-control-prev-icon{
    background-color:black;
    border-radius: 50%;
    padding: 5px;

}
.carousel-control-next-icon{
    background-color:black;
    border-radius: 50%;
    padding: 5px;

}
/* .carousel-inner{
    width: 550px;
    height: 500px;
} */
.carousel{
    width: 700px;
    height: 600px;
    margin: auto;
}
</style>
