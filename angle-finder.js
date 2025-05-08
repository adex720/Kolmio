
function calculate(angle, digits){
    let tan = Math.tan(angle * Math.PI / 180);

    let m = 2;
    let n = 1;

    let a, b, c, sin;
    while (true){
        let t = n / m;
        let v = 2 * t / (1 - t * t);

        a = m * m - n * n;
        b = 2 * m * n;
        c = m * m + n * n;

        sin = Math.asin(b / c) * 180 / Math.PI;

        let diff = sin - angle;

        if (0 < diff && diff < 1 && zeroCount(diff) >= digits) break;

        if (v > tan || n + 1 >= m) m++;
        else n++;
    }

    let d = gcd(gcd(a, b), c);

    return [a / d, b / d, c / d];
}
