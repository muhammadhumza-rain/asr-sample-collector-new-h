import { defineStore } from 'pinia';
import actions from './actions';
import state from './state';
import getters from './getters';

export const useAppStateStore = defineStore('appState', {
  state: () => {
    return state;
  },
  actions,
  getters
});
