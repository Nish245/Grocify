// Web sockets
let socket = io();
socket.on('discountModel', async () => {
    await fetch('http://localhost:5000/get-discounted-products')
        .then(response => response.json())
        .then(data => {
            const products = data.discounted_products;
            let randomIndex = Math.floor(Math.random() * products.length);
            let discounted_product = products[randomIndex]

            if (discounted_product.Price_Coles !== null) {
                productData = {
                ProductName: discounted_product.Product,
                Price: discounted_product.Price_Coles,
                Store: "Coles"
                };
            } else if (discounted_product.Price_Aldi !== null) {
                productData = {
                ProductName: discounted_product.Product,
                Price: discounted_product.Price_Aldi,
                Store: "Aldi"
                };
            } else if (discounted_product.Price_IGA !== null) {
                productData = {
                ProductName: discounted_product.Product,
                Price: discounted_product.Price_IGA,
                Store: "IGA"
                };
            } else if (discounted_product.Price_Woolworths !== null) {
                productData = {
                ProductName: discounted_product.Product,
                Price: discounted_product.Price_Woolworths,
                Store: "Woolworths"
                };
            }
            // send alert to frontend user for the discount
            alert(`${productData.ProductName} is on sale at ${productData.Store} for $${productData.Price}`);
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
});