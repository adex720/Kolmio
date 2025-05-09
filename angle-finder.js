
function calculate(angle, digits, amount = 1) {
    let result = [];

    let tan = Math.tan(angle * Math.PI / 180);

    let m = 2;
    let n = 1;

    let a, b, c, sin;
    while (true) {
        let t = n / m;
        let v = 2 * t / (1 - t * t);

        a = m * m - n * n;
        b = 2 * m * n;
        c = m * m + n * n;

        sin = Math.asin(b / c) * 180 / Math.PI;

        let diff = sin - angle;

        if (0 < diff && diff < 1 && zeroCount(diff) >= digits) {
            let d = gcd(gcd(a, b), c);
            let newC = c / d;

            let valid = true;
            for (let previous of result) {
                if (previous[2] == newC) {
                    valid = false;
                    break;
                }
            }

            if (valid) {
                result.push([a / d, b / d, newC]);

                amount--;
                if (amount == 0) break;
            }
        }

        if (v > tan || n + 1 >= m) m++;
        else n++;
    }

    result.sort((a, b) => a[2] - b[2]);
    return result;
}
