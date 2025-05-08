
function displayError(message) {
    alert(message);
}

function updateTriangle() {
    let angle = Number(document.getElementById("angle").value);
    let decimals = Number(document.getElementById("decimals").value);
    let amount = Number(document.getElementById("triangles").value);

    if (angle == 0 || decimals == 0 || amount == 0) {
        displayError("Virheellinen syöte: 0");
        return;
    }

    setResultElementCount(amount);

    let results = calculate(angle, decimals, amount);

    for (let i = 0; i < amount; i++) {
    let result = results[i];
        let a = result[0];
        let b = result[1];
        let c = result[2];

        let sin = (Math.asin(b / c) * 180 / Math.PI).toFixed(decimals + 3);

        document.getElementById("side-a" + i).innerHTML = "a = " + a;
        document.getElementById("side-b" + i).innerHTML = "b = " + b;
        document.getElementById("side-c" + i).innerHTML = "c = " + c;
        document.getElementById("sin" + i).innerHTML = "sin = " + sin + "&deg;";
    }
}

function setResultElementCount(n) {
    let elements = document.getElementsByClassName("result-values");
    let current = elements.length;
    for (let i = n; i < current; current--)
        elements[i].remove();

    let parent = document.getElementById("results");
    for (let i = current; i < n; i++) {
        let div = document.createElement("div");
        div.id = "t" + i;
        div.classList.add("result-values");

        let pa = document.createElement("p");
        pa.id = "side-a" + i;
        pa.classList.add("result-value");
        div.appendChild(pa);

        let pb = document.createElement("p");
        pb.id = "side-b" + i;
        pb.classList.add("result-value");
        div.appendChild(pb);

        let pc = document.createElement("p");
        pc.id = "side-c" + i;
        pc.classList.add("result-value");
        div.appendChild(pc);

        let ps = document.createElement("p");
        ps.id = "sin" + i;
        ps.classList.add("result-value");
        div.appendChild(ps);

        parent.appendChild(div);
    }
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

    if (step >= 1) {
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
    for (let e of elements) {
       e.addEventListener("input", () => fixValue(e));
    }
}

function init() {
    initFixValue("fix-input");

    updateTriangle();
}

window.onload = init();
