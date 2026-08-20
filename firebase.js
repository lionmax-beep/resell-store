const firebaseConfig={
 apiKey:"AIzaSyDy2Ljwj7hg1tsopcC39gvhngxwnVorNtU",
 authDomain:"lion-store-f2c4a.firebaseapp.com",
 projectId:"lion-store-f2c4a",
 storageBucket:"lion-store-f2c4a.firebasestorage.app",
 messagingSenderId:"37752415149",
 appId:"1:37752415149:web:83fb03e7265db23e00f724",
 measurementId:"G-S3SDFPPS5K"
};
firebase.initializeApp(firebaseConfig);
const db=firebase.database();
const auth=firebase.auth();
// --- App Check (bot/script protection) ---
// 1) Firebase Console -> App Check -> register this web app -> reCAPTCHA v3 -> copy the site key below.
// 2) Once it's working, turn on "Enforce" for Realtime Database in App Check settings.
const APP_CHECK_SITE_KEY="PASTE_YOUR_RECAPTCHA_V3_SITE_KEY_HERE";
if(typeof firebase.appCheck==='function'&&APP_CHECK_SITE_KEY&&APP_CHECK_SITE_KEY.indexOf('PASTE_')!==0){
 try{firebase.appCheck().activate(APP_CHECK_SITE_KEY,true);}catch(e){}
}
function money(n){return "Rs. "+Number(n||0).toLocaleString("en-LK");}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function safeKey(s){return String(s).replace(/[.#$\[\]/]/g,"_");}
