// Execute the script after the page has fully loaded
window.onload = function () {
    let memory = 0; // Variable to store the memory value
    const display = document.getElementById("display"); // Get the display input field

    // ===== Function to update the display with a given value =====
    function updateDisplay(value) {
        display.value = value; // Set the value of the display field
    }

    // ===== Function to append value to the display =====
    function appendValue(value) {
        if (display.value === "Error") updateDisplay(""); // Clear error message before appending new input
        if (/[\+\-\*/]$/.test(display.value) && /[\+\-\*/]/.test(value)) return; // Prevent consecutive operators
        if (display.value === "" && /[\+\*/]/.test(value)) return; // Prevent starting with + or *
        
        display.value += value; // Append the new value to the display
    }

    // ===== Function to evaluate the expression using BODMAS/BIDMAS =====
    function calculate() {
        try {
            updateDisplay(eval(display.value) || "0"); // Evaluate the expression using eval()
        } catch {
            updateDisplay("Error"); // Display "Error" if the input is invalid
        }
    }

    // ===== Function to handle keyboard input =====
    function handleKey(event) {
        const key = event.key; // Get the pressed key

        if (!isNaN(key) || "+-*/().".includes(key)) {
            appendValue(key); // Allow numbers and basic operators
        } else if (key === "Enter") {
            calculate(); // Calculate the result when Enter key is pressed
        } else if (key === "Backspace") {
            updateDisplay(display.value.slice(0, -1)); // Remove the last character on Backspace key
        } else if (key === "Escape") {
            updateDisplay(""); // Clear the display when Escape key is pressed
        } else if (key === "%") {
            updateDisplay(parseFloat(display.value) / 100 || "Error"); // Convert to percentage
        }
    }

    // Attach keyboard event listener for handling user input
    document.addEventListener("keydown", handleKey);

    // ===== Exposing functions to global scope for button click events =====
    window.appendValue = appendValue; // Appends values to display when buttons are clicked
    window.clearDisplay = () => updateDisplay(""); // Clears the display
    window.backspace = () => updateDisplay(display.value.slice(0, -1)); // Deletes last character
    window.calculate = calculate; // Evaluates the mathematical expression

    // ===== Additional Operations =====
    window.calculatePercentage = () => updateDisplay(parseFloat(display.value) / 100 || "Error"); // Converts value to percentage
    window.calculateSquareRoot = () => updateDisplay(Math.sqrt(parseFloat(display.value)) || "Error"); // Computes square root

    // ===== Memory Functions =====
    window.memoryClear = () => (memory = 0); // Clears memory
    window.memoryRecall = () => updateDisplay(memory); // Recalls stored memory value
    window.memoryAdd = () => (memory += parseFloat(display.value) || 0); // Adds current display value to memory
    window.memorySubtract = () => (memory -= parseFloat(display.value) || 0); // Subtracts current display value from memory
};
