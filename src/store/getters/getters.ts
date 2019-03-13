import { VuexStateType } from '../type';
import { GetterTree } from 'vuex';

// 相当于computed
const getters: GetterTree<VuexStateType, any> = {
  fullName: (state: VuexStateType) => `${state.firstName} ${state.lastName}`,
};

export default getters;
