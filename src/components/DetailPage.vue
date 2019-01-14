<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="container">
            <button class="btn btn-success btn-sm" @click.prevent="return_home_child">返回</button>
                <div class="row justify-content-center">
                <div class="col-12 text-center">
                    <div class="title">{{detail_data.title}}</div>
                    <img :src="detail_data.image" class="cover" alt="">
                    <div class="origin_price together">原價: {{detail_data.origin_price | currency}}</div>
                    <div class="price together">特價: {{detail_data.price | currency}}</div>
                    <div class="describe together">{{detail_data.description}}</div>
                </div>
                </div>
                <div class="row justify-content-center">
                    <select class="custom-select" v-model="buy_num">
                        <option selected="">選擇數量</option>
                        <option  v-for="n in 10" :key="n.id" :value="n">{{n}}</option>
                    </select>
                    <button class="btn btn-success btn-sm addcartbtn" @click="dp_addtocart(detail_data.id,buy_num)">加入購物車</button>
                </div>
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
    border:2px solid #000;
    box-shadow: 5px 5px 15px;
    border-radius: 18px;
    width: 50%;
}
.wrap{
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 400px;
    margin: 10px auto;
}
.together:hover{
    background-color: #a9e9d5;
    /* transition: 0.5s */
}
.custom-select{
    width: 300px;
}
@media(max-width: 767px){
    .together{
        width: auto;
        margin: 0;
    }
    .cover{
    border:2px solid #000;
    box-shadow: 5px 5px 15px;
    border-radius: 18px;
    width: 100%;
}
.addcartbtn{
    margin-bottom: 10px;
    margin-top: 10px;
}
}
</style>
