import Vuex from 'vuex';
import defaultState from './state/state';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import actions from './actions/actions';

const isDev = process.env.NODE_DEV === 'development';

export default () => {
  return new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        // 默认情况下mutations是全局的，加上这个就有命名空间了
        namespaced: true,
        state: {
          text: 1,
        },
        mutations: {
          updateText(state, text: number) {
            state.text = text;
          },
        },
        getters: {
          testText(state, getter, rootState) {
            return state.text + rootState.count;
          },
        },
        actions: {
          updateTxtAsync({state, commit, rootState}) {
            setTimeout(() => {
              // 不加{root: true}会只在当前命名空间下寻找
              commit('updateText', rootState.count, {root: true});
            }, 1000);
          },
        },
      },
    },
  });
};
