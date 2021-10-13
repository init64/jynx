const socket = io();

var app = new Vue({
    el: '#app',
    data: {
        login: false
    },
    methods: {
        buttonLogin() {
            this.login = true;
        }
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
