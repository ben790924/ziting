<template>
    <div>
        <div class="vld-parent">
            <loading :active.sync="isLoading"></loading>
        </div>
        <div class="container testfontsize">
            <!-- navbar -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                                <router-link to='/' class="nav-link">首頁</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to='/soldlist' class="nav-link">訂單列表</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to='lists/Coupon' class="nav-link">優惠券</router-link>
                            </li>
                            <li class="nav-item">
                        </li>
                    </ul>
                <button class="btn btn-sm btn-success nav_btn" @click="logout">登出</button>
                </div>
            </nav>
            <!-- 輪播圖 -->
            <!-- <div class="row justify-content-center">
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
                </div> -->
            <!-- 表個內容 -->
                <table class="table table-hover">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">產品名稱</th>
                        <th scope="col">分類</th>
                        <th scope="col">原價</th>
                        <th scope="col">售價</th>
                        <th scope="col">數量</th>
                        <th scope="col">操作</th>
                        <th scope="col"><button class="btn btn-secondary" @click.prevent="show_modal(true,temp_product)">add</button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in products" :key="item.id" class="table-light">
                        <th scope='row'>{{item.title}}</th>
                        <td>{{item.category}}</td>
                        <td class="text-right">{{item.origin_price | currency}}</td>
                        <td class="text-right">{{item.price | currency}}</td>
                        <td>{{item.num}}/{{item.unit}}</td>
                        <td><button class="btn btn-sm btn-outline-primary" @click.prevent="show_modal(false,item)">edit</button></td>
                        <td><button class="btn btn-danger btn-sm" @click="delete_product(item.id)">del</button></td>
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
                        <label for="formGroupExampleInput6">描述</label>
                        <input type="text" class="form-control" id="formGroupExampleInput6" placeholder="描述" v-model="temp_product.description">
                    </div>
                    <!-- eight -->
                    <div class="form-group">
                        <label for="formGroupExampleInput7">圖片</label>
                        <input type="text" class="form-control" id="formGroupExampleInput7" placeholder="圖片網址" v-model="temp_product.image">
                        <input type="file" name="file-to-upload" @change="upload_image" ref="files">
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click='update_product'>確認</button>
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
            products_length:1,
            isLoading:false,
        }
    },
    methods:{
        getProduct(){
            let vm = this
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
            vm.isLoading = true
            this.axios.get(url).then((res)=>{
                // console.log('getProduct',res)
                vm.products = res.data.products
                vm.isLoading = false
            })
        },
        show_modal(is_new,item){
            if(is_new){
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
            vm.isLoading = true
            if(!this.is_new){
                http_method = 'put',
                url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.temp_product.id}`
            }
            this.axios[http_method](url,{data:vm.temp_product}).then((res)=>{
                // console.log(res)

                if(res.data.success){
                    console.log('新增產品',res)
                    $('#exampleModal3').modal('hide')
                    vm.getProduct()
                    vm.isLoading = false
                }else{
                    vm.getProduct()
                    vm.isLoading = false
                }

            })
        },
        delete_product(id){
                let vm = this
                let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${id}`
                this.axios.delete(url).then((res)=>{
                    console.log('delete_product',res)
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
        },
        upload_image(){
            // console.log(this)
            let form_data = new FormData()
            let uploaded_image = this.$refs.files.files[0]
            form_data.append('file-to-upload',uploaded_image)
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
            let vm = this
            this.axios.post(url,form_data,{
                headers:{'Content-Type':'multipart/form-data'}
            }).then((res)=>{
                console.log('image',res)
                vm.$set(vm.temp_product,'image',res.data.imageUrl)
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
html,body{
/*
    background-image: url('../../assets/bgimage.jpg');
    background-position: center center;
    background-size: 100%; */
    /* background-repeat: no-repeat */
    background-color: #F8F9FA;
}
body{
    font-family: 'Noto Sans TC'
}
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
.carousel-item{
    width: 500px;
    height: 400px;
    margin: auto;
}
.carousel-item img{
    width: 440px;
    height: 300px;
    margin: auto;
    margin-top: 50px
}
.table{
    text-align: center;
}
.nav_btn{
    float: right;
}
@media(max-width: 767px){
    .nav_btn{
        float: left;
    }
    .testfontsize{
        /* font-size: 10px; */
    }
}
</style>
