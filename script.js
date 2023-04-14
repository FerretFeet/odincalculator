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
            if (displayString.length > 11) {alert('Too Many Digits! Press ='); return;}
            displayString = displayString.concat(buttons[i].textContent)
            displayResult(displayString);
        })
    }
}

const createOperatorButtons = function() {
    let buttons = document.getElementsByClassName('operator-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            if (displayString.length > 11) {alert('Too Many Digits! Press ='); return;}
            let regEx = /[+x/-]+$/;
            let tempString = displayString;
            if (regEx.test(displayString) == true) {
                tempString = displayString.slice(0, displayString.length-1);
            };
            displayString = tempString.concat(buttons[i].textContent);
            displayResult(displayString);
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
    let answer = Array[0];
    let tempArray = Array
    let splicedArray = []
    while(Array.length > 1) {
        splicedArray = tempArray.splice(0, 3)
        answer = operate(splicedArray[0], splicedArray[1], splicedArray[2])
        Array.unshift(answer)
    }
    displayResult(answer)
    return answer;
}

const onEqualsPress = function(String) {
    let tempArray = arrayFromString(String);
    return computeAnswer(tempArray);
}

let equals = document.getElementById('equals');
equals.addEventListener('click', () => displayString=String(onEqualsPress(displayString)))

const resultDisplay = document.getElementById('display-result')
const displayResult = function(result) {
    if (resultDisplay.style.display == '' || 'none') {
        resultDisplay.style.display = 'flex'
        document.getElementById('display-default').style.display='none'
    }
    resultDisplay.innerHTML = result;
}

const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', () => {
    displayString = ''
    resultDisplay.style.display = 'none'
    document.getElementById('display-default').style.display='flex'
})

const decimalButton = document.getElementById('decimal')
decimalButton.addEventListener('click', () => {
    if (displayString.length > 11) {alert('Too Many Digits! Press ='); return}
    let regEx = /\.(\d)*[^+/x-]*\./g;
    displayString = displayString.concat(decimalButton.textContent);
    if (regEx.test(displayString)){ 
        alert('Only one decimal allowed!')
        displayString = displayString.slice(0, displayString.length - 1);
      } else  {
        displayResult(displayString);
    }
})
