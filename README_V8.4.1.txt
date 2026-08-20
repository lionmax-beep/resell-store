LION STORE V8.4.1 - STYLE / MENU / FIREBASE / PRODUCTS FIX

Replaces only:
- styles.css
- menu.js
- firebase.js
- products.html

Main fixes:
1. Added the missing three-dot menu CSS and responsive layout styles.
2. Added page, grid, card, cart, form and admin shared styles that were missing from V8.4.
3. Added databaseURL to firebase.js for the Lion Store Realtime Database.
4. Added Firebase read error handling on products.html instead of silently showing "No products found".
5. Products supports the existing V8 product fields (n,c,p,o,i,img,stock) and also accepts name/category/price/image aliases.
6. Improved menu loading with safe Firebase fallbacks and proper open/close behavior.
7. Updated CSP to allow Google Fonts because styles.css imports Inter.

IMPORTANT:
- Upload these four files to the same GitHub Pages repository root and replace the existing files.
- Do NOT delete database.rules.json or firebase-backend.js.
- After uploading, wait for GitHub Pages to redeploy, then hard-refresh the site.
- Firebase App Check remains disabled until you replace the placeholder site key in firebase.js.
