LION STORE V8.4 FREE OCR

This version does NOT use Firebase Storage.
The original ID image stays in the customer's browser and is processed by browser-side OCR.
Only customer-confirmed OCR fields and verification metadata are saved to Realtime Database.

Required:
1. Upload all HTML/JS/CSS files to GitHub Pages.
2. Upload database.rules.json contents into Firebase Realtime Database -> Rules.
3. Keep Firebase Storage disabled; no storage.rules is required.
4. Browser OCR uses Tesseract.js from jsDelivr. If your CSP blocks it, keep the CSP in checkout.html as provided.

Privacy:
- Original ID image is not uploaded by this checkout page.
- OCR results can still contain sensitive personal data, so secure the database and restrict admin permissions.
- Automated OCR is screening only; it does not prove government authenticity.
