# Lion Store Backend – Firebase

This package turns the static GitHub Pages store into a shared backend:
- Firebase Authentication for admin login
- Cloud Firestore for products and orders
- Cloud Storage for product images
- Firestore/Storage rules that allow public product reads but restrict writes to admin users

## Setup
1. Create a Firebase project.
2. Register a Web app and copy its Firebase config.
3. Paste the config into `firebase-config.js`.
4. Enable Authentication > Email/Password.
5. Create a Firestore database.
6. Create a Storage bucket (Firebase currently requires the Blaze plan for Cloud Storage).
7. Publish `firestore.rules` and `storage.rules` in Firebase Console or with Firebase CLI.
8. Create an Email/Password user in Authentication.
9. Copy that user's UID. In Firestore, create a document `admins/{UID}` (any fields are fine). This makes that user an admin under the rules in this package.
10. Upload the included frontend files to GitHub Pages.

Never put a Firebase service-account private key in the website. The web config is not a secret; security comes from Authentication and Security Rules.
