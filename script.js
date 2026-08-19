const WHATSAPP="94774662049";
const defaultProducts=[
{id:1,n:"Galaxy A16 5G",c:"Phones",p:58900,o:62900,i:"📱"},
{id:2,n:"Redmi Note Series",c:"Phones",p:49900,o:53900,i:"📲"},
{id:3,n:"Wireless Headphones",c:"Gadgets",p:7900,o:9500,i:"🎧"},
{id:4,n:"Smart Watch Pro",c:"Gadgets",p:12500,o:14900,i:"⌚"},
{id:5,n:"Gaming Mouse",c:"Gadgets",p:4800,o:5500,i:"🖱️"},
{id:6,n:"USB-C Fast Charger",c:"Gadgets",p:3500,o:4200,i:"🔌"},
{id:7,n:"Premium Hoodie",c:"Fashion",p:6500,o:8000,i:"🧥"},
{id:8,n:"Urban Sneakers",c:"Fashion",p:9900,o:11500,i:"👟"}];
let products=JSON.parse(localStorage.getItem("lionStoreProducts")||"null")||defaultProducts;

let cat="All",cart=JSON.parse(localStorage.getItem("resellxCart")||"[]");
const money=n=>"Rs. "+n.toLocaleString("en-LK");

function setCategory(x,btn){
  cat=x;
  document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
  if(btn)btn.classList.add("active");
  else document.querySelectorAll(".filters button").forEach(b=>{if(b.textContent===x)b.classList.add("active")});
  render();
renderAdminProducts();
  if(location.hash!=="#products")document.getElementById("products").scrollIntoView({behavior:"smooth"});
}
function render(){
  const searchBox=document.getElementById("search");
  const q=(searchBox ? searchBox.value : "").trim().toLowerCase();
  const list=products.filter(p=>(cat==="All"||p.c===cat)&&(
    p.n.toLowerCase().includes(q) ||
    p.c.toLowerCase().includes(q)
  ));
  document.getElementById("grid").innerHTML=list.length?list.map(p=>`
  <article class="card"><div class="pic">${p.i}</div><div class="info"><small>${p.c.toUpperCase()}</small><h3>${p.n}</h3>
  <div class="price">${money(p.p)} <span class="old">${money(p.o)}</span></div>
  <button class="add" onclick="add(${p.id})">Add to Cart +</button></div></article>`).join(""):'<div class="notfound">No products found.</div>';
  renderCart();
}
function add(id){let p=products.find(x=>x.id===id),x=cart.find(x=>x.id===id);x?x.q++:cart.push({...p,q:1});save();openCart();}
function remove(id){cart=cart.filter(x=>x.id!==id);save();}
function save(){localStorage.setItem("resellxCart",JSON.stringify(cart));renderCart();}
function renderCart(){
  let box=document.getElementById("items"),count=cart.reduce((a,x)=>a+x.q,0),total=cart.reduce((a,x)=>a+x.p*x.q,0);
  document.getElementById("count").textContent=count;document.getElementById("total").textContent=money(total);
  renderDashboard();
  box.innerHTML=cart.length?cart.map(x=>`<div class="cartItem"><div><b>${x.i} ${x.n}</b><br><small>${x.q} × ${money(x.p)}</small></div><button class="remove" onclick="remove(${x.id})">Remove</button></div>`).join(""):'<div class="empty">Your cart is empty.</div>';
}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("show");}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("show");}
function orderWhatsApp(){
  if(!cart.length){alert("Your cart is empty.");return}
  let text="Hello Lion Store! I want to order:%0A"+cart.map(x=>`• ${x.n} x${x.q} - ${money(x.p*x.q)}`).join("%0A")+`%0A%0ATotal: ${money(cart.reduce((a,x)=>a+x.p*x.q,0))}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${text}`,"_blank");
}

function saveProducts(){
  localStorage.setItem("lionStoreProducts",JSON.stringify(products));
}
function addProduct(event){
  event.preventDefault();
  const name=document.getElementById("productName").value.trim();
  const category=document.getElementById("productCategory").value;
  const price=Number(document.getElementById("productPrice").value);
  const oldPrice=Number(document.getElementById("productOldPrice").value)||price;
  const icon=document.getElementById("productIcon").value.trim()||"🛍️";
  if(!name||price<0)return;
  products.push({id:Date.now(),n:name,c:category,p:price,o:oldPrice,i:icon});
  saveProducts();
  document.getElementById("productForm").reset();
  render();
  renderAdminProducts();
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
}
function deleteProduct(id){
  products=products.filter(p=>p.id!==id);
  saveProducts();
  cart=cart.filter(x=>products.some(p=>p.id===x.id));
  save();
  renderAdminProducts();
  render();
}
function resetProducts(){
  if(confirm("Reset all products to the original default products?")){
    products=[...defaultProducts];
    saveProducts();
    cart=[];
    save();
    renderAdminProducts();
    render();
  }
}
function renderDashboard(){
  const productStat=document.getElementById("statProducts");
  const stockStat=document.getElementById("statStock");
  const valueStat=document.getElementById("statValue");
  const cartStat=document.getElementById("statCart");
  if(!productStat)return;
  productStat.textContent=products.length;
  stockStat.textContent=products.length;
  valueStat.textContent=money(products.reduce((sum,p)=>sum+p.p,0));
  cartStat.textContent=cart.reduce((sum,x)=>sum+x.q,0);
}
function renderAdminProducts(){
  const box=document.getElementById("adminProducts");
  if(!box)return;
  box.innerHTML=products.length?products.map(p=>`
    <div class="dataItem">
      <div class="dataInfo">
        <span class="dataIcon">${p.i}</span>
        <div><b>${p.n}</b><small>${p.c} • ${money(p.p)}</small></div>
      </div>
      <button class="deleteProduct" onclick="deleteProduct(${p.id})">Delete</button>
    </div>
  `).join(""):'<div class="noData">No products added yet.</div>';
}

const searchBox=document.getElementById("search");
if(searchBox){
  searchBox.addEventListener("input", render);
  searchBox.addEventListener("search", render);
}
render();
