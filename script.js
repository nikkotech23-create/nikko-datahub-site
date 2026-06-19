// ------------------------------
// BACKGROUND ANIMATION (DOTS + LINES + DATA STREAMS)
// ------------------------------
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

// ------------------------------
// DATA STREAMS (Matrix-style)
// ------------------------------
const STREAM_COUNT = 40;
let streams = [];

function initStreams() {
  streams = [];
  for (let i = 0; i < STREAM_COUNT; i++) {
    streams.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.4 + Math.random() * 0.6,
      length: 8 + Math.floor(Math.random() * 12),
      chars: Array.from({ length: 20 }, () => Math.floor(Math.random() * 10))
    });
  }
}
initStreams();

// ------------------------------
// DOTS + CONNECTING LINES
// ------------------------------
let dots = [];
const DOT_COUNT = 140;
const MAX_DISTANCE = 140;

for (let i = 0; i < DOT_COUNT; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
    r: Math.random() * 2 + 1,
    digit: Math.floor(Math.random() * 10)
  });
}

// ------------------------------
// MAIN ANIMATION LOOP
// ------------------------------
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "rgba(0, 234, 255, 0.05)");
  grad.addColorStop(1, "rgba(179, 0, 255, 0.05)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ------------------------------
  // DRAW DATA STREAMS
  // ------------------------------
  streams.forEach(s => {
    ctx.fillStyle = "rgba(0,255,159,0.25)";
    ctx.font = "14px monospace";

    for (let i = 0; i < s.length; i++) {
      const char = s.chars[i];
      const opacity = 1 - i / s.length;
      ctx.fillStyle = `rgba(0,255,159,${opacity * 0.4})`;
      ctx.fillText(char, s.x, s.y - i * 18);
    }

    s.y += s.speed;
    if (s.y - s.length * 18 > canvas.height) {
      s.y = -50;
      s.x = Math.random() * canvas.width;
    }
  });

  // ------------------------------
  // DRAW DOTS
  // ------------------------------
  dots.forEach(d => {
    ctx.fillStyle = "#00eaff";
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(0,255,159,0.7)";
    ctx.font = "10px monospace";
    ctx.fillText(d.digit, d.x + 3, d.y + 3);

    d.x += d.dx;
    d.y += d.dy;

    if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.dy *= -1;
  });

  // ------------------------------
  // CONNECTING LINES
  // ------------------------------
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DISTANCE) {
        const opacity = 1 - dist / MAX_DISTANCE;
        ctx.strokeStyle = `rgba(0, 234, 255, ${opacity * 0.4})`;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

// ------------------------------
// RADIO
// ------------------------------
document.getElementById("radio").innerHTML = `
  <h2>Public Radio</h2>
  <p>Jump into live public radio streams.</p>
  <div class="btn-row">
    <a class="btn" href="https://www.bbc.co.uk/sounds" target="_blank">BBC Sounds</a>
    <a class="btn" href="https://www.npr.org" target="_blank">NPR</a>
    <a class="btn" href="https://onlineradiobox.com/us/" target="_blank">OnlineRadioBox</a>
    <a class="btn" href="https://www.euroradio.org" target="_blank">Euroradio</a>
    <a class="btn" href="https://myradioglobal.com/?utm_source=copilot.com" target="_blank">MyRadioGlobal</a>
    <a class="btn" href="https://www.worldsradio.com/?utm_source=copilot.com" target="_blank">WorldsRadio</a>

  </div>
`;

// ------------------------------
// NEWS
// ------------------------------
document.getElementById("news").innerHTML = `
  <h2>Newspapers</h2>
  <p>Quick access to major news outlets.</p>
  <div class="btn-row">
    <a class="btn" href="https://www.bbc.com/news" target="_blank">BBC News</a>
    <a class="btn" href="https://www.theguardian.com" target="_blank">The Guardian</a>
    <a class="btn" href="https://www.nytimes.com" target="_blank">New York Times</a>
    <a class="btn" href="https://www.reuters.com" target="_blank">Reuters</a>
    <a class="btn" href="https://www.wsj.com" target="_blank">Wall Street Journal</a>
    <a class="btn" href="https://www.ft.com" target="_blank">Financial Times</a>
    <a class="btn" href="https://www.nikkei.com" target="_blank">Nikkei</a>
    <a class="btn" href="https://www.lesechos.fr" target="_blank">Les Échos</a>
    <a class="btn" href="https://www.ilsole24ore.com" target="_blank">Il Sole 24 Ore</a>
    <a class="btn" href="https://www.chinadaily.com.cn/business" target="_blank">China Daily</a>
  </div>
`;

// ------------------------------
// SOCIAL
// ------------------------------
document.getElementById("social").innerHTML = `
  <h2>Social Media</h2>
  <p>Jump to your favourite social platforms.</p>
  <div class="btn-row">
    <a class="btn" href="https://www.youtube.com" target="_blank">YouTube</a>
    <a class="btn" href="https://www.tiktok.com" target="_blank">TikTok</a>
    <a class="btn" href="https://www.instagram.com" target="_blank">Instagram</a>
    <a class="btn" href="https://www.reddit.com" target="_blank">Reddit</a>
    <a class="btn" href="https://twitter.com" target="_blank">X / Twitter</a>
    <a class="btn" href="https://www.facebook.com" target="_blank">Facebook</a>
    <a class="btn" href="https://discord.com" target="_blank">Discord</a>
  </div>
`;

// ------------------------------
// INDIE GAMES
// ------------------------------
document.getElementById("indie").innerHTML = `
  <h2>Indie Games</h2>
  <p>Discover and support indie games.</p>
  <div class="btn-row">
    <a class="btn" href="https://itch.io" target="_blank">itch.io</a>
    <a class="btn" href="https://gamejolt.com" target="_blank">Game Jolt</a>
    <a class="btn" href="https://www.indiedb.com" target="_blank">IndieDB</a>
    <a class="btn" href="https://store.steampowered.com/genre/Indie/" target="_blank">Steam Indie</a>
  </div>
`;

// ------------------------------
// RETROPIQ ARCADE
// ------------------------------
document.getElementById("retropiq").innerHTML = `
  <h2>Retropiq Arcade</h2>
  <p>My neon‑soaked indie universe — handcrafted pixel worlds, synthwave vibes, and arcade‑style chaos.</p>
  <div class="btn-row">
    <a class="btn" href="https://retropiqarcade.org" target="_blank">Visit Retropiq Arcade</a>
    <a class="btn" href="https://retropiq.itch.io" target="_blank">Play My Games</a>
    <a class="btn" href="https://itch.io/blog/1096500/retropiq-made-with-heart" target="_blank">About</a>
  </div>
`;

// ------------------------------
// VIDEOS (YOUTUBE GRID + CATEGORIES)
// ------------------------------
document.getElementById("video").innerHTML = `
  <h2>Videos</h2>
  <p>My favorite uploads, devlogs, and inspirations.</p>

  <div class="category-row">
    <button class="vid-cat" data-cat="devlogs">Devlogs</button>
    <button class="vid-cat" data-cat="trailers">Trailers</button>
    <button class="vid-cat" data-cat="tutorials">Tutorials</button>
    <button class="vid-cat" data-cat="favorites">Favorites</button>
    <button class="vid-cat" data-cat="documentaries">Documentaries</button>
    <button class="vid-cat" data-cat="retro">Retro</button>
    <button class="vid-cat" data-cat="worldcup">World Cup</button>
  </div>

  <div id="videoGrid" class="video-grid"></div>
`;

// Replace these IDs with your real YouTube video IDs
const videoData = {
  devlogs: [
    "48C9hYoLMis",
    "84biRLlHJMk",
    "nczCuD6AuSg",
    "lJHX0xKpJ8A"
  ],
  trailers: [
    "LlK-akKuNx8",
    "D0cTd-27nY0",
    "icDuEHSxE-w",
    "GABVu4w1aaw"
  ],
  tutorials: [
    "K5KVEU3aaeQ",
    "F2Mx-u7auUs",
    "ygXn5nV5qFc",
    "ZZ4B0QUHuNc"
  ],
  favorites: [
    "9JdeZ3I8xw8",
    "s1-pfiVMKAs",
    "aBlsrtxuwss",
    "kH1XlwHQv9o"
  ],
  documentaries: [
    "ND7owjmtPNo",
    "MXXP_xpo0uM",
    "9cOIUH-H_I0",
    "64RSvsnDbwo"
  ],
  retro: [
    "eGIIvR190Jw",
    "1_urrxvQlMw",
    "3Gp87zxi6FY",
    "FWAoaoHDeM0"
  ],
  worldcup: [
    "ynqGWHJPkuQ",
    "fJrctBM0poE",
    "JH_WRKTCPK4",
    "cjsFUxVHAX0"
  ]
};

function renderVideos(category) {
  const grid = document.getElementById("videoGrid");
  grid.innerHTML = "";
  videoData[category].forEach(id => {
    const url = `https://www.youtube.com/watch?v=${id}`;
    grid.innerHTML += `
      <a class="video-thumb" href="${url}" target="_blank">
        <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="Video thumbnail">
      </a>
    `;
  });
}

document.querySelectorAll(".vid-cat").forEach(btn => {
  btn.addEventListener("click", () => renderVideos(btn.dataset.cat));
});

// default category
renderVideos("devlogs");

// ------------------------------
// LEARNING HUB
// ------------------------------
document.getElementById("learning").innerHTML = `
  <h2>Learning Hub</h2>
  <p>Top platforms to level up your data & dev skills.</p>
  <div class="btn-row">
    <a class="btn" href="https://www.coursera.org" target="_blank">Coursera</a>
    <a class="btn" href="https://www.edx.org" target="_blank">edX</a>
    <a class="btn" href="https://www.simplilearn.com" target="_blank">Simplilearn</a>
    <a class="btn" href="https://www.udacity.com" target="_blank">Udacity</a>
    <a class="btn" href="https://www.khanacademy.org" target="_blank">Khan Academy</a>
    <a class="btn" href="https://ocw.mit.edu" target="_blank">MIT OCW</a>
  </div>
`;

// ------------------------------
// SUPPORT (PAYPAL ONLY)
// ------------------------------
document.getElementById("support").innerHTML = `
  <h2>Become a Supporter</h2>
  <p>If you enjoy my work and want to help me keep building neon worlds, you can support me directly.</p>
  <div class="btn-row">
    <a class="btn" href="https://paypal.me/nikkotech26" target="_blank">Support via PayPal</a>
  </div>
`;

// ------------------------------
// ABOUT ME (SOULFUL)
// ------------------------------
document.getElementById("about").innerHTML = `
  <h2>About Me</h2>
  <p>
    I'm Nicholas — an indie game developer, data tinkerer, and neon‑aesthetic addict based in Bucharest.
  </p>
  <p>
    I grew up loving arcades, pixel art, and the feeling of discovering hidden corners of the internet.
    Retropiq Arcade is my way of keeping that magic alive — a place where creativity, nostalgia, and
    experimentation collide.
  </p>
  <p>
    nikko:data:hub is my personal playground. A space where I mix everything I love:
    search engines, open data, charts, maps, indie games, learning, and the raw joy of building things.
  </p>
  <p>
    If you're here, you're already part of the journey. Thanks for exploring my world.
  </p>
`;
