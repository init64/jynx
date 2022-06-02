import LoginPage from "../views/Login.js"

export default VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: "/login",
            component: LoginPage
        }
    ]
})