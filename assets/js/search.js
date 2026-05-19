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
  
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const chatLog  = document.getElementById("chat-log");

let chatHistory = [];

function appendMessage(role, text) {
  const div = document.createElement("div");
  div.className = `chat-msg chat-${role}`;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  appendMessage("user", text);
  chatHistory.push({ role: "user", content: text });
  chatInput.value = "";

  try {
    const res = await fetch("https://YOUR-WORKER-SUBDOMAIN.workers.dev/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory })
    });

    const data = await res.json();
    const reply = data.reply || "No reply received.";
    appendMessage("assistant", reply);
    chatHistory.push({ role: "assistant", content: reply });
  } catch (err) {
    appendMessage("assistant", "NikkoBot hit a glitch in the grid. Try again in a moment.");
    console.error(err);
  }
}

chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
