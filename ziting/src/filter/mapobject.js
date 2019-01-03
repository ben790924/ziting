export default function(f){
    var values = Object.values(f).map((item)=>item.product.title)
            let obj = ''
            for(let i =0;i<values.length;i++){
                obj+=i+1+'.'+values[i]+' '
            }
            return obj
}