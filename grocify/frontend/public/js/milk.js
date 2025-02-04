const csvFilePath = "/assets/csv/temp.csv";

        async function loadMilkProducts() {
            try {
                const response = await fetch(csvFilePath);
                if (!response.ok) throw new Error("Failed to load CSV");
                const text = await response.text();
                displayMilkProducts(parseCSV(text));
            } catch (error) {
                console.error("Error fetching CSV:", error);
            }
        }

        function parseCSV(csv) {
            const rows = csv.split("\n").map(row => row.split(","));
            const headers = rows[0].map(header => header.trim());
            const milkProducts = [];

            for (let i = 1; i < rows.length; i++) {
                let row = rows[i].map(value => value.trim() || "N/A");

                if (row[headers.indexOf("Category")] === "Milk") {
                    milkProducts.push({
                        id: i,
                        name: row[headers.indexOf("Product")],
                        price: parseFloat(row[headers.indexOf("Price_Aldi")]) || 0,
                        image: "https://via.placeholder.com/200?text=" + row[headers.indexOf("Product")]
                    });
                }
            }

            return milkProducts;
        }

        // <div class="product-card">
        //             <img src="${product.image}" alt="${product.name}">
        //             <h4>${product.name}</h4>
        //             <p>$${product.price.toFixed(2)}</p>
        //             <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        //         </div>

        function displayMilkProducts(milkProducts) {
            const productContainer = document.getElementById("product-list");
            productContainer.innerHTML = milkProducts.map(product => `
                <div class="col s12 m6 l3>
                    <div class="product-card">
                            <img src="assets/milks.jpg" width="30%" alt="${product.name}">
                            <h5 class="left-align">${product.name}</h5>
                            <p>${product.price.toFixed(2)}</p>
                            <div class="center">
                                <button class="btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
                            </div>
                    </div>
                </div>
            `).join('');
        }

        function addToCart(id, name, price) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id: id, name: name, price: parseFloat(price), quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} added to cart!`);
        }

        loadMilkProducts();