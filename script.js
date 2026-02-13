// Create floating hearts
function createFloatingHeart() {
  const container = document.getElementById("heartContainer");
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = Math.random() * 3 + 5 + "s";
  heart.style.animationDelay = Math.random() * 2 + "s";
  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

// Generate hearts periodically
setInterval(createFloatingHeart, 800);

// Day Counter Calculation
function updateCounter() {
  const startDate = new Date("2020-02-14");
  const today = new Date();

  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Years and months more accurately
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();

  let years = today.getFullYear() - startYear;
  let months = today.getMonth() - startMonth;
  let days = today.getDate() - startDay;

  if (days < 0) {
    months -= 1;
    // Adjust days to previous month length
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const weeks = Math.floor(diffDays / 7);

  animateCounter("dayCounter", diffDays);
  animateCounter("yearsCount", years);
  animateCounter("monthsCount", months);
  animateCounter("weeksCount", weeks);
}

// Animate numbers counting up
function animateCounter(elementId, targetValue) {
  const element = document.getElementById(elementId);
  const duration = 2000; // 2 seconds
  const startTime = performance.now();
  const startValue = 0;

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuad = (progress) => 1 - (1 - progress) * (1 - progress);
    const currentValue = Math.floor(
      startValue + (targetValue - startValue) * easeOutQuad(progress),
    );

    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = targetValue.toLocaleString();
    }
  }

  requestAnimationFrame(updateNumber);
}

// Initialize counter on page load
window.addEventListener("load", updateCounter);

// Image heartbeat on click
const image = document.getElementById("valentineImage");
image.addEventListener("click", function () {
  image.classList.add("heartbeat-active");
  setTimeout(() => {
    image.classList.remove("heartbeat-active");
  }, 2400);
});

// Password check
function checkPassword() {
  const password = document
    .getElementById("password")
    .value.toLowerCase()
    .trim();
  const validPasswords = [
    "ekushey book fair",
    "book fair",
    "ekushey",
    "boi mela",
    "বই মেলা",
  ];

  if (validPasswords.includes(password)) {
    document.getElementById("loveMessage").style.display = "block";
    document.getElementById("password").style.borderColor = "#4CAF50";

    // Scroll to message
    setTimeout(() => {
      document.getElementById("loveMessage").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  } else {
    document.getElementById("password").style.borderColor = "#ff4444";
    document.getElementById("password").value = "";

    // Shake animation
    const box = document.querySelector(".secret-box");
    box.style.animation = "none";
    setTimeout(() => {
      box.style.animation = "shake 0.5s ease";
    }, 10);

    // Show custom alert instead of browser alert
    showAlert();
  }
}

// Show custom alert
function showAlert() {
  const alertOverlay = document.getElementById("customAlert");
  alertOverlay.classList.add("show");
}

// Close custom alert
function closeAlert() {
  const alertOverlay = document.getElementById("customAlert");
  alertOverlay.classList.remove("show");
}

// Close alert when clicking outside the box
document.getElementById("customAlert").addEventListener("click", function (e) {
  if (e.target === this) {
    closeAlert();
  }
});

// Add shake animation
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Enter key to submit
document.getElementById("password").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkPassword();
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".story-card, .timeline-container").forEach((el) => {
  observer.observe(el);
});
