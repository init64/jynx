const socket = io();

const app = new Vue({
    el: '#app',
    data: {
        theme: localStorage['theme'] === 'dark' ? true : false || false,
        page: 'login',
        category: 'channel',
        categories: {
            profile: ['Профиль', 'uil uil-user'],
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
            // if (this.mUser.token.trim() === '') return;
            console.log(this.mUser.token);
            socket.emit('user:login', localStorage['token'])
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

        const loadUser = (user, q) => {
            this.mUser = user;
            localStorage.setItem('token', user.token)
            localStorage.setItem('userID', user.id)
        }

        socket.on('system:technicalWorks', data => {
            console.log(data ? 'Works' : 'Chat');
        })

        document.querySelector('html').setAttribute('theme', localStorage.getItem('theme') || 'dark')

        socket.emit('user:connect', { token: localStorage.getItem('token') })

        socket.on('user:loadUser', user => loadUser(user))

        socket.on('user:login', user => {
            this.page = 'chat';
            this.category = 'channel';
            loadUser(user)
            socket.emit('chat:getMessages')
            socket.emit('chat:getUsers')
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
