const socket = io();

const app = new Vue({
    el: '#app',
    data: {
        login: false,
        user: {}
    },
    methods: {
        buttonLogin() {
            socket.emit('user:update', { username: this.user.username })
            this.login = true;
        },
        setColor(color) {
            socket.emit('user:update', { color })
        }
    },
    mounted() {
        socket.emit('user:connect', localStorage['userID'])

        socket.on('user:loadUser', user => {
            this.user = user;
            localStorage.setItem('userID', user.id)
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
