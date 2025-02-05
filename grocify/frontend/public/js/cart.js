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
            <div>${item.name}</div>
            <div></div>
            <div></div>
            <a href="/" target="_blank" class="btn-small blue">Buy Now</a>
            <i class="material-icons" onclick="removeFromCart(${item.id})">close</i>
      </div>
  `).join('');

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

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn-small.right").addEventListener("click", updateCartPrices);
});

async function updateCartPrices() {
  let matchingProducts = [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // code here to generate the prices and store location
  await fetch('http://localhost:5000/get-discounted-products')
  .then(response => response.json())
  .then(data => {
      const products = data.discounted_products;

// Loop through the cart array and check against products array
      cart.forEach(cartProduct => {
      // Check if the cart product name matches any product in products
      const matchingProduct = products.find(product => product.Product === cartProduct.name);

      if (matchingProduct) {
        if (matchingProduct.Price_Coles !== null) {
          productData = {
            cartProductName: cartProduct.name,
            Price: matchingProduct.Price_Coles,
            Store: "Coles",
            url: "https://www.coles.com.au/"
          };
        } else if (matchingProduct.Price_Aldi !== null) {
          productData = {
            cartProductName: cartProduct.name,
            Price: matchingProduct.Price_Aldi,
            Store: "Aldi",
            url: "https://www.aldi.com.au/"
          };
        } else if (matchingProduct.Price_IGA !== null) {
          productData = {
            cartProductName: cartProduct.name,
            Price: matchingProduct.Price_IGA,
            Store: "IGA",
            url: "https://www.iga.com.au/"
          };
        } else if (matchingProduct.Price_Woolworths !== null) {
          productData = {
            cartProductName: cartProduct.name,
            Price: matchingProduct.Price_Woolworths,
            Store: "Woolworths",
            url: "https://www.woolworths.com.au/"
          };
        }

        if (Object.keys(productData).length > 0) {
          matchingProducts.push(productData);
        }
      } else {
        console.log(`No match found for: ${cartProduct.name}`);
      }
    });

     // Now update the cart with prices and store
    const cartContainer = document.getElementById("cart-header");

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = "0.00";
      return;
  }

     // Update the cart with prices and store names
    cartContainer.innerHTML = cart.map(item => {
      const product = matchingProducts.find(product => product.cartProductName === item.name);

      const productPrice = product ? product.Price : 0;
      const productStore = product ? product.Store : 'No store available';
      const productUrl = product.url;

        return `
        <div class="cart-item">
          <div>${item.name}</div>
          <div>$${productPrice}</div>
          <div>${productStore}</div>
          <a href="${productUrl}" target="_blank" class="btn-small blue">Buy Now</a>
          <i class="material-icons" onclick="removeFromCart(${item.id})">close</i>
        </div>
      `;
    }).join('');

  })
  .catch(error => {
      console.log('Error fetching data:', error);
  });
  }

updateCart();