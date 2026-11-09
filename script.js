
// BELLEFOOD - MAIN JAVASCRIPT

const foods = [
  {
    id: 1,
    name: "Jollof Rice",
    description: "Delicious Nigerian party-style jollof.",
    price: 2500,
    emoji: "🍛",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600"
  },
  {
    id: 2,
    name: "Fried Rice",
    description: "Tasty fried rice with fresh vegetables.",
    price: 3000,
    emoji: "🍚",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600"
  },
  {
    id: 3,
    name: "Grilled Chicken",
    description: "Juicy, flavourful grilled chicken.",
    price: 3500,
    emoji: "🍗",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600"
  },
  {
    id: 4,
    name: "Pepper Soup",
    description: "A delicious and spicy Nigerian favourite.",
    price: 4000,
    emoji: "🍲",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600"
  },
  {
    id: 5,
    name: "Burger",
    description: "Fresh burger with delicious fillings.",
    price: 4500,
    emoji: "🍔",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    id: 6,
    name: "Shawarma",
    description: "Freshly prepared and packed with flavour.",
    price: 3000,
    emoji: "🌯",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600"
  }
];

let cart = [];

// FORMAT NAIRA
function formatPrice(price) {
  return "₦" + price.toLocaleString("en-NG");
}

// DISPLAY FOOD MENU
function displayFoods() {
  const foodGrid = document.getElementById("food-grid");

  if (!foodGrid) {
    console.error("Food grid not found!");
    return;
  }

  foodGrid.innerHTML = foods.map(food => `
    <div class="food-card">

      <div class="food-image">
        <img
          src="${food.image}"
          alt="${food.name}"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        >
        <span style="display:none">${food.emoji}</span>
      </div>

      <div class="food-info">
        <h3>${food.name}</h3>
        <p>${food.description}</p>

        <div class="food-bottom">
          <span class="food-price">
            ${formatPrice(food.price)}
          </span>

          <button class="add-btn"
            onclick="addToCart(${food.id})">
            + Add
          </button>
        </div>
      </div>

    </div>
  `).join("");
}

// ADD FOOD TO CART
function addToCart(id) {
  const food = foods.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...food,
      quantity: 1
    });
  }

  updateCart();
}

// REMOVE FOOD
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// UPDATE CART
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  const count = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  if (cartCount) cartCount.textContent = count;
  if (cartTotal) cartTotal.textContent = formatPrice(total);

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty">Your cart is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <p>${item.quantity} × ${formatPrice(item.price)}</p>
      </div>

      <button onclick="removeFromCart(${item.id})">
        Remove
      </button>
    </div>
  `).join("");
}

// OPEN AND CLOSE CART
function toggleCart() {
  document.getElementById("cart-panel")
    .classList.toggle("active");
}

// PROCEED TO CHECKOUT
function checkout() {
  if (cart.length === 0) {
    alert("Please add food to your cart first.");
    return;
  }

  const checkoutSection =
    document.getElementById("checkout-section");

  if (!checkoutSection) {
    alert("Checkout section not found. Check your index.html.");
    return;
  }

  document.getElementById("cart-panel")
    .classList.remove("active");

  const checkoutItems =
    document.getElementById("checkout-items");

  const checkoutTotal =
    document.getElementById("checkout-total");

  checkoutItems.innerHTML = cart.map(item => `
    <p>
      ${item.name} × ${item.quantity}
      — ${formatPrice(item.price * item.quantity)}
    </p>
  `).join("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  checkoutTotal.textContent = formatPrice(total);

  checkoutSection.style.display = "block";

  checkoutSection.scrollIntoView({
    behavior: "smooth"
  });
}

// BACK TO MENU
function backToMenu() {
  document.getElementById("checkout-section")
    .style.display = "none";

  document.getElementById("menu")
    .scrollIntoView({ behavior: "smooth" });
}

// PLACE ORDER
const checkoutForm =
  document.getElementById("checkout-form");

if (checkoutForm) {
  checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name =
      document.getElementById("customer-name").value;

    alert(
      "Thank you, " + name +
      "! Your demo order has been received."
    );

    cart = [];
    updateCart();
    checkoutForm.reset();

    document.getElementById("checkout-section")
      .style.display = "none";

    document.getElementById("home")
      .scrollIntoView({ behavior: "smooth" });
  });
}

// START WEBSITE
displayFoods();
updateCart();

console.log("Bellefood website loaded successfully!");

