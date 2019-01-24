<template>
  <div
    class="input-wrapper"
    :class="{ focused, select: type === 'select' }"
    @mousedown="focus"
  >
    <div v-if="label" class="label">{{ label }}</div>
    <input ref="input" v-bind="$props" @blur="blur" @focus="focused = true" />
    <div v-if="type === 'select'" class="dropdown">
      <div
        v-for="child in renderChildren"
        :key="child.value"
        :class="{
          option: child.tag === 'option',
          optgroup: child.tag === 'optgroup'
        }"
      >
        <div :class="`${child.tag}-label`">{{ child.label }}</div>

        <div v-if="child.tag === 'optgroup'" class="optgroup-list">
          <div
            v-for="nestedChild in child.children"
            :key="nestedChild.value"
            class="option"
          >
            <div class="option-label">{{ nestedChild.label }}</div>
          </div>
        </div>
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
    renderChildren() {
      if (this.type !== 'select') {
        return null;
      }

      const optionRenderer = el => {
        // only option should be allowed as root element
        if (el.tag !== 'option') {
          return false;
        }

        // skip option that doesn't have value
        if (!el.data || !el.data.attrs || !el.data.attrs.value) {
          return false;
        }

        // skip options that don't contain any children
        if (!el.children || !el.children.length) {
          return false;
        }

        // remove elements
        const option = {
          ...el,
          children: el.children.filter(child => !child.tag && !!child.text)
        };

        // double check options have children after filter
        if (!option.children || !option.children.length) {
          return false;
        }

        option.label = option.children.map(c => c.text).join(' ');
        option.value = el.data.attrs.value;

        return option;
      };

      const optgroupRenderer = (acc, cur) => {
        // the only children can be an option or optgroup
        if (cur.tag !== 'option' && cur.tag !== 'optgroup') {
          return acc;
        }

        switch (cur.tag) {
          case 'option': {
            acc.push(optionRenderer(cur));
            break;
          }

          case 'optgroup': {
            // require label to be set
            if (!cur.data || !cur.data.attrs || !cur.data.attrs.label) {
              break;
            }

            const optgroup = {
              ...cur,
              children: cur.children.reduce((acc, cur) => {
                const child = optionRenderer(cur);

                if (child) {
                  acc.push(child);
                }

                return acc;
              }, []),
              label: cur.data.attrs.label
            };
            acc.push(optgroup);
            break;
          }

          default:
            break;
        }

        return acc;
      };

      return this.$slots.default.reduce(optgroupRenderer, []);
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

  .optgroup {
    padding-top: 0.75em;

    .optgroup-label {
      padding: 0.25em 0.5em;
      color: #727272;
    }

    .option {
      padding-left: 1em;
    }
  }
}
</style>
