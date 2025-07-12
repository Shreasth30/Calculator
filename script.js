let expression = "";
let shouldResetScreen = false;

function appendNumber(number) {
    if (shouldResetScreen) {
        expression = "";
        shouldResetScreen = false;
    }
    const lastNumber = expression.split(/[-+*/%]/).pop();
    if (number === "." && lastNumber.includes(".")) return;
    expression += number;
    updateDisplay();
}

function chooseOperator(op) {
    if (expression === "") return;
    if (/[-+*/%]$/.test(expression)) {
        expression = expression.slice(0, -1) + op;
    } else {
        expression += op;
    }
    updateDisplay();
}

function evaluate() {
    if (expression === "" || /[-+*/%]$/.test(expression)) return;
    let result;
    try {
        const safeExpr = expression.replace(/%/g, "/100");
        result = eval(safeExpr);
    } catch {
        result = "Error";
    }
    expression = result.toString();
    shouldResetScreen = true;
    updateDisplay();
}

function clearCalculator() {
    expression = "";
    shouldResetScreen = false;
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.value = expression || "0";
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-number]').forEach(btn => {
        btn.addEventListener('click', () => appendNumber(btn.textContent));
    });
    document.querySelectorAll('[data-operator]').forEach(btn => {
        btn.addEventListener('click', () => chooseOperator(btn.textContent));
    });
    document.getElementById('equals').addEventListener('click', evaluate);
    document.getElementById('clear').addEventListener('click', clearCalculator);
    document.getElementById('delete').addEventListener('click', deleteLast);
    updateDisplay();
});
