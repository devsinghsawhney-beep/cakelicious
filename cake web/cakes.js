// cake data (includes chocolate cake + others)
const cakes = [
  {
    id: "velvet",
    name: "Velvet Strawberry Cake",
    origin: "19th-century America",
    flavour: "Cocoa, vanilla, strawberry",
    vibe: "Romantic celebrations",
    img: "https://img.freepik.com/premium-photo/red-velvet-cake-with-strawberries-cream-drizzled-top_882444-5.jpg?w=2000",
    link: "https://en.wikipedia.org/wiki/Red_velvet_cake",
    story: "A twist on classic red velvet—cocoa richness with strawberry brightness. The old buttermilk/vinegar trick helped lift and soften early cocoa cakes, and later bakers leaned into fruit for a fresher slice."
  },
  {
    id: "chocolate",
    name: "Chocolate Cake",
    origin: "Central America to Europe",
    flavour: "Deep cocoa, sweet richness",
    vibe: "Ultimate comfort cake",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1600&q=60",
    link: "https://en.wikipedia.org/wiki/Chocolate_cake",
    story: "Cacao starts as a bitter drink in Mesoamerica, then gets sweetened and transformed in Europe. Modern cocoa powder and baking methods turned it into a forever-classic cake."
  },
  {
    id: "vanilla",
    name: "Classic Vanilla Cake",
    origin: "Vanilla from orchids",
    flavour: "Soft, buttery, aromatic",
    vibe: "Elegant and simple",
    img: "https://images.unsplash.com/photo-1547414368-ac947d00b91d?auto=format&fit=crop&w=1600&q=60",
    link: "https://en.wikipedia.org/wiki/Vanilla_cake",
    story: "Vanilla became the backbone of celebrations: light sponge, gentle aroma, easy to layer and decorate. It’s the default cake for a reason."
  },
  {
    id: "lemon",
    name: "Lemon Blueberry Cake",
    origin: "Modern patisserie twist",
    flavour: "Citrus, berry, freshness",
    vibe: "Bright and summery",
    img: "https://images.unsplash.com/photo-1541976844346-f18aeac57b06?auto=format&fit=crop&w=1600&q=60",
    link: "https://en.wikipedia.org/wiki/Blueberry",
    story: "Lemon and blueberry is the clean, bright combo people come back to. Usually finished with a quick glaze or a tangy frosting."
  },
  {
    id: "blackforest",
    name: "Black Forest Cake",
    origin: "Black Forest, Germany",
    flavour: "Chocolate, cherry, cream",
    vibe: "Festive and decadent",
    img: "https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=1600&q=60",
    link: "https://en.wikipedia.org/wiki/Black_Forest_gateau",
    story: "Chocolate sponge, cherries, whipped cream—sometimes a splash of kirsch. Rich, but still airy if it’s made well."
  },
  {
    id: "carrot",
    name: "Carrot Walnut Cake",
    origin: "Home-style baking",
    flavour: "Spiced, nutty, sweet",
    vibe: "Comfort dessert",
    img: "https://images.unsplash.com/photo-1614707267537-2b7b8f4f46de?auto=format&fit=crop&w=1600&q=60",
    link: "https://en.wikipedia.org/wiki/Carrot_cake",
    story: "Carrots keep it moist, spices do the heavy lifting, walnuts add crunch. Cream cheese frosting is basically non-negotiable."
  }
];

// local storage keys (so it saves favs)
const LS_FAVS = "cake_favs_plain";

function loadFavs(){
  try{
    const raw = localStorage.getItem(LS_FAVS);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  }catch{
    return new Set();
  }
}

function saveFavs(favs){
  localStorage.setItem(LS_FAVS, JSON.stringify(Array.from(favs)));
}

const state = {
  q: "",
  favs: loadFavs(),
  activeId: null
};

// dom
const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const search = document.getElementById("search");
const randomBtn = document.getElementById("randomBtn");
const clearBtn = document.getElementById("clearBtn");

// modal dom
const backdrop = document.getElementById("backdrop");
const mImg = document.getElementById("mImg");
const mTitle = document.getElementById("mTitle");
const mMeta = document.getElementById("mMeta");
const mStory = document.getElementById("mStory");
const mFav = document.getElementById("mFav");
const mLink = document.getElementById("mLink");
const mClose = document.getElementById("mClose");

function render(){
  const q = state.q.trim().toLowerCase();

  const list = cakes.filter(c => {
    const hay = (c.name + " " + c.origin + " " + c.flavour + " " + c.vibe + " " + c.story).toLowerCase();
    return q === "" ? true : hay.includes(q);
  });

  grid.innerHTML = list.map(c => {
    const fav = state.favs.has(c.id);

    return `
      <article class="card">
        <img src="${c.img}" alt="${c.name}" loading="lazy">
        <div class="card-body">
          <h3>${c.name}</h3>
          <div class="meta">${c.origin} • ${c.flavour}</div>
          <div class="meta" style="margin-top:8px">${c.story.slice(0, 120)}...</div>

          <div class="actions">
            <button class="smallbtn" onclick="openModal('${c.id}')">View</button>
            <button class="smallbtn ${fav ? "fav" : ""}" onclick="toggleFav('${c.id}')">
              ${fav ? "Unfavourite" : "Favourite"}
            </button>
            <a class="smallbtn" href="${c.link}" target="_blank" rel="noopener">Learn</a>
          </div>
        </div>
      </article>
    `;
  }).join("");

  empty.style.display = list.length ? "none" : "block";
}

window.toggleFav = function(id){
  if(state.favs.has(id)) state.favs.delete(id);
  else state.favs.add(id);
  saveFavs(state.favs);
  render();

  if(state.activeId === id){
    mFav.textContent = state.favs.has(id) ? "Unfavourite" : "Favourite";
  }
}

window.openModal = function(id){
  const c = cakes.find(x => x.id === id);
  if(!c) return;

  state.activeId = id;

  mImg.innerHTML = `<img src="${c.img}" alt="${c.name}">`;
  mTitle.textContent = c.name;
  mMeta.textContent = c.origin + " • " + c.flavour + " • " + c.vibe;
  mStory.textContent = c.story;
  mLink.href = c.link;
  mFav.textContent = state.favs.has(id) ? "Unfavourite" : "Favourite";

  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  backdrop.classList.remove("open");
  document.body.style.overflow = "";
  state.activeId = null;
}

mClose.addEventListener("click", closeModal);
backdrop.addEventListener("click", (e) => { if(e.target === backdrop) closeModal(); });
window.addEventListener("keydown", (e) => { if(e.key === "Escape") closeModal(); });

mFav.addEventListener("click", () => {
  if(!state.activeId) return;
  toggleFav(state.activeId);
});

search.addEventListener("input", () => {
  state.q = search.value;
  render();
});

randomBtn.addEventListener("click", () => {
  const pick = cakes[Math.floor(Math.random() * cakes.length)];
  openModal(pick.id);
});

clearBtn.addEventListener("click", () => {
  state.q = "";
  search.value = "";
  render();
});

render();
