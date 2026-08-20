/* Lion Store V8.4.1 - three-dot menu */
const defaultCategories = [
  {id:"phones",name:"Phones",icon:"📱",description:"Smartphones"},
  {id:"gadgets",name:"Gadgets",icon:"🎧",description:"Accessories"},
  {id:"fashion",name:"Fashion",icon:"👕",description:"New styles"},
  {id:"accessories",name:"Accessories",icon:"⌚",description:"Useful extras"}
];

const defaultMenu = [
  {id:"home",label:"Home",icon:"🏠",href:"index.html",enabled:true},
  {id:"products",label:"Products",icon:"🛍️",href:"products.html",enabled:true},
  {id:"contact",label:"Contact",icon:"💬",href:"index.html#contact",enabled:true}
];

function menuDefaults() {
  return { categories: defaultCategories.slice(), links: defaultMenu.slice() };
}

async function loadMenu() {
  let categories = defaultCategories.slice();
  let links = defaultMenu.slice();
  try {
    const [cSnap, mSnap] = await Promise.all([
      db.ref("settings/categories").once("value"),
      db.ref("settings/menu").once("value")
    ]);
    if (cSnap.exists()) {
      const value = cSnap.val() || {};
      categories = Object.entries(value)
        .map(([id,v]) => ({id, ...(v || {})}))
        .filter(x => x.enabled !== false && x.name);
    }
    if (mSnap.exists()) {
      const value = mSnap.val() || {};
      links = Object.entries(value)
        .map(([id,v]) => ({id, ...(v || {})}))
        .filter(x => x.enabled !== false && x.label && x.href);
    }
  } catch (err) {
    console.warn("Menu settings unavailable; using defaults.", err);
  }

  const catEl = document.getElementById("menuCategories");
  if (catEl) {
    catEl.innerHTML = categories.map(c =>
      `<a class="menuItem" href="products.html?cat=${encodeURIComponent(c.name)}" onclick="toggleMenu()">` +
      `<span class="menuIcon">${esc(c.icon || "📂")}</span><span class="menuLabel">${esc(c.name)}</span><b>›</b></a>`
    ).join("");
  }

  const linkEl = document.getElementById("menuLinks");
  if (linkEl) {
    linkEl.innerHTML = links.map(x =>
      `<a class="menuItem" href="${esc(x.href || "#")}" onclick="toggleMenu()">` +
      `<span class="menuIcon">${esc(x.icon || "•")}</span><span class="menuLabel">${esc(x.label)}</span><b>›</b></a>`
    ).join("");
  }
}

function toggleMenu(force) {
  const panel = document.getElementById("sideMenu");
  const shade = document.getElementById("menuShade");
  if (!panel) return;
  const open = typeof force === "boolean" ? force : !panel.classList.contains("open");
  panel.classList.toggle("open", open);
  if (shade) shade.classList.toggle("show", open);
  document.body.classList.toggle("menuOpen", open);
}

function closeMenu() { toggleMenu(false); }

document.addEventListener("DOMContentLoaded", loadMenu);
