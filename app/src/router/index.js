import LoginPage from '../views/Login.js';
import SettingsPage from '../views/Settings.js';
import UserPage from '../views/User.js';
import ChatPage from '../views/Chat.js';

export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: '/settings',
      component: SettingsPage,
      name: 'SettingsPage',
    },
    {
      path: '/login',
      component: LoginPage,
      name: 'LoginPage',
    },
    {
      path: '/user',
      component: UserPage,
      name: 'UserPage',
    },
    {
      path: '/chat',
      component: ChatPage,
      name: 'ChatPage',
    },
  ],
});