function getCursorPosition(canvas, event) {
  const x = event.clientX;
  const y = canvas.height - event.clientY;
  return {x, y};
}

function drawPoint(canvas, point, color='#00FF00') {
  const context = canvas.getContext('2d');

  const radius = 10;
  const centerX = point.x;
  const centerY = canvas.height - point.y;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = '#003300';
  context.stroke();
}

function drawLine(canvas, line) {
  const context = canvas.getContext('2d');

  context.beginPath();
  context.moveTo(0, canvas.height - line.n);
  context.lineTo(canvas.width, canvas.height - line.n - canvas.width * line.m);
  context.stroke();
}

function scatterPlot(canvas, x, y) {
  const context = canvas.getContext('2d');

  context.beginPath();
  context.moveTo(x[0], canvas.height - y[0]);
  for (let i = 1; i < x.length; i++) {
    context.lineTo(x[i], canvas.height - y[i]);
  }
  context.stroke();
}

function annotatePlot(canvas, point, text) {
  const context = canvas.getContext('2d');

  const centerX = point.x;
  const centerY = canvas.height - point.y;

  context.font = '12px Arial';
  context.fillStyle = 'black';
  context.fillText(text, centerX, centerY);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}