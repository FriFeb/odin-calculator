const operatorBtns = document.querySelector(".operators");
const digitBtns = document.querySelector(".digits");
const displayText = document.querySelector(".display-text");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");

let isEmptyDisplay = true;
let isResultDisplay = false;
let isErrorDisplay = false;

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  console.log({ operator, a, b });
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) return "error";
      return divide(a, b);
    default:
      return "error";
  }
}

/*
  Types of buttons: 

    - Operators
    - Digits
    - Equals 
    - Clear


  OK, so we can have some states of display in our calculator
  and we should think how will 
  different types of buttons act on each state

    - nothing is shown (actually empty display string)
      + operators cannot be triggered
      + equals cannot be triggered
      + digits add one digit

    - one number is shown 
      + operators grab the number and append used operator
      + equals shows error
      + digits add one digit

    - one result number is shown 
      + operators grab the number and append used operator
      + equals shows error
      + digits rewrite the display with new digit

    - one number and sign are shown
      + operators grab the number and append used operator
      + equals shows error
      + digits add one digit

    - two numbers and a sign between them are shown
      + operators call showResult() then 
        grab the result number and append used operator
      + equals shows the result
      + digits add one digit

    - error is shown
      + operators cannot be triggered
      + equals cannot be triggered
      + digits rewrite the display with new digit

    CLEAR button should always work no matter what display shows


  Seems like we need some indicators for our initial states:

    - isEmptyDisplay = true
    - isResultDisplay = false
    - isErrorDisplay = false
    
  And finally functions:

    * showDigit ()
        IF isResultDisplay is true || isErrorDisplay is true
          TRUE
            call clearDisplay()

        IF isTooBigCurrentOperand() is true
          TRUE 
            alert("Too big number")

        add one digit to the display string
        isEmptyDisplay = false

    * showOperator () 
        IF isEmptyDisplay is true || isErrorDisplay is true
          TRUE
            return

        IF isTwoOperandsDisplay() is true
          TRUE
            call showResult()
        
        grab the first number and add an operator
        isResultDisplay = false

    * showResult()
        IF isEmptyDisplay is true || isErrorDisplay is true
          TRUE
            return

        IF isTwoOperandsDisplay() is false
          TRUE
            call showError()
            return

        declare variable result and call operate() in it
        IF result is "error"
          TRUE
            showError()
            return
        
        show result in the display string
        isResultDisplay = true

    * clearDisplay()
        reset display string 
        isEmptyDisplay = true
        isResultDisplay = false
        isErrorDisplay = false

    * showError()
        call clearDisplay()
        show error message in the display string
        isEmptyDisplay = false
        isErrorDisplay = true

    * destructureDisplayString() 
        grab the display string
        split it with spaces into array
        return operand1 and operand2

    * isTwoOperandsDisplay()
        operand1 and operand2 = destructureDisplayString() 

        IF operand1.length is true && operand2.length is true
          TRUE
            return true
        return false

    * isTooBigCurrentOperand () 
        operand1 and operand2 = destructureDisplayString() 

        IF operand2 
          TRUE
            IF isTooBigOperand (operand2) === true
              TRUE 
                return true

        IF isTooBigOperand (operand1) === true
          TRUE 
            return true

    * isTooBigOperand (operand)
        IF operand.length > 10^6
          return true
          
        
    Yeah, that's pretty much it, 
    hope it will cover all needed situations
*/

// function showDigit(e) {
//   if (e.target.tagName !== "BUTTON") return;

//   if (isPrintedResult && !isUsedOperator) {
//     displayText.innerHTML = "";
//   }

//   displayText.innerHTML += e.target.innerHTML;

//   isPrintedResult = false;
// }

// function calculateDisplayNumbers() {
//   const destructuredDisplayString = displayText.innerText.split(" ");
//   if (!destructuredDisplayString[0].length) return 0;
//   else if (destructuredDisplayString.length === 3) return 2;
//   else return 1;
// }

// function showOperator(e) {
//   if (e.target.tagName !== "BUTTON") return;

//   const numberCount = calculateDisplayNumbers();

//   if (!numberCount) return;
//   else if (numberCount === 2) {
//     showResult(e);
//   }

//   const destructuredDisplayString = displayText.innerText.split(" ");
//   const [firstNumber] = destructuredDisplayString;

//   if (isNaN(firstNumber)) return;

//   displayText.innerHTML = `${firstNumber} ${e.target.innerHTML} `;
//   isUsedOperator = true;
// }

// function showResult(e) {
//   if (e.target.tagName !== "BUTTON") return;

//   isPrintedResult = true;
//   isUsedOperator = false;

//   const destructuredDisplayString = displayText.innerText.split(" ");

//   const [firstNumber, , secondNumber] = destructuredDisplayString;
//   const operator = destructuredDisplayString[1];

//   if (
//     !firstNumber ||
//     !secondNumber ||
//     (operator === "/" && +secondNumber === 0)
//   ) {
//     displayText.innerHTML = "Error!";
//     return;
//   }

//   const result = operate(operator, +firstNumber, +secondNumber);

//   displayText.innerText = Math.round(result * 1000) / 1000;
// }

function showDigit(e) {
  if (e.target.tagName !== "BUTTON") return;

  if (isResultDisplay === true || isErrorDisplay === true) {
    clearDisplay();
  }

  displayText.innerHTML += e.target.innerHTML;
  if (isEmptyDisplay) isEmptyDisplay = false;
}

function clearDisplay() {
  displayText.innerHTML = "";
}

digitBtns.addEventListener("click", showDigit);
// operatorBtns.addEventListener("click", showOperator);
// equalBtn.addEventListener("click", showResult);
clearBtn.addEventListener("click", clearDisplay);
