const WHATSAPP="94774662049";
const firebaseConfig={
apiKey:"AIzaSyDy2Ljwj7hg1tsopcC39gvhngxwnVorNtU",
authDomain:"lion-store-f2c4a.firebaseapp.com",
projectId:"lion-store-f2c4a",
storageBucket:"lion-store-f2c4a.firebasestorage.app",
messagingSenderId:"37752415149",
appId:"1:37752415149:web:83fb03e7265db23e00f724",
measurementId:"G-S3SDFPPS5K",
databaseURL:"https://lion-store-f2c4a-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(firebaseConfig);
const db=firebase.database();
let products=[],cat="All",cart=JSON.parse(localStorage.getItem("resellxCart")||"[]");
const money=n=>"Rs. "+Number(n||0).toLocaleString("en-LK");
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
function setStatus(t,ok=false){const e=document.getElementById("dbStatus");e.textContent=t;e.className="status "+(ok?"ok":"");}
db.ref("products").on("value",snap=>{
 const data=snap.val()||{}; products=Object.entries(data).map(([id,p])=>({id,...p}));
 setStatus(`Connected • ${products.length} product${products.length===1?"":"s"}`,true); render(); renderAdminProducts();
},err=>setStatus("Database connection failed: "+err.message));
function setCategory(x,btn){cat=x;document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));if(btn)btn.classList.add("active");render();}
function render(){
 const q=(document.getElementById("search").value||"").toLowerCase();
 const list=products.filter(p=>(cat==="All"||p.c===cat)&&(`${p.n||""} ${p.c||""}`).toLowerCase().includes(q));
 document.getElementById("grid").innerHTML=list.length?list.map(p=>`<article class="card"><div class="pic">${p.img?`<img src="${esc(p.img)}" alt="${esc(p.n)}">`:esc(p.i||"🛍️")}</div><div class="info"><small>${esc(p.c)}</small><h3>${esc(p.n)}</h3><div class="price">${money(p.p)} <span class="old">${money(p.o||p.p)}</span></div><button class="add" onclick="add('${esc(p.id)}')">Add to Cart +</button></div></article>`).join(""):'<div class="notfound">No products found.</div>';
 renderCart();
}
async function addProduct(e){
 e.preventDefault();
 const price=Number(productPrice.value);
 const p={n:productName.value.trim(),c:productCategory.value,p:price,o:Number(productOldPrice.value)||price,i:productIcon.value.trim()||"🛍️",img:productImage.value.trim(),createdAt:Date.now()};
 try{await db.ref("products").push(p);e.target.reset();alert("Product saved to Firebase.");}catch(err){alert("Could not save: "+err.message);}
}
async function deleteProduct(id){if(!confirm("Delete this product?"))return;try{await db.ref("products/"+id).remove();}catch(e){alert(e.message);}}
function renderAdminProducts(){const b=document.getElementById("adminProducts");if(!b)return;b.innerHTML=products.length?products.map(p=>`<div class="dataRow"><span>${p.img?`<img src="${esc(p.img)}" alt="">`:esc(p.i||"🛍️")} <b>${esc(p.n)}</b><small>${esc(p.c)} • ${money(p.p)}</small></span><button class="remove" onclick="deleteProduct('${esc(p.id)}')">Delete</button></div>`).join(""):"No products yet.";}
async function addStoreData(e){e.preventDefault();const key=dataKey.value.trim(),value=dataValue.value.trim();if(!key||!value)return;const safe=key.replace(/[.#$[\]/]/g,"_");try{await db.ref("storeData/"+safe).set({name:key,value,updatedAt:Date.now()});e.target.reset();}catch(err){alert("Could not save: "+err.message);}}
db.ref("storeData").on("value",snap=>{const d=snap.val()||{};document.getElementById("storeDataList").innerHTML=Object.entries(d).map(([k,v])=>`<div class="dataRow"><span><b>${esc(v.name||k)}</b><small>${esc(v.value)}</small></span></div>`).join("")||"No store data yet.";});
function add(id){let p=products.find(x=>x.id===id),x=cart.find(x=>x.id===id);if(!p)return;x?x.q++:cart.push({...p,q:1});save();openCart();}
function remove(id){cart=cart.filter(x=>x.id!==id);save();}
function save(){localStorage.setItem("resellxCart",JSON.stringify(cart));renderCart();}
function renderCart(){let box=document.getElementById("items"),count=cart.reduce((a,x)=>a+x.q,0),total=cart.reduce((a,x)=>a+x.p*x.q,0);document.getElementById("count").textContent=count;document.getElementById("total").textContent=money(total);box.innerHTML=cart.length?cart.map(x=>`<div class="cartItem"><div><b>${esc(x.i||"🛍️")} ${esc(x.n)}</b><br><small>${x.q} × ${money(x.p)}</small></div><button class="remove" onclick="remove('${esc(x.id)}')">Remove</button></div>`).join(""):'<div class="empty">Your cart is empty.</div>';}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("show");}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("show");}
function orderWhatsApp(){if(!cart.length){alert("Your cart is empty.");return}let text="Hello Lion Store! I want to order:%0A"+cart.map(x=>`• ${x.n} x${x.q} - ${money(x.p*x.q)}`).join("%0A")+`%0A%0ATotal: ${money(cart.reduce((a,x)=>a+x.p*x.q,0))}`;window.open(`https://wa.me/${WHATSAPP}?text=${text}`,"_blank");}
render();
