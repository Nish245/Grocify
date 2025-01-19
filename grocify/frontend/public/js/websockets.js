// Web sockets
let socket = io();
socket.on('discountModel', () => {
    console.log('Discount Model API action here.');
});