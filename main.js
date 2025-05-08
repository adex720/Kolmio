
function displayError(message){
    alert(message);
}

function gcd(a, b){
    let c;
    if ( a < b){
        c = a
        a=b
        b=c;
    }

    c = a % b;
    while (c > 0){
        a = b;
        b = c;
        c = a % b;
    }

    return b;
}

function isInteger(i) {
  return Math.abs(i - Math.round(i)) < 1e-6;
}

function zeroCount(i){
let x = i;
    i -= Math.floor(i);

    if (i == 0) return 1000;

    let count = 0;
    for (let diff = 0.1; diff > i; diff/=10){
        count++;
    }

    return count;
}

function calculate(angle, digits){
    let tan = Math.tan(angle * Math.PI / 180);

    let m = 2;
    let n = 1;

    let a,b,c,sin;

    while (true){
        let t = n/m;
        let v = 2*t / (1-t*t);

        a = m*m-n*n;
        b = 2*m*n;
        c = m*m+n*n;

        sin = Math.asin(b/c)*180/Math.PI;

        let ero = sin-angle;

        if (0 < ero && ero < 1 && zeroCount( ero) >= digits) break;

        if (v > tan || n + 1 >= m) m++;
        else n++;
    }

    let d = gcd(gcd(a, b), c);

    return [a/d,b/d,c/d];
}

function updateTriangle(){
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

    let sin = (Math.asin(b/c) * 180 / Math.PI).toFixed(decimals + 3);

    document.getElementById("side-a").innerHTML = "a = " + a;
    document.getElementById("side-b").innerHTML = "b = " + b;
    document.getElementById("side-c").innerHTML = "c = " + c;
    document.getElementById("sin").innerHTML = "sin = " + sin + "&deg;";
}

function showAdvanced(){
    var checkBox = document.getElementById("show-advanced");

    document.getElementById("image-creation").style.display = checkBox.checked ? "inline" : "none";
}

function fixValue(element){
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

function initFixValue(className){
    elements =  document.getElementsByClassName(className);
    for (let e of elements){
       e.addEventListener("input", () => fixValue(e));
    }
}

function init(){
    initFixValue("fix-input");

    updateTriangle();
}

window.onload = init();
