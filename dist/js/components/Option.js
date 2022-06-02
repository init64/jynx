
export default {
		template: "<div class='option'> <div class='option__info'> <span class='option__header'> {{ data.header }} </span> <span class='option__description'> {{ data.description }} </span> </div> <label class='check'> <input type='checkbox' v-model='data.vModel' @click='data.handler'> <span /> </label> </div>",
		beforeCreate() {
			loadCss({ content: ".option{display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding:16px;background-color:var(--background-secondary);border-radius:10px}.option .option__info{display:flex;flex-direction:column}.option .option__header{font-weight:600;font-size:18px}.option .option__description{margin-top:5px;color:var(--text-secondary);font-size:13px}.option label.check{user-select:none}.option label.check input[type=checkbox]{height:0;width:0;position:absolute;visibility:hidden}.option label.check span{cursor:pointer;display:block;width:32px;height:16px;position:relative;text-indent:-9999px;background:var(--background-primary);border-radius:100px;transition:.2s}.option label.check span:after{content:'';width:8px;height:8px;position:absolute;top:4px;left:4px;border-radius:90px;background:#fff;transition:0.3s}.option label.check input:checked+span{background:var(--background-active)}.option label.check input:checked+span:after{left:calc(100% - 4px);transform:translateX(-100%)}.option label.check:active span:after{width:14px}" });
		},
  name: 'OptionComponent',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log(this.data);
  },
};
