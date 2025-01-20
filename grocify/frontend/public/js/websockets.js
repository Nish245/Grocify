// Web sockets
let socket = io();
socket.on('discountModel', async () => {
    await fetch('http://localhost:5000/get-discounted-products')
        .then(response => response.json())
        .then(data => {
            const products = data.discounted_products;

            // Loop through the products and log details
            products.forEach((product, index) => {
            console.log(`Product ${index + 1}: ${product.Product}`);
            console.log(`Price at Coles: ${product.Price_Coles || 'N/A'}`);
            console.log(`Price at Aldi: ${product.Price_Aldi || 'N/A'}`);
            console.log(`Price at IGA: ${product.Price_IGA || 'N/A'}`);
            console.log(`Price at Woolworths: ${product.Price_Woolworths || 'N/A'}`);

            // Example: Accessing a specific product
            const firstProduct = products[0];
            console.log('First Product:', firstProduct);
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
        })


    // try {
    //     const response = await fetch('http://localhost:5000/get-discounted-products', {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json'},
    //     });
    //     const result = await response.json();
    //     if (response.ok) {

    //         console.log(result)
    //     }
    //     else {
    //         console.log(result.error)
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
});