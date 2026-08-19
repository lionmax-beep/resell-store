Lion Store V4 - Firebase Realtime Database connected.
Database URL: https://lion-store-f2c4a-default-rtdb.firebaseio.com/

Upload index.html, style.css and script.js to the GitHub repository and replace the V3 files.

Dashboard is included. Products and storeData are saved to Firebase Realtime Database.
Image upload from phone gallery is NOT included because Firebase Storage on this project asks for a billing-plan upgrade. Use a public image URL for now.

IMPORTANT SECURITY:
The dashboard write operations require Firebase Realtime Database rules that allow writes. Do not leave public write rules enabled for a real store. Enable Firebase Authentication and restrict writes to your admin account before production.
