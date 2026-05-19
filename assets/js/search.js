// assets/js/search.js
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const results = document.getElementById("search-results");

  const index = [
    { title: "DataHub Charts", url: "datahub.html", tags: "csv charts data visualization" },
    { title: "Video Library", url: "videos.html", tags: "youtube dailymotion games tutorials" },
    // later: add more internal pages / topics
  ];

  function runSearch() {
    const q = searchInput.value.toLowerCase().trim();
    if (!q) {
      results.innerHTML = "<p>Type something to search.</p>";
      return;
    }
    const hits = index.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.tags.toLowerCase().includes(q)
    );
    if (!hits.length) {
      results.innerHTML = "<p>No results yet. Try another keyword.</p>";
      return;
    }
    results.innerHTML = hits
      .map(
        h => `<article class="result">
          <h3><a href="${h.url}">${h.title}</a></h3>
          <p>${h.tags}</p>
        </article>`
      )
      .join("");
  }

  searchBtn.addEventListener("click", runSearch);
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") runSearch();
  });

  // Chatbot (placeholder)
  const chatLog = document.getElementById("chat-log");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");

  function addMessage(sender, text) {
    const div = document.createElement("div");
    div.className = `chat-msg chat-${sender}`;
    div.textContent = text;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage("user", text);
    chatInput.value = "";

    // later: replace with real API call
    setTimeout(() => {
      addMessage("bot", "NikkoBot: I’ll be smarter soon. For now, try the search or check DataHub/Videos.");
    }, 400);
  }

  chatSend.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });
});
