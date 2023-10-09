const displayText = document.querySelector(".display-text");
const operatorBtns = document.querySelector(".operators");
const digitBtns = document.querySelector(".digits");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");

let isEmptyDisplay = true;
let isResultDisplay = false;
let isErrorDisplay = false;
let isOperatorDisplay = false;

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

function operate(a, b, operator) {
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

function destructureDisplayString() {
  const displayStr = displayText.innerText;
  const expression = displayStr.split(" ");
  return [+expression[0], +expression[2], expression[1]];
}

// function isTooBigOperand(operand) {
//   if (operand / 1e5 > 1) return true;
// }

// function isTooBigCurrentOperand() {
//   const [operand1, operand2] = destructureDisplayString();

//   if (isOperatorDisplay) {
//     return isTooBigOperand(operand2);
//   } else {
//     return isTooBigOperand(operand1);
//   }
// }

function isTwoOperandDisplay() {
  const [operand1, operand2] = destructureDisplayString();

  if (!isNaN(operand1) && !isNaN(operand2)) return true;
}

function showDigit(e) {
  if (e.target.tagName !== "BUTTON") return;

  if (isResultDisplay || isErrorDisplay) {
    clearDisplay();
  }

  // if (isTooBigCurrentOperand()) {
  //   alert("Too big number!");
  //   return;
  // }

  displayText.innerHTML += e.target.innerHTML;
  isEmptyDisplay = false;
}

function showOperator(e) {
  if (e.target.tagName !== "BUTTON") return;

  if (isEmptyDisplay || isErrorDisplay) return;

  if (isTwoOperandDisplay()) {
    showResult(e);
  }

  const [operand1] = destructureDisplayString();

  displayText.innerHTML = `${operand1} ${e.target.innerText} `;
  isResultDisplay = false;
  isOperatorDisplay = true;
}

function showResult(e) {
  if (e.target.tagName !== "BUTTON") return;

  if (isEmptyDisplay || isErrorDisplay) return;

  if (!isTwoOperandDisplay()) {
    showError();
    return;
  }

  const result = operate(...destructureDisplayString());

  if (result === "error") {
    showError();
    return;
  }

  displayText.innerHTML = Math.trunc(result * 1000) / 1000;
  isResultDisplay = true;
  isOperatorDisplay = false;
}

function clearDisplay() {
  displayText.innerHTML = "";
  isEmptyDisplay = true;
  isResultDisplay = false;
  isErrorDisplay = false;
  isOperatorDisplay = false;
}

function showError() {
  clearDisplay();
  displayText.innerHTML = "Error!";
  isEmptyDisplay = false;
  isErrorDisplay = true;
}

digitBtns.addEventListener("click", showDigit);
operatorBtns.addEventListener("click", showOperator);
equalBtn.addEventListener("click", showResult);
clearBtn.addEventListener("click", clearDisplay);

document.addEventListener("keydown", (e) => {
  const regex = /[0-9]/;
  const digit = e.code.match(regex);

  switch (e.code) {
    case `Digit${digit}`:
      if (e.shiftKey && +digit[0] === 8) {
        document.querySelector(".multiply").click();
        break;
      }
    case `Numpad${digit}`:
      document.querySelector(`.digit-${digit}`).click();
      break;

    case "NumpadAdd":
      document.querySelector(".add").click();
      break;
    case "Equal":
      if (e.shiftKey) {
        document.querySelector(".add").click();
      } else {
        document.querySelector(".equal").click();
      }
      break;

    case "NumpadSubtract":
    case "Minus":
      document.querySelector(".minus").click();
      break;

    case "NumpadMultiply":
      document.querySelector(".multiply").click();
      break;
    case "Digit8":
      if (e.shiftKey) document.querySelector(".multiply").click();
      break;

    case "NumpadDivide":
    case "Slash":
      document.querySelector(".divide").click();
      break;

    case "Enter":
    case "NumpadEnter":
      document.querySelector(".equal").click();
      break;

    case "NumpadDecimal":
    case "Delete":
      document.querySelector(".clear").click();
      break;

    case "Backspace":
      displayText.innerHTML = displayText.innerHTML.slice(0, -1);
      isResultDisplay = false;
      break;
  }
});
