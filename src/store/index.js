import Vue from 'vue';
import Vuex from 'vuex';

import config from '../../config.json';
import dimensions from '../../dimensions.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: JSON.parse(localStorage.getItem('config')) || {},
    dimensions: JSON.parse(localStorage.getItem('dimensions')) || [],
  },
  mutations: {
    getConfig(state, payload) {
      localStorage.setItem('config', JSON.stringify(payload));
      state.config = payload;
    },
    getDimensions(state, payload) {
      localStorage.setItem('dimensions', JSON.stringify(payload));
      state.dimensions = payload;
    },
  },
  actions: {
    getConfig({ commit }) {
      setTimeout(() => {
        commit('getConfig', config);
      }, 2000);
    },
    getDimensions({ commit }) {
      setTimeout(() => {
        commit('getDimensions', dimensions);
      }, 2000);
    },
  },
  getters: {
    userDimensions(state) {
      const userDimensions = {};
      state.dimensions.forEach(({ name, data_type }) => {
        userDimensions[name] = data_type.base_type === 'enum' ? data_type.additional_data.values[0] : false;
      });
      return userDimensions;
    },
  },
});
