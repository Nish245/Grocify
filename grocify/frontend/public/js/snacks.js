// Fucntion used in Snacks.js

// Add Item to Cart Functions
function addToCart(productName) {
    // Get the current cart items from localStorage or initialize it as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Add the new product to the cart
    cart.push(productName);
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

//   <!-- filer function -->

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
        { name: 'Avocado Toast', price: 10, category: 'Toast',  description: 'Fresh baked bread with avocado spread' },
        { name: 'Banana Bread', price: 15, category: 'Bread', description: 'Freshly baked banana bread' },
        { name: 'Orange Juice', price: 5, category: 'Juice', description: 'Freshly squeezed orange juice' },
        { name: 'Kiwi Smoothie', price: 8, category: 'Smoothie', description: 'Fresh kiwi blended with yogurt' },
        { name: 'Apple Pie', price: 20, category: 'Pie', description: 'Homemade apple pie with a flaky crust' },
        { name: 'Banana Muffin', price: 12, category: 'Muffin', description: 'Freshly baked banana muffin' },
        { name: 'Orange Sorbet', price: 7, category: 'Sorbet', description: 'Refreshing orange sorbet' },
        { name: 'Fruit Salad', price: 9, category: 'Salad', description: 'Fresh fruits salad with mixed greens' },
    
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


        //Please replace the following line if you have the images
      //<img src="assets/${product.name.toLowerCase()}.jpg" alt="${product.name}">
    function renderProducts(products) {
      productList.innerHTML = products
        .map(
          (product) => `
            <div class="col s12 m6 l3">
              <div class="product-card">
                <div class="product-card-image">
                  <img src="assets/snacks.jpg" alt="${product.name}">
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

    // Add Snack Script
    document.addEventListener('DOMContentLoaded', () => {
      const productList = document.getElementById('product-list');
      const addSnacksForm = document.getElementById('add-snacks-form');

        //Please replace the following line if you have the images
      //<img src="assets/${product.name.toLowerCase()}.jpg" alt="${product.name}">

      // Function to render a product
      const renderProduct = (product) => {
        const productCard = document.createElement('div');
        productCard.className = 'col s12 m6 l3';
        productCard.innerHTML = `
              <div class="product-card">
                <div class="product-card-image">
                  <img src="assets/apple.jpg" alt="${product.name}">
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
    addSnacksForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('snacks-name').value;
        const category = document.getElementById('snacks-category').value;
        const description = document.getElementById('snacks-description').value;
        const price = document.getElementById('snacks-price').value;
        const image = document.getElementById('snacks-image').value;

        const newSnacks = { name, category, description, price, image };
        renderProduct(newSnacks);

        // Reset form fields
        addSnacksForm.reset();
            M.toast({ html: `${name} has been added!` });
            console.log('New Snacks added:', newSnacks);
        });
    });

  // Add Snack Model Initialization
    document.addEventListener('DOMContentLoaded', function () {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    });
