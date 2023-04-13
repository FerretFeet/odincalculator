//function to add two numbers
const add = function(x,y) {
    return x + y;
}
//subtract 2 numbers
const subtract = function(x,y) {
    return x-y;
}
//multiply 2 numbers
const multiply = function(x,y) {
    return x * y;
}
//divide 2 numbers
const divide = function(x,y) {
    return x / y;
}
//create global variables
let varOne = 0
let varTwo = 0
let operator = ''

//decide which operation to use
const operate = function(x, operation, y) {
    switch(operation) {
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case '*':
            return multiply(x,y);
        case '/':
            return divide(x,y)
    }
}