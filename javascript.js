const operatorBtns = document.querySelector(".operators");
const digitBtns = document.querySelector(".digits");
const displayText = document.querySelector(".display-text");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");

let isPrintedResult = false;
let isUsedOperator = false;

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

function operate(sign, a, b) {
  console.log({ sign, a, b });
  switch (sign) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "error";
  }
}

function showDigit(e) {
  if (e.target.tagName !== "BUTTON") return;

  if (isPrintedResult && !isUsedOperator) {
    displayText.innerHTML = "";
  }

  displayText.innerHTML += e.target.innerHTML;

  isPrintedResult = false;
}

/*
  I can check if display shows 
    one number
      then I can add sign operator
      if sign added I can change sign without rewriting number
    two numbers 
      then first two numbers operates with operate() func
      the result is shown and chosen operator after it
*/

function calculateDisplayNumbers() {
  const destructuredDisplayString = displayText.innerText.split(" ");
  if (!destructuredDisplayString[0].length) return 0;
  else if (destructuredDisplayString.length === 3) return 2;
  else return 1;
}

function showOperator(e) {
  if (e.target.tagName !== "BUTTON") return;

  const numberCount = calculateDisplayNumbers();

  if (!numberCount) return;
  else if (numberCount === 2) {
    showResult(e);
  }

  const destructuredDisplayString = displayText.innerText.split(" ");
  const [firstNumber] = destructuredDisplayString;

  if (isNaN(firstNumber)) return;
  
  displayText.innerHTML = `${firstNumber} ${e.target.innerHTML} `;
  isUsedOperator = true;
}

function showResult(e) {
  if (e.target.tagName !== "BUTTON") return;

  isPrintedResult = true;
  isUsedOperator = false;

  const destructuredDisplayString = displayText.innerText.split(" ");

  const [firstNumber, , secondNumber] = destructuredDisplayString;
  const operator = destructuredDisplayString[1];

  if (
    !firstNumber ||
    !secondNumber ||
    (operator === "/" && +secondNumber === 0)
  ) {
    displayText.innerHTML = "Error!";
    return;
  }

  const result = operate(operator, +firstNumber, +secondNumber);

  displayText.innerText = Math.round(result * 1000) / 1000;
}

function clearDisplay() {
  displayText.innerHTML = "";
}

digitBtns.addEventListener("click", showDigit);
operatorBtns.addEventListener("click", showOperator);
equalBtn.addEventListener("click", showResult);
clearBtn.addEventListener("click", clearDisplay);
