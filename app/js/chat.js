class ModelChat {
    constructor(socket) {
        this.socket = socket;

        console.info(`Connected model: Chat.`);
    }

    history() {
        this.socket.emit('chat:getMessages');
    }
}