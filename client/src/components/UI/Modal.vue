<template>
  <Transition name='modal'>
    <div v-if='visible' class='modal__screen' @click='() => {onHide(); $emit("visible", false)}'>
      <div :class='[!overWriteClass && "modal__content", this.class]' @click='$event.stopPropagation()'>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    visible: Boolean,
    class: {
      type: String,
      required: false,
      default: ""
    },
    onHide: {
      type: Function,
      required: false,
      default: () => {
      },
    },
    overWriteClass: {
      type: Boolean,
      default: false,
      required: false
    }
  },
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