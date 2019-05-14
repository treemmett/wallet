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
    renameGroup(state, payload) {
      state.groups[payload.index].name = payload.name;
    },
    setBudget(state, payload) {
      state.categories = payload.categories;
      state.groups = payload.groups;
    }
  },
  actions: {
    async renameGroup(context, payload: { id: string; name: string }) {
      api
        .put(`/group/${payload.id}`, {
          name: payload.name
        })
        .then(() => {
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
        });
    },
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
