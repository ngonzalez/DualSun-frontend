import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['storeData']),

    // customers
    customers() {
      if (!this.storeData.customers) return;
      return this.storeData.customers;
    },
    hasCustomers() {
      return this.storeData.customers &&
             this.storeData.customers.length > 0
    },

    // panels
    panels() {
      if (!this.storeData.panels) return;
      return this.storeData.panels;
    },
    hasPanels() {
      return this.storeData.panels &&
             this.storeData.panels.length > 0
    },
    
  },
};
