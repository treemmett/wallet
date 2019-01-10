<template>
  <div class="group" :class="{ collapsed }">
    <div class="head">
      <div class="title">
        {{group.name}}
        <div class="click-icon icon-plus" :class="{ visible: creatingCategory }" @click="openCategoryModal">
          <div class="tooltip" v-if="creatingCategory" @mousedown.stop>
            <input v-focus placeholder="New Category Name" @keypress.enter="createCategory"/>
          </div>
        </div>
      </div>
      <div class="amount">Budgeted</div>
      <div class="amount">Used</div>
      <div class="click-icon carot icon-angle-down" @click="collapsed = !collapsed"/>
    </div>

    <transition name="collapse" @before-leave="beforeLeave" @enter="enter" @after-enter="afterEnter">
      <draggable v-if="!collapsed" class="categories" :options="{ group: 'categories', animation: 100, ghostClass: 'ghost', dragClass: 'dragging' }" @add="sortCategory" @update="sortCategory">
        <div class="category" v-for="category in group.categories" :key="category.id">
          <div class="title">{{category.name}}</div>
          <div class="amount">
            <money v-model="category.budget" @change="setBudget({ amount: arguments[0], category: category.id })"/>
          </div>
          <div class="amount">{{formatCurrency(category.expenses)}}</div>
        </div>
      </draggable>
    </transition>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import money from '../money';

export default {
  name: 'budget-group',
  components: {
    draggable,
    money
  },
  props: [
    'group'
  ],
  data(){
    return {
      collapsed: false,
      creatingCategory: false
    }
  },
  methods: {
    afterEnter(el){
      el.style.removeProperty('height');
    },
    beforeLeave(el){
      const { height } = getComputedStyle(el);

      el.style.height = height;

      // force repaint
      getComputedStyle(el).height;

      el.style.height = 0;
    },
    closeCategoryModal(e){
      if(e.code === 'Escape' || e.type === 'mousedown' || e === true){
        // remove cancel function and unset creation
        this.creatingCategory = false;
        window.removeEventListener('keydown', this.closeCategoryModal);
        window.removeEventListener('mousedown', this.closeCategoryModal);
      }
    },
    createCategory(e){
      if(e.target.value){
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
    enter(el){
      // set height to automatic to calculate
      el.style.height = 'auto';

      // save rendered height to memory
      const { height } = getComputedStyle(el);

      // reset height to 0
      el.style.height = 0;

      // force re-render
      getComputedStyle(el).height;

      // manually set height to the automatic value to trigger transition
      el.style.height = height;
    },
    openCategoryModal(){
      // add listeners to remove creation input
      this.creatingCategory = true;
      window.addEventListener('keydown', this.closeCategoryModal);
      window.addEventListener('mousedown', this.closeCategoryModal);
    },
    setBudget({ category, amount }){
      this.$store.commit('setBudget', { category, amount });
    },
    sortCategory(e){
      this.$store.commit('sortCategory', {
        fromGroup: e.from.parentNode.__vue__.group.id,
        toGroup: e.to.parentNode.__vue__.group.id,
        fromIndex: e.oldIndex,
        toIndex: e.newIndex
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../colors';
  
  .group{
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    border-radius: 6px;
    margin-bottom: 1em;
    position: relative;

    &:last-child{
      margin-bottom: 0;
    }

    &:hover .click-icon{
      opacity: 1;
    }

    &.collapsed{
      .head{
        border-bottom-color: transparent;
      }

      .carot{
        opacity: 1;
        transform: rotate(180deg);
      }
    }

    .title{
      margin-right: auto;
    }

    .amount{
      color: #888;
      width: 100px;
      margin-left: 1em;

      input{
        color: inherit;
        font-size: inherit;
        width: 100%;
        outline: none;
        border-radius: 5px;
        border: 1px solid transparent;
        text-overflow: ellipsis;

        &:focus{
          border-color: $blue;
          box-shadow: 0 0 1px $blue;
        }
      }
    }
  }

  .head{
    font-size: 20px;
    padding: 1em 0;
    margin: 0 1em;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    transition: border-bottom-color 0.2s ease-in-out;

    .tooltip{
      position: absolute;
      top: calc(100% + 10px);
      border-radius: 6px;
      left: -2em;
      box-shadow: 0 0 20px 5px rgba(#000, 0.1);
      cursor: default;
      font-weight: 500;
      white-space: nowrap;
      background: $orange-gradient;
      z-index: 5;

      input{
        border: none;
        outline: none;
        padding: 1em;
        font-size: 16px;
        background-color: transparent;
        font-weight: 500;
        color: #fff;

        &::placeholder{
          color: #fff;
        }
      }
    }

    .amount{
      font-size: 12px;
    }

    .carot{
      position: absolute;
      right: 1rem;
    }
  }

  .click-icon{
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
    transition: background-color 0.15s ease-in-out, transform 0.15s ease-in-out, opacity 0.1s ease-in-out;
    cursor: pointer;

    &:hover{
      background-color: #eee;
    }

    &.visible{
      opacity: 1 !important;
    }
  }

  .categories{
    font-size: 18px;
    overflow: hidden;
    border-radius: 0 0 6px 6px;

    &.collapse{
      &-enter-active,
      &-leave-active {
        transition: height 0.4s ease-in-out;
      }

      &-enter,
      &-leave-to {
        height: 0;
      }
    }

    .category{
      display: flex;
      align-items: center;
      padding: 1em;
      background-color: #fff;
      border-radius: 6px;

      &:hover{
        input{
          border-color: $blue;
        }
      }

      &.ghost{
        opacity: 0;
      }

      &.dragging{
        input{
          border-color: transparent;
        }
      }
    }
  }
</style>
