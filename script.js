// Set a timeout for hiding the loading screen after 2.5 seconds
// Set a timeout for hiding the loading screen after 3 seconds
setTimeout(() => {
  const loadingScreen = document.getElementById('loading-screen');
  const content = document.getElementById('content');
  const heroImg = document.querySelector('.hero img');
  const heroHeader = document.querySelector('.hero header');

  // Hide the loading screen
  loadingScreen.style.display = 'none';
  // Show the main content
  content.style.display = 'block';
  // Re-enable scrolling
  document.body.style.overflow = 'auto';

  // Add classes to trigger animations after the loading screen disappears
  heroImg.classList.add('fadeIn', 'slideUp');
  heroHeader.classList.add('fadeInText');
}, 3000); // 3000ms = 3 seconds (adjust as necessary for your needs)

// Toggle Dark/Light Mode
function toggleMode() {
  document.body.classList.toggle('dark-mode');
  const toggleButton = document.querySelector('.toggle-button');
  toggleButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// Expand a flash card
function expandCard(card) {
  const cards = document.querySelectorAll('.flash-card');
  
  // Toggle the clicked card while collapsing others
  cards.forEach(c => {
    c.classList.toggle('expanded', c === card && !c.classList.contains('expanded'));
  });
}

// Custom Cursor - Follow Mouse Movement
document.addEventListener('mousemove', (event) => {
  const cursor = document.getElementById('custom-cursor');
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

// Add click effect to cursor
document.addEventListener('mousedown', () => {
  document.getElementById('custom-cursor').classList.add('click');
});

document.addEventListener('mouseup', () => {
  document.getElementById('custom-cursor').classList.remove('click');
});

// Music Button - Expand/Collapse music controls
const musicBar = document.getElementById('musicBar');
const musicIcon = document.getElementById('musicIcon');
const playPauseBtn = document.getElementById('playPauseBtn');
const progress = document.getElementById('progress');

let isPlaying = false;

// Toggle expand/collapse
musicIcon.addEventListener('click', () => {
  musicBar.classList.toggle('collapsed');
});

// Prevent collapsing when clicking within the expanded bar
musicBar.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Play/Pause Button Logic
playPauseBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent triggering bar collapse
  isPlaying = !isPlaying;
  playPauseBtn.textContent = isPlaying ? '⏸️' : '▶️';

  if (isPlaying) {
    startProgress();
  } else {
    stopProgress();
  }
});

// Simulate Progress Bar
let progressInterval;

function startProgress() {
  clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    let currentWidth = parseFloat(progress.style.width) || 0;
    if (currentWidth < 100) {
      progress.style.width = `${currentWidth + 1}%`;
    } else {
      clearInterval(progressInterval);
    }
  }, 1000); // Increment every second
}

function stopProgress() {
  clearInterval(progressInterval);
}

// Skill Ball Hover Effect
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("skill-container");
  const balls = container.querySelectorAll(".ball");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const hoverRadius = 100; // Movement range on hover

  // Spread balls randomly inside the smaller container
  balls.forEach((ball) => {
    const x = Math.random() * (containerWidth - 80); // Ensure ball stays inside container
    const y = Math.random() * (containerHeight - 80); // Ensure ball stays inside container
    ball.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  // Add hover effect for dynamic movement
  balls.forEach((ball) => {
    ball.addEventListener("mouseenter", () => {
      const randomAngle = Math.random() * 2 * Math.PI;
      const randomDistance = Math.random() * hoverRadius;
      const x = Math.cos(randomAngle) * randomDistance;
      const y = Math.sin(randomAngle) * randomDistance;

      // Move ball and scale it
      ball.style.transform = `translate3d(${x + parseFloat(ball.style.transform.split(",")[0].slice(12))}px, ${y + parseFloat(ball.style.transform.split(",")[1])}px, 0) scale(1.2)`;
    });

    ball.addEventListener("mouseleave", () => {
      // Reset back to original random position inside container
      const x = Math.random() * (containerWidth - 80); // Random position in container
      const y = Math.random() * (containerHeight - 80); // Random position in container
      ball.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
    });
  });
});

// Analog Clock
(function() {
  const marks = document.querySelector('#watch .minute-marks');
  if (marks && marks.children.length === 0) {
    for (let i = 0; i < 60; i++) {
      const li = document.createElement('li');
      li.style.transform = `rotate(${i * 6}deg) translateY(-26px)`;
      marks.appendChild(li);
    }
  }
  function updateClock() {
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const hourHand = document.querySelector('#watch .hand.hour');
    const minuteHand = document.querySelector('#watch .hand.minute');
    const secondHand = document.querySelector('#watch .hand.second');
    if (hourHand && minuteHand && secondHand) {
      hourHand.style.transform =
        `translate(-50%, 0) rotate(${(hour + minute/60) * 30}deg)`;
      minuteHand.style.transform =
        `translate(-50%, 0) rotate(${(minute + second/60) * 6}deg)`;
      secondHand.style.transform =
        `translate(-50%, 0) rotate(${second * 6}deg)`;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();
})();