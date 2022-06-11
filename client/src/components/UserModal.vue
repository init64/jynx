<template>
  <Modal :visible='visible' @visible='$emit("visible", $event)'>
    {{ userId }}
  </Modal>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    userId: String
  }
};
</script>

<style scoped>

</style>