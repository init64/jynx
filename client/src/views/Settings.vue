<template>
  <div class='settings-page'>
    <div class='settings__container'>
      <span class='title'>Settings</span>
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
          header: 'There was a headline here',
          description: 'There was some description',
          handler: (state) => {
            console.log('There was something besides console.log', state);
          },
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

  .settings__container {
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
}
</style>