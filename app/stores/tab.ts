import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', {
  state: () => ({
    activeTab: 'countdown' as 'countdown' | 'info',
  }),
  actions: {
    setActiveTab(tab: 'countdown' | 'info') {
      this.activeTab = tab;
    },
  },
})