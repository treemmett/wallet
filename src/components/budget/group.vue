<template>
  <div class="group" :class="{ collapsed }">
    <div class="content">
      <div class="head">
        <div class="handle" />
        <div class="title">
          {{ group.name }}
          <div
            class="icon"
            :class="{ visible: creatingCategory }"
            @click="openCategoryModal"
          >
            <icon-plus />
          </div>
        </div>
        <div class="amount">Budgeted</div>
        <div class="amount">Used</div>
        <div class="icon caret" @click="toggleCollapse">
          <icon-angle-down />
        </div>
        <div v-if="creatingCategory" class="tooltip" @mousedown.stop>
          <input
            v-focus
            placeholder="New Category Name"
            @keypress.enter="createCategory"
          />
        </div>
        <div class="border" />
      </div>

      <transition
        name="collapse"
        @before-leave="beforeLeave"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <draggable
          v-if="!collapsed"
          class="categories"
          :options="{
            group: 'categories',
            animation: 100,
            ghostClass: 'ghost',
            dragClass: 'dragging',
            handle: '.handle'
          }"
          @add="sortCategory"
          @update="sortCategory"
        >
          <div
            v-for="category in group.categories"
            :key="category.id"
            class="category"
          >
            <div class="handle" />
            <div class="title">{{ category.name }}</div>
            <div class="amount">
              <money
                v-model="category.budget"
                @change="
                  setBudget({ amount: arguments[0], category: category.id })
                "
              />
            </div>
            <div class="amount">{{ formatCurrency(category.expenses) }}</div>
          </div>
        </draggable>
      </transition>
    </div>

    <div class="glow" />
    <div class="glow start" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import draggable from 'vuedraggable';
import money from '../money';
import IconAngleDown from '../icons/IconAngleDown';
import IconPlus from '../icons/IconPlus';

export default {
  name: 'BudgetGroup',
  components: {
    draggable,
    IconAngleDown,
    IconPlus,
    money
  },
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      collapsed: false,
      creatingCategory: false
    };
  },
  methods: {
    ...mapActions(['sendAlert']),
    afterEnter(el) {
      el.style.removeProperty('height');
      el.style.removeProperty('min-height');
    },
    beforeLeave(el) {
      const { height } = getComputedStyle(el);

      el.style.height = height;
      el.style.minHeight = 0;

      // force repaint
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(el).height;

      el.style.height = 0;
    },
    closeCategoryModal(e) {
      if (e.code === 'Escape' || e.type === 'mousedown' || e === true) {
        // remove cancel function and unset creation
        this.creatingCategory = false;
        window.removeEventListener('keydown', this.closeCategoryModal);
        window.removeEventListener('mousedown', this.closeCategoryModal);
      }
    },
    createCategory(e) {
      if (e.target.value) {
        this.$store.commit('addCategory', {
          categoryName: e.target.value,
          groupId: this.group.id
        });

        // uncollapse group
        this.collapsed = false;
      }

      // close input
      this.closeCategoryModal(true);
    },
    enter(el) {
      // set height to automatic to calculate
      el.style.height = 'auto';
      el.style.minHeight = '1em';

      // save rendered height to memory
      const { height } = getComputedStyle(el);

      // reset height to 0
      el.style.height = 0;
      el.style.minHeight = 0;

      // force re-render
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(el).height;

      // manually set height to the automatic value to trigger transition
      el.style.height = height;
    },
    openCategoryModal() {
      // add listeners to remove creation input
      this.creatingCategory = true;
      window.addEventListener('keydown', this.closeCategoryModal);
      window.addEventListener('mousedown', this.closeCategoryModal);
    },
    setBudget({ category, amount }) {
      this.$store.commit('setBudget', { category, amount });
    },
    sortCategory(e) {
      this.$store.commit('sortCategory', {
        fromGroup: e.from.parentNode.parentNode.__vue__.group.id,
        toGroup: e.to.parentNode.parentNode.__vue__.group.id,
        fromIndex: e.oldIndex,
        toIndex: e.newIndex
      });
    },
    toggleCollapse() {
      this.sendAlert({ msg: this.group.name, title: 'Collapsing group!' });
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../colors';

.group {
  @include card;
  margin-bottom: 1em;
  white-space: nowrap;
  position: relative;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    .head .icon {
      opacity: 1;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.collapsed .head {
    .border {
      border-bottom-color: transparent;
    }

    .caret {
      opacity: 1;
      transform: translateY(-50%) rotate(180deg);
    }
  }
}

.glow {
  position: absolute;
  width: 1em;
  height: 100%;
  top: 0;
  right: 0;
  background: linear-gradient(to right, rgba(#fff, 0), #fff);
  pointer-events: none;

  &.start {
    left: 0;
    background: linear-gradient(to left, rgba(#fff, 0), #fff);
  }
}

.content {
  overflow: auto;
}

.head,
.category {
  padding: 1em;
  display: flex;
  align-items: center;
  position: relative;
  min-width: fit-content;

  .handle {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 1rem;
    left: 0;
    z-index: 1;

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 1px;
      height: 80%;
      background-color: transparent;
      transition: background-color 0.2s ease-in-out;
    }

    &::before {
      transform: translateX(-1px);
    }

    &::after {
      transform: translateX(1px);
    }
  }

  .title,
  .amount {
    display: inline-block;
  }

  .title {
    margin-right: 1rem;
    min-width: 10rem;
  }

  .amount {
    width: 6rem;
    min-width: 6rem;
    margin-left: auto;

    & ~ .amount {
      margin-left: 1rem;
      width: 4rem;
    }

    &,
    input {
      font-size: inherit;
      color: $gray-text;
    }

    input {
      width: inherit;
      box-sizing: border-box;
      outline: none;
      border-radius: 5px;
      border: 1px solid transparent;
      text-overflow: ellipsis;

      &:focus {
        border-color: $blue;
        box-shadow: 0 0 1px $blue;
      }
    }
  }

  &:hover {
    .handle {
      &::before,
      &::after {
        background-color: #aaa;
      }
    }

    .amount input {
      border-color: $blue;
    }
  }
}

.head {
  font-size: 20px;

  .border {
    position: absolute;
    width: calc(100% - 2em);
    bottom: 0;
    left: 1em;
    border-bottom: 1px solid #ccc;
    transition: border-color 0.2s ease-in-out;
  }

  .amount {
    font-size: 12px;
  }

  .icon {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
    color: #aaa;
    opacity: 0;
    font-size: 16px;
    transition: background-color 0.15s ease-in-out, transform 0.15s ease-in-out,
      opacity 0.1s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }

    &.visible {
      opacity: 1 !important;
    }
  }

  .caret {
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
  }
}

.categories {
  position: relative;
  min-width: fit-content;
  min-height: 1em;

  .category {
    font-size: 18px;
  }

  &.collapse {
    &-enter-active,
    &-leave-active {
      transition: height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    &-enter,
    &-leave-to {
      height: 0;
    }
  }
}

.tooltip {
  position: absolute;
  left: 2em;
  width: inherit;
  top: 3em;

  input {
    position: fixed;
    background: $orange-gradient;
    border: none;
    outline: none;
    cursor: default;
    padding: 1em;
    font-size: 16px;
    background-color: transparent;
    font-weight: 500;
    color: #fff;
    z-index: 5;
    box-shadow: 0 0 20px 5px rgba(#000, 0.1);
    border-radius: 6px;
    font-weight: 500;
    white-space: nowrap;

    &::placeholder {
      color: #fff;
    }
  }
}
</style>
