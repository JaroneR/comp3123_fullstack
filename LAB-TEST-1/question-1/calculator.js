module.exports ={
    multiplyTwoNumbers: function(x, y){
        if(Number.isInteger(x) && Number.isInteger(y)){
            product = x * y;
        console.log("The product of "+x+" and "+y+" is "+product);
        return product;
        }
        else{
            console.log("Numbers are not integers");
        }
        
    },
    evenDoubler: function(x){
        if(x%2 == 0){
            total = x * x;
            console.log("The product of "+x+" and "+x+" is "+total);
            return total;
        }
        else{
            total = 0;
            console.log(total)
            return total;
        }
        
    }
}