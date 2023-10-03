const operators = document.querySelector(".operators");
const digits = document.querySelector(".digits");
const display = document.querySelector(".display");
const equal = document.querySelector(".equal");

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
    display.innerHTML = "";
  }

  display.innerHTML += e.target.innerHTML;

  isPrintedResult = false;
}

function showOperator(e) {
  if (e.target.tagName !== "BUTTON") return;

  const destructuredDisplayString = display.innerText.split(" ");

  const [firstNumber] = destructuredDisplayString;

  display.innerHTML = `${firstNumber} ${e.target.innerHTML} `;

  isUsedOperator = true;
}

function showResult(e) {
  if (e.target.tagName !== "BUTTON") return;

  const destructuredDisplayString = display.innerText.split(" ");

  const [firstNumber, , secondNumber] = destructuredDisplayString;
  const operator = destructuredDisplayString[1];

  const result = operate(operator, +firstNumber, +secondNumber);

  display.innerText = result.toFixed(3);

  isPrintedResult = true;
  isUsedOperator = false;
}

digits.addEventListener("click", showDigit);
operators.addEventListener("click", showOperator);
equal.addEventListener("click", showResult);
