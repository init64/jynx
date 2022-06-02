import LoginPage from "../views/Login.js"
import SettingsPage from "../views/Settings.js"

// TODO
// В будущем мб сделать динамические роуты (тоесть допустим если пользователь авторизован то для него не существует роута login)

export default VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: "/login",
            component: LoginPage
        },
        {
            path: "/settings",
            component: SettingsPage
        }
    ]
})