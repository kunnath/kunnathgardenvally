// Client-side app for Garden Shop
// Features:
// - Seed demo products and users
// - Render product grids on index/products pages
// - Add to cart (localStorage)
// - Cart page with checkout (address/mobile) -> orders stored in localStorage
// - Login (simple demo users) and admin role
// - Admin page: add products (image upload via FileReader), manage stock
// - Product details modal with reviews; users can add reviews

(function () {
  const LS_KEYS = {
    PRODUCTS: 'gs_products',
    USERS: 'gs_users',
    CART: 'gs_cart',
    CURRENT_USER: 'gs_current_user',
    ORDERS: 'gs_orders'
  };

  // Malayalam translations for UI strings
  const T = {
  SITE_NAME: 'കുന്നത്ത് ഗാർഡൻ വാലി',
    HOME: 'ഹോം',
    PRODUCTS: 'ഉൽപ്പന്നങ്ങൾ',
    ABOUT: 'ഞങ്ങളേക്കുറിച്ച്',
    CART: 'കാർട്ട്',
    GROW_GARDEN: 'നിങ്ങളുടെ തോട്ടം വളർത്തൂ',
    HERO_LEAD: 'ആരോഗ്യകരമായ ചെടികൾ, പുതിയ പഴങ്ങൾ, പ്രീമിയം വിത്തുകൾ — നിങ്ങളുടെ തോട്ടം തുടങ്ങാനും പരിപാലിക്കാനും വേണ്ടതെല്ലാം.',
    SHOP_NOW: 'ഇപ്പോൾ ഷോപ്പ് ചെയ്യുക',
    FEATURED: 'പ്രധാന വിഭാഗങ്ങൾ',
    PLANTS: 'ചെടികൾ',
    BROWSE_PLANTS: 'ചെടികൾ കാണുക',
    FRUITS: 'പഴങ്ങൾ',
    BROWSE_FRUITS: 'പഴങ്ങൾ കാണുക',
    SEEDS: 'വിത്തുകൾ',
    BROWSE_SEEDS: 'വിത്തുകൾ കാണുക',
    POPULAR_PRODUCTS: 'പ്രചാരത്തിലുള്ള ഉത്പന്നങ്ങൾ',
    POPULAR_SUB: 'ശ്രേഷ്ഠ വിൽപ്പനകളുടെ ലളിതമായ ശേഖരം.',
    SEE_ALL: 'എല്ലാ ഉൽപ്പന്നങ്ങളും കാണുക',
    CONTACT: 'ബന്ധപ്പെടുക',
    NEWSLETTER: 'ന്യൂസ്‌ലറ്റർ',
    YOUR_EMAIL: 'നിങ്ങളുടെ ഇമെയിൽ',
    SUBSCRIBE: 'സബ്സ്ക്രൈബ്',
  LOGIN: 'ലോഗിൻ',
  LOGOUT_LABEL: 'ലോഗ്ഔട്ട്',

    // Alerts / messages
    INVALID_CREDENTIALS: 'തെറ്റായ ഇമെയിൽ അല്ലെങ്കിൽ പാസ്‌വേഡ്',
    PRODUCT_NOT_FOUND: 'ഉൽപ്പന്നം കണ്ടെത്തിയില്ല',
    NOT_ENOUGH_STOCK: 'സമുചിതമായ സ്റ്റോക്ക് ഇല്ല',
    ADDED_TO_CART: 'കാർട്ടിലേക്ക് ചേർത്തിരിക്കുന്നു',
    LOGGED_OUT: 'ലോഗ് ഔട്ട് ചെയ്തു',
    LOGGED_IN: 'ലോഗിന്‍ ചെയ്തു',
    ORDER_PLACED: 'ഓർഡർ നൽകപ്പെട്ടു! ഓർഡർ ID:',
    MUST_LOGIN_TO_ORDER: 'ഓർഡർ നൽകാൻ നിങ്ങൾ ലോഗിൻ ചെയ്തിരിക്കണം.',
    CART_EMPTY: 'കാർട്ട് ശൂന്യമാണ്.',

    // Modal / reviews
    REVIEWS: 'അവലോകനങ്ങൾ',
    NO_REVIEWS: 'ഇതുവരെ അവലോകനങ്ങളൊന്നും ഇല്ല.',
    PLEASE_LOGIN_REVIEW: 'അവലോകനം ചേർക്കാൻ ദയവായി ലോഗിൻ ചെയ്യുക.',
    REVIEW_LABEL: 'അവലോകന മൊഴി',
    ADD_REVIEW: 'അവലോകനം ചേർക്കുക',

    // Product card
    VIEW: 'കാണുക',
    ADD_TO_CART: 'കാർട്ടിൽ ചേർക്കുക',
    STOCK: 'സ്റ്റോക്ക്:',
  CATEGORY: 'വകുപ്പ്',
  CATEGORY_PLANTS: 'ചെടികൾ',
  CATEGORY_FRUITS: 'പഴങ്ങൾ',
  CATEGORY_SEEDS: 'വിത്തുകൾ',

    // Cart page
    YOUR_CART: 'നിങ്ങളുടെ കാർട്ട്',
    TOTAL_LABEL: 'മൊത്തം:',
    PLACE_ORDER: 'ഓർഡർ നൽകുക',
    FULL_NAME: 'പൂർണ്ണ പേര്',
    ADDRESS: 'വിലാസം',
    MOBILE_NUMBER: 'മൊബൈൽ നമ്പർ',
    REMOVE: 'നീക്കം ചെയ്യുക',

    // Admin
    ADMIN_REQUIRED: 'അഡ്മിൻ ആക്‌സസ് ആവശ്യമാണ്. ദയവായി അഡ്മിൻ ആയി <a href="login.html">ലോഗിൻ</a> ചെയ്യുക.',
    ADMIN_DASH: 'അഡ്മിൻ ഡാഷ്ബോർഡ്',
    ADD_PRODUCT: 'ഉൽപ്പന്നം ചേർക്കുക',
    TITLE: 'ശീർഷകം',
    PRICE: 'വില',
    STOCK_LABEL: 'സ്റ്റോക്ക്',
    DESCRIPTION: 'വിവരണം',
    RESET_DEMO: 'ഡെമോ ഉൽപ്പന്നങ്ങൾ പുനഃസജ്ജീകരിക്കുക (കേരള ചിത്രങ്ങൾ)',
    RESET_DEMO_NOTE: 'ഡെമോ ഉൽപ്പന്നങ്ങളും ചിത്രങ്ങളും കേരള-കേന്ദ്രിത സെറ്റിലേക്ക് മടക്കുക.',
    EXISTING_PRODUCTS: 'ഇപ്പോൾ ഉള്ള ഉൽപ്പന്നങ്ങൾ',
    DELETE: 'നീക്കം ചെയ്യുക',
    RESET_DONE: 'ഡെമോ ഉൽപ്പന്നങ്ങൾ കേരള-കേന്ദ്രിത ചിത്രങ്ങളായി പുനഃസജ്ജീകരിച്ചു.',
  ORDER_NOT_FOUND: 'ഓർഡർ കണ്ടെത്തിയില്ല',

    // Orders / messages
    NO_ORDERS: 'ഇതുവരെ ഓർഡറുകൾ ഒന്നും ഇല്ല.',
    ORDER_LABEL: 'ഓർഡർ',
    PLACED: 'വെച്ചത്:',
    EST_DELIVERY: 'അനുമാനിച്ച ഡെലിവറി:',
    ITEMS: 'ഇനങ്ങൾ:',
    NO_MESSAGES: 'ഇതുവരെ സന്ദേശങ്ങളൊന്നും ഇല്ല.',
    REPLY_PLACEHOLDER: 'ഉപയോക്താവിന് മറുപടി...',
    SEND: 'അയയ്ക്കുക',
    MESSAGE_TO_ADMIN: 'അഡ്മിനിനെക്കുള്ള സന്ദേശം...',
    GUEST: 'അതിഥി',
    ADMIN_NAME: 'അഡ്മിൻ'
  };

  // Utility
  function uid(prefix = '') { return prefix + Math.random().toString(36).slice(2, 9); }

  // Seed users and products if missing
  function seedDemoData() {
    if (!localStorage.getItem(LS_KEYS.USERS)) {
      const users = [
        { id: uid('u_'), name: 'ഡെമോ ഉപയോക്താവ്', email: 'user@example.com', password: 'userpass', role: 'user' },
        { id: uid('u_'), name: 'ഡെമോ അഡ്മിൻ', email: 'admin@example.com', password: 'adminpass', role: 'admin' }
      ];
      localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
    }

    if (!localStorage.getItem(LS_KEYS.PRODUCTS)) {
      const sample = [
        { id: uid('p_'), title: 'ഇലചെടി', price: 15.00, stock: 12, category: 'plants', image: 'https://source.unsplash.com/800x600/?pothos,indoor,plant,kerala', description: 'കേരള വീടുകളിൽ സാധാരണമായി കാണപ്പെടുന്ന പരിചരണസൗകര്യമുള്ള ഇലചെടി', reviews: [] },
        { id: uid('p_'), title: 'സക്കുലന്റ് മിശ്രിതം', price: 9.00, stock: 20, category: 'plants', image: 'https://source.unsplash.com/800x600/?succulent,mix', description: 'ചെറു സക്കുലന്റുകളുടെ മിശ്രിതം', reviews: [] },
        { id: uid('p_'), title: 'ഹർബ് സ്റ്റാർട്ടർ പാക്ക്', price: 7.50, stock: 30, category: 'seeds', image: 'https://source.unsplash.com/800x600/?herbs,seedlings,kerala', description: 'തുളസി, കരിവേപ്പില, മല്ലി വിത്തുകൾ', reviews: [] },
        { id: uid('p_'), title: 'നിഴൽ ഇഷ്ടപ്പെടുന്ന ചെടി', price: 18.00, stock: 8, category: 'plants', image: 'https://source.unsplash.com/800x600/?shade,plants,indoor', description: 'നിഴലിൽ വളരാൻ അനുയോജ്യമായ ചെടികൾ', reviews: [] },
        { id: uid('p_'), title: 'മാങ്ങ ചെടി', price: 24.00, stock: 6, category: 'plants', image: 'https://source.unsplash.com/800x600/?mango,tree,kerala', description: 'കേരള കാലാവസ്ഥയ്ക്ക് അനുയോജ്യമായ മാങ്ങ ചെടി', reviews: [] },
        { id: uid('p_'), title: 'ചക്ക ചെടി', price: 19.00, stock: 10, category: 'plants', image: 'https://source.unsplash.com/800x600/?jackfruit,tree,kerala', description: 'കേരളത്തിൽ പ്രസിദ്ധമായ ചക്ക വൃക്ഷം', reviews: [] },
        { id: uid('p_'), title: 'പച്ചക്കറി വിത്തുകൾ', price: 3.50, stock: 200, category: 'seeds', image: 'https://source.unsplash.com/800x600/?vegetable,seeds,kerala', description: 'വീടിന്റെ പച്ചക്കറി തോട്ടങ്ങൾക്ക് അടുക്കുന്നതായ വിത്തുകൾ', reviews: [] },
        { id: uid('p_'), title: 'പാരമ്പര്യ വിത്തുകൾ', price: 4.50, stock: 150, category: 'seeds', image: 'https://source.unsplash.com/800x600/?heirloom,seeds', description: 'പാരമ്പര്യ ഇനങ്ങളുടെ വിത്തുകൾ', reviews: [] },
        { id: uid('p_'), title: 'താമര (ക്ഷേത്ര പൂവ്)', price: 6.00, stock: 50, category: 'plants', image: 'https://source.unsplash.com/800x600/?lotus,temple,kerala', description: 'ക്ഷേത്ര പൂവിനും ചടങ്ങുകൾക്കും ഉപയോഗിക്കുന്ന വിശുദ്ധ താമര', reviews: [] }
      ];
      localStorage.setItem(LS_KEYS.PRODUCTS, JSON.stringify(sample));
    }

    if (!localStorage.getItem(LS_KEYS.ORDERS)) {
      localStorage.setItem(LS_KEYS.ORDERS, JSON.stringify([]));
    }

    if (!localStorage.getItem(LS_KEYS.CART)) {
      localStorage.setItem(LS_KEYS.CART, JSON.stringify([]));
    }
  }

  // Data access
  function getProducts() { return JSON.parse(localStorage.getItem(LS_KEYS.PRODUCTS) || '[]'); }
  function saveProducts(products) { localStorage.setItem(LS_KEYS.PRODUCTS, JSON.stringify(products)); }

  function getUsers() { return JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]'); }
  function saveUsers(users) { localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users)); }

  function getCart() { return JSON.parse(localStorage.getItem(LS_KEYS.CART) || '[]'); }
  function saveCart(cart) { localStorage.setItem(LS_KEYS.CART, JSON.stringify(cart)); updateCartCount(); }

  function getCurrentUser() { return JSON.parse(localStorage.getItem(LS_KEYS.CURRENT_USER) || 'null'); }
  function setCurrentUser(user) { localStorage.setItem(LS_KEYS.CURRENT_USER, JSON.stringify(user)); updateAuthUI(); }
  function clearCurrentUser() { localStorage.removeItem(LS_KEYS.CURRENT_USER); updateAuthUI(); }

  function getOrders() { return JSON.parse(localStorage.getItem(LS_KEYS.ORDERS) || '[]'); }
  function saveOrders(orders) { localStorage.setItem(LS_KEYS.ORDERS, JSON.stringify(orders)); }

  // Auth
  // login accepts an email OR phone as identifier
  function login(identifier, password) {
    const users = getUsers();
    const u = users.find(x => (x.email === identifier || x.phone === identifier) && x.password === password);
    if (u) { setCurrentUser(u); return { ok: true, user: u }; }
    return { ok: false, message: T.INVALID_CREDENTIALS };
  }

  // register a new user with either email or phone (one required)
  function register({ name, email, phone, password }) {
    name = String(name || '').trim();
    email = email ? String(email).trim() : '';
    phone = phone ? String(phone).trim() : '';
    password = String(password || '').trim();
    if (!password || (!email && !phone)) return { ok: false, message: 'Email അല്ലെങ്കിൽ മൊബൈൽ നമ്പർ നൽകുക.' };
    const users = getUsers();
    if (email && users.find(u => u.email === email)) return { ok: false, message: 'ഈ ഇമെയിൽ ഇതിനകം ഉപയോഗത്തിലാണ്.' };
    if (phone && users.find(u => u.phone === phone)) return { ok: false, message: 'ഈ മൊബൈൽ നമ്പർ ഇതിനകം ഉപയോഗത്തിലാണ്.' };
    const u = { id: uid('u_'), name: name || email || phone, email: email || '', phone: phone || '', password, role: 'user' };
    users.push(u);
    saveUsers(users);
    setCurrentUser(u);
    return { ok: true, user: u };
  }
  function logout() { clearCurrentUser(); }

  // Cart operations
  function addToCart(productId, qty = 1) {
    const products = getProducts();
    const p = products.find(x => x.id === productId);
  if (!p) { alert(T.PRODUCT_NOT_FOUND); return; }
  if (p.stock < qty) { alert(T.NOT_ENOUGH_STOCK); return; }
    const cart = getCart();
    const item = cart.find(i => i.productId === productId);
    if (item) { item.qty += qty; } else { cart.push({ productId, qty }); }
    saveCart(cart);
    alert(T.ADDED_TO_CART);
  }

  function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(i => i.productId !== productId);
    saveCart(cart);
  }

  function updateCartQty(productId, qty) {
    const cart = getCart();
    const item = cart.find(i => i.productId === productId);
    if (!item) return;
    item.qty = qty;
    if (item.qty <= 0) removeFromCart(productId);
    saveCart(cart);
  }

  function clearCart() { saveCart([]); }

  // Orders
  function placeOrder({ name, address, mobile }) {
    const currentUser = getCurrentUser();
    if (!currentUser) return { ok: false, message: T.MUST_LOGIN_TO_ORDER };
    const cart = getCart();
    if (!cart.length) return { ok: false, message: T.CART_EMPTY };

    const products = getProducts();
    // verify stock
    for (const item of cart) {
      const p = products.find(x => x.id === item.productId);
  if (!p || p.stock < item.qty) return { ok: false, message: `${p ? p.title + ' - ' : ''}${T.NOT_ENOUGH_STOCK}` };
    }

    // create order
    const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // +3 days estimate
    const order = {
      id: uid('o_'),
      userId: currentUser.id,
      name, address, mobile,
      items: cart,
      total: cart.reduce((s, it) => {
        const p = products.find(x => x.id === it.productId); return s + (p ? p.price * it.qty : 0);
      }, 0),
      createdAt: new Date().toISOString(),
      estimatedDelivery: estimatedDelivery.toISOString(),
      messages: [] // messages between user and admin (each {id, senderId, senderName, role, text, date})
    };

    // deduct stock
    for (const item of cart) {
      const p = products.find(x => x.id === item.productId);
      if (p) p.stock = Math.max(0, p.stock - item.qty);
    }
    saveProducts(products);

    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);
    clearCart();
    return { ok: true, order };
  }

  // Messages on orders
  function addOrderMessage(orderId, { senderId, senderName, role, text }) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return { ok: false, message: T.ORDER_NOT_FOUND };
    if (!order.messages) order.messages = [];
    const msg = { id: uid('m_'), senderId, senderName, role, text, date: new Date().toISOString() };
    order.messages.push(msg);
    saveOrders(orders);
    return { ok: true, msg };
  }

  function getOrdersForCurrentUser() {
    const current = getCurrentUser();
    if (!current) return [];
    return getOrders().filter(o => o.userId === current.id).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // Reviews
  function addReview(productId, { userName, rating, text }) {
    const products = getProducts();
    const p = products.find(x => x.id === productId);
    if (!p) return { ok: false, message: T.PRODUCT_NOT_FOUND };
    if (!p.reviews) p.reviews = [];
    p.reviews.push({ id: uid('r_'), userName, rating, text, date: new Date().toISOString() });
    saveProducts(products);
    return { ok: true };
  }

  // Admin: add product (imageData can be dataURL or URL)
  function adminAddProduct({ title, price, stock, description, imageData, category }) {
    const products = getProducts();
    const p = { id: uid('p_'), title, price: parseFloat(price), stock: parseInt(stock, 10) || 0, category: category || '', image: imageData || '', description, reviews: [] };
    products.unshift(p);
    saveProducts(products);
    return p;
  }

  // Render helpers
  function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-3';
    col.innerHTML = `
      <div class="card product-card h-100" data-id="${product.id}">
        <img src="${product.image}" class="card-img-top" alt="${escapeHtml(product.title)}">
        <div class="card-body d-flex flex-column">
          <div class="mb-1"><small class="text-muted">${escapeHtml(categoryLabel(product.category))}</small></div>
          <h3 class="h6">${escapeHtml(product.title)}</h3>
          <p class="mb-2 text-muted">€${product.price.toFixed(2)}</p>
          <p class="mb-2 text-muted">${T.STOCK} ${product.stock}</p>
          <div class="mt-auto d-flex">
            <button class="btn btn-outline-success me-2 btn-view" data-id="${product.id}">${T.VIEW}</button>
            <button class="btn btn-primary btn-add" data-id="${product.id}">${T.ADD_TO_CART}</button>
          </div>
        </div>
      </div>
    `;
    return col;
  }

  function categoryLabel(cat) {
    if (!cat) return '';
    if (cat === 'plants') return T.CATEGORY_PLANTS;
    if (cat === 'fruits') return T.CATEGORY_FRUITS;
    if (cat === 'seeds') return T.CATEGORY_SEEDS;
    return cat;
  }

  function escapeHtml(s) { return String(s).replace(/[&"'<>]/g, (c) => ({'&':'&amp;','"':'&quot;',"'":"&#39;","<":"&lt;",">":"&gt;"}[c])); }

  function renderProductsList() {
    const el = document.getElementById('products-list');
    if (!el) return;
    const products = getProducts();
    el.innerHTML = '';
    for (const p of products) {
      el.appendChild(createProductCard(p));
    }
  }

  function renderProductsPreview(limit = 3) {
    const el = document.getElementById('products-preview');
    if (!el) return;
    const products = getProducts().slice(0, limit);
    el.innerHTML = '';
    for (const p of products) {
      const card = createProductCard(p);
      // for preview, make columns larger
      card.className = 'col-6 col-md-4';
      el.appendChild(card);
    }
  }

  function renderCartPage() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    if (!cartContainer) return;
    const cart = getCart();
    cartContainer.innerHTML = '';
    const products = getProducts();
    let total = 0;
    if (!cart.length) {
      cartContainer.innerHTML = `<p class="text-muted">${T.CART_EMPTY}</p>`;
    } else {
      for (const item of cart) {
        const p = products.find(x => x.id === item.productId);
        if (!p) continue;
        total += p.price * item.qty;
        const row = document.createElement('div');
        row.className = 'd-flex align-items-center mb-3';
        row.innerHTML = `
          <img src="${p.image}" alt="${escapeHtml(p.title)}" width="96" height="64" style="object-fit:cover;border-radius:8px;margin-right:12px;">
          <div class="flex-grow-1">
            <strong>${escapeHtml(p.title)}</strong>
            <div class="text-muted">€${p.price.toFixed(2)}</div>
          </div>
          <div class="d-flex align-items-center">
            <input type="number" min="1" max="${p.stock}" value="${item.qty}" class="form-control form-control-sm me-2 cart-qty" data-id="${p.id}" style="width:80px;">
            <button class="btn btn-sm btn-outline-danger btn-remove" data-id="${p.id}">${T.REMOVE}</button>
          </div>
        `;
        cartContainer.appendChild(row);
      }
    }
    if (cartTotalEl) cartTotalEl.textContent = `€${total.toFixed(2)}`;
  }

  // Product modal dynamic
  function ensureModal() {
    if (document.getElementById('productModal')) return;
    const modalHtml = `
      <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="productModalLabel"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <img id="productModalImage" src="" alt="" class="img-fluid rounded-3 mb-3">
                </div>
                <div class="col-md-6">
                  <p id="productModalDesc"></p>
                  <p class="fw-bold" id="productModalPrice"></p>
                  <p id="productModalStock" class="text-muted"></p>
                  <div class="mb-3">
                    <button class="btn btn-primary" id="modalAddToCart">${T.ADD_TO_CART}</button>
                  </div>
                </div>
              </div>
              <hr>
              <h6>${T.REVIEWS}</h6>
              <div id="productReviews" class="mb-3"></div>
              <div id="reviewFormWrap"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  function openProductModal(productId) {
    const products = getProducts();
    const p = products.find(x => x.id === productId);
    if (!p) return;
    ensureModal();

    document.getElementById('productModalLabel').textContent = p.title;
    const img = document.getElementById('productModalImage');
    img.src = p.image;
    img.alt = p.title;
    document.getElementById('productModalDesc').textContent = p.description || '';
  document.getElementById('productModalPrice').textContent = `€${p.price.toFixed(2)}`;
  document.getElementById('productModalStock').textContent = `${T.STOCK} ${p.stock}`;

    const modalAdd = document.getElementById('modalAddToCart');
    modalAdd.dataset.id = p.id;

    // Reviews
    const reviewsWrap = document.getElementById('productReviews');
    reviewsWrap.innerHTML = '';
    if (p.reviews && p.reviews.length) {
      for (const r of p.reviews.slice().reverse()) {
        const d = document.createElement('div');
        d.className = 'mb-2';
        d.innerHTML = `<strong>${escapeHtml(r.userName)}</strong> <span class="text-muted">(${new Date(r.date).toLocaleString()})</span><div>${escapeHtml(r.text)}</div>`;
        reviewsWrap.appendChild(d);
      }
    } else {
      reviewsWrap.innerHTML = `<p class="text-muted">${T.NO_REVIEWS}</p>`;
    }

    // Review form only for logged-in users
    const reviewFormWrap = document.getElementById('reviewFormWrap');
    const currentUser = getCurrentUser();
    if (currentUser) {
      reviewFormWrap.innerHTML = `
        <form id="reviewForm">
          <div class="mb-2">
            <label class="form-label">${T.REVIEW_LABEL}</label>
            <textarea class="form-control" id="reviewText" rows="2" required></textarea>
          </div>
          <button class="btn btn-sm btn-outline-primary" type="submit">${T.ADD_REVIEW}</button>
        </form>
      `;
      const reviewForm = document.getElementById('reviewForm');
      reviewForm.onsubmit = function (e) {
        e.preventDefault();
        const text = document.getElementById('reviewText').value.trim();
        if (!text) return;
        addReview(p.id, { userName: currentUser.name || currentUser.email, rating: 5, text });
        openProductModal(p.id); // refresh
      };
    } else {
      reviewFormWrap.innerHTML = `<p class="text-muted">ദയവായി <a href="login.html">ലോഗിൻ</a> ചെയ്ത് അവലോകനം ചേർക്കുക.</p>`;
    }

    const modalEl = document.getElementById('productModal');
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }

  // Update small cart count in nav
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((s, i) => s + i.qty, 0);
    // try to find a cart-badge element or create
    let el = document.querySelector('.cart-count');
    if (!el) {
      // attach to header if possible
      const nav = document.querySelector('.site-header .navbar-nav');
      if (nav) {
        const li = document.createElement('li');
        li.className = 'nav-item ms-2';
        li.innerHTML = `<a class="nav-link" href="cart.html">${T.CART} <span class="badge bg-success cart-count">${count}</span></a>`;
        nav.appendChild(li);
        return;
      }
      return;
    }
    el.textContent = count;
  }

  // Update auth UI (show login/logout link on header)
  function updateAuthUI() {
    const currentUser = getCurrentUser();
    const nav = document.querySelector('.site-header .navbar-nav');
    if (!nav) return;
    // remove any existing auth li
    const existing = nav.querySelector('.auth-item');
    if (existing) existing.remove();
    const li = document.createElement('li');
    li.className = 'nav-item auth-item';
    if (currentUser) {
      li.innerHTML = `<a class="nav-link" href="#">ഹായ്, ${escapeHtml(currentUser.name || currentUser.email)}</a>`;
      const adminLink = currentUser.role === 'admin' ? `<a class="nav-link" href="admin.html">${T.ADMIN_NAME}</a>` : '';
      li.innerHTML += adminLink + `<a class="nav-link" href="#" id="logoutLink">${T.LOGOUT_LABEL}</a>`;
    } else {
      li.innerHTML = `<a class="nav-link" href="login.html">${T.LOGIN}</a>`;
    }
    nav.appendChild(li);
    const logout = document.getElementById('logoutLink');
    if (logout) logout.onclick = (e) => { e.preventDefault(); logoutAction(); };
  }

  function logoutAction() { clearCurrentUser(); alert(T.LOGGED_OUT); window.location.href = 'index.html'; }


  // Initialization and event delegation
  function initSite() {
    seedDemoData();
    // If URL includes reset_demo=1, auto-reset the demo products to Kerala-focused set
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('reset_demo') === '1') {
        // overwrite products immediately
        resetProductsToKerala();
        // remove the param from the URL for cleanliness
        params.delete('reset_demo');
        const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.replaceState({}, document.title, newUrl);
      }
    } catch (e) {
      // ignore URL parsing errors in older browsers
    }

    renderProductsPreview();
    renderProductsList();
    updateCartCount();
    updateAuthUI();

    // Delegated events for add/view buttons
    document.body.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.btn-add');
      if (addBtn) {
        const id = addBtn.dataset.id;
        addToCart(id, 1);
        updateCartCount();
      }
      const viewBtn = e.target.closest('.btn-view');
      if (viewBtn) {
        const id = viewBtn.dataset.id;
        openProductModal(id);
      }
      const modalAdd = e.target.closest('#modalAddToCart');
      if (modalAdd) {
        const id = modalAdd.dataset.id;
        addToCart(id, 1);
        updateCartCount();
      }
    });

    // If on products page, render list
    if (document.getElementById('products-list')) renderProductsList();

    // If on cart page
    if (document.getElementById('cart-items')) {
      renderCartPage();
      document.body.addEventListener('change', (e) => {
        if (e.target.classList.contains('cart-qty')) {
          const id = e.target.dataset.id;
          const qty = parseInt(e.target.value, 10) || 1;
          updateCartQty(id, qty);
          renderCartPage();
          updateCartCount();
        }
      });
      document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-remove')) {
          const id = e.target.dataset.id;
          removeFromCart(id);
          renderCartPage();
          updateCartCount();
        }
      });

      const checkoutForm = document.getElementById('checkoutForm');
      if (checkoutForm) {
        checkoutForm.onsubmit = function (ev) {
          ev.preventDefault();
          const name = checkoutForm.querySelector('#checkoutName').value.trim();
          const address = checkoutForm.querySelector('#checkoutAddress').value.trim();
          const mobile = checkoutForm.querySelector('#checkoutMobile').value.trim();
          const res = placeOrder({ name, address, mobile });
          if (!res.ok) {
            alert(res.message);
            if (res.message && String(res.message).includes('ലോഗിൻ')) window.location.href = 'login.html';
            return;
          }
          alert(T.ORDER_PLACED + ' ' + res.order.id);
          window.location.href = 'index.html';
        };
      }
    }

    // If on admin page
    if (document.getElementById('adminArea')) renderAdminPage();

    // If on login page
    if (document.getElementById('loginForm')) {
      const form = document.getElementById('loginForm');
      form.onsubmit = function (ev) {
        ev.preventDefault();
        const identifier = form.querySelector('#email').value.trim();
        const password = form.querySelector('#password').value.trim();
        const r = login(identifier, password);
        if (!r.ok) { alert(r.message || T.INVALID_CREDENTIALS); return; }
        alert(T.LOGGED_IN);
        const params = new URLSearchParams(window.location.search);
        const next = params.get('next') || 'index.html';
        window.location.href = next;
      };

      // show register form
      const showRegister = document.getElementById('showRegister');
      const registerWrap = document.getElementById('registerWrap');
      const cancelRegister = document.getElementById('cancelRegister');
      if (showRegister && registerWrap) {
        showRegister.onclick = function (e) { e.preventDefault(); registerWrap.classList.remove('d-none'); registerWrap.scrollIntoView({behavior:'smooth'}); };
      }
      if (cancelRegister && registerWrap) {
        cancelRegister.onclick = function () { registerWrap.classList.add('d-none'); };
      }

      // registration handler
      if (document.getElementById('registerForm')) {
        const rform = document.getElementById('registerForm');
        rform.onsubmit = function (ev) {
          ev.preventDefault();
          const name = rform.querySelector('#reg_name').value.trim();
          const email = rform.querySelector('#reg_email').value.trim();
          const phone = rform.querySelector('#reg_phone').value.trim();
          const pwd = rform.querySelector('#reg_password').value.trim();
          const pwd2 = rform.querySelector('#reg_password2').value.trim();
          if (!pwd || pwd !== pwd2) { alert('Password mismatch'); return; }
          if (!email && !phone) { alert('ദയവായി ഇമെയിൽ അല്ലെങ്കിൽ മൊബൈൽ നമ്പർ നൽകുക.'); return; }
          const res = register({ name, email, phone, password: pwd });
          if (!res.ok) { alert(res.message || 'Registration failed'); return; }
          alert('Registration successful');
          const params = new URLSearchParams(window.location.search);
          const next = params.get('next') || 'index.html';
          window.location.href = next;
        };
      }
    }

  }

  // Admin UI
  function renderAdminPage() {
    const currentUser = getCurrentUser();
    const wrap = document.getElementById('adminArea');
    if (!wrap) return;
    if (!currentUser || currentUser.role !== 'admin') {
      wrap.innerHTML = `<p class="text-danger">${T.ADMIN_REQUIRED}</p>`;
      return;
    }

    wrap.innerHTML = `
      <h2>${T.ADMIN_DASH}</h2>
      <div class="row">
        <div class="col-md-6">
          <section class="mb-4">
            <h4>${T.ADD_PRODUCT}</h4>
            <form id="adminAddForm">
              <div class="mb-2"><input class="form-control" id="p_title" placeholder="${T.TITLE}" required></div>
              <div class="mb-2"><input class="form-control" id="p_price" placeholder="${T.PRICE}" type="number" step="0.01" required></div>
              <div class="mb-2"><input class="form-control" id="p_stock" placeholder="${T.STOCK_LABEL}" type="number" required></div>
              <div class="mb-2">
                <select id="p_category" class="form-select">
                  <option value="">${T.CATEGORY} (എല്ലാം)</option>
                  <option value="plants">${T.CATEGORY_PLANTS}</option>
                  <option value="fruits">${T.CATEGORY_FRUITS}</option>
                  <option value="seeds">${T.CATEGORY_SEEDS}</option>
                </select>
              </div>
              <div class="mb-2"><textarea class="form-control" id="p_desc" placeholder="${T.DESCRIPTION}"></textarea></div>
              <div class="mb-2"><input class="form-control" id="p_image" type="file" accept="image/*"></div>
              <button class="btn btn-success" type="submit">${T.ADD_PRODUCT}</button>
            </form>
          </section>

          <section>
            <h4>${T.EXISTING_PRODUCTS}</h4>
            <div class="d-flex mb-2">
              <div class="me-2"><button id="resetDemoBtn" class="btn btn-sm btn-warning">${T.RESET_DEMO}</button></div>
              <div><small class="text-muted">${T.RESET_DEMO_NOTE}</small></div>
            </div>
            <div id="adminProductList" class="row g-3"></div>
          </section>
        </div>

        <div class="col-md-6">
          <section class="mb-4">
            <h4>ഓർഡറുകളും സന്ദേശങ്ങളും</h4>
            <div id="adminOrdersList"></div>
          </section>
        </div>
      </div>
    `;

    const form = document.getElementById('adminAddForm');
    form.onsubmit = function (ev) {
      ev.preventDefault();
      const title = document.getElementById('p_title').value.trim();
      const price = document.getElementById('p_price').value;
      const stock = document.getElementById('p_stock').value;
      const category = document.getElementById('p_category') ? document.getElementById('p_category').value : '';
      const desc = document.getElementById('p_desc').value.trim();
      const input = document.getElementById('p_image');
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = e.target.result;
          adminAddProduct({ title, price, stock, description: desc, imageData: data, category });
          renderAdminProductList();
          form.reset();
        };
        reader.readAsDataURL(input.files[0]);
      } else {
        adminAddProduct({ title, price, stock, description: desc, imageData: 'https://picsum.photos/seed/' + Math.random().toString(36).slice(2,6) + '/800/600', category });
        renderAdminProductList();
        form.reset();
      }
    };

    renderAdminProductList();
    renderAdminOrdersList();
  }
  // attach reset button handler after admin UI renders
  document.body.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'resetDemoBtn') {
      if (confirm('ഡെമോ ഉൽപ്പന്നങ്ങളും ചിത്രങ്ങളും കേരള-കേന്ദ്രിത സെറ്റിലേക്ക് പുനഃസജ്ജീകരിക്കണോ? ഇത് നിലവിലെ ഡെമോ ഉൽപ്പന്നങ്ങളെ മായ്ച്ചേക്കും.')) {
        resetProductsToKerala();
      }
    }
  });

  function renderAdminProductList() {
    const list = document.getElementById('adminProductList');
    if (!list) return;
    const products = getProducts();
    list.innerHTML = '';
    for (const p of products) {
      const col = document.createElement('div');
      col.className = 'col-12';
      col.innerHTML = `
        <div class="d-flex align-items-center p-2 border rounded">
          <img src="${p.image}" alt="${escapeHtml(p.title)}" width="80" height="60" style="object-fit:cover;border-radius:6px;margin-right:12px;">
          <div class="flex-grow-1">
            <strong>${escapeHtml(p.title)}</strong>
            <div class="text-muted">€${p.price.toFixed(2)} — ${T.STOCK} ${p.stock} — ${escapeHtml(categoryLabel(p.category))}</div>
          </div>
          <div>
            <button class="btn btn-sm btn-danger admin-delete" data-id="${p.id}">${T.DELETE}</button>
          </div>
        </div>
      `;
      list.appendChild(col);
    }

    list.querySelectorAll('.admin-delete').forEach(btn => btn.onclick = function () {
      const id = this.dataset.id;
      let products = getProducts();
      products = products.filter(x => x.id !== id);
      saveProducts(products);
      renderAdminProductList();
      renderProductsList();
      renderProductsPreview();
    });
  }

  // Reset products to Kerala-focused demo set (overwrites existing products in localStorage)
  function resetProductsToKerala() {
    const sample = [
      { id: uid('p_'), title: 'ഇലചെടി', price: 15.00, stock: 12, category: 'plants', image: 'https://source.unsplash.com/800x600/?pothos,indoor,plant,kerala', description: 'കേരള വീടുകളിൽ സാധാരണയായി കാണപ്പെടുന്ന പരിചരണസൗകര്യമുള്ള ഇലചെടി', reviews: [] },
      { id: uid('p_'), title: 'സക്കുലന്റ് മിശ്രിതം', price: 9.00, stock: 20, category: 'plants', image: 'https://source.unsplash.com/800x600/?succulent,mix', description: 'ചെറു സക്കുലന്റുകളുടെ മിശ്രിതം', reviews: [] },
      { id: uid('p_'), title: 'ഹർബ് സ്റ്റാർട്ടർ പാക്ക്', price: 7.50, stock: 30, category: 'seeds', image: 'https://source.unsplash.com/800x600/?herbs,seedlings,kerala', description: 'തുളസി, കരിവേപ്പില, മല്ലി വിത്തുകൾ', reviews: [] },
      { id: uid('p_'), title: 'നിഴൽ ഇഷ്ടപ്പെടുന്ന ചെടി', price: 18.00, stock: 8, category: 'plants', image: 'https://source.unsplash.com/800x600/?shade,plants,indoor', description: 'നിഴലിൽ വളരാൻ അനുയോജ്യമായ ചെടികൾ', reviews: [] },
      { id: uid('p_'), title: 'മാങ്ങ ചെടി', price: 24.00, stock: 6, category: 'plants', image: 'https://source.unsplash.com/800x600/?mango,tree,kerala', description: 'കേരള കാലാവസ്ഥയ്ക്ക് അനുയോജ്യമായ മാങ്ങ ചെടി', reviews: [] },
      { id: uid('p_'), title: 'ചക്ക് ചെടി', price: 19.00, stock: 10, category: 'plants', image: 'https://source.unsplash.com/800x600/?jackfruit,tree,kerala', description: 'കേരളത്തിൽ പ്രസിദ്ധമായ ചക്ക വൃക്ഷം', reviews: [] },
      { id: uid('p_'), title: 'പച്ചക്കരി വിത്തുകൾ', price: 3.50, stock: 200, category: 'seeds', image: 'https://source.unsplash.com/800x600/?vegetable,seeds,kerala', description: 'വീടിന്റെ പച്ചക്കറി തോട്ടങ്ങൾക്ക് അടുക്കുന്നതിനുള്ള വിത്തുകൾ', reviews: [] },
      { id: uid('p_'), title: 'പാരമ്പര്യ വിത്തുകൾ', price: 4.50, stock: 150, category: 'seeds', image: 'https://source.unsplash.com/800x600/?heirloom,seeds', description: 'പാരമ്പര്യ ഇനങ്ങളുടെ വിത്തുകൾ', reviews: [] },
      { id: uid('p_'), title: 'താമര (ക്ഷേത്ര പൂവ്)', price: 6.00, stock: 50, category: 'plants', image: 'https://source.unsplash.com/800x600/?lotus,temple,kerala', description: 'ക്ഷേത്ര പൂവിനും ചടങ്ങുകൾക്കും ഉപയോഗിക്കുന്ന വിശുദ്ധ താമര', reviews: [] }
    ];
    saveProducts(sample);
    renderAdminProductList();
    renderProductsList();
    renderProductsPreview();
    alert(T.RESET_DONE);
  }

  function renderAdminOrdersList() {
    const wrap = document.getElementById('adminOrdersList');
    if (!wrap) return;
    const orders = getOrders().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (!orders.length) { wrap.innerHTML = `<p class="text-muted">${T.NO_ORDERS}</p>`; return; }
    wrap.innerHTML = '';
    for (const o of orders) {
      const d = document.createElement('div');
      d.className = 'mb-3 p-2 border rounded';
      const user = getUsers().find(u => u.id === o.userId) || { name: 'Unknown', email: '' };
      d.innerHTML = `
        <div><strong>${T.ORDER_LABEL} ${o.id}</strong> — ${new Date(o.createdAt).toLocaleString()} by ${escapeHtml(user.name || user.email)}</div>
        <div class="text-muted">${T.TOTAL_LABEL} €${o.total.toFixed(2)} — ${T.EST_DELIVERY} ${new Date(o.estimatedDelivery).toLocaleDateString()}</div>
        <div class="mt-2"><em>${T.ITEMS}</em> ${o.items.map(i => i.qty + '×' + (getProducts().find(p=>p.id===i.productId)||{title:'?'}).title).join(', ')}</div>
        <div class="mt-2" id="messages_${o.id}"></div>
        <form class="mt-2 admin-reply-form" data-order="${o.id}">
          <div class="input-group">
            <input class="form-control form-control-sm" name="reply" placeholder="${T.REPLY_PLACEHOLDER}" required>
            <button class="btn btn-sm btn-primary" type="submit">${T.SEND}</button>
          </div>
        </form>
      `;
      wrap.appendChild(d);

      // render messages
      const msgsWrap = d.querySelector('#messages_' + o.id);
      if (o.messages && o.messages.length) {
        for (const m of o.messages) {
          const p = document.createElement('div');
          p.className = 'mb-1';
          p.innerHTML = `<small><strong>${escapeHtml(m.senderName)}</strong> <span class="text-muted">(${new Date(m.date).toLocaleString()})</span></small><div>${escapeHtml(m.text)}</div>`;
          msgsWrap.appendChild(p);
        }
      } else {
        msgsWrap.innerHTML = `<div class="text-muted small">${T.NO_MESSAGES}</div>`;
      }
    }

    // attach reply handlers
    wrap.querySelectorAll('.admin-reply-form').forEach(f => {
      f.onsubmit = function (ev) {
        ev.preventDefault();
        const orderId = this.dataset.order;
        const text = this.querySelector('input[name="reply"]').value.trim();
        if (!text) return;
        const current = getCurrentUser();
        const senderName = (current && (current.name || current.email)) || T.ADMIN_NAME;
        addOrderMessage(orderId, { senderId: current ? current.id : 'admin', senderName, role: 'admin', text });
        renderAdminOrdersList();
        this.reset();
      };
    });
  }

  // Expose some functions to window for admin page calls
  window.App = {
    getProducts, saveProducts, getCart, saveCart, addToCart, login, logout, getCurrentUser, adminAddProduct, register
  };

  // Orders page renderer (user)
  function renderOrdersPage() {
    const wrap = document.getElementById('ordersList');
    if (!wrap) return;
    const current = getCurrentUser();
    if (!current) { wrap.innerHTML = `<p class="text-danger">ദയവായി <a href="login.html?next=orders.html">ലോഗിൻ</a> ചെയ്ത് നിങ്ങളുടെ ഓർഡറുകൾ കാണുക.</p>`; return; }
    const orders = getOrdersForCurrentUser();
    if (!orders.length) { wrap.innerHTML = `<p class="text-muted">${T.NO_ORDERS}</p>`; return; }
    wrap.innerHTML = '';
    for (const o of orders) {
      const card = document.createElement('div');
      card.className = 'card mb-3';
      card.innerHTML = `
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <strong>${T.ORDER_LABEL} ${o.id}</strong>
              <div class="text-muted">${T.PLACED} ${new Date(o.createdAt).toLocaleString()}</div>
            </div>
            <div class="text-end">
              <div>${T.TOTAL_LABEL} €${o.total.toFixed(2)}</div>
              <div class="text-muted">${T.EST_DELIVERY} ${new Date(o.estimatedDelivery).toLocaleString()}</div>
            </div>
          </div>
          <hr>
          <div><strong>${T.ITEMS}</strong>
            <ul>
              ${o.items.map(i => '<li>' + i.qty + ' × ' + (getProducts().find(p=>p.id===i.productId)||{title:'?'}) .title + '</li>').join('')}
            </ul>
          </div>
          <div id="order_messages_${o.id}" class="mt-2"></div>
          <form class="mt-2 order-message-form" data-order="${o.id}">
            <div class="input-group">
              <input class="form-control form-control-sm" name="message" placeholder="${T.MESSAGE_TO_ADMIN}" required>
              <button class="btn btn-sm btn-primary" type="submit">${T.SEND}</button>
            </div>
          </form>
        </div>
      `;
      wrap.appendChild(card);

      const msgsWrap = card.querySelector('#order_messages_' + o.id);
      if (o.messages && o.messages.length) {
        for (const m of o.messages) {
          const p = document.createElement('div');
          p.className = 'mb-2';
          p.innerHTML = `<small><strong>${escapeHtml(m.senderName)}</strong> <span class="text-muted">(${new Date(m.date).toLocaleString()})</span></small><div>${escapeHtml(m.text)}</div>`;
          msgsWrap.appendChild(p);
        }
      } else {
        msgsWrap.innerHTML = `<div class="text-muted small">${T.NO_MESSAGES}</div>`;
      }
    }

    // attach handlers
    wrap.querySelectorAll('.order-message-form').forEach(f => {
      f.onsubmit = function (ev) {
        ev.preventDefault();
        const orderId = this.dataset.order;
        const text = this.querySelector('input[name="message"]').value.trim();
        if (!text) return;
        const current = getCurrentUser();
        const senderName = (current && (current.name || current.email)) || T.GUEST;
        addOrderMessage(orderId, { senderId: current ? current.id : 'guest', senderName, role: 'user', text });
        renderOrdersPage();
      };
    });
  }

  // Render orders page if present
  if (document.getElementById('ordersList')) renderOrdersPage();

  // Init
  document.addEventListener('DOMContentLoaded', initSite);
})();
