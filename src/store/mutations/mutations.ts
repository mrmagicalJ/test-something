import { MutationTree } from 'vuex';
import { VuexStateType } from '../type';

const mutations: MutationTree<VuexStateType> = {
  countPlusOne(state: VuexStateType) {
    state.count++;
  },
  updateCount(state: VuexStateType, num: number) {
    state.count = num;
  },
};

export default mutations;
