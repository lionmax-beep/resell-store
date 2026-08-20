const defaultCategories=[
 {id:'phones',name:'Phones',icon:'📱',description:'Smartphones'},
 {id:'gadgets',name:'Gadgets',icon:'🎧',description:'Accessories'},
 {id:'fashion',name:'Fashion',icon:'👕',description:'New styles'},
 {id:'accessories',name:'Accessories',icon:'⌚',description:'Useful extras'}
];
const defaultMenu=[
 {id:'home',label:'Home',icon:'🏠',href:'index.html',enabled:true},
 {id:'products',label:'Products',icon:'🛍️',href:'products.html',enabled:true},
 {id:'contact',label:'Contact',icon:'💬',href:'index.html#contact',enabled:true}
];
async function loadMenu(){
 let cats=defaultCategories, menu=defaultMenu;
 try{const [c,m]=await Promise.all([db.ref('settings/categories').once('value'),db.ref('settings/menu').once('value')]);
  if(c.exists()) cats=Object.entries(c.val()).map(([id,v])=>({id,...v})).filter(x=>x.enabled!==false);
  if(m.exists()) menu=Object.entries(m.val()).map(([id,v])=>({id,...v})).filter(x=>x.enabled!==false);
 }catch(e){}
 const catEl=document.getElementById('menuCategories'); if(catEl) catEl.innerHTML=cats.map(c=>`<a href="products.html?cat=${encodeURIComponent(c.name)}" onclick="toggleMenu()">${esc(c.icon||'📂')} <span>${esc(c.name)}</span><b>›</b></a>`).join('');
 const linkEl=document.getElementById('menuLinks'); if(linkEl) linkEl.innerHTML=menu.map(x=>`<a href="${esc(x.href||'#')}" onclick="toggleMenu()">${esc(x.icon||'•')} <span>${esc(x.label)}</span><b>›</b></a>`).join('');
}
function toggleMenu(){document.getElementById('sideMenu')?.classList.toggle('open');document.getElementById('menuShade')?.classList.toggle('show');}
loadMenu();

// V8.4 checkout is available at checkout.html
