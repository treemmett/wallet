import { Module } from 'vuex';
import api from '../utils/api';

export interface BudgetState {
  categories: Rudget.BudgetCategory[];
  groups: Rudget.BudgetGroup[];
}

const module: Module<BudgetState, Rudget.RootState> = {
  state: {
    groups: [],
    categories: []
  },
  getters: {
    budget(state) {
      const a = state.groups.map(group => ({
        ...group,
        categories: state.categories.filter(c => c.groupId === group.id)
      }));

      return a;
    }
  },
  mutations: {
    editCategory(state, payload) {
      if (payload.name) {
        state.categories[payload.index].name = payload.name;
      }

      if (payload.amount) {
        state.categories[payload.index].amount = payload.amount;
      }
    },
    renameGroup(state, payload) {
      state.groups[payload.index].name = payload.name;
    },
    setBudget(state, payload) {
      state.categories = payload.categories;
      state.groups = payload.groups;
    }
  },
  actions: {
    async editCategory(context, payload: { id: string; name?: string; amount?: number }) {
      const data: { name?: string; amount?: number } = {};

      if (payload.name) {
        data.name = payload.name;
      }

      if (payload.amount) {
        data.amount = payload.amount;
      }

      const res = await api.put(`/category/${payload.id}`, data);

      // find index of category
      const index = context.state.categories.findIndex(c => c.id === payload.id);

      if (index < 0) {
        throw new Error(`Category ID ${payload.id} was not found in state.`);
      }

      context.commit({
        type: 'editCategory',
        index,
        amount: data.amount,
        name: payload.name
      });
    },
    async renameGroup(context, payload: { id: string; name: string }) {
      const res = await api.put(`/group/${payload.id}`, {
        name: payload.name
      });

      // find index of group
      const index = context.state.groups.findIndex(g => g.id === payload.id);

      if (index < 0) {
        throw new Error(`Group ID ${payload.id} was not found in state.`);
      }

      context.commit({
        type: 'renameGroup',
        index,
        name: payload.name
      });
    },
    async loadBudget({ commit }) {
      const { data } = await api.get('/budget');

      commit({
        type: 'setBudget',
        categories: data.categories,
        groups: data.groups
      });
    }
  }
};

export default module;
