const products = [
  {id:1,name:"Galaxy A16 5G",cat:"Phones",price:58900,old:62900,icon:"📱"},
  {id:2,name:"Wireless Headphones",cat:"Gadgets",price:7900,old:9500,icon:"🎧"},
  {id:3,name:"Smart Watch Pro",cat:"Gadgets",price:12500,old:14900,icon:"⌚"},
  {id:4,name:"Premium Hoodie",cat:"Fashion",price:6500,old:8000,icon:"🧥"},
  {id:5,name:"Redmi Note Series",cat:"Phones",price:49900,old:53900,icon:"📲"},
  {id:6,name:"Gaming Mouse",cat:"Gadgets",price:4800,old:5500,icon:"🖱️"},
  {id:7,name:"Urban Sneakers",cat:"Fashion",price:9900,old:11500,icon:"👟"},
  {id:8,name:"USB-C Fast Charger",cat:"Gadgets",price:3500,old:4200,icon:"🔌"}
];

let cart = JSON.parse(localStorage.getItem("resellCart") || "[]");

function money(n){ return "Rs. " + n.toLocaleString("en-LK"); }

function renderProducts(list=products){
  document.getElementById("productGrid").innerHTML = list.map(p => `
    <article class="product">
      <div class="product-img">${p.icon}</div>
      <div class="product-info">
        <small>${p.cat}</small>
        <h3>${p.name}</h3>
        <div class="price">${money(p.price)} <span class="old">${money(p.old)}</span></div>
        <button class="add" onclick="addToCart(${p.id})">Add to Cart +</button>
      </div>
    </article>`).join("");
}

function filterProducts(cat, btn){
  const list = cat === "All" ? products : products.filter(p => p.cat === cat);
  renderProducts(list);
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  if(btn) btn.classList.add("active");
}

function addToCart(id){
  const p = products.find(x => x.id === id);
  const item = cart.find(x => x.id === id);
  if(item) item.qty++;
  else cart.push({...p, qty:1});
  saveCart();
  toggleCart(true);
}

function removeFromCart(id){
  cart = cart.filter(x => x.id !== id);
  saveCart();
}

function saveCart(){
  localStorage.setItem("resellCart", JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const box = document.getElementById("cartItems");
  const count = cart.reduce((a,x)=>a+x.qty,0);
  const total = cart.reduce((a,x)=>a+x.price*x.qty,0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = money(total);
  box.innerHTML = cart.length ? cart.map(x => `
    <div class="cart-item">
      <div><b>${x.icon} ${x.name}</b><br><small>${x.qty} × ${money(x.price)}</small></div>
      <button class="remove" onclick="removeFromCart(${x.id})">Remove</button>
    </div>`).join("") : '<div class="empty">Your cart is empty.</div>';
}

function toggleCart(force){
  const panel=document.getElementById("cartPanel"), overlay=document.getElementById("overlay");
  const open = force === true ? true : !panel.classList.contains("open");
  panel.classList.toggle("open",open); overlay.classList.toggle("show",open);
}

function checkout(){
  if(!cart.length) return alert("Your cart is empty.");
  alert("Demo checkout: connect this button to WhatsApp, Google Forms, or your own backend.");
}

renderProducts();
renderCart();
