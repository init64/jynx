
import OptionComponent from '../components/Option.js';

export default {
		template: "<div class='settings-page'> <div class='appearance-block'> <span class='title'>Настройки</span> <div class='options'> <OptionComponent :vModel='option.vModel' v-for='option in options' :data='option' /> </div> </div> </div>",
		beforeCreate() {
			loadCss({ content: ".settings-page{height:100%;width:100%;display:flex;padding:20px;flex-direction:column}.container{display:flex;flex-direction:column}.container .title{width:max-content;user-select:none;line-height:100%;font-size:31px;font-weight:600;font-family:var(--font-header);padding-bottom:10px}.container .options{margin-top:20px;display:flex;flex-direction:column}" });
		},
  name: 'SettingsPage',
  components: { OptionComponent },
  data() {
    return {
      appereanceOptions: [
        // {
        //   header: 'Светлая тема',
        //   description: 'Побереги свои глазки, для того чтобы в будущем у тебя было хорошое зрение :P',
        //   handler: this.setTheme,
        //   vModel: this.theme
        // },
        {
          header: 'Автозаход',
          description: 'Авторизируйтесь сразу, а не напжимайте эту ****ную кнопку :#',
          handler: () => localStorage.setItem('autoLogin', !this.autoLogin),
          vModel: this.autoLogin
        },
      ],
    };
  },
};
