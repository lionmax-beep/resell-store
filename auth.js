const DEFAULT_PERMS={manageProducts:false,manageStoreData:false,editMenu:false,manageAdmins:false};
let currentAdmin=null;
async function getAdmin(uid){const s=await db.ref('admins/'+uid).once('value');return s.exists()?s.val():null;}
async function requireAdmin(opts={}){
 return new Promise(resolve=>auth.onAuthStateChanged(async user=>{
  if(!user){if(opts.redirect!==false) location.href='admin.html'; resolve(null); return;}
  const a=await getAdmin(user.uid);
  if(!a){await auth.signOut(); if(opts.redirect!==false) location.href='admin.html'; resolve(null); return;}
  currentAdmin={uid:user.uid,email:user.email,...a,permissions:{...DEFAULT_PERMS,...(a.permissions||{})}}; resolve(currentAdmin);
 }));
}
function can(p){return !!(currentAdmin?.role==='owner'||currentAdmin?.permissions?.[p]);}
function applyPermission(el,p){if(!can(p))el.remove();}
async function logout(){await auth.signOut();location.href='admin.html';}
