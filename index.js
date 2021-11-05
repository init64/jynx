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

const _users = require('./json/users.json')
const _messages = require('./json/messages.json')

app.use('/', express.static(path.join(__dirname + '/dist')))

const getConfig = () => JSON.parse(fs.readFileSync('./json/config.json', 'utf-8'));

const loadUsers = data => fs.writeFile('./json/users.json', JSON.stringify(data), { encoding: 'utf-8' }, err => err ? console.log(err) : '')
const loadMessages = data => fs.writeFile('./json/messages.json', JSON.stringify(data), { encoding: 'utf-8' }, err => err ? console.log(err) : '')

const getPlatform = pf => {
    if (/Windows/.test(pf)) return 'Windows'
    if (/Android/.test(pf)) return 'Android'
    if (/iPhone/.test(pf)) return 'iPhone'
    if (/Linux/.test(pf)) return 'Linux'
}

let onlineUsers = []

io.on('connection', socket => {

    // ? Functions
    const emitLoadUsers = () => {
        socket.on('chat:getUsers', () => {
            io.emit('chat:loadUsers', onlineUsers.map(x => {
                x = _users[x]
                return x
            }))
        })
    }


    // * System Events
    socket.emit('system:technicalWorks', getConfig().technicalWorks)


    // * User Events
    socket.on('user:connect', tokens => {
        console.log(tokens)
        if (!_users[tokens?.token]) {
            tokens = {
                id: generat({ type: 'All', length: 24 }),
                token: generat({ type: 'All', length: 24 })
            }
            _users[tokens.token] = { id: tokens.id, token: tokens.token, username: '', color: '#fff', avatar: '' }
            loadUsers(_users)
        }
       // _users[id]['platform'] = getPlatform(socket.handshake.headers['user-agent'])
       // socket.userID = id;
       // if (!onlineUsers.find(f => f === socket.userID)) onlineUsers.push(socket.userID)
        socket.emit('user:loadUser', _users[tokens.token])
       // emitLoadUsers()
    })

    socket.on('user:update', params => {
        let user = _users[socket.userID]
        for (let param in params) user[param] = params[param];
        loadUsers(_users)
        emitLoadUsers()
    })

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(f => f !== socket.userID)
        emitLoadUsers()
    })


    // * Chat Events
    socket.on('chat:getMessages', () => {
        let messages = [];
        for (let message of _messages) messages.push({ ...message, user: _users[message.user] })
        socket.emit('chat:loadMessages', messages)
    })

    socket.on('chat:getUsers', () => {
        emitLoadUsers()
    })

    socket.on('chat:sendMessage', message => {
        let data = {
            content: message,
            id: generat({ type: 'All', length: 18 }),
            user: socket.userID,
            date: Date.now()
        }
        _messages.push(data)
        loadMessages(_messages)
        io.emit('chat:addMessage', { ...data, user: _users[socket.userID] })
    })
})
