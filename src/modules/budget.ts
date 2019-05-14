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
    setBudget(state, payload) {
      state.categories = payload.categories;
      state.groups = payload.groups;
    }
  },
  actions: {
    async loadBudget({ commit }) {
      const { data } = await api.get('/budget');

      commit({
        type: 'setBudget',
        categories: [].concat(
          ...data.groups.map(({ categories, id }: any) =>
            categories.map((c: any) => ({ ...c, groupId: id }))
          )
        ),
        groups: data.groups.map(({ categories, ...rest }: any) => ({ ...rest }))
      });
    }
  }
};

export default module;
