const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io').listen(http);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('testRoom', (data) => {
        console.log('got data from socket ' + socket.id);
        console.log(data);
        if (typeof data === 'object') {
            socket.broadcast.emit('testRoom', {... data, socketId: socket.id});
        } else {
            socket.broadcast.emit('testRoom', { data: data, socketId: socket.id});
        }
    });
});

const PORT = process.argv[2] || 3000;

http.listen(PORT, () => {
    console.log('server started, listening to port ' + PORT);
});
