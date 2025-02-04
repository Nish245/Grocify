let products = [];
let categories = new Set();
let fruitTypes = new Set();
let milkTypes = new Set();
const csvFilePath = "/assets/csv/products-2.csv";

// Fetch CSV data
async function fetchCSV() {
    try {
        const response = await fetch(csvFilePath);
        if (!response.ok) throw new Error("Failed to load CSV");
        const text = await response.text();
        parseCSV(text);
    } catch (error) {
        console.error("Error fetching CSV:", error);
    }
}

// Parse CSV
function parseCSV(csv) {
    const rows = csv.split("\n").map(row => row.split(","));
    products = [];

    const headers = rows[0].map(header => header.trim());
    const expectedHeaders = [
        "Product", "Category", "Type",
        "Price_Aldi", "ppu_Aldi", "Category_Aldi", "Product_URL_Aldi",
        "Price_Coles", "ppu_Coles", "Category_Coles", "Product_URL_Coles",
        "Price_IGA", "ppu_IGA", "Category_IGA", "Product_URL_IGA",
        "Price_Woolworths", "ppu_Woolworths", "Category_Woolworths", "Product_URL_Woolworths",
        "Average_Price"
    ];

    if (!expectedHeaders.every(header => headers.includes(header))) {
        console.error("CSV headers do not match.");
        return;
    }

    for (let i = 1; i < rows.length; i++) {
        let row = rows[i].map(value => value.trim() || "N/A");

        let category = row[headers.indexOf("Category")];
        let type = row[headers.indexOf("Type")];

        if (category !== "N/A") categories.add(category);
        if (category === "Fruits" && type !== "N/A") fruitTypes.add(type);
        if (category === "Milk" && type !== "N/A") milkTypes.add(type);

        products.push({
            product: row[headers.indexOf("Product")],
            category: category,
            type: type,
            priceAldi: parseFloat(row[headers.indexOf("Price_Aldi")]) || "N/A",
            priceColes: parseFloat(row[headers.indexOf("Price_Coles")]) || "N/A",
            priceIGA: parseFloat(row[headers.indexOf("Price_IGA")]) || "N/A",
            priceWoolworths: parseFloat(row[headers.indexOf("Price_Woolworths")]) || "N/A",
            avgPrice: parseFloat(row[headers.indexOf("Average_Price")]) || "N/A",
            urlAldi: row[headers.indexOf("Product_URL_Aldi")],
            urlColes: row[headers.indexOf("Product_URL_Coles")],
            urlIGA: row[headers.indexOf("Product_URL_IGA")],
            urlWoolworths: row[headers.indexOf("Product_URL_Woolworths")]
        });
    }

    populateCategoryFilters();
    populateFruitTypes();
    populateMilkTypes();
    applyFilters(); // Automatically apply filters when loading
}

/// Populate Filters
function populateCategoryFilters() {
    const categoryContainer = document.getElementById("categoryFilters");
    categoryContainer.innerHTML = "";

    categories.forEach(category => {
        categoryContainer.innerHTML += `
        <p>
            <label>
                <input type="checkbox" class="category-checkbox" value="${category}" onchange="applyFilters(); toggleSubFilter('${category}')">
                <span>${category}</span>
            </label>
        </p>
        `;
    });
}

function populateFruitTypes() {
    const fruitTypeContainer = document.getElementById("fruitTypes");
    fruitTypeContainer.innerHTML = "";

    fruitTypes.forEach(type => {
        fruitTypeContainer.innerHTML += `
        <p>
            <label>
                <input type="checkbox" class="fruit-type-checkbox" value="${type}" onchange="applyFilters()">
                <span>${type}</span>
            </label>
        </p>
        `;
    });
}

function populateMilkTypes() {
    const milkTypeContainer = document.getElementById("milkTypes");
    milkTypeContainer.innerHTML = "";

    milkTypes.forEach(type => {
        milkTypeContainer.innerHTML += `
        <p>
            <label>
                <input type="checkbox" class="milk-type-checkbox" value="${type}" onchange="applyFilters()">
                <span>${type}</span>
            </label>
        </p>
        `;
    });
}

// Toggle Sub-Filters
function toggleSubFilter(category) {
    document.getElementById("fruitTypeFilter").style.display =
        document.querySelector(`input[value="Fruits"]`).checked ? "block" : "none";

    document.getElementById("milkTypeFilter").style.display =
        document.querySelector(`input[value="Milk"]`).checked ? "block" : "none";

    applyFilters();
}

// Apply Filters
function applyFilters() {
    let selectedCategories = Array.from(document.querySelectorAll(".category-checkbox:checked")).map(cb => cb.value);
    let selectedFruitTypes = Array.from(document.querySelectorAll(".fruit-type-checkbox:checked")).map(cb => cb.value);
    let selectedMilkTypes = Array.from(document.querySelectorAll(".milk-type-checkbox:checked")).map(cb => cb.value);
    // let maxPrice = document.getElementById("priceRange").value;
    // document.getElementById("priceValue").innerText = maxPrice;

    let filteredProducts = products.filter(product =>
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        (selectedFruitTypes.length === 0 || selectedFruitTypes.includes(product.type)) &&
        (selectedMilkTypes.length === 0 || selectedMilkTypes.includes(product.type)) 
        // &&
        // (product.avgPrice <= maxPrice || product.avgPrice === "N/A")
    );

    displayTable(filteredProducts);
}

    // Display Table Data
function displayTable(data) {
    const tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = "";

    data.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.product}</td>
            <td>${product.priceAldi === "N/A" ? "N/A" : `$${product.priceAldi.toFixed(2)}`}</td>
            <td>${product.priceColes === "N/A" ? "N/A" : `$${product.priceColes.toFixed(2)}`}</td>
            <td>${product.priceIGA === "N/A" ? "N/A" : `$${product.priceIGA.toFixed(2)}`}</td>
            <td>${product.priceWoolworths === "N/A" ? "N/A" : `$${product.priceWoolworths.toFixed(2)}`}</td>
            <td>${product.avgPrice === "N/A" ? "N/A" : `$${product.avgPrice.toFixed(2)}`}</td>
            <td>
                ${product.urlAldi !== "N/A" ? `<a href="${product.urlAldi}" target="_blank" class="store-btn">Aldi</a>` : ""}
                ${product.urlColes !== "N/A" ? `<a href="${product.urlColes}" target="_blank" class="store-btn">Coles</a>` : ""}
                ${product.urlIGA !== "N/A" ? `<a href="${product.urlIGA}" target="_blank" class="store-btn">IGA</a>` : ""}
                ${product.urlWoolworths !== "N/A" ? `<a href="${product.urlWoolworths}" target="_blank" class="store-btn">Woolworths</a>` : ""}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

fetchCSV();