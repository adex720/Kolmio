
function displayError(message) {
    alert(message);
}

function updateTriangle() {
    let angle = Number(document.getElementById("angle").value);
    let decimals = Number(document.getElementById("decimals").value);

    if (angle == 0 || decimals == 0) {
        displayError("Virheellinen syöte: 0");
        return;
    }

    let result = calculate(angle, decimals);
    let a = result[0];
    let b = result[1];
    let c = result[2];

    let sin = (Math.asin(b / c) * 180 / Math.PI).toFixed(decimals + 3);

    document.getElementById("side-a").innerHTML = "a = " + a;
    document.getElementById("side-b").innerHTML = "b = " + b;
    document.getElementById("side-c").innerHTML = "c = " + c;
    document.getElementById("sin").innerHTML = "sin = " + sin + "&deg;";
}

function showAdvanced() {
    var checkBox = document.getElementById("show-advanced");

    document.getElementById("image-creation").style.display = checkBox.checked ? "inline" : "none";
}

function fixValue(element) {
    let value = Number(element.value);
    let min = Number(element.min);
    let max = Number(element.max);
    let step = Number(element.step);

    if (element.hasAttribute("min") && value < min) {
        element.value = min;
        return;
    }

    else if (element.hasAttribute("max") && value > max) {
        element.value = max;
        return;
    }

    if (!element.hasAttribute("step")) return;

    if (step >= 1){
        element.value = Math.round(value);
        return 0;
    }

    var diff = (value-min) / step;
    if (isInteger(diff)) return;

    let fix = Math.ceil(-Math.log10(step));

    let a =  min + Number((step*diff).toFixed(fix));

    element.value = a;

}

function initFixValue(className) {
    elements = document.getElementsByClassName(className);
    for (let e of elements){
       e.addEventListener("input", () => fixValue(e));
    }
}

function init() {
    initFixValue("fix-input");

    updateTriangle();
}

window.onload = init();
