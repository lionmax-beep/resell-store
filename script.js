const WHATSAPP="94774662049";

const defaultProducts=[
  {id:1,n:"Galaxy A16 5G",c:"Phones",p:58900,o:62900,i:"📱"},
  {id:2,n:"Redmi Note Series",c:"Phones",p:49900,o:53900,i:"📲"},
  {id:3,n:"Wireless Headphones",c:"Gadgets",p:7900,o:9500,i:"🎧"},
  {id:4,n:"Smart Watch Pro",c:"Gadgets",p:12500,o:14900,i:"⌚"},
  {id:5,n:"Gaming Mouse",c:"Gadgets",p:4800,o:5500,i:"🖱️"},
  {id:6,n:"USB-C Fast Charger",c:"Gadgets",p:3500,o:4200,i:"🔌"},
  {id:7,n:"Premium Hoodie",c:"Fashion",p:6500,o:8000,i:"🧥"},
  {id:8,n:"Urban Sneakers",c:"Fashion",p:9900,o:11500,i:"👟"}
];

let products=loadProducts();
let cat="All";
let cart=loadCart();

function loadProducts(){
  try{
    const saved=localStorage.getItem("lionStoreProducts");
    return saved ? JSON.parse(saved) : [...defaultProducts];
  }catch(e){ return [...defaultProducts]; }
}
function loadCart(){
  try{
    const saved=localStorage.getItem("resellxCart");
    return saved ? JSON.parse(saved) : [];
  }catch(e){ return []; }
}
function money(n){return "Rs. "+Number(n||0).toLocaleString("en-LK");}

function saveProducts(){localStorage.setItem("lionStoreProducts",JSON.stringify(products));}
function saveCart(){localStorage.setItem("resellxCart",JSON.stringify(cart));}

function setCategory(category,button){
  cat=category;
  document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
  if(button) button.classList.add("active");
  else document.querySelectorAll(".filters button").forEach(b=>{
    if(b.textContent.trim()===category)b.classList.add("active");
  });
  render();
}

function render(){
  const search=document.getElementById("search");
  const q=search ? search.value.trim().toLowerCase() : "";
  const list=products.filter(p=>{
    const categoryOK=cat==="All" || p.c===cat;
    const searchOK=!q || p.n.toLowerCase().includes(q) || p.c.toLowerCase().includes(q);
    return categoryOK && searchOK;
  });

  const grid=document.getElementById("grid");
  if(grid){
    grid.innerHTML=list.length ? list.map(p=>`
      <article class="card">
        <div class="pic">${p.i}</div>
        <div class="info">
          <small>${p.c.toUpperCase()}</small>
          <h3>${escapeHtml(p.n)}</h3>
          <div class="price">${money(p.p)} <span class="old">${money(p.o)}</span></div>
          <button class="add" onclick="add(${p.id})">Add to Cart +</button>
        </div>
      </article>`).join("") : '<div class="notfound">No products found.</div>';
  }
  renderCart();
  renderDashboard();
  renderAdminProducts();
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}

function add(id){
  const p=products.find(x=>x.id===id);
  if(!p)return;
  const item=cart.find(x=>x.id===id);
  if(item)item.q++;
  else cart.push({...p,q:1});
  saveCart();
  renderCart();
  openCart();
}

function remove(id){
  cart=cart.filter(x=>x.id!==id);
  saveCart();
  renderCart();
  renderDashboard();
}

function renderCart(){
  const box=document.getElementById("items");
  const count=cart.reduce((a,x)=>a+x.q,0);
  const total=cart.reduce((a,x)=>a+x.p*x.q,0);
  const countEl=document.getElementById("count");
  const totalEl=document.getElementById("total");
  if(countEl)countEl.textContent=count;
  if(totalEl)totalEl.textContent=money(total);
  if(box){
    box.innerHTML=cart.length ? cart.map(x=>`
      <div class="cartItem">
        <div><b>${x.i} ${escapeHtml(x.n)}</b><br><small>${x.q} × ${money(x.p)}</small></div>
        <button class="remove" onclick="remove(${x.id})">Remove</button>
      </div>`).join("") : '<div class="empty">Your cart is empty.</div>';
  }
}

function openCart(){
  document.getElementById("cart")?.classList.add("open");
  document.getElementById("overlay")?.classList.add("show");
}
function closeCart(){
  document.getElementById("cart")?.classList.remove("open");
  document.getElementById("overlay")?.classList.remove("show");
}

function orderWhatsApp(){
  if(!cart.length){alert("Your cart is empty.");return;}
  const lines=cart.map(x=>`• ${x.n} x${x.q} - ${money(x.p*x.q)}`).join("%0A");
  const total=money(cart.reduce((a,x)=>a+x.p*x.q,0));
  const text=`Hello Lion Store! I want to order:%0A${lines}%0A%0ATotal: ${total}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${text}`,"_blank");
}

function addProduct(event){
  event.preventDefault();
  const name=document.getElementById("productName").value.trim();
  const category=document.getElementById("productCategory").value;
  const price=Number(document.getElementById("productPrice").value);
  const oldPrice=Number(document.getElementById("productOldPrice").value)||price;
  const icon=document.getElementById("productIcon").value.trim()||"🛍️";

  if(!name || !Number.isFinite(price) || price<0){
    alert("Please enter a product name and valid price.");
    return;
  }

  products.push({id:Date.now(),n:name,c:category,p:price,o:oldPrice,i:icon});
  saveProducts();
  document.getElementById("productForm").reset();
  render();
  alert("Product added successfully!");
}

function deleteProduct(id){
  products=products.filter(p=>p.id!==id);
  cart=cart.filter(x=>products.some(p=>p.id===x.id));
  saveProducts();
  saveCart();
  render();
}

function resetProducts(){
  if(!confirm("Reset products to the original demo products?"))return;
  products=[...defaultProducts];
  cart=[];
  saveProducts();
  saveCart();
  render();
}

function renderDashboard(){
  const productsEl=document.getElementById("statProducts");
  if(!productsEl)return;
  const stockEl=document.getElementById("statStock");
  const valueEl=document.getElementById("statValue");
  const cartEl=document.getElementById("statCart");
  productsEl.textContent=products.length;
  stockEl.textContent=products.length;
  valueEl.textContent=money(products.reduce((sum,p)=>sum+p.p,0));
  cartEl.textContent=cart.reduce((sum,x)=>sum+x.q,0);
}

function renderAdminProducts(){
  const box=document.getElementById("adminProducts");
  if(!box)return;
  box.innerHTML=products.length ? products.map(p=>`
    <div class="dataItem">
      <div class="dataInfo">
        <span class="dataIcon">${p.i}</span>
        <div><b>${escapeHtml(p.n)}</b><small>${p.c} • ${money(p.p)}</small></div>
      </div>
      <button class="deleteProduct" onclick="deleteProduct(${p.id})">Delete</button>
    </div>`).join("") : '<div class="noData">No products added yet.</div>';
}

document.addEventListener("DOMContentLoaded",()=>{
  const search=document.getElementById("search");
  if(search){
    search.addEventListener("input",render);
    search.addEventListener("search",render);
  }
  render();
});
