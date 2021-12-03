let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let tool = canvas.getContext("2d");

tool.strokeStyle ="blue";
tool.lineWidth="8";

tool.beginPath(); // new graphic path line
tool.moveTo(10, 10); // start point
tool.lineTo(100, 150); // end point
tool.stroke(); // fill color

tool.lineTo(200, 1230);
tool.stroke();