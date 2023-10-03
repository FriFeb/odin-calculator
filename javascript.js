const operators = document.querySelector(".operators");
const digits = document.querySelector(".digits");
const display = document.querySelector(".display");
const equal = document.querySelector(".equal");

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

function destructureDisplayString(n) {
  const displayString = display.innerText.split(" ");

  return displayString.slice(0, n);
}

function showDigit(e) {
  if (e.target.tagName !== "BUTTON") return;

  display.innerHTML += e.target.innerHTML;
}

function showOperator(e) {
  if (e.target.tagName !== "BUTTON") return;

  const displayString = destructureDisplayString(1);
  const firstNumber = displayString[0];

  display.innerHTML = `${firstNumber} ${e.target.innerHTML} `;
}

function showResult(e) {
  if (e.target.tagName !== "BUTTON") return;
  
  const displayString = destructureDisplayString(3);

  const firstNumber = displayString[0];
  const operator = displayString[1];
  const secondNumber = displayString[2];

  const result = operate(operator, +firstNumber, +secondNumber);

  display.innerHTML = result;
}

digits.addEventListener("click", showDigit);
operators.addEventListener("click", showOperator);
equal.addEventListener("click", showResult);