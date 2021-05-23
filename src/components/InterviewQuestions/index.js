Hoisting
// first
hoistedVariable = 3;
console.log(hoistedVariable);
var hoistedVariable;

// second
hoistedFunction(); 
function hoistedFunction(){ 
  console.log(" Hello world! ");
}

//third
console.log('test', test);
var test = 10;
function test () {
    console.log('inside test')
}

// fourth



// new set

var x = 2;
var y = "2";
(x == y)  

(x === y) 

var a = {};
var b = {};

a==b
a===b

// closure example aiwee

function randomFunc(){
    var obj1 = {name:"Vivian", age:45};
  
    return function(){
      console.log(obj1.name + " is "+ "awesome");
  
    }
  }
  
  var initialiseClosure = randomFunc(); 
  
  initialiseClosure();


// closure question most often asked
const arr = [10, 20, 30, 40]

for (var i = 0; i < arr.length; i++) {
  setTimeout(() => {
    console.log("Index: " + i + ", element : " + arr[i])
  }, 1000)
}

  // function expression and function declaration