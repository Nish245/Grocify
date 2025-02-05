const express = require('express');
let app = express();
let port = process.env.port || 3000;
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use('/api/routers',router);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('a user disconnected');
    });

    setTimeout(()=> {
        socket.emit('discountModel');
        console.log('Discount Model API call.');
    }, 10000)
  });

http.listen(port, ()=>{
    console.log('express server started');
    console.log("App listening to: "+ port)
});

//404 Not Found
app.get("/:universalURL", (req, res) => {
    // res.send("404 URL NOT FOUND");
    res.status(404).sendFile(__dirname + '/views/404.html');
});