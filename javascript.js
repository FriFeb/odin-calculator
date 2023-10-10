const displayText = document.querySelector(".display-text");
const operatorBtns = document.querySelector(".operators");
const digitBtns = document.querySelector(".digits");
const dotBtn = document.querySelector(".dot");
const clearBtn = document.querySelector(".clear");
const eraseBtn = document.querySelector(".erase");
const equalBtn = document.querySelector(".equal");

const addBtn = document.querySelector(".add");
const minusBtn = document.querySelector(".minus");
const divideBtn = document.querySelector(".divide");
const multiplyBtn = document.querySelector(".multiply");

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

function operate(a, b, operator) {
  switch (operator) {
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

function destructureDisplayString(isDotCheck = false) {
  const displayStr = displayText.innerText;
  const expression = displayStr.split(" ");

  if (isDotCheck) return [expression[0], expression[2]];

  return [+expression[0], +expression[2], expression[1]];
}

function isTwoOperandsDisplay() {
  const [operand1, operand2] = destructureDisplayString();

  if (!isNaN(operand1) && !isNaN(operand2)) return true;
}

function showDigit(e) {
  if (e.target.tagName !== "BUTTON") return;

  if (e.target.innerText === ".") {
    showDot();
    return;
  }

  if (isResultDisplay || isErrorDisplay) {
    clearDisplay();
  }

  displayText.innerHTML += e.target.innerHTML;
  isEmptyDisplay = false;
}

function showDot() {
  if (isEmptyDisplay || isErrorDisplay) return;

  let [operand1, operand2] = destructureDisplayString(true);

  // if operand2 exist
  if (!isNaN(operand2)) {
    if (operand2.includes(".")) return;
  } else {
    if (operand1.includes(".")) return;
  }

  displayText.innerHTML += ".";
}

function showOperator(e) {
  if (e.target.tagName !== "BUTTON") return;

  if (isEmptyDisplay || isErrorDisplay) return;

  if (isTwoOperandsDisplay()) {
    showResult(e);
  }

  const [operand1] = destructureDisplayString();

  displayText.innerHTML = `${operand1} ${e.target.innerText} `;
  isResultDisplay = false;
}

function showResult() {
  if (isEmptyDisplay || isErrorDisplay) return;

  if (!isTwoOperandsDisplay()) {
    showError();
    return;
  }

  const result = operate(...destructureDisplayString());

  if (result === Infinity || result === -Infinity) {
    showError();
    return;
  }

  displayText.innerHTML = Math.trunc(result * 1000) / 1000;
  isResultDisplay = true;
}

function showError() {
  clearDisplay();
  displayText.innerHTML = "Error!";
  isEmptyDisplay = false;
  isErrorDisplay = true;
}

function clearDisplay() {
  displayText.innerHTML = "";
  isEmptyDisplay = true;
  isResultDisplay = false;
  isErrorDisplay = false;
}

function eraseSymbol() {
  if (isEmptyDisplay || isErrorDisplay) return;
  displayText.innerHTML = displayText.innerHTML.slice(0, -1);
  isResultDisplay = false;
}

digitBtns.addEventListener("click", showDigit);
operatorBtns.addEventListener("click", showOperator);
clearBtn.addEventListener("click", clearDisplay);
eraseBtn.addEventListener("click", eraseSymbol);
equalBtn.addEventListener("click", showResult);

document.addEventListener("keydown", (e) => {
  const regex = /[0-9]/;
  const digit = e.code.match(regex);

  switch (e.code) {
    case `Digit${digit}`:
      if (e.shiftKey && digit[0] === "8") {
        multiplyBtn.click();
        multiplyBtn.classList.add("active");
        setTimeout(() => multiplyBtn.classList.remove("active"), 100);
        break;
      }
    case `Numpad${digit}`:
      const digitBtn = document.querySelector(`.digit-${digit}`);
      digitBtn.click();
      digitBtn.classList.add("active");
      setTimeout(() => digitBtn.classList.remove("active"), 100);
      break;

    case "NumpadAdd":
      addBtn.click();
      addBtn.classList.add("active");
      setTimeout(() => addBtn.classList.remove("active"), 100);
      break;
    case "Equal":
      if (e.shiftKey) {
        addBtn.click();
        addBtn.classList.add("active");
        setTimeout(() => addBtn.classList.remove("active"), 100);
      } else {
        equalBtn.click();
        equalBtn.classList.add("active");
        setTimeout(() => equalBtn.classList.remove("active"), 100);
      }
      break;

    case "NumpadSubtract":
    case "Minus":
      minusBtn.click();
      minusBtn.classList.add("active");
      setTimeout(() => minusBtn.classList.remove("active"), 100);
      break;

    case "NumpadMultiply":
      multiplyBtn.click();
      multiplyBtn.classList.add("active");
      setTimeout(() => multiplyBtn.classList.remove("active"), 100);
      break;

    case "NumpadDivide":
    case "Slash":
      divideBtn.click();
      divideBtn.classList.add("active");
      setTimeout(() => divideBtn.classList.remove("active"), 100);
      break;

    case "NumpadDecimal":
    case "Period":
      dotBtn.click();
      dotBtn.classList.add("active");
      setTimeout(() => dotBtn.classList.remove("active"), 100);
      break;

    case "Enter":
    case "NumpadEnter":
      equalBtn.click();
      equalBtn.classList.add("active");
      setTimeout(() => equalBtn.classList.remove("active"), 100);
      break;

    case "Delete":
      clearBtn.click();
      clearBtn.classList.add("active");
      setTimeout(() => clearBtn.classList.remove("active"), 100);
      break;

    case "Backspace":
      eraseSymbol();
      eraseBtn.classList.add("active");
      setTimeout(() => eraseBtn.classList.remove("active"), 100);
      break;
  }
});
