import LoginPage from "../views/Login.js";

const routes = [
    {
        path: "/login",
        component: LoginPage
    }
]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router
