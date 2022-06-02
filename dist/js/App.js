

// TODO
// Добавить нормальную анимацию перехода роутов

import ContextMenu from './components/ContextMenu.js';

export default {
		template: "<router-view v-slot='{ Component }'> <ContextMenu /> <component :is='Component' class='router-view' /> </router-view>",
		beforeCreate() {
			loadCss({ content: "#app{position:fixed;height:100%;width:100%;display:flex}.router-view{height:100%;width:100%}" });
		},
  name: 'app',
  components: { ContextMenu },
  mounted() {
    window.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
  },
};
