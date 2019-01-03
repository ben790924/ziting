<template>
    <div>
        <router-link to='/'>home</router-link>

        <table class="table">
            <thead>
                <tr>
                    <th>購買日期</th>
                    <th>購買人</th>
                    <th>E-mail</th>
                    <th>購買款項</th>
                    <th>應付金額</th>
                    <th>是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in orders" :key="item.id">
                    <td width='400'>{{item.create_at | timestamp}}</td>
                    <td width='150'>{{item.user.name}}</td>
                    <td width='200'>{{item.user.email}}</td>
                    <td width='200'>asdadasdadadasd</td>
                    <td width='200'>{{item.total | currency}}</td>
                    <td>{{item.is_paid}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            orders:[]
        }
    },
    methods:{
        getOrders(){
            let vm = this
                this.isLoading=true
                let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders`
                this.axios.get(url).then((res)=>{
                    console.log(res)
                    vm.orders = res.data.orders
                    vm.isLoading=false
            })
        }
    },
    created(){
        this.getOrders()
    }
}




</script>
