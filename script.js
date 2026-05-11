

const submitBtn = document.getElementById("submitBtn");
const notification = document.getElementById("notification");
const timerDisplay = document.getElementById("timer");

const dropboxLink = "https://www.dropbox.com/request/xzzsgrbnyl0p0soqkt38";

// ⏳ 30 minutes in ms
const DURATION = 30 * 60 * 1000;

// check if end time already exists
let endTime = localStorage.getItem("endTime");

if (!endTime) {
  // first time opening → set end time
  endTime = new Date().getTime() + DURATION;
  localStorage.setItem("endTime", endTime);
} else {
  endTime = parseInt(endTime);
}

function updateTimer() {
  const now = new Date().getTime();
  const timeLeft = endTime - now;

  if (timeLeft <= 0) {
    timerDisplay.innerText = "⛔ Time's Up!";
    submitBtn.disabled = true;

    notification.classList.remove("hidden");
    notification.innerText = "❌ Submission time is over!";

    return;
  }

  let minutes = Math.floor(timeLeft / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerDisplay.innerText = `${minutes}:${seconds}`;

  // 🔴 last 1 minute warning
  if (timeLeft <= 60000) {
    timerDisplay.style.color = "#ff4757";
  }

  requestAnimationFrame(updateTimer);
}

updateTimer();

// submit button
submitBtn.addEventListener("click", () => {
  notification.classList.remove("hidden");
  notification.innerText = "✅ Redirecting to submit...";

  setTimeout(() => {
    window.location.href = dropboxLink;
  }, 1000);
});
