<template>
  <div class="group" :class="{ collapsed }">
    <div class="head">
      <div class="title">
        {{ group.name }}
        <div
          class="icon-plus"
          :class="{ visible: creatingCategory }"
          @click="openCategoryModal"
        />
      </div>
      <div class="amount">Budgeted</div>
      <div class="amount">Used</div>
      <div class="icon-angle-down caret" @click="collapsed = !collapsed" />
      <div v-if="creatingCategory" class="tooltip" @mousedown.stop>
        <input
          v-focus
          placeholder="New Category Name"
          @keypress.enter="createCategory"
        />
      </div>
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
          dragClass: 'dragging'
        }"
        @add="sortCategory"
        @update="sortCategory"
      >
        <div
          v-for="category in group.categories"
          :key="category.id"
          class="category"
        >
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
</template>

<script>
import draggable from 'vuedraggable';
import money from '../money';

export default {
  name: 'BudgetGroup',
  components: {
    draggable,
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
        fromGroup: e.from.parentNode.__vue__.group.id,
        toGroup: e.to.parentNode.__vue__.group.id,
        fromIndex: e.oldIndex,
        toIndex: e.newIndex
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../colors';

.group {
  @include card;
  margin-bottom: 1em;
  overflow: scroll;
  white-space: nowrap;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    .head [class*='icon'] {
      opacity: 1;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.collapsed .head {
    border-bottom-color: transparent;

    .caret {
      opacity: 1;
      transform: translateY(-50%) rotate(180deg);
    }
  }
}

.head,
.category {
  padding: 1em;
  display: flex;
  align-items: center;
  position: relative;
  min-width: fit-content;

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

  &:hover .amount input {
    border-color: $blue;
  }
}

.head {
  font-size: 20px;
  border-bottom: 1px solid #ccc;
  margin: 0 1em;
  padding: 1em 0;
  transition: border-color 0.2s ease-in-out;

  .amount {
    font-size: 12px;
  }

  [class*='icon-'] {
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
    right: 0;
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
