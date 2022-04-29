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
        login: false,
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
        mUser: { token: '' },
        messages: [],
        stickers: [],
        selectedMessages: [],
        content: {
            mode: 'send',
            text: '',
            messageId: ''
        },
        profile: {
            open: false
        },
        panel: {
            stickers: false
        },
        sticker: {
            url: ''
        }
    },
    methods: {
        unix, timeago, uts, md,
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
        sendMessage(type = this.content.mode, content = '') {
            if (this.content.text.trim() === '' && type !== 'sticker') return
            switch(type) {
                case "send":
                    socket.emit('chat:sendMessage', this.content.text);
                    break;
                case "edit":
                    socket.emit('message:update', this.content.messageId, this.content.text);
                    this.content.mode = 'send';
                    break;
                case "sticker":
                    socket.emit('chat:sendMessage', content, type);
                    break;
            }
            return this.content.text = ''
        },
        setChatDown() {
            if (this.page === 'chat') setTimeout(() => document.querySelector('.chat .list-messages').scrollTop = document.querySelector('.chat .list-messages').scrollHeight, 10);
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
        getContent(content) {
            return content.replace(/\n/g, '<br>')
        },
        setRows({ target }, max = 4) {
            let rows = Math.floor(target.getAttribute('rows'));
            target.setAttribute('rows', rows > max ? max : rows + 1);
        },
        getStickers() {
            this.panel.stickers = true;
            socket.emit('stickers:get');
        },
        addSticker() {
            let img = new Image();
            img.src = this.sticker.url;
            img.onload = () => socket.emit('sticker:add', this.sticker.url);
        }
    },
    mounted() { 
        const loadUser = (user) => {
            this.mUser = user;
            this.login = true;
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

        socket.on('message:update', newMessage => {
            let oldMessage = this.messages.find(item => item.id === newMessage.id);
            for (let param in newMessage)
                if (param !== 'user') oldMessage[param] = newMessage[param];
        });

        socket.on('message:delete', messageId => this.messages = this.messages.filter(item => item.id !== messageId));

        socket.on('stickers:list', list => this.stickers = list);
    }
});

window.addEventListener('contextmenu', e => {
    e.preventDefault();
});