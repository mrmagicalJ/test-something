import { VuexStateType } from '../type';
import { ActionTree } from 'vuex';

const actions: ActionTree<VuexStateType, any> = {
  updateCountAsync({commit}, data) {
    setTimeout(() => {
      commit('updateCount', data.num);
    }, data.time);
  },
};

export default actions;
