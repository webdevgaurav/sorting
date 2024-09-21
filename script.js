// Get canvas context
// Bubble Sort
const canvasBubble = document.getElementById("barBubbleChart");
const ctxBubble = canvasBubble.getContext("2d");
const refreshBubble = document.getElementById("refreshBubble");

// Selection Sort
const canvasSelection = document.getElementById("barSelectionChart");
const ctxSelection = canvasSelection.getContext("2d");
const refreshSelection = document.getElementById("refreshSelection");

// Insertion Sort
const canvasInsertion = document.getElementById("barInsertionChart");
const ctxInsertion = canvasInsertion.getContext("2d");
const refreshInsertion = document.getElementById("refreshInsertion");

function generateNewData() {
  let data = [];
  return new Promise((resolve, reject) => {
    try {
      let iterations = Math.floor(Math.random() * 10) + 3;
      for (let i = 0; i < iterations; i++) {
        const el = Math.floor(Math.random() * 100) + 3;
        data.push(el);
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// Chart Functions
function makeChart(payload) {
  const barWidth = 50;
  const barGap = 15;
  const chartHeight = 300;
  let ctx = payload.ctx;
  let data = payload.data;
  for (let i = 0; i < data.length; i++) {
    const x = i * (barWidth + barGap) + 50;
    const barHeight = data[i] * 3;
    const y = chartHeight - barHeight + 50;
    drawBar(x, y, barWidth, barHeight, "#3498db", ctx);
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText(data[i], x + 10, chartHeight + 70);
  }
  // Drawing Y-axis
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(50, chartHeight + 50);
  ctx.stroke();
  // Drawing X-axis
  ctx.beginPath();
  ctx.moveTo(50, chartHeight + 50);
  ctx.lineTo(70 * data.length, chartHeight + 50);
  ctx.stroke();
}

function drawBar(x, y, width, height, color, ctx) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// Events Functions
async function refreshBubbleSort() {
  let data = await generateNewData();
  ctxBubble.clearRect(0, 0, canvasBubble.width, canvasBubble.height);
  let response = await bubbleSort(data);
  makeChart({
    data: response,
    ctx: ctxBubble,
  });
}

async function refreshSelectionSort() {
  let data = await generateNewData();
  ctxSelection.clearRect(0, 0, canvasSelection.width, canvasSelection.height);
  let response = await selectionSort(data);
  makeChart({
    data: response,
    ctx: ctxSelection,
  });
}

async function refreshInsertionort() {
  let data = await generateNewData();
  ctxInsertion.clearRect(0, 0, canvasInsertion.width, canvasInsertion.height);
  let response = await insertionSort(data);
  makeChart({
    data: response,
    ctx: ctxInsertion,
  });
}

// Events
document.addEventListener("DOMContentLoaded", function () {
  refreshBubbleSort();
  refreshSelectionSort();
  refreshInsertionort();
});
refreshBubble.addEventListener("click", refreshBubbleSort);
refreshSelection.addEventListener("click", refreshSelectionSort);
refreshInsertion.addEventListener("click", refreshInsertionort);

// Sorting algorithms
// Bubble Sort
function bubbleSort(data) {
  return new Promise((resolve, reject) => {
    try {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[i] < data[j]) {
            let temp = data[i];
            data[i] = data[j];
            data[j] = temp;
          }
        }
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// Selection Sort
function selectionSort(data) {
  return new Promise((resolve, reject) => {
    try {
      for (let i = 0; i < data.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < data.length; j++) {
          if (data[j] < data[minIndex]) {
            minIndex = j;
          }
        }

        if (minIndex !== i) {
          let temp = data[i];
          data[i] = data[minIndex];
          data[minIndex] = temp;
        }
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// Insertion Sort
function insertionSort(data) {
  return new Promise((resolve, reject) => {
    try {
      for (let i = 1; i < data.length; i++) {
        let key = data[i];
        let j = i - 1;
        while (j >= 0 && data[j] > key) {
          data[j + 1] = data[j];
          j = j - 1;
        }
        data[j + 1] = key;
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
