function nextStep() {
  // update next step
  markStepIndicator(1);
  simulator.oneStepForward();
  mainView.drawTowers();
  // draw next step move
  mainView.moveDisc(simulator.moveInfo()[0], simulator.moveInfo()[1]);
}

function reset() {
  readNumberOfDisc();
}

let T = 500;
function accelerate() {
  T = Math.max(T - 50, 50);
  const ffButton = document.getElementById("fast-forward");
  if (ffButton.classList.contains("running")) {
    fastForward();
    fastForward();
  }
}

let ffIntervalId = null;
function fastForward() {
  const ffButton = document.getElementById("fast-forward");
  if (ffButton.classList.contains("running")) {
    ffButton.innerText = "▶︎▶︎";
    ffButton.classList.remove("running");
    clearInterval(ffIntervalId);
    return;
  }
  ffButton.classList.add("running");
  ffButton.innerText = "Ⅱ";
  const deadLine = simulator.minimumMoves() - simulator.currentStep;
  ffIntervalId = setInterval(() => {
    nextStep();
    if (simulator.eof) {
      ffButton.innerText = "▶︎▶︎";
      ffButton.classList.remove("running");
      clearInterval(ffIntervalId);
    }
  }, T);
  setTimeout(() => {clearInterval(ffIntervalId);}, deadLine * 10 * T);
}

function pause() {
  
}

/*
  * @param {number} direction - 1 for forward, -1 for backward
  * @return void
  */
function markStepIndicator(direction) {
  const before = document.querySelector(".current-step");
  let current = null;
  if (direction == 1) {
    if (before == null) { // 0번째 이동 재생
      current = document.getElementById("move-0");
    } else {
      current = before.nextElementSibling;
    }
  } else {
    console.log("Invalid direction");
    return;
  }
  if (current == null) return;
  if (before != null) before.classList.remove("current-step");
  current.classList.add("current-step");
  document.getElementById("progress-number").innerText = `(${simulator.currentStep + 2}/${simulator.minimumMoves()})`
  current.scrollIntoView({ behavior: "instant", block: "center" });
}

const fasBackwardButton = document.getElementById("fast-")
const previousButton = document.getElementById("fast-")
const nextButton = document.getElementById("fast-")
const fastforwardButton = document.getElementById("fast-")
