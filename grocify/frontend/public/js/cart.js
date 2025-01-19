// Function used in cart.html:
const cartItems = [
    { id: 1, name: "Snack A", price: 10.99, quantity: 1, image: "https://via.placeholder.com/80" },
    { id: 2, name: "Snack B", price: 8.49, quantity: 2, image: "https://via.placeholder.com/80" },
    { id: 3, name: "Snack C", price: 5.99, quantity: 1, image: "https://via.placeholder.com/80" },
  ];

  const cartItemsContainer = document.getElementById("cart-header");
  const totalPriceElement = document.getElementById("total-price");

  // Function to render cart items
  // <img src="${item.image}" alt="${item.name}">
  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");

      cartItemElement.innerHTML = `
        <div class="cart-item">
          <div>
            <img src="${item.image}" alt="${item.name}">
            <h6>${item.name}</h6>
          </div>
          <div>$${item.price.toFixed(2)}</div>
          <div>
              <i class="material-icons decrease-quantity">remove</i>
              <span>${item.quantity}</span>
              <i class="material-icons increase-quantity">add</i>
          </div>
          <div>$${itemTotal.toFixed(2)}</div>
        </div>
      `;

      // Attach event listeners for quantity buttons
      cartItemElement.querySelector(".decrease-quantity").addEventListener("click", () => {
        updateQuantity(item.id, -1);
      });
      cartItemElement.querySelector(".increase-quantity").addEventListener("click", () => {
        updateQuantity(item.id, 1);
      });

      cartItemsContainer.appendChild(cartItemElement);
    });

    // Update total price
    totalPriceElement.textContent = total.toFixed(2);
  }

  // Function to update item quantity
  function updateQuantity(itemId, change) {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        const index = cartItems.indexOf(item);
        cartItems.splice(index, 1); // Remove item from the cart
      }
    }

    renderCart(); // Re-render the cart
  }

  // Initialize cart rendering
  renderCart();

  // Checkout button click event
  document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("Checkout not implemented yet!");
  });