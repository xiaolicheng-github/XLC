import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    id: '',
    name: '',
    showLogin: false
  }),
  getters: {
    id(state) {
      return state.id
    }
  },
  actions: {
    setId(id: string) {
      this.id = id;
    },
    setShowLogin(v: boolean) {
      this.showLogin = v;
    }
  }
});