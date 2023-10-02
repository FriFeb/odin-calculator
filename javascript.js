const digits = document.querySelector(".digits");
const display = document.querySelector(".display");

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
  switch (sign) {
    case "+":
      add(a, b);
      break;
    case "-":
      subtract(a, b);
      break;
    case "*":
      multiply(a, b);
      break;
    case "/":
      divide(a, b);
      break;
    default:
      return "error";
  }
}

function showDigit(e) {
  if (e.target.tagName !== "BUTTON") return;

  display.innerText += e.target.innerText;
}

digits.addEventListener("click", showDigit);