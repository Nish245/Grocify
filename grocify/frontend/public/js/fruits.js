// Function used in fruits.html

// This function adds the product to the cart
function addToCart(productName) {
    // Get the current cart items from localStorage or initialize it as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Add the new product to the cart
    cart.push(productName);
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

//filer function

  document.addEventListener('DOMContentLoaded', () => {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceFilter = document.getElementById('price-filter');
    const priceDisplay = document.getElementById('price-display');
    const productList = document.getElementById('product-list');

    // Update price display dynamically
    priceFilter.addEventListener('input', () => {
      priceDisplay.textContent = `Up to $${priceFilter.value}`;
      filterProducts();
    });

    // Filter products when a checkbox is clicked
    categoryFilters.forEach((checkbox) => {
      checkbox.addEventListener('change', filterProducts);
    });

    function filterProducts() {
      const selectedCategories = Array.from(categoryFilters)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
      const maxPrice = parseInt(priceFilter.value, 10);

      // Filter logic (mock data used as example)
      const allProducts = [
        { name: 'Apple', price: 10, category: 'Apple',  description: 'Fresh Apples from Washington'},
        { name: 'Banana', price: 5, category: 'Banana', description: 'Fresh Bananas from Ecuador'},
        { name: 'Orange', price: 8, category: 'Orange', description: 'Fresh Oranges from Florida'},
        { name: 'Kiwi', price: 15, category: 'Kiwi', description: 'Fresh Kiwi from New Zealand'},
        { name: 'Kiwi', price: 10, category: 'Kiwi', description: 'Fresh Kiwi from Australia'},
      ];

      const filteredProducts = allProducts.filter((product) => {
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category);
        const matchesPrice = product.price <= maxPrice;
        return matchesCategory && matchesPrice;
      });

      // Update UI
      renderProducts(filteredProducts);
    }

    function renderProducts(products) {
      productList.innerHTML = products
        .map(
          (product) => `
            <div class="col s12 m6 l3">
              <div class="product-card">
                <div class="product-card-image">
                  <img src="assets/${product.name.toLowerCase()}.jpg" alt="${product.name}">
                  <div class="product-card-title-overlay">
                    <h5>${product.name}</h5>
                  </div>
                  <div class="product-card-overlay">
                    <h5 class="left-align">${product.name}</h5>
                    <p>${product.category}</p>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <div class="center">
                      <a href="#" class="btn" onclick="addToCart('${product.name}')">Add to Cart</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>`
        )
        .join('');
    }

    // Initial render
    filterProducts();
  });

    // Add Fruit Script
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const addFruitForm = document.getElementById('add-fruit-form');

    // Function to render a product
    const renderProduct = (product) => {
    const productCard = document.createElement('div');
    productCard.className = 'col s12 m6 l3';
    productCard.innerHTML = `
            <div class="product-card">
            <div class="product-card-image">
                <img src="assets/${product.name.toLowerCase()}.jpg" alt="${product.name}">
                <div class="product-card-title-overlay">
                <h5>${product.name}</h5>
                </div>
                <div class="product-card-overlay">
                <h5 class="left-align">${product.name}</h5>
                <p>${product.category}</p>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <div class="center">
                    <a href="#" class="btn" onclick="addToCart('${product.name}')">Add to Cart</a>
                </div>
                </div>
            </div>
            </div>
        </div>
    `
    productList.appendChild(productCard);
    };

// Handle form submission
    addFruitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('fruit-name').value;
        const category = document.getElementById('fruit-category').value;
        const description = document.getElementById('fruit-description').value;
        const price = document.getElementById('fruit-price').value;
        const image = document.getElementById('fruit-image').value;

        const newFruit = { name, description, price, image };
        renderProduct(newFruit);

        // Reset form fields
        addFruitForm.reset();
        M.toast({ html: `${name} has been added!` });
        console.log('New fruit added:', newFruit);
        });
    });

  // Add Fruits Model Initialization
    document.addEventListener('DOMContentLoaded', function () {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    });