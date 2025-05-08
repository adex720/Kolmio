
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

    setupCharDrawing(context, letterSize);

    context.fillStyle = '#000000';

    if (closer >= 0)
        drawText(context, closer > 0 ? (closer) + "" : "x", xOffset + margin + Math.round(realWidth / 2), height - margin - yOffset + letterSize);

    if (further >= 0) {
        context.save();
        context.translate(xOffset + margin + realWidth + letterSize, height - yOffset - margin - Math.round(realHeight / 2));
        context.rotate(Math.PI / 2);
        drawText(context, further > 0 ? (further) + "" : closer == 0 ? "y" : "x", 0, 0);
        context.restore();
    }

    if (hypotenuse >= 0) {
        context.save();
        context.translate(xOffset + margin + Math.round(realWidth / 2) - letterSize * Math.sin(angle*Math.PI/180), height - yOffset - margin - Math.round(realHeight / 2) - letterSize * Math.cos(angle*Math.PI/180));
        context.rotate(-angle * Math.PI / 180);
        drawText(context, hypotenuse > 0 ? (hypotenuse) + "" : (closer != 0 && further != 0) ? "x" : (closer == 0 && further == 0) ? "z" : "y", 0, 0);
        context.restore();
    }

    if (angleStatus >= 0) {
        // TODO: draw angle
    }

    let image = new Image(width, height);
    image.src = canvas.toDataURL();

    return image;
}

function setupCharDrawing(context, fontSize) {
    context.font = "48px serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
}

/**
 * Does not set font or text align
 */
function drawText(context, text, x, y) {
    context.fillText(text, x, y);
    console.log(x + ", " + y);
}
