/* Lion Store V8.4.1 - Firebase client */
const firebaseConfig = {
  apiKey: "AIzaSyDy2Ljwj7hg1tsopcC39gvhngxwnVorNtU",
  authDomain: "lion-store-f2c4a.firebaseapp.com",
  databaseURL: "https://lion-store-f2c4a-default-rtdb.firebaseio.com",
  projectId: "lion-store-f2c4a",
  storageBucket: "lion-store-f2c4a.firebasestorage.app",
  messagingSenderId: "37752415149",
  appId: "1:37752415149:web:83fb03e7265db23e00f724",
  measurementId: "G-S3SDFPPS5K"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = typeof firebase.auth === "function" ? firebase.auth() : null;

// Optional App Check. Leave the placeholder until a real reCAPTCHA v3 site key is configured.
const APP_CHECK_SITE_KEY = "PASTE_YOUR_RECAPTCHA_V3_SITE_KEY_HERE";
if (typeof firebase.appCheck === "function" && APP_CHECK_SITE_KEY && !APP_CHECK_SITE_KEY.startsWith("PASTE_")) {
  try { firebase.appCheck().activate(APP_CHECK_SITE_KEY, true); } catch (e) { console.warn("App Check could not start:", e); }
}

function money(n) {
  return "Rs. " + Number(n || 0).toLocaleString("en-LK");
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, m => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[m]));
}

function safeKey(s) {
  return String(s ?? "").replace(/[.#$\[\]/]/g, "_");
}
