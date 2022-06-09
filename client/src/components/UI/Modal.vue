<template>
  <Transition>
    <div v-if='visible' @click='$emit("visible", false)' class='modal__screen'>
      <div @click='$event.stopPropagation()' :class='["modal__content", this.class]'>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    visible: Boolean,
    class: String
  }
};
</script>

<style scoped>
.modal__screen {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--background-darked);
  backdrop-filter: blur(5px);
}

.modal__content {
  padding: 20px;
  border-radius: 10px;
  background-color: var(--background-secondary);
}
</style>