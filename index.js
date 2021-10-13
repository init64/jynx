const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const port = process.argv[2] ? process.argv[2] : 4041;
const io = require('socket.io')(http.listen(port, () => {
    console.log('Serever has been started:\n PORT: ' + port);
}));

app.use('/', express.static(path.join(__dirname + '/dist')))

io.on('connection', (socket) => {
    socket.on('chatMessage', data => {
        io.emit('chatMessage', {
            name: data.name,
            message: data.message
        })
    })
})

console.log(process.argv[2])
