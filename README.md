Garden Shop — demo static site with client-side cart and admin

Files added:
- index.html — home (dynamic preview)
- products.html — product list (dynamic)
- about.html — about
- cart.html — cart and checkout (client-side)
- login.html — login page (demo users)
- admin.html — admin dashboard to add products
- css/styles.css — styles and CSS variables
- js/app.js — client-side logic storing data in localStorage

Demo credentials are seeded in the project source (`js/app.js`) for local testing. If you need explicit test credentials, open `js/app.js` and look for the users array in the seed data.

How to preview locally:

```bash
cd /Users/kunnath/Projects/garden
python3 -m http.server 8000
# open http://localhost:8000
```

Notes:
- This is a purely client-side demo. All data (products, users, orders) are stored in localStorage in your browser.
- Use the Admin page to upload images (they will be stored as base64 in localStorage) and add products.
- For a production e-commerce site, integrate a backend (Shopify, or custom server + DB) for secure auth and persistent orders.
 - Frontend images are populated via Unsplash Source queries focused on Kerala produce (mango, jackfruit, coconut-region plants, seeds) and include a Lotus (temple flower) product. Replace with your own images as needed.
 - Frontend images are populated via Unsplash Source queries focused on Kerala produce (mango, jackfruit, coconut-region plants, seeds) and include a Lotus (temple flower) product. Replace with your own images as needed.
 - You can reset the demo products (no login required) by visiting any page with the query parameter `?reset_demo=1`, for example:

```
http://localhost:8000/?reset_demo=1
```

This overwrites the seeded products in your browser's localStorage with the Kerala-focused demo set and removes the parameter from the URL after resetting.

Email: admin@example.com
Password: adminpass# kunnathgardenvally
