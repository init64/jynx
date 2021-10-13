const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http.listen(4041, () => {
    console.log('Serever has been started:\n PORT: 4041');
}));

app.use('/', express.static(path.join(__dirname + '/public')))

io.on('connection', (socket) => {
    socket.on('chatMessage', data => {
        io.emit('chatMessage', {
            name: data.name,
            message: data.message
        })
    })
})