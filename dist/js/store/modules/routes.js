import LoginPage from "../../views/Login.js";

const routes = {
    state: () => ([
        [
            {
                path: "/login",
                component: LoginPage,
                meta: {
                    icon: "uil uil-user",
                }
            }
        ]
    ]),
};

export default routes;