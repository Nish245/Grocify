const express = require('express');
let app = express();
let port = process.env.port || 3000;
// require('./models/dbConnect');
// let router = require('./routers/routers');
// const { Socket } = require('socket.io');
let http = require('http').createServer(app);
// let io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use('/api/routers',router);

http.listen(port, ()=>{
    console.log('express server started');
    console.log("App listening to: "+ port)
});

//404 Not Found
app.get("/:universalURL", (req, res) => {
    // res.send("404 URL NOT FOUND");
    res.status(404).sendFile(__dirname + '/views/404.html');
});