// videos.js

const videos = [
  {
    title: "Classic Vanilla Sponge Cake",
    type: "vanilla sponge",
    channel: "YouTube",
    // Use the YouTube embed URL format:
    // https://www.youtube.com/embed/VIDEO_ID
    embed: "https://www.youtube.com/embed/6z8o7qAIlIU",
    notes: "Light, fluffy sponge — great base for any frosting."
  },
  {
    title: "Moist Chocolate Cake (Beginner Friendly)",
    type: "chocolate",
    embed: "https://www.youtube.com/embed/yv0zQv8YFZ8",
    notes: "Rich cocoa flavour + simple method."
  },
  {
    title: "Red Velvet Cake Tutorial",
    type: "red velvet",
    embed: "https://www.youtube.com/embed/vGE-RfP6KRE",
    notes: "Classic red velvet with cream cheese frosting."
  },
  {
    title: "Lemon Drizzle Cake",
    type: "lemon",
    embed: "https://www.youtube.com/embed/2qvRzq8uF5k",
    notes: "Tangy glaze + soft crumb."
  },
  {
    title: "Carrot Cake with Cream Cheese Frosting",
    type: "carrot",
    embed: "https://www.youtube.com/embed/1eE5PZPzZ_Q",
    notes: "Spiced, cozy, and super moist."
  },
  {
    title: "Cheesecake (Baked) — Step-by-step",
    type: "cheesecake",
    embed: "https://www.youtube.com/embed/4jK4yV8dHkE",
    notes: "Silky baked cheesecake with an even top."
  },
  {
    title: "Black Forest Cake (Layering + Decor)",
    type: "black forest",
    embed: "https://www.youtube.com/embed/4oZr3zYxK40",
    notes: "Chocolate layers + cherries + cream."
  },
  {
    title: "Funfetti Birthday Cake",
    type: "birthday funfetti",
    embed: "https://www.youtube.com/embed/Vp8sR0s9KJ0",
    notes: "Sprinkles everywhere. Party energy."
  }
];

// Elements
const grid = document.getElementById("videoGrid");
const search = document.getElementById("vidSearch");
const noVideos = document.getElementById("noVideos");
const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");

function render(list) {
  grid.innerHTML = "";

  if (!list.length) {
    noVideos.style.display = "block";
    return;
  }
  noVideos.style.display = "none";

  list.forEach(v => {
    const card = document.createElement("article");
    card.className = "video-card";

    card.innerHTML = `
      <div class="video-frame">
        <iframe
          src="${v.embed}"
          title="${escapeHtml(v.title)}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      <div class="video-body">
        <h3>${escapeHtml(v.title)}</h3>
        <div class="meta">
          <div><strong>Type:</strong> ${escapeHtml(v.type)}</div>
          <div style="margin-top:4px;">${escapeHtml(v.notes)}</div>
        </div>

        <div class="actions">
          <a class="smallbtn" href="${v.embed.replace('/embed/', '/watch?v=')}" target="_blank" rel="noopener">
            Open on YouTube
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function filterVideos(q) {
  const query = q.trim().toLowerCase();
  if (!query) return videos;

  return videos.filter(v => {
    return (
      v.title.toLowerCase().includes(query) ||
      v.type.toLowerCase().includes(query) ||
      (v.notes && v.notes.toLowerCase().includes(query))
    );
  });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Events
search.addEventListener("input", (e) => {
  render(filterVideos(e.target.value));
});

shuffleBtn.addEventListener("click", () => {
  const list = filterVideos(search.value);
  if (!list.length) return;

  const pick = list[Math.floor(Math.random() * list.length)];
  render([pick]);

  // Scroll to grid so the user sees it immediately
  grid.scrollIntoView({ behavior: "smooth", block: "start" });
});

resetBtn.addEventListener("click", () => {
  search.value = "";
  render(videos);
});

// Initial
render(videos);


