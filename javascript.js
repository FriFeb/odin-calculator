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

function showOperator(e) {
  if (e.target.tagName !== "BUTTON") return;

  const destructuredDisplayString = displayText.innerText.split(" ");

  const [firstNumber] = destructuredDisplayString;

  if(firstNumber instanceof !Number) return;

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

  if (!firstNumber || !secondNumber) {
    displayText.innerHTML = "Error!";
    return;
  }

  const result = operate(operator, +firstNumber, +secondNumber);

  displayText.innerText = result.toFixed(3);
}

function clearDisplay() {
  displayText.innerHTML = "";
}

digitBtns.addEventListener("click", showDigit);
operatorBtns.addEventListener("click", showOperator);
equalBtn.addEventListener("click", showResult);
clearBtn.addEventListener("click", clearDisplay);
