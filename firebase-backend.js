import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";
import { firebaseConfig } from "./firebase-config.js";

const configured = firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("YOUR_");
let app, auth, db, storage;
if(configured){
  app=initializeApp(firebaseConfig);
  auth=getAuth(app); db=getFirestore(app); storage=getStorage(app);
}

async function requireAdmin(){
  if(!configured) throw new Error("Firebase is not configured yet. Edit firebase-config.js.");
  const user=auth.currentUser;
  if(!user) throw new Error("Please sign in to the admin dashboard.");
  // The Firestore rules are the final authorization layer.
  return user;
}

export async function login(email,password){
  if(!configured) throw new Error("Firebase is not configured yet. Edit firebase-config.js.");
  return (await signInWithEmailAndPassword(auth,email,password)).user;
}
export async function logout(){ if(auth) await signOut(auth); }
export function watchAuth(callback){
  if(!configured){ callback(null); return ()=>{}; }
  return onAuthStateChanged(auth,callback);
}

export async function getProducts(){
  if(!configured) return [];
  const snap=await getDocs(query(collection(db,"products"),orderBy("createdAt","desc")));
  return snap.docs.map(d=>({id:d.id,...d.data()}));
}

export async function addProduct(data,file){
  await requireAdmin();
  let imageUrl="", imagePath="";
  if(file){
    const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,"_");
    imagePath=`products/${crypto.randomUUID()}-${safe}`;
    const imageRef=ref(storage,imagePath);
    await uploadBytes(imageRef,file,{contentType:file.type});
    imageUrl=await getDownloadURL(imageRef);
  }
  const refDoc=await addDoc(collection(db,"products"),{
    name:data.name, category:data.category, price:Number(data.price), oldPrice:Number(data.oldPrice||data.price),
    imageUrl,imagePath, createdAt:serverTimestamp(), updatedAt:serverTimestamp()
  });
  return {id:refDoc.id,name:data.name,category:data.category,price:Number(data.price),oldPrice:Number(data.oldPrice||data.price),imageUrl,imagePath};
}

export async function deleteProduct(id,imagePath){
  await requireAdmin();
  await deleteDoc(doc(db,"products",id));
  if(imagePath){ try{ await deleteObject(ref(storage,imagePath)); }catch(e){} }
}

export async function updateProduct(id,data){
  await requireAdmin();
  await updateDoc(doc(db,"products",id),{...data,price:Number(data.price),oldPrice:Number(data.oldPrice||data.price),updatedAt:serverTimestamp()});
}

export async function createOrder(items,total,customer={}){
  if(!configured) throw new Error("Firebase is not configured yet.");
  const refDoc=await addDoc(collection(db,"orders"),{
    items,total:Number(total),customer,status:"new",createdAt:serverTimestamp()
  });
  return refDoc.id;
}

window.LionBackend={configured,login,logout,watchAuth,getProducts,addProduct,deleteProduct,updateProduct,createOrder};
window.dispatchEvent(new Event("lionBackendReady"));
