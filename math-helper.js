
function isInteger(i) {
    return Math.abs(i - Math.round(i)) < 1e-6;
}

function gcd(a, b) {
    let c;
    if ( a < b){
        c = a
        a = b
        b = c;
    }

    c = a % b;
    while (c > 0){
        a = b;
        b = c;
        c = a % b;
    }

    return b;
}

function zeroCount(i) {
    i -= Math.floor(i);

    if (i == 0) return 1000;

    let count = 0;
    for (let diff = 0.1; diff > i; diff /= 10)
        count++;

    return count;
}
