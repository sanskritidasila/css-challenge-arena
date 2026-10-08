// --- 1. State Management ---
const STORAGE_KEY = "css_arena_progress";

let state = {
  currentLevelIndex: 0,
  completedLevels: [],
  debounceTimer: null
};

// --- 2. DOM Elements ---
const levelTitleEl = document.getElementById("level-title");
const taskTitleEl = document.getElementById("task-title");
const taskDescEl = document.getElementById("task-description");
const hintBoxEl = document.getElementById("hint-box");
const cssInputEl = document.getElementById("css-input");
const feedbackBarEl = document.getElementById("feedback-bar");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const hintBtn = document.getElementById("hint-btn");
const checkBtn = document.getElementById("check-btn");

const targetFrame = document.getElementById("target-frame");
const userFrame = document.getElementById("user-frame");

// --- 3. Persistence (localStorage) ---
function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state.completedLevels = parsed.completedLevels || [];
      state.currentLevelIndex = parsed.currentLevelIndex || 0;
    } catch (e) {
      console.error("Failed to parse saved progress", e);
    }
  }
}

function saveProgress() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      completedLevels: state.completedLevels,
      currentLevelIndex: state.currentLevelIndex
    })
  );
}

// --- 4. Frame Document Generator ---
// Injects markup and CSS into an iframe document securely
function buildFrameSource(htmlMarkup, baseCss, customCss) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          ${baseCss}
          ${customCss}
        </style>
      </head>
      <body>
        ${htmlMarkup}
      </body>
    </html>
  `;
}

// --- 5. Level Loading & Rendering ---
function renderLevel() {
  const current = levels[state.currentLevelIndex];

  // Update instructions and header
  levelTitleEl.textContent = `Level ${current.id} of ${levels.length}`;
  taskTitleEl.textContent = current.title;
  taskDescEl.innerHTML = current.description;

  // Reset hint state
  hintBoxEl.innerHTML = current.hint;
  hintBoxEl.classList.add("hidden");
  hintBtn.textContent = "Hint";

  // Reset CSS editor input
  cssInputEl.value = "";
  hideFeedback();

  // Render the Target layout iframe (base styles + target solution)
  targetFrame.srcdoc = buildFrameSource(
    current.html,
    current.baseCss,
    current.solutionCss
  );

  // Render initial User layout iframe (base styles only)
  updateUserPreview();

  // Update navigation button states
  prevBtn.disabled = state.currentLevelIndex === 0;
  nextBtn.disabled = state.currentLevelIndex === levels.length - 1;
}

// Updates the user preview frame with current textarea CSS
function updateUserPreview() {
  const current = levels[state.currentLevelIndex];
  userFrame.srcdoc = buildFrameSource(
    current.html,
    current.baseCss,
    cssInputEl.value
  );
}

// --- 6. Real-Time Debounce ---
// Waits 300ms after typing stops before updating iframe
cssInputEl.addEventListener("input", () => {
  clearTimeout(state.debounceTimer);
  state.debounceTimer = setTimeout(() => {
    updateUserPreview();
  }, 300);
});

// --- 7. Validation Engine (getBoundingClientRect) ---
function validateLayout() {
  const current = levels[state.currentLevelIndex];
  const targetDoc = targetFrame.contentDocument || targetFrame.contentWindow.document;
  const userDoc = userFrame.contentDocument || userFrame.contentWindow.document;

  if (!targetDoc || !userDoc) {
    showFeedback("Preview window not ready. Please try again.", "error");
    return;
  }

  const targetElements = targetDoc.querySelectorAll(current.targetSelector);
  const userElements = userDoc.querySelectorAll(current.targetSelector);

  if (targetElements.length === 0 || targetElements.length !== userElements.length) {
    showFeedback("Elements could not be detected. Check your syntax.", "error");
    return;
  }

  // Tolerance threshold for browser fractional pixel rendering
  const PIXEL_TOLERANCE = 2;
  const metrics = ["top", "left", "width", "height"];

  let isMatch = true;

  for (let i = 0; i < targetElements.length; i++) {
    const targetRect = targetElements[i].getBoundingClientRect();
    const userRect = userElements[i].getBoundingClientRect();

    for (const key of metrics) {
      const diff = Math.abs(targetRect[key] - userRect[key]);
      if (diff > PIXEL_TOLERANCE) {
        isMatch = false;
        break;
      }
    }
    if (!isMatch) break;
  }

  if (isMatch) {
    if (!state.completedLevels.includes(current.id)) {
      state.completedLevels.push(current.id);
    }
    saveProgress();
    showFeedback("Correct! Layout matched successfully.", "success");
    launchConfetti(); // <--- ADD THIS ONE LINE HERE!
  } else {
    showFeedback("Not quite aligned yet. Compare with the target preview.", "error");
  }
}

// --- 8. UI Feedback Bar ---
function showFeedback(message, type) {
  feedbackBarEl.textContent = message;
  feedbackBarEl.className = `feedback-bar ${type}`;
  feedbackBarEl.classList.remove("hidden");

  setTimeout(() => {
    hideFeedback();
  }, 4000);
}

function hideFeedback() {
  feedbackBarEl.classList.add("hidden");
}

// --- 9. Event Listeners ---
checkBtn.addEventListener("click", validateLayout);

hintBtn.addEventListener("click", () => {
  hintBoxEl.classList.toggle("hidden");
  hintBtn.textContent = hintBoxEl.classList.contains("hidden") ? "Hint" : "Hide Hint";
});

prevBtn.addEventListener("click", () => {
  if (state.currentLevelIndex > 0) {
    state.currentLevelIndex--;
    saveProgress();
    renderLevel();
  }
});

nextBtn.addEventListener("click", () => {
  if (state.currentLevelIndex < levels.length - 1) {
    state.currentLevelIndex++;
    saveProgress();
    renderLevel();
  }
});
// Keyboard shortcut: Ctrl/Cmd + Enter to trigger Check Solution
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
    e.preventDefault();
    validateLayout();
  }
});

// --- 10. Initialization ---
loadProgress();
renderLevel();
// --- 11. Celebratory Confetti Engine (Vanilla Canvas) ---
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");
let confettiPieces = [];

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeConfettiCanvas);
resizeConfettiCanvas();

function launchConfetti() {
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#38bdf8"];
  confettiPieces = [];

  for (let i = 0; i < 75; i++) {
    confettiPieces.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      w: Math.random() * 8 + 4,
      h: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 16,
      gravity: 0.35,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  let activeParticles = 0;

  confettiPieces.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.rotation += p.rotSpeed;
    p.opacity -= 0.008;

    if (p.opacity > 0) {
      activeParticles++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
  });

  if (activeParticles > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}