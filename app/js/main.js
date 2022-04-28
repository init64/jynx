const
    socket = io(location.origin),
    // Classes
    User = new ModelUser(socket),
    Chat = new ModelChat(socket);

const app = new Vue({
    el: '#app',
    data: {
        socket,
        theme: localStorage['theme'] === 'light' ? true : false,
        autoLogin: localStorage['autoLogin'] === 'true' ? true : false,
        mainMenu: {
            type: '',
            data: null,
            isActive: false
        },
        contextMenu: {
            x: 0,
            y: 0,
            items: [],
            isActive: false
        },
        page: 'login',
        category: 'channel',
        categories: {
            profile: ['Профиль', 'uil uil-user'],
            channel: ['Канал', 'uil uil-comment-alt'],
            //groups: ['Группы', 'uil uil-users-alt'],
            setting: ['Настройки', 'uil uil-setting']
        },
        mUser: {
            token: ''
        },
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
        userStatus: [],
        users: [],
        panels: {
            users: false,
            menu: window.screen.width < 480 ? true : false || false
        },
        profile: {
            open: false
        }
    },
    methods: {
        unix, timeago, uts,
        setMenu(data) {
            this.mainMenu = data;
        },
        syncHistory: () => Chat.history(),
        buttonLogin() {
            return User.login(this.mUser.token || '');
        },
        setupSettings() {
            return User.update(this.mUser);
        },
        createAccount() {
            socket.emit('user:create');
        },
        getUser(userId) {
            return User.get(userId);
        },
        deleteAccount: () => User.delete(),
        exitUser() {
            this.page = 'login';
        },
        sendMessage() {
            if (this.content.trim() === '') return
            socket.emit('chat:sendMessage', this.content)
            return this.content = ''
        },
        setChatDown() {
            if (this.page === 'chat') document.querySelector('.chat .list-messages').scrollTop = document.querySelector('.chat .list-messages').scrollHeight;
        },
        setTheme(type = this.theme) {
            let theme = type ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            document.querySelector('html').setAttribute('theme', theme);
        },
        setLocal(key, param) {
            localStorage.setItem(key, param);
        },
        setContextMenu(event, items) {
            this.contextMenu = { x: event.clientX, y: event.clientY, items, isActive: true }

            setTimeout(() => {
                window.addEventListener('click', () => {
                    this.contextMenu = { x: 0, y: 0, items: [], isActive: false }
                }, { once: true });
            }, 10);
        },
        messageDelete(messageId) {
            socket.emit('message:delete', messageId);
        },
        log(e) {
            console.log(e);
        }
    },
    mounted() { 
        const loadUser = (user) => {
            this.mUser = user;
            localStorage.setItem('token', user.token);
            localStorage.setItem('userID', user.id);
        }

        document.querySelector('html').setAttribute('theme', localStorage.getItem('theme') || 'dark');

        this.mUser['token'] = localStorage.getItem('token') || '';
        if (this.autoLogin) User.login(localStorage.getItem('token'));

        socket.on('user:loadUser', user => loadUser(user));

        socket.on('user:login', user => {
            this.page = 'chat';
            this.category = 'channel';
            loadUser(user);
            socket.emit('chat:getMessages');
            socket.emit('chat:getUsers');
        });

        socket.on('chat:loadMessages', messages => {
            new Promise((res, rej) => {
                this.messages = messages;
                res('end');
            }).then(() => this.setChatDown());
        });

        socket.on('chat:loadUsers', users => {
            this.users = users;
        });

        socket.on('chat:addMessage', message => {
            new Promise((res, rej) => {
                this.messages.push(message);
                res('end');
            }).then(() => this.setChatDown());
        });

        socket.on('user:get', data => this.setMenu({ type: 'user', data, isActive: true }));

        socket.on('message:delete', messageId => this.messages = this.messages.filter(item => item.id !== messageId));
    }
});

window.addEventListener('contextmenu', e => {
    e.preventDefault();
});