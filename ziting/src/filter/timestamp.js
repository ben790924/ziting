export default function(t){
    var dt = new Date(t*1000)
    var yr = dt.getFullYear()
    var mn = dt.getMonth()+1
    var date = dt.getDay()
    var hr = dt.getHours()
    var m = "0" + dt.getMinutes()
    var s = "0" + dt.getSeconds()
    return yr+'年/'+mn+'月/'+date+'號'+hr+':'+m.substr(-2)+':'+s.substr(-2)
}