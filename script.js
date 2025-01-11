const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearButton');
const backgroundColorButton = document.getElementById('backgroundColorButton');
const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');
const body = document.querySelector('body');
const stockWebsiteButton = document.getElementById('stockWebsiteButton');


let isDrawing = false;
let lastX = 0;
let lastY = 0;
let color = colorPicker.value;
let history = [];
let historyStep = -1; // current position in the history
let redoStack = [];
const maxHistorySize = 20;
let isBackgroundBlack = false; // Track background color

// Set canvas dimensions to fill the viewport
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - document.querySelector('.controls').offsetHeight - 20; // Adjusted for controls and some margin
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);


function saveCanvas() {
    historyStep++;
    if (historyStep < history.length) {
        history.length = historyStep;
    }
    history.push(canvas.toDataURL());
    if (history.length > maxHistorySize) {
      history.shift();
      historyStep--;
    }
  redoStack = [];
}


function draw(e) {
    if(!isDrawing) return;
    ctx.strokeStyle = color;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveCanvas();
}


function changeBackgroundColor() {
  isBackgroundBlack = !isBackgroundBlack;
    body.style.backgroundColor = isBackgroundBlack ? 'black' : 'white';
}


function undoCanvas() {
    if (historyStep > 0) {
        redoStack.push(history[historyStep]); // move current to redo
        historyStep--;
        const canvasState = new Image();
        canvasState.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(canvasState, 0, 0);
        };
      canvasState.src = history[historyStep];
    }
}


function redoCanvas() {
  if (redoStack.length > 0) {
        historyStep++;
        if (historyStep < history.length) {
          history.length = historyStep;
        }
      history.push(redoStack.pop());
    const canvasState = new Image();
        canvasState.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(canvasState, 0, 0);
        };
      canvasState.src = history[historyStep];
    }
}

// Save initial state on load
saveCanvas();

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    saveCanvas(); // Save state on mouse up
});

canvas.addEventListener('mouseout', () => isDrawing = false);

colorPicker.addEventListener('input', () => color = colorPicker.value);
clearButton.addEventListener('click', clearCanvas);
backgroundColorButton.addEventListener('click', changeBackgroundColor);
undoButton.addEventListener('click', undoCanvas);
redoButton.addEventListener('click', redoCanvas);

stockWebsiteButton.addEventListener('click', () => {
    window.location.href = 'stockwebsite.html'; // Replace with actual path or URL of your stock website
});
