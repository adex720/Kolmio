
function isInteger(i) {
  return Math.abs(i - Math.round(i)) < 1e-6;
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
}

window.onload = init();
