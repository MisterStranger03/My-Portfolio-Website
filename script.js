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
const rewindBtn = document.getElementById('rewindBtn');
const forwardBtn = document.getElementById('forwardBtn');
const progress = document.getElementById('progress');
const audio = document.getElementById('audioPlayer');

// Toggle expand/collapse
musicIcon.addEventListener('click', () => {
  musicBar.classList.toggle('collapsed');
});

// Prevent collapsing when clicking within the expanded bar
musicBar.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Play/Pause Button Logic (real audio)
playPauseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  }
});

// Rewind 10 seconds
rewindBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});

// Forward 10 seconds
forwardBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
});

// Update progress bar with real audio
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + '%';
});

// Reset button and progress when audio ends
audio.addEventListener('ended', () => {
  playPauseBtn.textContent = '▶️';
  progress.style.width = '0%';
});

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

const musicLibrary = [
  { name: "Finding Her", image: "assets/Finding Her.png", file: "assets/Finding Her.mp3" },
  { name: "Ishq Hai", image: "assets/Ishq Hai.png", file: "assets/Ishq Hai.mp3" },
  { name: "Raanjhan", image: "assets/Raanjhan.png", file: "assets/Raanjhan.mp3" },
  { name: "Sahiba", image: "assets/Sahiba.png", file: "assets/Sahiba.mp3" }
];

const expandMusicBtn = document.getElementById('expandMusicBtn');
const musicDropdown = document.getElementById('musicDropdown');
const albumArt = document.querySelector('.album-art');
const musicName = document.querySelector('.music-name');
const audioPlayer = document.getElementById('audioPlayer');

// Show/hide dropdown on expand button click
expandMusicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (musicDropdown.style.display === 'none' || musicDropdown.style.display === '') {
    musicDropdown.innerHTML = musicLibrary.map((song, idx) =>
      `<div class="dropdown-song" data-idx="${idx}">${song.name}</div>`
    ).join('');
    musicDropdown.style.display = 'block';
  } else {
    musicDropdown.style.display = 'none';
  }
});

// Hide dropdown when clicking outside
document.addEventListener('click', () => {
  musicDropdown.style.display = 'none';
});

// Song selection logic
musicDropdown.addEventListener('click', (e) => {
  e.stopPropagation();
  const idx = e.target.getAttribute('data-idx');
  if (idx !== null) {
    const song = musicLibrary[idx];
    albumArt.src = song.image;
    musicName.textContent = song.name;
    audioPlayer.src = song.file;
    audioPlayer.currentTime = 0;
    musicDropdown.style.display = 'none';
  }
});

function openSidePanel() {
  document.getElementById('side-panel').classList.add('open');
}
function closeSidePanel() {
  document.getElementById('side-panel').classList.remove('open');
}
// Optional: Close panel when clicking outside
document.addEventListener('click', function(e) {
  const panel = document.getElementById('side-panel');
  if (
    panel.classList.contains('open') &&
    !panel.contains(e.target) &&
    !e.target.classList.contains('navbtn')
  ) {
    closeSidePanel();
  }
});

// Get all anchor elements inside the side panel
const sidePanelLinks = document.querySelectorAll('.side-panel ul li a');
sidePanelLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeSidePanel(); // Automatically close the side panel when link is clicked
  });
});


// Navbar Active Link Highlighting using IntersectionObserver

document.addEventListener("DOMContentLoaded", () => {
  // Get all sections that correspond to nav entries.
  const sections = document.querySelectorAll("section[id]");
  
  // Get all nav links from main nav and side panel.
  const mainNavLinks = document.querySelectorAll("nav ul li a");
  const sideNavLinks = document.querySelectorAll(".side-panel ul li a");
  
  // Home links are assumed to have href="#"
  const homeLinkMain = document.querySelector('nav ul li a[href="#"]');
  const homeLinkSide = document.querySelector('.side-panel ul li a[href="#"]');
  
  // Adjust for your fixed header height (80px in your CSS)
  const observerOptions = {
    root: null,       
    threshold: 0.5,   
    rootMargin: "-80px 0px 0px 0px"
  };

  const observerCallback = (entries) => {
    // Clear active state from both navs.
    mainNavLinks.forEach(link => link.classList.remove("active"));
    sideNavLinks.forEach(link => link.classList.remove("active"));

    let found = false;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // If a section is intersecting, highlight its corresponding links
        const sectionId = entry.target.getAttribute("id");
        const activeMain = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
        const activeSide = document.querySelector(`.side-panel ul li a[href="#${sectionId}"]`);
        if (activeMain) {
          activeMain.classList.add("active");
          found = true;
        }
        if (activeSide) {
          activeSide.classList.add("active");
        }
      }
    });
    
    // If no section is sufficiently visible or the user is at the top, highlight Home.
    if (!found || window.pageYOffset < 100) {
      if (homeLinkMain) {
        homeLinkMain.classList.add("active");
      }
      if (homeLinkSide) {
        homeLinkSide.classList.add("active");
      }
    }
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Also update on scroll if near the very top of the page.
  window.addEventListener("scroll", () => {
    if (window.pageYOffset < 100) {
      mainNavLinks.forEach(link => link.classList.remove("active"));
      sideNavLinks.forEach(link => link.classList.remove("active"));
      if (homeLinkMain) {
        homeLinkMain.classList.add("active");
      }
      if (homeLinkSide) {
        homeLinkSide.classList.add("active");
      }
    }
  });
});