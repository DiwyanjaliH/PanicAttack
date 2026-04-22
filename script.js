

const submitBtn = document.getElementById("submitBtn");
const notification = document.getElementById("notification");
const timerDisplay = document.getElementById("timer");

const dropboxLink = "https://www.dropbox.com/request/zxgcart76cg9w72g2hu1";

// ⏳ 30 minutes = 1800 seconds
let timeLeft = 30 * 60;

let countdown = setInterval(() => {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  // format 00:00
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerDisplay.innerText = `${minutes}:${seconds}`;

  timeLeft--;

  // ⚠️ time up
  if (timeLeft < 0) {
    clearInterval(countdown);
    timerDisplay.innerText = "⛔ Time's Up!";
    submitBtn.disabled = true;

    notification.classList.remove("hidden");
    notification.innerText = "❌ Submission time is over!";
  }

  // 🔴 last 1 minute warning
  if (timeLeft <= 60) {
    timerDisplay.style.color = "#ff4757";
  }

}, 1000);

// submit button
submitBtn.addEventListener("click", () => {
  notification.classList.remove("hidden");
  notification.innerText = "✅ Redirecting to submit...";

  setTimeout(() => {
    window.location.href = dropboxLink;
  }, 1000);
});
