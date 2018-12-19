<template>
    <div>
        <div class="container">
            <button class="btn btn-success" @click.prevent="return_home_child">返回</button>
            <div class="col">
                <div class="title">{{detail_data.title}}</div>
                <img :src="detail_data.image" class="cover img-fluid" alt="">
                <div class="origin_price together">原價: ${{detail_data.origin_price}}</div>
                <div class="price together">特價: ${{detail_data.price}}</div>
                <div class="describe together">{{detail_data.description}}</div>
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
            init_return:true
        }
    },
    methods:{
        return_home_child(){
            this.$emit('bridge')
        }
        }
    }

</script>

<style scoped>
*{
    font-family: '微軟正黑體';
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
    margin-bottom: 10px;
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
