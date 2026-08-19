LION STORE V8

What changed:
- Home is now a separate page (index.html).
- Products is a separate page (products.html) and contains only products/cart.
- The ⋮ menu shows Categories first, then store links, then Admin Panel.
- Categories are editable from Admin Panel.
- Home hero text is editable from Admin Panel.
- Admin uses Firebase Email/Password Authentication.
- First registered account becomes OWNER.
- Owner can create additional ADMIN accounts with limited permissions:
  * Manage products
  * Manage store data
  * Edit menu
- Owner can remove admin access.
- Store Data page is functional.
- database.rules.json contains the matching Realtime Database security rules.

IMPORTANT FIREBASE SETUP:
1. Firebase Console -> Authentication -> Sign-in method -> enable Email/Password.
2. Realtime Database -> Rules -> replace rules with database.rules.json.
3. GitHub Pages: upload/replace ALL files in this package, including styles.css, firebase.js, auth.js and menu.js.
4. Open /resell-store/ and go to ⋮ -> Admin Panel.
5. Register the first owner account.

NOTE: Firebase web config values are intended to be public client configuration. Database Security Rules and Authentication are what protect the data.
