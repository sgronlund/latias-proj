var app = require('express')();

/** 
 * CORS is a mechanism which restricts us from hosting both the client and the server.
 * The package cors allows us the bypass this
 * */ 
var cors = require('cors');
app.use(cors());

/// Creates an HTTP server using ExpressJS
var http = require('http').createServer(app);
const PORT = 8080;
/// The cors: ... is also required to bypass the restriction stated above
var io = require('socket.io')(http, {cors: {origin:"*"}});

/// Starts listening on the chosen port
http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});


/// Determines the behavious for when a client connects to our socket.
io.on('connection', (socket) => { 
    // Logs in the server that a client has connected
    console.log('new client connected');
    socket.emit('connection', null);
    // If the socket receives btnpress from a client do the following
    socket.on('btnpress', () => {
        console.log("hello");
    })
});
