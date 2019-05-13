import { Module, VuexModule, MutationAction } from 'vuex-module-decorators';
import api from '../utils/api';

@Module
export default class Budget extends VuexModule {
  public categories: Rudget.BudgetCategory[] = [];

  public groups: Rudget.BudgetGroup[] = [];

  get budget() {
    const a = this.groups.map(group => ({
      ...group,
      categories: this.categories.filter(c => c.groupId === group.id)
    }));

    console.log(a);

    return a;
  }

  @MutationAction({ mutate: ['categories', 'groups'] })
  public async loadBudget() {
    const { data } = await api.get('/budget');

    return {
      categories: [].concat(
        ...data.groups.map(({ categories, id }: any) =>
          categories.map((c: any) => ({ ...c, groupId: id }))
        )
      ),
      groups: data.groups.map(({ categories, ...rest }: any) => ({ ...rest }))
    };
  }
}
