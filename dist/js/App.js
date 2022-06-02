

import ContextMenu from "./components/ContextMenu.js";

export default {
		template: "<router-view v-slot=\"{ Component }\"> <ContextMenu/> <Transition> <component :is=\"Component\"/> </Transition> </router-view>",
		beforeCreate() {
			loadCss({ content: "#app{position:fixed;height:100%;width:100%;display:flex}" });
		},
  name: "app",
  components: {ContextMenu}
}
