// assets/js/videos.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("video-grid");
  const filters = document.querySelectorAll(".filter");

  const videos = [
    {
      title: "Web Apps with Python",
      platform: "YouTube",
      category: "data",
      url: "https://www.youtube.com/watch?v=ZZ4B0QUHuNc&list=PLtqF5YXg7GLmCvTswG32NqQypOuYkPRUE",
    },
    {
      title: "Skyburst Force - Gameplay",
      platform: "YouTube",
      category: "games",
      url: "https://www.youtube.com/watch?v=A1ohOPzs84w",
    },
    {
      title: "Python Games - Basics",
      platform: "Youtube",
      category: "games",
      url: "https://www.youtube.com/watch?v=wRiCKCdnLHY&list=PLCC34OHNcOtpOG96Uwh3VGkmpZ7qTB5dx",
    },
    {
      title: "Linux for gaming in 2026",
      platform: "Youtube",
      category: "games",
      url: "https://www.youtube.com/watch?v=kUEUzJ1gU9E"
    },
    {
      title: "AI, ML, Gen AI",
      platform: "Youtube",
      category: "computing",
      url: "https://www.youtube.com/watch?v=qYNweeDHiyU"
    },
    {
      title: "Data Science Course 2026",
      platform: "Youtube",
      category: "data",
      url: "https://www.youtube.com/watch?v=QISvmiwOIYI"
    },
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
