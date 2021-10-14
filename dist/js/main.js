const socket = io();

const app = new Vue({
    el: '#app',
    data: {
        page: 'login',
        user: {},
        messages: [],
        content: '',
        platforms: {
            Windows: 'uil uil-windows',
            Linux: 'uil uil-linux',
            Android: 'uil uil-android-alt',
            iPhone: 'uil uil-apple-alt'
        },
        users: [],
        panels: {
            users: true
        },
        profile: {
            open: false
        }
    },
    methods: {
        buttonLogin() {
            socket.emit('user:update', { username: this.user.username })
            this.page = 'chat';
        },
        exitUser() {
            this.page = 'login';
        },
        setColor(color) {
            socket.emit('user:update', { color })
        },
        sendMessage() {
            if (this.content.trim() === '') return
            socket.emit('chat:sendMessage', this.content)
            return this.content = ''
        },
        unix(unix = Date.now()) {
            const Months_name = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
        
            let date = new Date(unix),
                year = date.getFullYear(),
                day = date.getDate(),
                month = date.getMonth(),
                hours = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds();
        
            if (month < 10) month = `0${ month }`;
            if (day < 10) day = `0${ day }`;
            if (hours < 10) hours = `0${ hours }`;
            if (hours >= 24) hours = `0${ hours - new Number(24) }`;
            if (minutes < 10) minutes = `0${ minutes }`;
            if (minutes >= 60) minutes = `0${ minutes - new Number(60) }`;
            if (seconds < 10) seconds = `0${ seconds }`;
            if (seconds >= 60) seconds = `0${ seconds - new Number(60) }`;
        
        
            return {
                year      : year,
                day       : day,
                month     : month,
                month_name: Months_name[Number(month)],
                hours     : hours,
                minutes   : minutes,
                seconds   : seconds
            }
        },
        setChatDown() {
            document.querySelector('.chat .list-messages').scrollTop = document.querySelector('.chat .list-messages').scrollHeight;
        }
    },
    mounted() {

        socket.on('system:technicalWorks', data => {
            console.log(data ? 'Works' : 'Chat');
        })

        socket.emit('user:connect', localStorage['userID'])

        socket.on('user:loadUser', user => {
            this.user = user;
            localStorage.setItem('userID', user.id)
            socket.emit('chat:getMessages')
            socket.emit('chat:getUsers')
        })

        socket.on('chat:loadMessages', messages => {
            new Promise((res, rej) => {
                this.messages = messages;
                res('end')
            }).then(() => this.setChatDown())
        })

        socket.on('chat:loadUsers', users => {
            this.users = users;
            console.log(users);
        })

        socket.on('chat:addMessage', message => {
            new Promise((res, rej) => {
                this.messages.push(message);
                res('end')
            }).then(() => this.setChatDown())
        })
    }
})

// const botBar = document.querySelector('.botbar');
// const messages = document.querySelector('.messages');
// const input = document.querySelector('.input');
// const button = document.querySelector('.button');
// const username = document.querySelector('.username');

// username.innerHTML = prompt('Your name?')

// button.addEventListener('click', event => {
//     console.log('done');
//     event.preventDefault();
//     input.value ?
//         socket.emit('chatMessage', {
//             name: username.innerHTML,
//             message: input.value
//         }) : null;
//     input.value = '';
// })

// let logMessages = '';

// socket.on('chatMessage', data => {
//     logMessages += `<li><span>${data.name}:</span> ${data.message}</li>`;
//     messages.innerHTML = logMessages;
// })
