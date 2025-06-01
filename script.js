const display = document.getElementById('display'); // Gets the Calculator screen element

function appendToDisplay(value) {
    const lastChar = display.value.slice(-1); // Gets the last character on the screen
    const operators = ['+', '-', '*', '/']; // List of math symbols to check for

    // If the last character and the new one are both math symbols, stop!
    if(operators.includes(lastChar) && operators.includes(value)) {
        return; // Don't add the new symbol
    }
    display.value += value; // Add the new number or symbol to the screen
}

 // Deletes the entire display
function clearDisplay() {
    display.value = '';
}

// Deletes the last character
function deleteLast() {
    // slice(-1) removes the last character
    display.value = display.value.slice(0, -1);
}

// Calculate percentage

function calculatePercentage() {
    try {
        // Try to calculate percentage,
        if (display.value !== '') {
            // convert current number to percentage (divide by 100)
            let result = parseFloat(display.value)/100;
            display.value = result
        }
    } catch (error) {
        // Show 'Error' if something goes wrong
        display.value = 'Error';
    }
}

// Calculating and showing the results
function calculateResult() {
    try {
        let expression = display.value.replace(/x/g, '*');
        let result = eval(expression);

        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = Math.round(result * 100000000) / 100000000;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// add keyboard support - this listens for key presses
document.addEventListener('keydown', function(event) {
    const key = event.key;
  
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    }
    // Operators
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    }
    // Enter or equals for calculation
    else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Prevent default behavior
        calculateResult();
    }
    // Escape or 'c' for clear
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
    // Backspace for delete
    else if (key === 'Backspace') {
        deleteLast();
    }
});