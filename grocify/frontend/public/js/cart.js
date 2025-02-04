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
          ${item.image}
            <div>${item.name}</div> 
            <div>$${item.price.toFixed(2)}</div>
            <div>(x${item.quantity})</div>
            <a href="${item.buyURL}" target="_blank" class="btn-small blue">Buy Now</a>
            <i class="material-icons" onclick="removeFromCart(${item.id})">close</i>
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