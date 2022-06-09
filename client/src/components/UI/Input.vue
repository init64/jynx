<template>
  <input :class='["custom-input", this.class]' :placeholder='placeholder' type='text' @input='$emit("input", $event)'>
</template>

<script>
export default {
  name: 'Input',
  props: {
    class: String,
    placeholder: String,
  },
};
</script>

<style scoped>
.custom-input {

}
</style>