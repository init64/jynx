const socket = io();

const app = new Vue({
    el: '#app',
    data: {
        theme: localStorage['theme'] === 'dark' ? true : false || false,
        page: 'chat',
        category: 'channel',
        categories: {
            profile: ['Профель', 'uil uil-user'],
            channel: ['Канал', 'uil uil-comment-alt'],
            groups: ['Группы', 'uil uil-users-alt'],
            setting: ['Настройки', 'uil uil-setting']
        },
        mUser: {},
        messages: [],
        content: '',
        addSticker: {
            open: false,
            url: '',
            name: '',
        },
        platforms: {
            Windows: 'uil uil-windows',
            Linux: 'uil uil-linux',
            Android: 'uil uil-android-alt',
            iPhone: 'uil uil-apple-alt'
        },
        messageFun: false,
        users: [],
        panels: {
            users: false,
            menu: true
        },
        profile: {
            open: false
        }
    },
    methods: {
        buttonLogin() {
            if (this.mUser.username.trim() === '') return;
            new Promise((res, rej) => {
                socket.emit('user:update', { username: this.mUser.username, color: this.mUser.color })
                this.page = 'chat';
                res('end')
            }).then(() => {
                socket.emit('chat:getMessages')
                socket.emit('chat:getUsers')
            })
        },
        exitUser() {
            this.page = 'login';
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
            if (this.page === 'chat') document.querySelector('.chat .list-messages').scrollTop = document.querySelector('.chat .list-messages').scrollHeight;
        },
        randomHex(count) {
            let array = []
            for (let i = 0; i < count; i++) array.push('#' + Math.random().toString(16).substr(-6))
            return array
        },
        setTheme() {
            let theme = this.theme ? 'light' : 'dark';
            console.log(theme);
            localStorage.setItem('theme', theme)
            document.querySelector('html').setAttribute('theme', theme)
        },
        setBg(url) {
            document.querySelector('.chat .bg').setAttribute('style', `background-image: linear-gradient(to bottom, #00000099 0%,#00000099 100%), url('${url}');`)
        }
    },
    mounted() {

        socket.on('system:technicalWorks', data => {
            console.log(data ? 'Works' : 'Chat');
        })

        document.querySelector('html').setAttribute('theme', localStorage.getItem('theme'))

        socket.emit('user:connect', localStorage['userID'])

        socket.on('user:loadUser', user => {
            this.mUser = user;
            localStorage.setItem('userID', user.id)
        })

        socket.on('chat:loadMessages', messages => {
            console.log(messages);
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