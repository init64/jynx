<template>
  <div class='option'>
    <div class='option__info'>
      <span class='option__header'> {{ data.header }} </span>
      <span class='option__description'> {{ data.description }} </span>
    </div>
    <label class='check'>
      <input :checked='this[data.model]' type='checkbox' @input='inputHandler'>
      <span />
    </label>
  </div>
</template>

<script>
export default {
  name: 'Option',
  props: {
    data: Object,
  },
  methods: {
    inputHandler(e) {
      this[this.data.model] = e.target.checked;
      this.data.handler(e.target.checked);
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding: 16px;
  background-color: var(--background-secondary);
  border-radius: 10px;

  .option__info {
    display: flex;
    flex-direction: column;
  }

  .option__header {
    font-weight: 600;
    font-size: 18px
  }

  .option__description {
    margin-top: 5px;
    color: var(--text-secondary);
    font-size: 13px;
  }

  label.check {
    user-select: none;

    input[type=checkbox] {
      height: 0;
      width: 0;
      position: absolute;
      visibility: hidden;
    }

    span {
      cursor: pointer;
      display: block;
      width: 32px;
      height: 16px;
      position: relative;
      text-indent: -9999px;
      background: var(--background-primary);
      border-radius: 100px;
      transition: .2s;
    }

    span:after {
      content: '';
      width: 8px;
      height: 8px;
      position: absolute;
      top: 4px;
      left: 4px;
      border-radius: 90px;
      background: #fff;
      transition: 0.3s;
    }

    input:checked + span {
      background: var(--background-active);
    }

    input:checked + span:after {
      left: calc(100% - 4px);
      transform: translateX(-100%);
    }

    &:active span:after {
      width: 14px;
    }

  }
}
</style>