
export default {
		template: "<div class=\"context-menu\"> <div class=\"user-avatar\"/> <ul class=\"buttons\"> <li :active=\"currentRoute == $route.path\" @click=\"router(route.path)\" :key=\"route.path\" v-for=\"route in listOfRoutes\"> <i :class=\"route.meta.icon\"></i> </li> </ul> </div>",
		beforeCreate() {
			loadCss({ content: ".context-menu{height:100%;width:5%;min-width:60px;border-right:1px solid var(--background-secondary);display:flex;align-items:center;flex-direction:column}.user-avatar{margin-top:8px;width:48px;height:48px;background-color:#fff;background-position:50%;background-size:cover;background-repeat:no-repeat;border-radius:50%}.buttons{margin-top:20px}.buttons li{cursor:pointer;width:48px;height:48px;display:flex;align-items:center;justify-content:center;border-radius:5px;background:var(--background-secondary);transition:0.2s;user-select:none}.buttons li[active=\"true\"]{color:var(--background-secondary);background-color:var(--text-primary)}" });
		},
  name: "ContextMenu",
  mounted() {
    console.log(this.$route)
  }
}
