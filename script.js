const calculatordisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// Calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  //   Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatordisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it, if not add number
    const displayValue = calculatordisplay.textContent;
    calculatordisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator pressed, don't add decimal
  if (awaitingNextValue) {
    return;
  }
  // If no decimal, add one
  const displayValue = calculatordisplay.textContent;
  if (!displayValue.includes(".")) {
    calculatordisplay.textContent = `${displayValue}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatordisplay.textContent);
  //   Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  //   Assign firstValue if no value assist
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    firstValue = calculation;
    calculatordisplay.textContent = calculation;
  }
  //   Ready for next value, store operator
  operatorValue = operator;
  awaitingNextValue = true;
}

// Reset all values, display
function resetAll() {
  calculatordisplay.textContent = "0";
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    // Number Buttons
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    // Operator Buttons
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    // Decimal Buttons
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

//  Event Listener
clearBtn.addEventListener("click", resetAll);
