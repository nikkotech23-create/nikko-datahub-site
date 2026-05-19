// assets/js/videos.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("video-grid");
  const filters = document.querySelectorAll(".filter");

  const videos = [
    {
      title: "Intro to Data Visualization",
      platform: "YouTube",
      category: "data",
      url: "https://www.youtube.com/watch?v=XXXXXXX",
    },
    {
      title: "Python for Games – Basics",
      platform: "YouTube",
      category: "games",
      url: "https://www.youtube.com/watch?v=YYYYYYY",
    },
    {
      title: "Linux Tips for Developers",
      platform: "Dailymotion",
      category: "computing",
      url: "https://www.dailymotion.com/video/ZZZZZZZ",
    },
    // add more as you upload
  ];

  function render(filter = "all") {
    grid.innerHTML = "";
    videos
      .filter(v => filter === "all" || v.category === filter)
      .forEach(v => {
        const card = document.createElement("article");
        card.className = "video-card";
        card.innerHTML = `
          <h3>${v.title}</h3>
          <p>${v.platform} · ${v.category}</p>
          <a href="${v.url}" target="_blank" rel="noopener">Watch</a>
        `;
        grid.appendChild(card);
      });
  }

  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter);
    });
  });

  render();
});
