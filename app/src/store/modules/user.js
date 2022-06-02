const user = {
    state: () => ({
        authorized: false,
        token: localStorage.getItem('token') || ''
    })
};

export default user;