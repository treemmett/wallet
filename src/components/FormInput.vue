<template>
  <label class="input-wrapper" :class="{ focused, select: type === 'select' }">
    <div v-if="label" class="label">{{ label }}</div>
    <template v-if="type === 'select'">
      <input
        ref="input"
        :value="displayValue"
        :required="$attrs.hasOwnProperty('required')"
        @input="displayValue = $event.target.value"
        @focus="focus"
        @blur="blur"
      />
      <input
        ref="hiddenInput"
        type="hidden"
        :value="hiddenValue"
        v-bind="$attrs"
      />

      <div
        v-if="dropdown"
        class="dropdown"
        @mouseenter="mouseOver = true"
        @mouseleave="mouseOver = false"
      >
        <div
          v-for="child in renderChildren"
          :key="child.value"
          :class="{
            option: child.tag === 'option',
            optgroup: child.tag === 'optgroup'
          }"
          @click="selectHandler($event, child)"
        >
          <div :class="`${child.tag}-label`">{{ child.label }}</div>

          <div v-if="child.tag === 'optgroup'" class="optgroup-list">
            <div
              v-for="nestedChild in child.children"
              :key="nestedChild.value"
              class="option"
              @click="selectHandler($event, nestedChild)"
            >
              <div class="option-label">{{ nestedChild.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <input
      v-else
      ref="input"
      :type="type"
      :value="value"
      v-bind="$attrs"
      @blur="blur"
      @focus="focus"
    />
  </label>
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
    selectDisplayValue: {
      type: [String, Number],
      default: ''
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
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      focused: Boolean(this.value),
      dropdown: false,
      mouseOver: false,
      displayValue: this.selectDisplayValue,
      hiddenValue: this.value
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

      const children = this.$slots.default.reduce(optgroupRenderer, []);

      // return unfiltered children if no text
      if (!this.displayValue) {
        return children;
      }

      const regex = new RegExp(this.displayValue, 'i');

      return children.reduce((acc, cur) => {
        switch (cur.tag) {
          case 'option': {
            // get inner text of option
            const tag = cur.children[0].text.trim();

            // get if tag matches search
            if (regex.test(tag)) {
              acc.push(cur);
            }
            break;
          }

          case 'optgroup': {
            // get label of group
            const label = cur.data.attrs.label.trim();

            // check if group label matches search
            if (regex.test(label)) {
              acc.push(cur);
              break;
            }

            const group = {
              ...cur,
              children: cur.children.filter(option => {
                const { label: optionLabel } = option;

                // check if option label matches search
                return regex.test(optionLabel.trim());
              })
            };

            // add group to output if any children matched
            if (group.children.length) {
              acc.push(group);
            }

            break;
          }

          default:
            break;
        }

        return acc;
      }, []);
    }
  },
  mounted() {
    // set validity
    if (this.type === 'select' && !this.value) {
      this.$refs.input.setCustomValidity('Please select an item in the list.');
    }
  },
  methods: {
    blur(e) {
      if (this.mouseOver) {
        return;
      }

      // reset mouse position
      this.mouseOver = false;

      if (this.type === 'select') {
        // close dropdown if focus is outside the dropdown
        if (!document.activeElement.closest('.dropdown')) {
          this.dropdown = false;
        }

        // unfocus if true value is empty
        this.focused = !!this.displayValue;
        return;
      }

      this.focused = !!e.target.value || e.target.validity.badInput;
    },
    focus() {
      // open dropdown if select
      this.focused = true;

      if (this.type === 'select') {
        this.dropdown = true;
      }

      this.$nextTick(() => this.$refs.input.focus());
    },
    selectHandler(e, { value, label, tag }) {
      // don't do anything if clicking on a group
      if (tag !== 'option') {
        return;
      }

      e.preventDefault();

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
  display: block;
  position: relative;
  margin-bottom: 1em;
  border-radius: 5px;
  height: 2.5em;
  padding: 0 0.5em;
  cursor: text;
  transition: 0.2s ease-in-out;
  transition-property: box-shadow, border-color;
  border: 1px solid #bbb;
  // font-size: 16px;

  &.focused {
    .label {
      top: 0;
      padding: 0 5px;
      background-color: #fff;
      box-sizing: border-box;
      z-index: 1;
      font-size: 14px;
      cursor: default;
    }

    input {
      &::placeholder {
        opacity: 1;
      }

      &::-webkit-datetime-edit,
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button,
      &::-webkit-calendar-picker-indicator {
        display: initial;
      }
    }

    &:focus-within {
      border-color: $blue;
      box-shadow: 0 0 1px $blue;

      .label {
        color: $blue;
      }
    }
  }
}

input,
select {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding: 0 0.7em;
  box-sizing: border-box;
  font-size: 16px;

  &::-webkit-datetime-edit,
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  &::placeholder {
    opacity: 0;
  }
}

.label {
  position: absolute;
  top: 50%;
  left: 0.7em;
  transform: translateY(-50%);
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  cursor: text;
  transition: all 0.15s ease-in-out;
}

.dropdown {
  position: absolute;
  width: 100%;
  left: 0;
  top: 100%;
  margin-top: 0.5em;
  padding: 0.5em 0;
  background-color: #fff;
  z-index: 3;
  box-shadow: 0 1px 2px 1px rgba(#000, 0.15);
  border-radius: 6px;
  overflow-y: auto;
  max-height: 50vh;
  color: #333;

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
