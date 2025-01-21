// Function used in milk.html


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
    const sizeFilters = document.querySelectorAll('.size-filter');
    const priceFilter = document.getElementById('price-filter');
    const priceDisplay = document.getElementById('price-display');
    const productList = document.getElementById('product-list');

    // Update price display dynamically
    priceFilter.addEventListener('input', () => {
      priceDisplay.textContent = `Up to $${priceFilter.value}`;
      filterProducts();
    });

    // Filter products when a categoryFilters checkbox is clicked
    categoryFilters.forEach((checkbox) => {
      checkbox.addEventListener('change', filterProducts);
    });

    // Filter products when a sizeFilters checkbox is clicked
    sizeFilters.forEach((checkbox) => {
      checkbox.addEventListener('change', filterProducts);
    });

    function filterProducts() {
      const selectedCategories = Array.from(categoryFilters)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
      const selectedSizes = Array.from(sizeFilters)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
      const maxPrice = parseInt(priceFilter.value, 10);

      // Filter logic (mock data used as example)
      const allProducts = [
        { name: 'Full Cream Milk',size: 1, price: 10, category: 'Full Cream',  description: 'Fresh Full Cream Milk from Gippsland'},
        { name: 'Low Fat Milk', size: 2, price: 8, category: 'Low Fat', description: 'Low Fat Milk from Gippsland'},
        { name: 'Skimmed Milk', size: 3, price: 6, category: 'Skimmed', description: 'Skimmed Milk from Gippsland'},
        { name: 'Soy Milk', size: 4, price: 7, category: 'Soy', description: 'Soy Milk from Gippsland'},
        { name: 'Almond Milk', size: 3, price: 9, category: 'Almond', description: 'Almond Milk from Gippsland'},
        { name: 'Oat Milk', size: 2, price: 8, category: 'Oat', description: 'Oat Milk from Gippsland'},
        { name: 'Coconut Milk', size: 1, price: 10, category: 'Coconut', description: 'Coconut Milk from Gippsland'},
        { name: 'Rice Milk', size: 2, price: 7, category: 'Rice', description: 'Rice Milk from Gippsland'},
      ];

      const filteredProducts = allProducts.filter((product) => {
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category);
        const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.size.toString());
        const matchesPrice = product.price <= maxPrice;
        return matchesCategory && matchesPrice && matchesSize;
      });

      // Update UI
      renderProducts(filteredProducts);
    }

        //Please replace the following line if you have the images
    // <img src="assets/${product.name.toLowerCase()}.jpg" alt="${product.name}">

    function renderProducts(products) {
      productList.innerHTML = products
        .map(
          (product) => `
            <div class="col s12 m6 l3">
              <div class="product-card">
                <div class="product-card-image">
                  <img src="assets/milks.jpg" alt="${product.name}">
                  <div class="product-card-title-overlay">
                    <h5>${product.name}</h5>
                  </div>
                  <div class="product-card-overlay">
                    <h5 class="left-align">${product.name}</h5>
                    <p>${product.category}</p>
                    <p>${product.description}</p>
                    <p>Size: ${product.size}L</p>
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

    // Add Milk Script
    document.addEventListener('DOMContentLoaded', () => {
      const productList = document.getElementById('product-list');
      const addMilkForm = document.getElementById('add-milk-form');

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
                    <p>Size: ${product.size}L</p>
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
      addMilkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('milk-name').value;
        const category = document.getElementById('milk-category').value;
        const description = document.getElementById('milk-description').value;
        const price = document.getElementById('milk-price').value;
        const size = document.getElementById('milk-size').value;
        const image = document.getElementById('milk-image').value;

        const newMilk = { name, category, description, price, size, image };
        renderProduct(newMilk);

        // Reset form fields
        addMilkForm.reset();
        M.toast({ html: `${name} has been added!` });
        console.log('New Milk added:', newMilk);
      });
    });


  // Add Milks Model Initialization

    document.addEventListener('DOMContentLoaded', function () {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    });
