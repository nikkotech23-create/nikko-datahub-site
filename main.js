document.addEventListener("DOMContentLoaded", () => {
  // Feature card scroll-in animation
  const cards = document.querySelectorAll(".feature-card");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );
  cards.forEach(card => observer.observe(card));

  // Theme toggle
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("ndh-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
    toggle.textContent = savedTheme === "light" ? "🌞" : "🌙";
  } else {
    root.setAttribute("data-theme", "dark");
    toggle.textContent = "🌙";
  }

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("ndh-theme", next);
    toggle.textContent = next === "light" ? "🌞" : "🌙";
  });
});
