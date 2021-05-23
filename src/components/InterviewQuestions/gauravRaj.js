const sumArr = (arr) => {
    var sum = 0;
    const resArr = arr.map((item, index) => {
        var str = item.split("");
        var number_string = "";
        for(var i = 0 ; i <str.length; i++){
            if(!isNaN(str[i])) {
                number_string = number_string+str[i];
            }
        }
        item = !isNaN(number_string) ? parseInt(number_string) : 0;
        sum = sum+ item;
    console.log("sum", sum)
    } )
        return sum
};