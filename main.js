
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

        let angleString = (Math.asin(b / c) * 180 / Math.PI).toFixed(decimals + 3);

        document.getElementById("side-a" + i).innerHTML = "a = " + a;
        document.getElementById("side-b" + i).innerHTML = "b = " + b;
        document.getElementById("side-c" + i).innerHTML = "c = " + c;
        document.getElementById("angle" + i).innerHTML = "α = " + angleString + "&deg;";
    }
}

function createResultParagraph(id, i) {
    let p = document.createElement("p");
    p.id = id + i;
    p.classList.add("result-value");

    return p;
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

        div.appendChild(createResultParagraph("side-a", i));
        div.appendChild(createResultParagraph("side-b", i));
        div.appendChild(createResultParagraph("side-c", i));
        div.appendChild(createResultParagraph("angle", i));

        parent.appendChild(div);
    }
}

function updateTriangleImage() {
    let width = Number(document.getElementById("image-width").value);
    let height = Number(document.getElementById("image-height").value);
    let margin = Number(document.getElementById("image-margin").value);
    let lineWidth = Number(document.getElementById("line-width").value);
    let letterSize = Number(document.getElementById("letter-size").value);

    let angleString = document.getElementById("angle0").innerHTML;
    let angle = Math.round(Number(angleString.substring(4, angleString.length - 1)));

    let angleChosen = document.getElementById("angle-status").selectedIndex;
    let angleStatus = angleChosen == 2 ? -1 : angleChosen == 1 ? 0 : angle;

    let i = 0;
    let closerChosen = document.getElementById("closer-status").selectedIndex;
    let closer = closerChosen == 2 ? -1 : closerChosen == 1 ? 0 : Number(document.getElementById("side-a" + i).innerHTML.substring(4));
    let furtherChosen = document.getElementById("further-status").selectedIndex;
    let further = furtherChosen == 2 ? -1 : furtherChosen == 1 ? 0 : Number(document.getElementById("side-b" + i).innerHTML.substring(4));
    let hypotenuseChosen = document.getElementById("hypotenuse-status").selectedIndex;
    let hypotenuse = hypotenuseChosen == 2 ? -1 : hypotenuseChosen == 1 ? 0 : Number(document.getElementById("side-c" + i).innerHTML.substring(4));

    createTriangleImage(angle, width, height, margin, lineWidth, letterSize, angleStatus, closer, further, hypotenuse);
}

function createTriangleImage(angle, width, height, margin, lineWidth, letterSize, angleStatus, closer, further, hypotenuse) {
    let image = createImage(width, height, margin, lineWidth, letterSize, angle, angleStatus, closer, further, hypotenuse);
    if (image == -1) {
        displayError("Invalid input (too small width or height)");
        return;
    }

    let previous = document.getElementById("triangle-image");
    if (previous != null) previous.remove();

    image.id = "triangle-image";
    document.getElementById("image-location").appendChild(image);
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

    if (element.hasAttribute("max") && value > max) {
        element.value = max;
        return;
    }

    if (!element.hasAttribute("step")) return;

    if (step >= 1) {
        element.value = Math.round(value);
        return;
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
