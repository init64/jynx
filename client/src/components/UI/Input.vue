<template>
  <input @input='$emit("input", $event)' :placeholder='placeholder' :class='["custom-input", this.class]' type='text'>
</template>

<script>
export default {
  name: "Input",
  props: {
    class: String,
    placeholder: String
  }
};
</script>

<style scoped>
.custom-input {

}
</style>