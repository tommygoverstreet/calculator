/**
 * Initializes the calculator functionality.
 * 
 * This function sets up event listeners for number buttons, operator buttons,
 * the result button, and the clear button. It handles the display of numbers
 * and operators, performs calculations, and clears the display.
 * 
 * @function
 * @name calculator
 * 
 * @example
 * // To initialize the calculator, simply call the function:
 * calculator();
 * 
 * @description
 * - Number buttons: Appends the clicked number to the display.
 * - Operator buttons: Appends the clicked operator to the display, replacing the last operator if necessary.
 * - Result button: Evaluates the expression in the display and shows the result.
 * - Clear button: Clears the display.
 */
 
const calculator = () => {
  "use strict";
  let display = document.getElementById("input"),
    numberButtons = document.querySelectorAll(".numbers"),
    operatorButtons = document.querySelectorAll(".operators"),
    resultButton = document.getElementById("result"),
    clearButton = document.getElementById("clear"),
    isResultDisplayed = false;

  // Numbers
  for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function (event) {
      let currentDisplay = display.innerHTML,
        lastChar = currentDisplay[currentDisplay.length - 1];
      if (!isResultDisplayed) {
        display.innerHTML += event.target.innerHTML;
      } else if (
        (isResultDisplayed && lastChar === "+") ||
        lastChar === "-" ||
        lastChar === "×" ||
        lastChar === "÷"
      ) {
        isResultDisplayed = false;
        display.innerHTML += event.target.innerHTML;
      } else {
        isResultDisplayed = false;
        display.innerHTML = "";
        display.innerHTML += event.target.innerHTML;
      }
    });
  }

  // Operators
  for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", function (event) {
      let currentDisplay = display.innerHTML,
        lastChar = currentDisplay[currentDisplay.length - 1];
      if (
        lastChar === "+" ||
        lastChar === "-" ||
        lastChar === "×" ||
        lastChar === "÷"
      ) {
        let newDisplay =
          currentDisplay.substring(0, currentDisplay.length - 1) +
          event.target.innerHTML;
        display.innerHTML = newDisplay;
      } else if (currentDisplay.length === 0) {
        console.log("enter a number first");
      } else {
        display.innerHTML += event.target.innerHTML;
      }
    });
  }

  // Results
  resultButton.addEventListener("click", function () {
    let currentDisplay = display.innerHTML,
      numbers = currentDisplay.split(/\+|\-|\×|\÷/g),
      operators = currentDisplay.replace(/[0-9]|\./g, "").split(""),
      divideIndex = operators.indexOf("÷"),
      multiplyIndex = operators.indexOf("×"),
      subtractIndex = operators.indexOf("-"),
      addIndex = operators.indexOf("+");

    while (divideIndex !== -1) {
      numbers.splice(divideIndex, 2, numbers[divideIndex] / numbers[divideIndex + 1]);
      operators.splice(divideIndex, 1);
      divideIndex = operators.indexOf("÷");
    }

    while (multiplyIndex !== -1) {
      numbers.splice(multiplyIndex, 2, numbers[multiplyIndex] * numbers[multiplyIndex + 1]);
      operators.splice(multiplyIndex, 1);
      multiplyIndex = operators.indexOf("×");
    }

    while (subtractIndex !== -1) {
      numbers.splice(subtractIndex, 2, numbers[subtractIndex] - numbers[subtractIndex + 1]);
      operators.splice(subtractIndex, 1);
      subtractIndex = operators.indexOf("-");
    }

    while (addIndex !== -1) {
      numbers.splice(addIndex, 2, parseFloat(numbers[addIndex]) + parseFloat(numbers[addIndex + 1]));
      operators.splice(addIndex, 1);
      addIndex = operators.indexOf("+");
    }

    display.innerHTML = numbers[0];
    isResultDisplayed = true;
  });

  // Clear
  clearButton.addEventListener("click", function () {
    display.innerHTML = "";
  });
};

calculator();
