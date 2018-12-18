<template>
    <div>

        <div class="container mt-5">
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col-md-3 text-center" v-for="item in products" :key="item.id">
                            <div class="cover listMg" :style='picture(item.image)'></div>
                            <div class="title listMg">產品名稱: {{item.title}}</div>
                            <div class="price listMg">原價 ${{item.origin_price}}</div>
                            <div class="forsale listMg">特價 ${{item.price}}</div>

                        </div>
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
        // console.log(this.products)
    }
}
</script>
<style>
/* *{
    border: 1px solid;
} */
html,body{
    font-family: '微軟正黑體';
    font-size: 14px;
}
.createPD{
    float:right;
}
.cover{
    width: 150px;
    height: 100px;
    margin: auto;
}
.listMg{
    margin-top: 5px;
}
</style>
