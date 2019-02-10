<template>
  <div
    class="input-wrapper"
    :class="{ focused, select: type === 'select' }"
    @mousedown="focus"
  >
    <div v-if="label" class="label">{{ label }}</div>
    <template v-if="type === 'select'">
      <input
        ref="input"
        :value="displayValue"
        :required="$attrs.hasOwnProperty('required')"
        @focus="focus"
        @blur="blur"
      />
      <input
        ref="hiddenInput"
        type="hidden"
        :value="hiddenValue"
        v-bind="$attrs"
      />

      <div v-if="dropdown" class="dropdown">
        <div
          v-for="child in renderChildren"
          :key="child.value"
          :class="{
            option: child.tag === 'option',
            optgroup: child.tag === 'optgroup'
          }"
          @click="selectHandler(child)"
        >
          <div :class="`${child.tag}-label`">{{ child.label }}</div>

          <div v-if="child.tag === 'optgroup'" class="optgroup-list">
            <div
              v-for="nestedChild in child.children"
              :key="nestedChild.value"
              class="option"
              @click="selectHandler(nestedChild)"
            >
              <div class="option-label">{{ nestedChild.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <input v-else ref="input" v-bind="$attrs" @blur="blur" @focus="focus" />
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: {
      type: [String, Boolean],
      default: false
    },
    placeholder: {
      type: [String, Boolean],
      default: false
    },
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
      focused: false,
      dropdown: false,
      displayValue: '',
      hiddenValue: ''
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

        const props = {
          ...el.data.attrs,
          ...el.data.domProps
        };

        // skip option that doesn't have value
        if (!props.value) {
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
        option.value = props.value;

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
              children: cur.children.reduce((acc1, cur1) => {
                const child = optionRenderer(cur1);

                if (child) {
                  acc1.push(child);
                }

                return acc1;
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
  mounted() {
    // set validity
    if (this.type === 'select') {
      this.$refs.input.setCustomValidity('Please select an item in the list.');
    }
  },
  methods: {
    blur(e) {
      if (this.type === 'select') {
        // close dropdown if focus is outside the dropdown
        if (!document.activeElement.closest('.dropdown')) {
          this.dropdown = false;
        }

        // unfocus if true value is empty
        this.focused = !!this.displayValue;
        return;
      }

      this.focused = !!e.target.value;
    },
    focus(e) {
      // stop if we're clicking on an option
      if (e.target && e.target.closest('.option')) {
        return;
      }

      // open dropdown if select
      this.focused = true;

      if (this.type === 'select') {
        this.dropdown = true;
      }

      this.$nextTick(() => this.$refs.input.focus());
    },
    selectHandler({ value, label, tag }) {
      // don't do anything if clicking on a group
      if (tag !== 'option') {
        return;
      }

      // set label value
      this.displayValue = label.trim();

      // set hidden value
      this.hiddenValue = value;

      this.$refs.input.setCustomValidity('');

      // focus input
      this.focused = !!label.trim();

      this.$refs.input.blur();

      this.dropdown = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../colors';

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
  position: absolute;
  width: 100%;
  left: 0;
  top: 100%;
  margin-top: 0.5em;
  padding: 0.5em 0;
  background-color: #fff;
  z-index: 1;
  box-shadow: inherit;
  border-radius: 6px;
  overflow-y: auto;
  max-height: 50vh;

  .option {
    padding: 0.25em 0.5em;
    cursor: default;

    &:hover {
      background: $blue-gradient;
      color: #444;
    }
  }

  .optgroup {
    padding-top: 0.75em;

    &:first-child {
      padding-top: 0;
    }

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
