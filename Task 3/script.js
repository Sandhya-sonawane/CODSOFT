document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    let currentInput = "";
    let operator = "";
    let firstOperand = null;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;

            if (buttonText.match(/[0-9.]/)) {
                currentInput += buttonText;
                display.value = currentInput;
            } else if (buttonText === "C") {
                clearCalculator();
            } else if (buttonText.match(/[-+*/]/)) {
                if (currentInput !== "") {
                    if (firstOperand === null) {
                        firstOperand = parseFloat(currentInput);
                        operator = buttonText;
                        currentInput = "";
                    } else {
                        const secondOperand = parseFloat(currentInput);
                        const result = calculate(firstOperand, secondOperand, operator);
                        display.value = result;
                        currentInput = "";
                        firstOperand = result;
                        operator = buttonText;
                    }
                }
            } else if (buttonText === "=") {
                if (currentInput !== "") {
                    const secondOperand = parseFloat(currentInput);
                    const result = calculate(firstOperand, secondOperand, operator);
                    display.value = result;
                    currentInput = result;
                    firstOperand = null;
                    operator = "";
                }
            }
        });
    });

    function calculate(num1, num2, operator) {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                if (num2 === 0) {
                    return "Error";
                }
                return num1 / num2;
            default:
                return num2;
        }
    }

    function clearCalculator() {
        currentInput = "";
        operator = "";
        firstOperand = null;
        display.value = "";
    }
});
