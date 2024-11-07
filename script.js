// Get references to the input and buttons
const inputField = document.getElementById("input");
const buttons = document.querySelectorAll(".num, .sym");

// Initialize variables for current input and last operator
let currentInput = "0";
let operator = null;
let previousValue = null;

// Update display function
function updateDisplay(value) {
    inputField.value = value;
}

// Clear display and reset variables
function clearCalculator() {
    currentInput = "0";
    operator = null;
    previousValue = null;
    updateDisplay(currentInput);
}

// Handle number and symbol clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonValue = button.textContent;

        // Handle number input
        if (!isNaN(buttonValue) || buttonValue === ".") {
            if (currentInput === "0" && buttonValue !== ".") {
                currentInput = buttonValue; // Replace the initial zero
            } else if (buttonValue === "." && currentInput.includes(".")) {
                return; // Prevent multiple decimal points
            } else {
                currentInput += buttonValue;
            }
            updateDisplay(currentInput);
        } 

        // Handle operators
        else if (buttonValue === "+" || buttonValue === "-" || buttonValue === "X" || buttonValue === "/") {
            if (previousValue === null) {
                previousValue = parseFloat(currentInput);
            } else if (operator) {
                previousValue = performCalculation(previousValue, parseFloat(currentInput), operator);
            }
            operator = buttonValue;
            currentInput = "0"; // Reset input for the next number
        } 
        
        // Handle "=" to perform calculation
        else if (buttonValue === "=") {
            if (operator && previousValue !== null) {
                currentInput = performCalculation(previousValue, parseFloat(currentInput), operator).toString();
                updateDisplay(currentInput);
                previousValue = null; // Reset for new calculations
                operator = null;
            }
        }
    });
});

// Perform calculation based on operator
function performCalculation(value1, value2, operator) {
    switch (operator) {
        case "+":
            return value1 + value2;
        case "-":
            return value1 - value2;
        case "X":
            return value1 * value2;
        case "/":
            return value2 !== 0 ? value1 / value2 : "Error"; // Prevent division by zero
        default:
            return value2;
    }
}

// Optional: Clear button event (if you want to add a "C" button for reset)
document.getElementById("clear").addEventListener("click", clearCalculator);

// Initialize display
clearCalculator();
