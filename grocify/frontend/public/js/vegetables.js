// Function used in Vegetables.html


    // Search Functionality
    document.getElementById('search-btn').addEventListener('click', function () {
      const query = document.getElementById('search-input').value.trim();
      if (query) {
        console.log(`Search for: ${query}`); // Replace with actual search logic
        alert(`You searched for: "${query}"`);
      } else {
        alert('Please enter a search term.');
      }
    });

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
        { name: 'Broccoli', price: 10, category: 'Broccoli',  description: 'Fresh Broccoli from Australia'},
        { name: 'Carrots', price: 5, category: 'Carrots', description: 'Fresh Carrots from Australia'},
        { name: 'Cauliflower', price: 8, category: 'Cauliflower', description: 'Fresh Cauliflower from Australia'},
        { name: 'Spinach', price: 15, category: 'Spinach', description: 'Fresh Spinach from Australia'},
        { name: 'Bok choy', price: 10, category: 'Bok Choy', description: 'Fresh Bok Choy from Hong Kong'},
        { name: 'Bell pepper', price: 5, category: 'Bell Pepper', description: 'Fresh Bell Pepper from Mexico'},
        { name: 'Cabbage', price: 8, category: 'Cabbage', description: 'Fresh Cabbage from California'},
        { name: 'Cucumber', price: 15, category: 'Cucumber', description: 'Fresh Cucumber from India'},
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

    // Please add acutal to Render products into the UI
    // <img src="assets/${product.name.toLowerCase()}.jpg" alt="${product.name}">

    function renderProducts(products) {
      productList.innerHTML = products
        .map(
          (product) => `
            <div class="col s12 m6 l3">
              <div class="product-card">
                <div class="product-card-image">
                  <img src="assets/broccoli.jpg" alt="${product.name}"> // temp image
                  <div class="product-card-title-overlay">
                    <h5>${product.name}</h5>
                  </div>
                  <div class="product-card-overlay">
                    <h5 class="left-align">${product.name}</h5>
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



    // Add Vegetables Script
    document.addEventListener('DOMContentLoaded', () => {
      const productList = document.getElementById('product-list');
      const addVegetablesForm = document.getElementById('add-vegetables-form');

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
      addVegetablesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('vegetables-name').value;
        const description = document.getElementById('vegetables-description').value;
        const price = document.getElementById('vegetables-price').value;
        const image = document.getElementById('vegetables-image').value;

        const newVegetables = { name, description, price, image };
        renderProduct(newVegetables);

        // Reset form fields
        addVegetablesForm.reset();
        M.toast({ html: `${name} has been added!` });
        console.log('New Vegetables added:', newVegetables);
      });
    });
