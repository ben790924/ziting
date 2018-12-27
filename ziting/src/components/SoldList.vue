<template>
    <div>
        <router-link to='/'>home</router-link>
        <!-- <button class="btn" @click="on_from_cart">ON</button> -->
        <table class="table">
            <thead>
                <tr>
                    <th>購買日期</th>
                    <th>E-mail</th>
                    <th>購買款項</th>
                    <th>應付金額</th>
                    <th>是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2018/12/25</td>
                    <td>FNX</td>
                    <td>1</td>
                    <td>9000</td>
                    <td>是</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            home_data:[],
            
        }
    },
    methods:{
        // on_from_cart(){
        //     let vm = this
        //     this.$bus.$on('cart-to-soldlist',function(evt){
        //         vm.message = evt
        //     })
        // }
    },
    created(){

    }

}
</script>
