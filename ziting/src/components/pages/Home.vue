<template>
    <div>
        <div class="container">
            
            <div class="row" v-for="item in products" :key="item.id">
                <div class="col-lg-3" :style="picture(item.image)"></div>
                <div class="col-lg-3 mt-4">{{item.title}}</div>
                <div class="col-lg-3 mt-4">{{item.origin_price}}</div>
                <div class='col-lg-3'><button class="btn btn-danger">刪除</button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data(){
        return{
            products:[]
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
        picture(url){
            return {
                'background-image':'url('+url+')',
                'background-size':'cover',
                'background-position':'center center'
            }
        }
    },

    created(){
        this.getProduct()
        console.log(this.products)
    }
}
</script>
