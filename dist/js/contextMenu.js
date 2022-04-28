class ContextMenu {
    constructor(event, items) {
        console.log(event, items);
    }

    create() {
        window.addEventListener('click', () => {
            state.isActive = false;
            state.event = null;
        }, { once: true });
    }
}