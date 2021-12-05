let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let mouseDown = false;
let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");

let penColor = "blue";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let tool = canvas.getContext("2d");

tool.strokeStyle =penColor;
tool.lineWidth= penWidth;


canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    beginPath({
        x: e.clientX,
        y: e.clientY
    })
})

canvas.addEventListener("mousemove", (e) => {
    if(mouseDown)
    {
        drawStroke({
            x: e.clientX,
            y: e.clientY
        })
    }
})

canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
})


function beginPath(strokeObj)
{
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj)
{
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}


pencilColor.forEach((colorElem) => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[1];
        penColor = color;
        tool.strokeStyle= penColor;
    })
})


pencilWidthElem.addEventListener("change", (e) => {
    penWidth = pencilWidthElem.value;
    tool.lineWidth = penWidth;
})

eraserWidthElem.addEventListener("change", (e) => {
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
    tool.strokeStyle = eraserColor;
})

eraserIcon.addEventListener("click", (e) => {
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
    tool.strokeStyle = eraserColor;
})
// tool.beginPath(); // new graphic path line
// tool.moveTo(10, 10); // start point
// tool.lineTo(100, 150); // end point
// tool.stroke(); // fill color

// tool.lineTo(200, 1230);
// tool.stroke();