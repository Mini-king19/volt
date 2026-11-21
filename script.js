
"use strict";

// ==============================================
// VOLT — ЄДИНИЙ ОБ'ЄДНАНИЙ JAVASCRIPT
// Каталог + пошук + кошик + обране + профіль
// + оформлення замовлення + консультант
// ==============================================

// 1. КАТАЛОГ ТОВАРІВ

const products = [
  { id: 1, name: "iPhone 15 128GB", category: "Смартфони", price: 36999, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500", popularity: 100 },
  { id: 2, name: "Samsung Galaxy S24", category: "Смартфони", price: 32999, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", popularity: 95 },
  { id: 3, name: "Xiaomi Redmi Note 13", category: "Смартфони", price: 8999, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500", popularity: 85 },
  { id: 4, name: "MacBook Air M2", category: "Ноутбуки", price: 42999, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500", popularity: 99 },
  { id: 5, name: "ASUS ROG Gaming", category: "Ноутбуки", price: 59999, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500", popularity: 90 },
  { id: 6, name: "Lenovo IdeaPad", category: "Ноутбуки", price: 24999, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500", popularity: 80 },
  { id: 7, name: "AirPods Pro 2", category: "Навушники", price: 9499, image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=500", popularity: 99 },
  { id: 8, name: "Sony WH-1000XM5", category: "Навушники", price: 13999, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500", popularity: 97 },
  { id: 9, name: "JBL Tune 510BT", category: "Навушники", price: 1999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", popularity: 82 },
  { id: 10, name: "Apple Watch Series 9", category: "Годинники", price: 14999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", popularity: 96 },
  { id: 11, name: "Samsung Galaxy Watch", category: "Годинники", price: 10499, image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500", popularity: 87 },
  { id: 12, name: "iPad Air", category: "Планшети", price: 27999, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500", popularity: 93 },
  { id: 13, name: "Samsung Galaxy Tab", category: "Планшети", price: 18999, image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500", popularity: 80 },
  { id: 14, name: "Gaming Monitor 27", category: "Монітори", price: 11999, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500", popularity: 89 },
  { id: 15, name: "Logitech G Pro Mouse", category: "Аксесуари", price: 3499, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500", popularity: 88 },
  { id: 16, name: "Механічна клавіатура", category: "Аксесуари", price: 2999, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500", popularity: 84 },
  { id: 17, name: "Ігрова консоль", category: "Ігрова техніка", price: 21999, image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500", popularity: 92 },
  { id: 18, name: "Ігрова гарнітура", category: "Ігрова техніка", price: 4999, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500", popularity: 86 }
];

// 2. ЗБЕРЕЖЕННЯ ДАНИХ

const $ = (id) => document.getElementById(id);

function loadData(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return saved ?? fallback;
  } catch (error) {
    console.warn("Помилка читання даних:", error);
    return fallback;
  }
}

let cart = loadData("voltCart", []);
let favorites = loadData("voltFavorites", []);
let currentUser = loadData("voltUser", null);
let orders = loadData("voltOrders", []);

function saveData() {
  localStorage.setItem("voltCart", JSON.stringify(cart));
  localStorage.setItem("voltFavorites", JSON.stringify(favorites));
}

const money = (value) =>
  new Intl.NumberFormat("uk-UA").format(value) + " ₴";

function showToast(message) {
  const toast = $("toast");

  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.voltToastTimer);

  window.voltToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// 3. КАТАЛОГ, ПОШУК І СОРТУВАННЯ

function renderProducts() {
  const grid = $("products");
  if (!grid) return;

  const query = ($("search")?.value || "").toLowerCase().trim();
  const category = $("categoryFilter")?.value || "all";
  const sort = $("sortFilter")?.value || "popular";

  let result = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    const matchesCategory =
      category === "all" || category === product.category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "cheap") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sort === "expensive") {
    result.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name, "uk"));
  }

  if (sort === "popular") {
    result.sort((a, b) => b.popularity - a.popularity);
  }

  grid.replaceChildren();

  result.forEach(product => {
    const card = document.createElement("article");
    card.className = "card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    const categoryLabel = document.createElement("p");
    categoryLabel.className = "category";
    categoryLabel.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = money(product.price);

    const favoriteButton = document.createElement("button");
    favoriteButton.className =
      "favoriteBtn" +
      (favorites.includes(product.id) ? " selected" : "");

    favoriteButton.textContent =
      favorites.includes(product.id) ? "♥" : "♡";

    favoriteButton.dataset.favorite = product.id;
    favoriteButton.type = "button";

    const buyButton = document.createElement("button");
    buyButton.className = "buyBtn";
    buyButton.textContent = "Додати до кошика";
    buyButton.dataset.buy = product.id;
    buyButton.type = "button";

    card.append(
      image,
      categoryLabel,
      title,
      price,
      favoriteButton,
      buyButton
    );

    grid.appendChild(card);
  });

  if ($("emptyMessage")) {
    $("emptyMessage").hidden = result.length !== 0;
  }

  if ($("productCount")) {
    $("productCount").textContent =
      `Знайдено: ${result.length}`;
  }
}

$("search")?.addEventListener("input", renderProducts);
$("categoryFilter")?.addEventListener("change", renderProducts);
$("sortFilter")?.addEventListener("change", renderProducts);

$("products")?.addEventListener("click", event => {
  const buyButton = event.target.closest("[data-buy]");
  const favoriteButton =
    event.target.closest("[data-favorite]");

  if (buyButton) {
    addToCart(Number(buyButton.dataset.buy));
  }

  if (favoriteButton) {
    toggleFavorite(Number(favoriteButton.dataset.favorite));
  }
});

// 4. КОШИК

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id,
      quantity: 1
    });
  }

  saveData();
  updateCartCount();

  showToast(`✅ ${product.name} додано до кошика`);
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
    showToast("Видалено з обраного");
  } else {
    favorites.push(id);
    showToast("♥ Додано в обране");
  }

  saveData();
  renderProducts();
}

function updateCartCount() {
  if ($("cartCount")) {
    const count = cart.reduce(
      (sum, item) => sum + item.quantity, 0
    );

    $("cartCount").textContent = count;
  }
}

function cartTotal() {
  return cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);

    return sum +
      (product ? product.price * item.quantity : 0);
  }, 0);
}

// 5. ВІДОБРАЖЕННЯ КОШИКА

function renderCart() {
  const list = $("cartItems");
  if (!list) return;

  list.replaceChildren();

  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Твій кошик поки порожній.";
    list.appendChild(empty);
  }

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;

    const row = document.createElement("div");
    row.className = "cartItem";

    const details = document.createElement("div");

    const name = document.createElement("strong");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = money(product.price * item.quantity);

    details.append(name, price);

    const controls = document.createElement("div");
    controls.className = "cartControls";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.dataset.change = item.id;
    minus.dataset.amount = "-1";

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.dataset.change = item.id;
    plus.dataset.amount = "1";

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "🗑";
    remove.dataset.remove = item.id;

    controls.append(minus, quantity, plus, remove);
    row.append(details, controls);

    list.appendChild(row);
  });

  if ($("cartTotal")) {
    $("cartTotal").textContent =
      "Разом: " + money(cartTotal());
  }
}

// 6. КЕРУВАННЯ КОШИКОМ

$("cartItems")?.addEventListener("click", event => {
  const changeButton = event.target.closest("[data-change]");
  const removeButton = event.target.closest("[data-remove]");

  if (changeButton) {
    const id = Number(changeButton.dataset.change);
    const item = cart.find(entry => entry.id === id);

    if (item) {
      item.quantity += Number(changeButton.dataset.amount);

      if (item.quantity <= 0) {
        cart = cart.filter(entry => entry.id !== id);
      }
    }
  }

  if (removeButton) {
    const id = Number(removeButton.dataset.remove);
    cart = cart.filter(entry => entry.id !== id);

    showToast("Товар видалено з кошика");
  }

  saveData();
  updateCartCount();
  renderCart();
});

// 7. МОДАЛЬНІ ВІКНА

function openModal(id) {
  const modal = $(id);
  if (modal) modal.hidden = false;
}

function closeModal(id) {
  const modal = $(id);
  if (modal) modal.hidden = true;
}

$("cartBtn")?.addEventListener("click", () => {
  renderCart();
  openModal("cartModal");
});

$("loginBtn")?.addEventListener("click", () => {
  updateProfile();
  openModal("loginModal");
});

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    closeModal(button.dataset.close);
  });
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.hidden = true;
    }
  });
});

// 8. ДЕМО-ПРОФІЛЬ

function updateProfile() {
  const loginForm = $("loginForm");
  const userProfile = $("userProfile");
  const userInfo = $("userInfo");
  const loginButton = $("loginBtn");

  if (loginForm) {
    loginForm.hidden = !!currentUser;
  }

  if (userProfile) {
    userProfile.hidden = !currentUser;
  }

  if (userInfo) {
    userInfo.textContent = currentUser
      ? `Привіт, ${currentUser.name}! Твоя пошта: ${currentUser.email}`
      : "";
  }

  if (loginButton) {
    loginButton.textContent =
      currentUser ? "Мій профіль" : "Увійти";
  }
}

$("loginForm")?.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const name = String(
    formData.get("name") || ""
  ).trim();

  const email = String(
    formData.get("email") || ""
  ).trim();

  if (!name || !email) return;

  currentUser = { name, email };

  localStorage.setItem(
    "voltUser",
    JSON.stringify(currentUser)
  );

  updateProfile();
  event.currentTarget.reset();

  showToast("✅ Демо-профіль створено!");
});

$("logoutBtn")?.addEventListener("click", () => {
  currentUser = null;

  localStorage.removeItem("voltUser");

  updateProfile();
  showToast("Ти вийшов із профілю");
});

// 9. ОФОРМЛЕННЯ ЗАМОВЛЕННЯ

$("checkoutForm")?.addEventListener("submit", event => {
  event.preventDefault();

  if (cart.length === 0) {
    showToast("Спочатку додай товари до кошика");
    return;
  }

  const formData = new FormData(event.currentTarget);

  const payment = String(
    formData.get("payment") ||
    formData.get("paymentMethod") ||
    "Готівкою при отриманні"
  );

  if (payment === "liqpay") {
    showToast(
      "Онлайн-оплата ще не підключена. Обери оплату при отриманні."
    );
    return;
  }

  const order = {
    id: "VOLT-" + Date.now(),

    name: String(formData.get("name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    address: String(formData.get("address") || "").trim(),

    payment,

    products: cart.map(item => {
      const product = products.find(p => p.id === item.id);

      return {
        id: item.id,
        name: product?.name || "Товар",
        price: product?.price || 0,
        quantity: item.quantity
      };
    }),

    total: cartTotal(),
    createdAt: new Date().toISOString()
  };

  if (!order.name || !order.phone || !order.address) {
    showToast("Заповни всі поля замовлення");
    return;
  }

  orders.push(order);

  localStorage.setItem(
    "voltOrders",
    JSON.stringify(orders)
  );

  cart = [];

  saveData();
  updateCartCount();
  renderCart();

  event.currentTarget.reset();
  closeModal("cartModal");

  showToast(
    `🎉 Замовлення ${order.id} оформлено! Сума: ${money(order.total)}`
  );

  console.log("Демо-замовлення VOLT:", order);
});

// 10. КОНСУЛЬТАНТ VOLT

const chatMessages = $("chatMessages");

function addChatMessage(text, type = "bot") {
  if (!chatMessages) return;

  const message = document.createElement("div");

  message.className =
    type === "user" ? "userMessage" : "botMessage";

  message.textContent = text;

  chatMessages.appendChild(message);

  chatMessages.scrollTop =
    chatMessages.scrollHeight;
}

// 11. ВІДПОВІДІ КОНСУЛЬТАНТА

function consultantAnswer(question) {
  const q = question.toLowerCase().trim();

  if (/привіт|вітаю|доброго|добрий день/.test(q)) {
    return "Привіт! 👋 Я консультант VOLT. Допоможу знайти товар, підібрати техніку або перевірити кошик.";
  }

  if (/кошик|покупк/.test(q)) {
    if (!cart.length) {
      return "🛒 Твій кошик поки порожній. Додай товар кнопкою «Додати до кошика» в каталозі.";
    }

    const lines = cart.map(item => {
      const product = products.find(p => p.id === item.id);

      return product
        ? `• ${product.name} × ${item.quantity}`
        : "";
    }).filter(Boolean);

    return `🛒 У твоєму кошику:
${lines.join("\n")}
Разом: ${money(cartTotal())}.`;
  }

  if (/оплат|картк|готів|грош/.test(q)) {
    return "💳 У цій версії можна вибрати оплату готівкою або карткою при отриманні. Онлайн-списання з картки поки не підключене.";
  }

  if (/достав|відправ|нова пошта|укрпошт/.test(q)) {
    return "🚚 Вкажи місто та адресу у формі оформлення замовлення. Реальну службу доставки ще потрібно підключити.";
  }

  if (/повернен|гаранті|обмін/.test(q)) {
    return "🧾 Умови гарантії та повернення потрібно узгодити й опублікувати від імені магазину.";
  }

  if (/дешев|бюджет|до \d+|ціна/.test(q)) {
    const budgetMatch = q.match(/(?:до|менше)\s*(\d[\d\s]*)/);

    let list = [...products].sort(
      (a, b) => a.price - b.price
    );

    if (budgetMatch) {
      const budget = Number(
        budgetMatch[1].replace(/\s/g, "")
      );

      list = list.filter(p => p.price <= budget);
    }

    if (!list.length) {
      return "Не знайшов товарів у такому бюджеті. Спробуй указати більшу суму.";
    }

    return "💡 Ось доступні варіанти:\n" +
      list.slice(0, 5).map(p =>
        `• ${p.name} — ${money(p.price)}`
      ).join("\n");
  }

  const categories = [
    { pattern: /смартфон|телефон|айфон|iphone|samsung/, name: "Смартфони" },
    { pattern: /ноутбук|макбук|macbook|laptop/, name: "Ноутбуки" },
    { pattern: /навушник|airpods|sony|jbl/, name: "Навушники" },
    { pattern: /годинник|watch/, name: "Годинники" },
    { pattern: /планшет|ipad/, name: "Планшети" },
    { pattern: /монітор|екран/, name: "Монітори" },
    { pattern: /миша|клавіатур|аксесуар/, name: "Аксесуари" },
    { pattern: /ігров|гейм|консол/, name: "Ігрова техніка" }
  ];

  const category = categories.find(item =>
    item.pattern.test(q)
  );

  if (category) {
    let choices = products
      .filter(p => p.category === category.name)
      .sort((a, b) => b.popularity - a.popularity);

    const budgetMatch = q.match(/(?:до|менше)\s*(\d[\d\s]*)/);

    if (budgetMatch) {
      const budget = Number(
        budgetMatch[1].replace(/\s/g, "")
      );

      choices = choices.filter(p => p.price <= budget);
    }

    if (!choices.length) {
      return `У категорії «${category.name}» не знайшов товарів у такому бюджеті.`;
    }

    return `Ось товари з категорії «${category.name}»:\n` +
      choices.slice(0, 5).map(p =>
        `• ${p.name} — ${money(p.price)}`
      ).join("\n");
  }

  const exactProduct = products.find(p =>
    q.includes(p.name.toLowerCase())
  );

  if (exactProduct) {
    return `Знайшов у каталозі: ${exactProduct.name}. Категорія: ${exactProduct.category}. Ціна: ${money(exactProduct.price)}.`;
  }

  if (/допомож|що ти вмієш|підказ/.test(q)) {
    return "Я можу підказати ціни й категорії товарів, підібрати техніку за бюджетом, перевірити кошик та пояснити способи оплати. Напиши, що шукаєш. 💜";
  }

  return "Дякую за запитання! 💜 Спробуй запитати про смартфони, ноутбуки, навушники, годинники, ціни, кошик або оплату.";
}

// 12. ВІДПРАВЛЕННЯ ПОВІДОМЛЕНЬ

function sendChat(question) {
  const text = question.trim();

  if (!text) return;

  addChatMessage(text, "user");

  setTimeout(() => {
    addChatMessage(
      consultantAnswer(text),
      "bot"
    );
  }, 300);
}

$("chatForm")?.addEventListener("submit", event => {
  event.preventDefault();

  const input = $("chatInput");
  if (!input) return;

  sendChat(input.value);
  input.value = "";
});

// ШВИДКІ КНОПКИ ЧАТУ

$("chatQuickReplies")?.addEventListener("click", event => {
  const button = event.target.closest("[data-question]");

  if (button) {
    sendChat(button.dataset.question);
  }
});

// 13. ВІДКРИТТЯ ТА ЗАКРИТТЯ ЧАТУ

$("consultantBtn")?.addEventListener("click", () => {
  const chat = $("chatWindow");

  if (chat) {
    chat.hidden = !chat.hidden;
  }
});

$("closeChat")?.addEventListener("click", () => {
  if ($("chatWindow")) {
    $("chatWindow").hidden = true;
  }
});

// 14. ЗАПУСК МАГАЗИНУ

renderProducts();
updateCartCount();
updateProfile();

console.log("⚡ VOLT запущений! Усі функції готові.");
