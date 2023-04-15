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
//divide 2 numbers and alert if divideByZero
const divide = function(x,y) {
    if (y == 0) {
        alert('0 chance of that happening(divideByZero)')
     
        return;
    }
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
//grab classlist for number buttons, iterate to create event listener
const createNumberButtons = function() {
    let buttons = document.getElementsByClassName('number-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
//keep display string within display size, concat value of buttonpress to displayString
            if (displayString.length > 11) {alert('Too Many Digits! Press ='); return;}
            displayString = displayString.concat(buttons[i].textContent)
            displayResult(displayString);
        })
    }
}
//see above
const createOperatorButtons = function() {
    let buttons = document.getElementsByClassName('operator-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
//see above + ensure no 2 operators in a row. replace previous ending operator with new if attempted.
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
//split the string before and after the items inside the reg ex. no loss.
const arrayFromString = function(String) {
    let regEx = /([+x/-])/g;
    return String.split(regEx)

}

createAllButtons()

//compute answer by splitting the formula 3 peices at a time.
//adds rounded answer to beginning of array to iterate again until complete

const computeAnswer = function(Array) {
    let answer = Array[0];
    let tempArray = Array
    let splicedArray = []
    while(Array.length > 1) {
        splicedArray = tempArray.splice(0, 3)
        answer = (operate(splicedArray[0], splicedArray[1], splicedArray[2]))
        //if answer has >3 digits after decimal, round
        if ((answer*10000) % 10 != 0 ) {
            answer = Number(answer).toFixed(3)
        }
        let test = Number.isNaN(Number(answer))
        if (!test) {
            Array.unshift(answer)
        } else {
            answer = 0; 
            displayString = ''; 
            break;
        }
    }
    displayResult(answer)
    return answer;
}

//run functions to evaluate
const onEqualsPress = function(String) {
    let tempArray = arrayFromString(String);
    return computeAnswer(tempArray);
}

let equals = document.getElementById('equals');
equals.addEventListener('click', () => displayString=String(onEqualsPress(displayString)))

//hide default display, show displayString
//might could be optimized by just replacing default display string and recalling when clr
//shows result and every digit/operator pressed.  
//could be changed to only display working term be appending arrays, breaking before/after op button press
const resultDisplay = document.getElementById('display-result')
const displayResult = function(result) {
    if (resultDisplay.style.display == '' || 'none') {
        resultDisplay.style.display = 'flex'
        document.getElementById('display-default').style.display='none'
    }
    resultDisplay.innerHTML = result;
}

//clear working vars, show default display, hide result display
const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', () => {
    displayString = ''
    resultDisplay.style.display = 'none'
    document.getElementById('display-default').style.display='flex'
})

//ensure only 1 decimal per numeric term.
//adds all decimal presses to string, then evaluates if error
//creates a new string of size oldString - 1 to remove last placed decimal.
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
