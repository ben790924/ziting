<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="container">
            <button class="btn btn-success" @click.prevent="return_home_child">返回</button>
            <div class="col">
                <div class="title">{{detail_data.title}}</div>
                <img :src="detail_data.image" class="cover img-fluid" alt="">
                <div class="origin_price together">原價: {{detail_data.origin_price | currency}}</div>
                <div class="price together">特價: {{detail_data.price | currency}}</div>
                <div class="describe together">{{detail_data.description}}</div>
            </div>
            <select class="custom-select" v-model="buy_num">
                <option selected="">選擇數量</option>
                <option  v-for="n in 10" :key="n.id" :value="n">{{n}}</option>
            </select>

            <button class="btn btn-success float-right mt-5" @click="dp_addtocart(detail_data.id,buy_num)">加入購物車</button>
        </div>
    </div>
</template>


<script>
export default {
    name:'DetailPage',
    props:['detail_data'],
    data(){
        return{
            init_return:true,
            buy_num:0,
            isLoading:false
        }
    },
    methods:{
        return_home_child(){
            this.$emit('bridge')
        },
        dp_addtocart(id,qty){
            let vm = this
            this.isLoading = true
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
            let cart = {
                product_id:id,
                qty
            }
            this.axios.post(url,{data:cart}).then((res)=>{
                console.log(res)
                vm.isLoading=false
            })
        }
        }
    }

</script>

<style scoped>
*{
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 20px;
}
.cover{
    width: 500px;
    height: 400px;
    margin:0 0 0 261px;
    border:2px solid #000;
    box-shadow: 5px 5px 15px;
    border-radius: 18px;
}
.title{
    font-size: 50px;
    text-align: center;
    color:grey;
    margin-bottom: 4px;
    font-weight: 800;
}
.together{
    margin-top: 20px;
    font-weight: 550;
    border-radius: 5px;
    padding: 10px;
    transform: translateY(-10px);
    text-align: center;

}
.together:hover{
    background-color: #a9e9d5;
    /* transition: 0.5s */
}
</style>
