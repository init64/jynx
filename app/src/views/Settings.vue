<template>
  <div class='settings-page'>
    <div class='settings-container'>
      <span class='title'>Настройки</span>
      <div class='options'>
        <Option v-for='option in options' :data='option' />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SettingsPage',
  data() {
    return {
      options: [
        {
          header: 'Автозаход',
          description: 'Авторизируйтесь сразу, а не напжимайте эту ****ную кнопку :#',
          handler: (state) => localStorage.setItem('autoLogin', state),
          model: 'autoLogin',
        },
      ],
    };
  },
};
</script>

<style lang='scss' scoped>
.settings-page {
  height: 100%;
  width: 100%;
  //display: flex;
  padding: 20px;
  display: block;
  //flex-direction: column;
}

.settings-container {
  display: flex;
  flex-direction: column;

  .title {
    width: max-content;
    user-select: none;
    line-height: 100%;
    font-size: 31px;
    font-weight: 600;
    font-family: var(--font-header);
    padding-bottom: 10px;
  }

  .options {
    display: flex;
    flex-direction: column;
  }
}
</style>