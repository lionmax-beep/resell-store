const WHATSAPP="94774662049";
const products=[
{id:1,n:"Galaxy A16 5G",c:"Phones",p:58900,o:62900,i:"📱"},
{id:2,n:"Redmi Note Series",c:"Phones",p:49900,o:53900,i:"📲"},
{id:3,n:"Wireless Headphones",c:"Gadgets",p:7900,o:9500,i:"🎧"},
{id:4,n:"Smart Watch Pro",c:"Gadgets",p:12500,o:14900,i:"⌚"},
{id:5,n:"Gaming Mouse",c:"Gadgets",p:4800,o:5500,i:"🖱️"},
{id:6,n:"USB-C Fast Charger",c:"Gadgets",p:3500,o:4200,i:"🔌"},
{id:7,n:"Premium Hoodie",c:"Fashion",p:6500,o:8000,i:"🧥"},
{id:8,n:"Urban Sneakers",c:"Fashion",p:9900,o:11500,i:"👟"}];
let cat="All",cart=JSON.parse(localStorage.getItem("resellxCart")||"[]");
const money=n=>"Rs. "+n.toLocaleString("en-LK");

function setCategory(x,btn){
  cat=x;
  document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
  if(btn)btn.classList.add("active");
  else document.querySelectorAll(".filters button").forEach(b=>{if(b.textContent===x)b.classList.add("active")});
  render();
  if(location.hash!=="#products")document.getElementById("products").scrollIntoView({behavior:"smooth"});
}
function render(){
  const q=(document.getElementById("search").value||"").toLowerCase();
  const list=products.filter(p=>(cat==="All"||p.c===cat)&&p.n.toLowerCase().includes(q));
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
  box.innerHTML=cart.length?cart.map(x=>`<div class="cartItem"><div><b>${x.i} ${x.n}</b><br><small>${x.q} × ${money(x.p)}</small></div><button class="remove" onclick="remove(${x.id})">Remove</button></div>`).join(""):'<div class="empty">Your cart is empty.</div>';
}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("show");}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("show");}
function orderWhatsApp(){
  if(!cart.length){alert("Your cart is empty.");return}
  let text="Hello Lion Store! I want to order:%0A"+cart.map(x=>`• ${x.n} x${x.q} - ${money(x.p*x.q)}`).join("%0A")+`%0A%0ATotal: ${money(cart.reduce((a,x)=>a+x.p*x.q,0))}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${text}`,"_blank");
}
render();