<template>
    <div>
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
            home_data:[]
        }
    },
    methods:{
        // get_orders(page=1){
        //     let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`
        //     this.axios.get(url).then((res)=>{
        //         console.log(res)
        //     })
        // }
    },
    created(){
        
        let vm = this
        this.$bus.$on('bridge',evt=>{
            console.log('dataddd',evt.arraydata)
            vm.home_data=evt.arraydata  /* 無法指派到home_data. why? */
        })
        console.log('home_data',this.home_data)
    }
}
</script>
