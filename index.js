const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = process.argv[2] ? process.argv[2] : 4041;

const http = require('http').createServer(app);
const io = require('socket.io')(http.listen(port, () => {
    console.log('Serever has been started:\n PORT: ' + port);
}));

const { generat } = require('./q.js')

app.use('/', express.static(path.join(__dirname + '/dist')))

const getUsers = () => JSON.parse(fs.readFileSync('./json/users.json', 'utf-8'));
const loadUsers = data => fs.writeFile('./json/users.json', JSON.stringify(data), 'utf-8', err => err ? console.log(err) : '')

io.on('connection', socket => {

    // * User Events
    socket.on('user:connect', userID => {
        let users = getUsers();
        let id = userID;
        if (!users[userID]) {
            id = generat({ type: 'All', length: 24 })
            users[id] = { id, username: '', color: '#fff', avatar: '' }
            loadUsers(users)
        }
        socket.userID = id;
        socket.emit('user:loadUser', users[id])
    })

    socket.on('user:update', params => {
        let users = getUsers();
        let user = users[socket.userID]
        for (let param in params) user[param] = params[param];
        loadUsers(users)
    })


    // * Chat Events
    socket.on('chatMessage', data => {
        io.emit('chatMessage', {
            name: data.name,
            message: data.message
        })
    })
})