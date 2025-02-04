function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-header");
  const cartTotal = document.getElementById("cart-total");

  if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = "0.00";
      return;
  }

  cartContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
          <span>${item.name} (x${item.quantity})</span>
          <button onclick="removeFromCart(${item.id})">X</button>
      </div>
  `).join('');

  // let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  updateCart();
}

updateCart();