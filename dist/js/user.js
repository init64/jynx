class ModelUser {
    constructor(socket) {
        this.socket = socket;

        console.info(`Connected model: User.`);
    }

    create() {}

    login(token) {
        if (token.trim() === '') return;
        this.socket.emit('user:login', token);
    }

    update(newUser = {}) {
        return this.socket.emit('user:update', newUser);
    }

    get(userId = '') {
        this.socket.emit('user:get', userId);
    }

    delete() {
        this.socket.emit('user:delete');
        return location.reload();
    }
}