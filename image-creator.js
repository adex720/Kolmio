
/**
 * For angle, closer, further and hypotenuse:
 * -1 -> don't include value
 * 0 -> show as variable
 * >0 -> show value
 */
function createImage(width, height, margin, lineWidth, letterSize, angle, angleStatus, closer, further, hypotenuse) {
    if (2 * margin + lineWidth >= Math.min(width, height)) return -1;

    let maxWidth = width - 2 * margin - lineWidth - letterSize;
    let maxHeight = height - 2 * margin - lineWidth - letterSize;

    let tan = Math.tan(angle * Math.PI / 180);
    let realWidth = Math.round(maxHeight / tan);
    let realHeight = Math.round(maxWidth * tan);

    if (realHeight > maxHeight) {
        realHeight = maxHeight;
    } else {
        realWidth = maxWidth;
    }

    let xOffset = Math.floor((maxWidth - realWidth - letterSize) / 2);
    let yOffset =  Math.floor((maxHeight - realHeight + 2 * letterSize) / 2);

    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    let context = canvas.getContext("2d");

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.strokeStyle = '#000000';
    context.lineWidth = lineWidth;

    context.moveTo(xOffset + margin, height - margin - yOffset);
    context.lineTo(xOffset + margin + realWidth, height - margin - yOffset);
    context.lineTo(xOffset + margin + realWidth, height - margin - realHeight - yOffset);
    context.lineTo(xOffset + margin, height - margin - yOffset);
    context.lineTo(xOffset + margin + realWidth, height - margin - yOffset);

    context.stroke();

    let squareLength = Math.round(Math.min(realWidth, realHeight) / 5);
    context.strokeRect(xOffset + margin + realWidth - squareLength, height - margin - yOffset - squareLength, squareLength, squareLength);

    setupCharDrawing(context, letterSize);

    context.fillStyle = '#000000';

    if (closer >= 0)
        drawText(context, closer > 0 ? (closer) + "" : "x", xOffset + margin + Math.round(realWidth / 2), height - margin - yOffset + letterSize);

    if (further >= 0) {
        if (further == 0) {
            drawText(context, closer == 0 ? "y" : "x", xOffset + margin + realWidth + letterSize, height - yOffset - margin - Math.round(realHeight / 2));
        } else {
            context.save();
            context.translate(xOffset + margin + realWidth + letterSize, height - yOffset - margin - Math.round(realHeight / 2));
            context.rotate(Math.PI / 2);
            drawText(context, further + "", 0, 0);
            context.restore();
        }
    }

    if (hypotenuse >= 0) {
        context.save();
        context.translate(xOffset + margin + Math.round(realWidth / 2) - letterSize * Math.sin(angle*Math.PI/180), height - yOffset - margin - Math.round(realHeight / 2) - letterSize * Math.cos(angle*Math.PI/180));
        context.rotate(-angle * Math.PI / 180);
        drawText(context, hypotenuse > 0 ? (hypotenuse) + "" : (closer != 0 && further != 0) ? "x" : (closer == 0 && further == 0) ? "z" : "y", 0, 0);
        context.restore();
    }

    if (angleStatus >= 0) {
        let radius = Math.max(squareLength * 2, realWidth / (angle + 1));
        context.beginPath();
        context.moveTo(xOffset + margin + squareLength * 2, height - margin - yOffset);
        context.arc(xOffset + margin, height - margin - yOffset, radius, 0, -angle * Math.PI / 180, true);
        context.stroke();

        let k = Math.tan(angle * Math.PI / 180);
        let leftCornerHeight = k * radius;

        if (leftCornerHeight < letterSize + lineWidth) {
            let firstPossible = (letterSize + lineWidth) / k;

            if (firstPossible + letterSize + lineWidth > realWidth) {
                drawText(context, angleStatus > 0 ? (angleStatus) + "°" : "α", margin + xOffset + letterSize, height - margin - yOffset + letterSize);
            } else {
                drawText(context, angleStatus > 0 ? (angleStatus) + "°" : "α", firstPossible + letterSize, height - margin - yOffset - Math.round(letterSize / 2));
            }

        } else {
            let textWidth = Math.round(letterSize * (angleStatus == 0 ? 1 : 1.8));
            let rightCorner = xOffset + margin + radius + textWidth;
            let right = xOffset + margin + realWidth;

            if (rightCorner > right) {
                let firstPossible = xOffset + margin + (letterSize + lineWidth) / k;
                if (right - firstPossible - lineWidth > textWidth){
                    drawText(context, angleStatus > 0 ? (angleStatus) + "°" : "α", Math.round((right + firstPossible) / 2) + 2 * letterSize, height - margin - yOffset - letterSize);
                } else {
                    drawText(context, angleStatus > 0 ? (angleStatus) + "°" : "α", margin + xOffset + letterSize, height - margin - yOffset + letterSize);
                }
            } else {
                drawText(context, angleStatus > 0 ? (angleStatus) + "°" : "α", xOffset + margin + radius + letterSize, height - margin - yOffset - letterSize);
            }
        }
    }

    let image = new Image(width, height);
    image.src = canvas.toDataURL();

    return image;
}

function setupCharDrawing(context, fontSize) {
    context.font = fontSize + "px serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
}

/**
 * Does not set font or text align
 */
function drawText(context, text, x, y) {
    context.fillText(text, x, y);
}
