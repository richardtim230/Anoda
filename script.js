// Elements
const browserIcon = document.getElementById('browserIcon');
const browserContainer = document.getElementById('browserContainer');
const addScreenButton = document.getElementById('addScreen');
const closeBrowserButton = document.getElementById('closeBrowser');
const themeToggle = document.getElementById('themeToggle');
const browserGrid = document.getElementById('browserGrid');

// Toggle Browser Visibility
browserIcon.addEventListener('click', () => {
  browserContainer.classList.toggle('hidden');
});

// Close the Browser
closeBrowserButton.addEventListener('click', () => {
  browserContainer.classList.add('hidden');
});

// Add a New Screen
addScreenButton.addEventListener('click', () => {
  const screen = document.createElement('div');
  screen.className = 'browser-screen';
  screen.innerHTML = `
    <div class="navbar">
      <button class="homeButton">🏠 Home</button>
      <button class="backButton">⬅️ Back</button>
      <button class="forwardButton">➡️ Forward</button>
      <input type="text" class="searchBar" placeholder="Enter URL or search query">
      <button class="searchButton">🔍 Search</button>
      <button class="refreshButton">🔄 Refresh</button>
      <button class="bookmarkButton">⭐ Bookmark</button>
      <select class="bookmarksDropdown">
        <option value="" disabled selected>Bookmarks</option>
      </select>
    </div>
    <iframe class="browserFrame" src="https://www.example.com"></iframe>
    <button class="closeScreen">✖</button>
  `;

  // Add drag-and-drop functionality
  makeDraggable(screen);

  // Add functionality to the new screen
  initializeScreen(screen);
  browserGrid.appendChild(screen);
});

// Add drag-and-drop functionality
function makeDraggable(element) {
  element.style.position = 'absolute';
  let offsetX = 0, offsetY = 0;

  element.onmousedown = function (e) {
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    document.onmousemove = function (e) {
      element.style.left = e.clientX - offsetX + 'px';
      element.style.top = e.clientY - offsetY + 'px';
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}

// Initialize functionality for a browser screen
function initializeScreen(screen) {
  const homeButton = screen.querySelector('.homeButton');
  const backButton = screen.querySelector('.backButton');
  const forwardButton = screen.querySelector('.forwardButton');
  const searchBar = screen.querySelector('.searchBar');
  const searchButton = screen.querySelector('.searchButton');
  const refreshButton = screen.querySelector('.refreshButton');
  const browserFrame = screen.querySelector('.browserFrame');
  const closeScreen = screen.querySelector('.closeScreen');

  homeButton.addEventListener('click', () => browserFrame.src = "https://www.example.com");
  backButton.addEventListener('click', () => browserFrame.contentWindow.history.back());
  forwardButton.addEventListener('click', () => browserFrame.contentWindow.history.forward());
  searchButton.addEventListener('click', () => {
    const query = searchBar.value.trim();
    browserFrame.src = query.startsWith('http') ? query : `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`;
  });
  refreshButton.addEventListener('click', () => browserFrame.src = browserFrame.src);
  closeScreen.addEventListener('click', () => screen.remove());
}

// Initialize Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});