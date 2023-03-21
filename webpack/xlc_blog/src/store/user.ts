import { defineStore } from "pinia";

export const useStore = defineStore('userStore', {
  state: () => ({
    id: '',
    name: ''
  }),
  getters: {
    id(state) {
      return state.id
    }
  },
  actions: {
    setId(id: string) {
      this.id = id;
    }
  }
});