const csvFilePath = "/assets/csv/products-2.csv";

async function loadMilksProducts() {
    try {
        const response = await fetch(csvFilePath);
        if (!response.ok) throw new Error("Failed to load CSV");
        const text = await response.text();
        const milksProducts = parseCSV(text);

        // Store all products globally for filtering
        localStorage.setItem("allProducts", JSON.stringify(milksProducts));

        populateTypeFilters(milksProducts);
        initializePriceSlider(milksProducts); // Initialize price range
        displayMilksProducts(milksProducts);
    } catch (error) {
        console.error("Error fetching CSV:", error);
    }
}

function parseCSV(csv) {
    const rows = csv.split("\n").map(row => row.split(","));
    const headers = rows[0].map(header => header.trim());
    const milksProducts = [];

    for (let i = 1; i < rows.length; i++) {
        let row = rows[i].map(value => value.trim() || "N/A");

        if (row[headers.indexOf("Category")] === "Milk") {
            let prices = {
                Aldi: parseFloat(row[headers.indexOf("Price_Aldi")]) || Infinity,
                Coles: parseFloat(row[headers.indexOf("Price_Coles")]) || Infinity,
                IGA: parseFloat(row[headers.indexOf("Price_IGA")]) || Infinity,
                Woolworths: parseFloat(row[headers.indexOf("Price_Woolworths")]) || Infinity
            };

            let cheapestStore = "N/A";
            let cheapestPrice = Infinity;

            for (let store in prices) {
                if (prices[store] < cheapestPrice) {
                    cheapestPrice = prices[store];
                    cheapestStore = store;
                }
            }

            if (cheapestPrice === Infinity) {
                cheapestPrice = "N/A";
                cheapestStore = "N/A";
            }

            milksProducts.push({
                id: i,
                name: row[headers.indexOf("Product")],
                type: row[headers.indexOf("Type")],
                cheapestPrice: cheapestPrice,
                cheapestStore: cheapestStore,
                averageprice: row[headers.indexOf("Average_Price")],
                image: row[headers.indexOf("image")] !== "N/A" ? row[headers.indexOf("image")] : "https://via.placeholder.com/200?text=No+Image"
            });
        }
    }

    return milksProducts;
}

// Populate sidebar filters dynamically
function populateTypeFilters(milksProducts) {
    const typeContainer = document.getElementById("type-filters");
    if (!typeContainer) {
        console.error("Error: #type-filters element not found in the HTML.");
        return;
    }

    typeContainer.innerHTML = ""; // Clear previous filters

    const uniqueTypes = [...new Set(milksProducts.map(product => product.type))];

    uniqueTypes.forEach(type => {
        const filterItem = document.createElement("label");
        filterItem.innerHTML = `
            <input type="checkbox" class="type-checkbox" value="${type}" onchange="applyFilters()">
            <span>${type}</span>
        `;
        typeContainer.appendChild(filterItem);
    });
}

// Initialize price range slider
function initializePriceSlider(milksProducts) {
    const priceSlider = document.getElementById("price-slider");
    const priceDisplay = document.getElementById("price-display");

    if (!priceSlider || !priceDisplay) {
        console.error("Error: Price slider or display element not found in the HTML.");
        return;
    }

    const maxPrice = Math.max(...milksProducts.map(product => product.cheapestPrice === "N/A" ? 0 : product.cheapestPrice));

    priceSlider.max = Math.ceil(maxPrice);
    priceSlider.value = Math.ceil(maxPrice); // Default to max value
    priceDisplay.textContent = `Up to $${priceSlider.value}`;

    priceSlider.addEventListener("input", () => {
        priceDisplay.textContent = `Up to $${priceSlider.value}`;
        applyFilters();
    });
}


function applyFilters() {
    let selectedTypes = Array.from(document.querySelectorAll(".type-checkbox:checked")).map(cb => cb.value);
    let maxPrice = parseFloat(document.getElementById("price-slider").value);
    
    // Get all products
    let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

    // Apply filters
    let filteredProducts = allProducts.filter(product => {
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
        const matchesPrice = product.cheapestPrice !== "N/A" && product.cheapestPrice <= maxPrice;
        return matchesType && matchesPrice;
    });

    displayMilksProducts(filteredProducts);
}

function displayMilksProducts(milksProducts) {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = milksProducts.map(product => `
        <div class="col s12 m6 l6">
            <div class="product-card">
                <div class="product-card-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-card-title-overlay">
                        <h5 class="card-title">${product.name}</h5>
                    </div>
                    <div class="product-card-overlay">
                        <h5 class="left-align">${product.name}</h5>
                        <p>Cheapest Price: $${product.cheapestPrice} at <b>${product.cheapestStore}</b></p>
                        <p>Average Price: $${product.averageprice}</p>
                        <div class="center">
                            <button class="btn" onclick="addToCart(${product.id}, '${product.name}', ${product.cheapestPrice})">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(id, name, price) {
    if (price === "N/A") {
        alert("This item is currently unavailable.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: id, name: name, price: parseFloat(price), quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart at $${price}!`);
}

loadMilksProducts();
