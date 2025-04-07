const canvas = document.getElementById("basic"); 
const ctx = canvas.getContext("2d");
console.log(canvas)
console.log(ctx)

ctx.translate(250, 500);
ctx.scale(1, -1);

ctx.fillStyle = "black";

// Draw the Body of the Gorilla
ctx.beginPath();
ctx.moveTo(-68, 72);
ctx.lineTo(-80, 176);

ctx.lineTo(-44, 308);
ctx.lineTo(0, 336);
ctx.lineTo(+44, 308);

ctx.lineTo(+80, 176);
ctx.lineTo(+68, 72);
ctx.fill();


// Draw the Left Leg
ctx.beginPath();
ctx.moveTo(0, 72);
ctx.lineTo(-28, 0);
ctx.lineTo(-80, 0);
ctx.lineTo(-68, 72);
ctx.fill();

// Draw the Right Leg
ctx.beginPath();
ctx.moveTo(0, 72);
ctx.lineTo(+28, 0);
ctx.lineTo(+80, 0);
ctx.lineTo(+68, 72);
ctx.fill();


// 
ctx.strokeStyle = "black";
ctx.lineWidth = 70;

// Draw the Left Arm
ctx.beginPath();
ctx.moveTo(-56, 200);
ctx.quadraticCurveTo(-176, 180, -112, 48);
ctx.stroke();

// Draw the Right Arm
ctx.beginPath();
ctx.moveTo(+56, 200);
ctx.quadraticCurveTo(+176, 180, +112, 48);
ctx.stroke();



ctx.fillStyle = "lightgray";

// Draw the Facial Mask
ctx.beginPath();
ctx.arc(0, 252, 36, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.arc(-14, 280, 16, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.arc(+14, 280, 16, 0, 2 * Math.PI);
ctx.fill();

ctx.fillStyle = "black";

// Draw the Left Eye
ctx.beginPath();
ctx.arc(-14, 280, 6, 0, 2 * Math.PI);
ctx.fill();

// Draw the Right Eye
ctx.beginPath();
ctx.arc(+14, 280, 6, 0, 2 * Math.PI);
ctx.fill();

ctx.lineWidth = 6;

// Draw the Nostrils
ctx.beginPath();
ctx.moveTo(-14, 266);
ctx.lineTo(-6, 260);

ctx.moveTo(14, 266);
ctx.lineTo(+6, 260);
ctx.stroke();

// Draw the Mouth
ctx.beginPath();
ctx.moveTo(-20, 230);
ctx.quadraticCurveTo(0, 245, 20, 230);
ctx.stroke();

