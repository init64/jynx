import LoginPage from "../views/Login.js";

const routes = [
    {
        path: "/login",
        component: LoginPage,
        meta: {
            icon: "uil uil-user"
        }
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

export default router
