// Web sockets
let socket = io();
socket.on('discountModel', async () => {
    try {
        const response = await fetch('http://localhost:5000/get-discounted-products', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        });
        const result = await response.json();
        if (response.ok) {
            console.log(result)
        }
        else {
            console.log(result.error)
        }
    } catch (error) {
        console.log(error)
    }
});