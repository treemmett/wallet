<template>
  <div class="input-wrapper" :class="{ focused }" @mousedown="focus">
    <div v-if="label" class="label">{{ label }}</div>
    <input ref="input" v-bind="$props" @blur="blur" @focus="focused = true" />
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    id: {
      type: [String, Boolean],
      default: false
    },
    label: {
      type: [String, Boolean],
      default: false
    },
    name: {
      type: [String, Boolean],
      default: false
    },
    placeholder: {
      type: [String, Boolean],
      default: false
    },
    required: Boolean,
    type: {
      type: String,
      required: true,
      validator(value) {
        return (
          [
            'date',
            'datetime',
            'datetime-loca',
            'email',
            'month',
            'number',
            'password',
            'search',
            'text',
            'time',
            'url',
            'week'
          ].indexOf(value) !== -1
        );
      }
    }
  },
  data() {
    return {
      focused: false
    };
  },
  methods: {
    blur(e) {
      this.focused = !!e.target.value;
    },
    focus() {
      this.$nextTick(() => this.$refs.input.focus());
    }
  }
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
  box-shadow: 0 1px 2px 1px rgba(#000, 0.15);
  margin-bottom: 1em;
  border-radius: 6px;
  height: 2.5em;
  padding: 0 0.5em;
  cursor: text;

  &.focused {
    .label {
      transform: translateY(-120%) translateX(0.25em);
      font-size: 12px;

      & + input {
        transform: translateY(-10%);
      }
    }

    input::placeholder {
      opacity: 1;
    }
  }
}

input,
.label {
  position: absolute;
  transition: 0.15s ease-in-out;
  transition-property: transform, font-size;
  box-sizing: border-box;
  transform: translateY(-50%);
  top: 50%;
  padding: 0 0.5em;
  width: 100%;
  left: 0;
}

input {
  appearance: none;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 16px;

  &::placeholder {
    opacity: 0;
  }
}

.label {
  color: #727272;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
