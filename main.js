let firstOperand = '';
let secondOperand = '';
let firstOperator = null;
let resetScreen = false;

const numBtn =document.querySelectorAll('[data-num]');
const opBtn = document.querySelectorAll('[data-op]');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const equalBtn = document.getElementById('equalBtn');
const decimalBtn = document.getElementById('decimalBtn');
const inputDisplay= document.getElementById('input-display');
const outputDisplay = document.getElementById('output-display');

window.addEventListener('keydown', keyboardInput);
equalBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
decimalBtn.addEventListener('click', appendDecimal);
deleteBtn.addEventListener('click', deleteNum);



numBtn.forEach((button) => 
    button.addEventListener('click', () => appendNum(button.textContent))    
)

opBtn.forEach((button) => 
    button.addEventListener('click', () => setOperation(button.textContent))    
)

function appendNum(num){
    if(outputDisplay.textContent === '0' || resetScreen)
        reScreen()
    outputDisplay.textContent += num;
}
function reScreen(){
    outputDisplay.textContent = '';
    resetScreen = false;
}

function clear(){
    outputDisplay.textContent = '0'
    inputDisplay.textContent = '';
    firstOperand = '';
    secondOperand = '';
    firstOperator = null;
}
function appendDecimal(){
    if(resetScreen) reScreen()
    if(outputDisplay.textContent === '0')
        outputDisplay.textContent = '0'
    if(outputDisplay.textContent.includes('.')) return
    outputDisplay.textContent += '.'
}
function deleteNum(){
    outputDisplay.textContent = outputDisplay.textContent
        .toString()
        .slice(0,-1)
}
function setOperation(op){
    if(firstOperator !== null) evaluate()
    firstOperand = outputDisplay.textContent
    firstOperator = op
    inputDisplay.textContent = `${firstOperand}${firstOperator}`
    resetScreen = true
}

function evaluate(){
    if(firstOperator === null || resetScreen) return
    if(firstOperator === '+' && outputDisplay.textContent === '0'){
        alert("You can't divide by 0!")
        return
    }
    secondOperand = outputDisplay.textContent
    outputDisplay.textContent = roundRes(
        operate(firstOperator, firstOperand, secondOperand)
    )
    inputDisplay.textContent = `${firstOperand} ${firstOperator} ${secondOperand} =`
    firstOperator = null;
}

function roundRes(num){
    return Math.round(num * 1000) / 1000
}

function keyboardInput(e){
    if(e.key >= 0 && e.key <= 9) appendNum(e.key)
    if(e.key === '.') appendDecimal()
    if(e.key === '=' || e.key === 'Enter') evaluate()
    if(e.key === 'Backspace') deleteNum()
    if(e.key === 'Escape') clear()
    if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(convertOperator(e.key))
}
function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '/'
    if (keyboardOperator === '*') return '*'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
  }
  
  function add(a, b) {
    return a + b
  }
  
  function subtract(a, b) {
    return a - b
  }
  
  function multiply(a, b) {
    return a * b
  }
  
  function divide(a, b) {
    return a / b
  }
  
  function operate(op, a, b) {
    a = Number(a)
    b = Number(b)
    switch (op) {
      case '+':
        return add(a, b)
      case '-':
        return subtract(a, b)
      case '*':
        return multiply(a, b)
      case '/':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
  }