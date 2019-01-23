<template>
  <div
    class="input-wrapper"
    :class="{ focused, select: type === 'select' }"
    @mousedown="focus"
  >
    <div v-if="label" class="label">{{ label }}</div>
    <input ref="input" v-bind="$props" @blur="blur" @focus="focused = true" />
    <div v-if="type === 'select'" class="dropdown">
      <div v-for="option in renderOptions" :key="option.value" class="option">
        {{ option.label }}
      </div>
    </div>
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
            'select',
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
  computed: {
    renderOptions() {
      return this.$slots.default.reduce((acc, cur) => {
        // only option should be allowed as root element
        if (cur.tag !== 'option') {
          return acc;
        }

        // skip option that doesn't have value
        if (!cur.data || !cur.data.attrs || !cur.data.attrs.value) {
          return acc;
        }

        // skip options that don't contain any children
        if (!cur.children || !cur.children.length) {
          return acc;
        }

        // remove elements
        const option = {
          ...cur,
          children: cur.children.filter(child => !child.tag && !!child.text)
        };

        // skip options that don't contain any children
        if (!option.children || !option.children.length) {
          return acc;
        }

        option.label = option.children.map(c => c.text).join(' ');
        option.value = cur.data.attrs.value;

        acc.push(option);
        return acc;
      }, []);
    }
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
    &.select:focus-within {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      .dropdown {
        display: block;
      }
    }

    .label {
      transform: translateY(-120%) translateX(0.25em);
      font-size: 12px;

      & + input,
      & + select {
        transform: translateY(-10%);
      }
    }

    input::placeholder {
      opacity: 1;
    }
  }
}

input,
select,
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

input,
select {
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

.dropdown {
  display: none;
  position: absolute;
  width: 100%;
  left: 0;
  top: 100%;
  background-color: #fff;
  z-index: 1;
  box-shadow: inherit;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;

  .option {
    padding: 0.25em 0.5em;
    cursor: default;
  }
}
</style>
