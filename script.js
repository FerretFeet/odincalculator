//function to add two numbers
const add = function(x,y) {
    return Number(x) + Number(y);
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
let varOne = null
let varTwo = null
let operator = ''
let displayString = ''

//decide which operation to use
const operate = function(x, operation, y) {
    switch(operation) {
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case 'x':
            return multiply(x,y);
        case '/':
            return divide(x,y)
    }
}

const createNumberButtons = function() {
    let buttons = document.getElementsByClassName('number-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            displayString = displayString.concat(buttons[i].textContent)
        })
    }
}

const createOperatorButtons = function() {
    let buttons = document.getElementsByClassName('operator-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            let regEx = /[+x/-]+$/;
            let tempString = displayString;
            if (regEx.test(displayString) == true) {
                tempString = displayString.slice(0, displayString.length-1);
            };
            displayString = tempString.concat(buttons[i].textContent);
        });

    }
}

function createAllButtons() {
    createNumberButtons();
    createOperatorButtons();
}

const arrayFromString = function(String) {
    let regEx = /([+x/-])/g;
    return String.split(regEx)

}

createAllButtons()

const computeAnswer = function(Array) {
    let answer = null;
    let tempArray = Array
    let splicedArray = []
    while(Array.length > 1) {
        splicedArray = tempArray.splice(0, 3)
        answer = operate(splicedArray[0], splicedArray[1], splicedArray[2])
        Array.unshift(answer)
    }
    return answer;
}

const onEqualsPress = function(String) {
    let tempArray = arrayFromString(String);
    return computeAnswer(tempArray);
}

let equals = document.getElementById('equals');
equals.addEventListener('click', () => displayString=String(onEqualsPress(displayString)))