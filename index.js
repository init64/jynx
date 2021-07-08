const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http.listen(4041, () => {
    console.log('Serever has been started:\n PORT: 4041');
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.use(express.static(__dirname + '/assets'));

io.on('connection', (socket) => {
    socket.on('chatMessage', data => {
        io.emit('chatMessage', {
            name: data.name,
            message: data.message
        })
    })
})