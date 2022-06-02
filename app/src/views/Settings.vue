<template>
  <div class="settings-page">
    <div class="appearance-block">
      <span class="title">Внешний вид</span>
      <div class="options">
        <OptionComponent v-for="option in options" :data="option"/>
      </div>
    </div>
  </div>
</template>

<script>
import OptionComponent from "../components/Option.js";

export default {
  name: "SettingsPage",
  components: {OptionComponent},
  data() {
    return {
      options: [
        {
          header: "Светлая тема",
          description: "Побереги свои глазки, для того чтобы в будущем у тебя было хорошое зрение :P",
          handler: this.setTheme
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.settings-page {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 20px;
  flex-direction: column;
}

.appearance-block {
  display: flex;
  flex-direction: column;

  .title {
    width: max-content;
    user-select: none;
    line-height: 100%;
    font-size: 31px;
    font-weight: 600;
    font-family: var(--font-header);
    border-bottom: 3px solid var(--text-primary);
    padding-bottom: 10px;
  }

  .options {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
}
</style>