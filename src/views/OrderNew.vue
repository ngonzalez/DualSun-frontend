<template>
  <v-card class="container">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>
      <v-row v-if="hasErrors">
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <ul v-for="error in this.errors">
            <li>
              <v-alert
                type="error"
              >
                {{ error }}
              </v-alert>
            </li>
          </ul>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <hr class="invisible" />
          <form class="simple_form form-horizontal">
            <div class="form-group">
              <v-text-field
                v-bind:label="$t('orders.companyName')"
                class="pa-1 ma-1"
                color="white darken-2"
                outlined
                variant="outlined"
                @change="this.companyNameChanged($event)"
                v-model="form.companyName">
              </v-text-field>
            </div>
            <div class="form-group">
              <v-text-field
                v-bind:label="$t('orders.companySiren')"
                class="pa-1 ma-1"
                color="white darken-2"
                outlined
                variant="outlined"
                @change="this.companySirenChanged($event)"
                v-model="form.companySiren">
              </v-text-field>
            </div>
            <div class="form-group">
              <v-text-field
                v-bind:label="$t('orders.orderAddress')"
                class="pa-1 ma-1"
                color="white darken-2"
                outlined
                variant="outlined"
                @change="this.orderAddressChanged($event)"
                v-model="form.orderAddress">
              </v-text-field>
            </div>
            <div class="form-group">
              <a-date-picker
                show-time
                placeholder="Select time"
                @change="this.orderDateChanged($event)" />
              <h5 class="subtitle ma-5 pa-5">
                {{ this.getOrderDateFormatted() }}
              </h5>
            </div>
            <div class="form-group">
              <h5>{{ $t('orders.customersTitle') }}</h5>
              <hr />
              <CustomerForm
                v-for="item in this.form.customers"
                :id="item.id"
                @customerFormClear="clearCustomerFormClicked"
                @customerFormUpdate="updateCustomerFormClicked">
              </CustomerForm>
              <div class="pa-5 ma-5">
                <v-btn
                  color="white darken-2"
                  @click.prevent="addCustomer">
                  {{ $t('orders.actions.addCustomer') }}
                </v-btn>
              </div>
            </div>
            <div class="form-group">
              <h5>{{ $t('orders.panelsTitle') }}</h5>
              <hr />
              <PanelForm
                v-for="item in this.form.panels"
                :id="item.id"
                @panelFormClear="clearPanelFormClicked"
                @panelFormUpdate="updatePanelFormClicked">
              </PanelForm>
              <div class="pa-5 ma-5">
                <v-btn
                  color="white darken-2"
                  @click.prevent="addPanel">
                  {{ $t('orders.actions.addPanel') }}
                </v-btn>
              </div>
            </div>
            <div class="text-center">
              <div class="pa-10 ma-10">
                <button
                  class="btn btn-default btn btn-primary"
                  @click.prevent="handleClickSubmit">
                  {{ $t('orders.actions.submit') }}
                </button>
              </div>
            </div>
          </form>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import CustomerForm from '../components/CustomerForm.vue';
  import PanelForm from '../components/PanelForm.vue';
  import createOrder from '../mutations/createOrder';
  import uniqid from 'uniqid';
  import dayjs from 'dayjs';
  import _ from 'lodash';

  export default {
    name: 'OrderNew',
    components: {
      CustomerForm,
      PanelForm,
    },
    data() {
      return {
        breadcrumbs: [],
        errors: null,
        form: {
          customers: [],
          panels: [],
        },
      };
    },
    created() {
      if (!this.hasCustomers()) {
        this.addCustomer();
        if (!this.storeData.customers) {
          this.setStoreData({ 'customers': [] });
        }
      }
      if (!this.hasPanels()) {
        this.addPanel();
        if (!this.storeData.panels) {
          this.setStoreData({ 'panels': [] });
        }
      }
    },
    watch: {
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {
            // /orders/new
            case 'order_new': {
              this.setFormValues();
              this.loadBreadCrumbs();
              break;
            }

            // /orders/new
            case 'order_new_redirect': {
              this.clearFormValues();
              this.loadBreadCrumbs();
              break;
            }
          }
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      ...mapMutations(['setStoreData', 'setStoreDataFromKey']),
      loadBreadCrumbs() {
        this.breadcrumbs = [];
        this.breadcrumbs.push({
          disabled: false,
          text: this.$t('orders.newOrderTitle'),
          to: {
            name: 'order_new_redirect'
          },
        });
      },
      hasErrors() {
        return this.errors &&
               this.errors.length > 0
      },
      // customers
      customers() {
        if (!this.storeData.customers) return;
        return this.storeData.customers;
      },
      hasCustomers() {
        return this.storeData.customers &&
               this.storeData.customers.length > 0
      },
      addCustomer() {
        this.form.customers.push({
          id: uniqid(),
        });
        this.setStoreData({ 'customers': this.form.customers });
      },
      clearCustomerFormClicked(event) {
        _.remove(this.form.customers, function(item) {
          if (item.id == event.id) { return item }
        });
        this.setStoreData({ 'customers': this.form.customers });
      },
      updateCustomerFormClicked(event) {
        this.setStoreData({ 'customers': this.form.customers });
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
      addPanel() {
        this.form.panels.push({
          id: uniqid(),
        });
        this.setStoreData({ 'panels': this.form.panels });
      },
      clearPanelFormClicked(event) {
        _.remove(this.form.panels, function(item) {
          if (item.id == event.id) { return item }
        });
        this.setStoreData({ 'panels': this.form.panels });
      },
      updatePanelFormClicked(event) {
        this.setStoreData({ 'panels': this.form.panels });
      },
      // form
      clearFormValues() {
        this.setStoreData({ 'companyName': null });
        this.form.companyName = null;
        this.setStoreData({ 'companySiren': null });
        this.form.companySiren = null;
        this.setStoreData({ 'orderAddress': null });
        this.form.orderAddress = null;
        this.setStoreData({ 'orderDate': null });
        this.form.orderDate = null;
        this.setStoreData({ 'customers': null });
        this.form.customers = null;
        this.setStoreData({ 'panels': null });
        this.form.panels = null;
      },
      setFormValues() {
        if (this.storeData.companyName) {
          this.form.companyName = this.storeData.companyName;
        }
        if (this.storeData.companySiren) {
          this.form.companySiren = this.storeData.companySiren;
        }
        if (this.storeData.orderAddress) {
          this.form.orderAddress = this.storeData.orderAddress;
        }
        if (this.storeData.orderDate) {
          this.form.orderDate = this.storeData.orderDate;
        }
        if (this.storeData.customers) {
          this.form.customers = this.storeData.customers;
        }
        if (this.storeData.panels) {
          this.form.panels = this.storeData.panels;
        }
      },
      companyNameChanged(event) {
        this.setStoreData({
          'companyName': event.target.value,
        });
      },
      companySirenChanged(event) {
        this.setStoreData({
          'companySiren': event.target.value,
        });
      },
      orderAddressChanged(event) {
        this.setStoreData({
          'orderAddress': event.target.value,
        });
      },
      orderDateChanged(event) {
        this.setStoreData({
          'orderDate': dayjs(event.$d).toISOString(),
        });
      },
      handleClickSubmit() {
        this.createOrder();
      },
      getOrderDateFormatted() {
        if (this.storeData.orderDate) {
          return dayjs(this.storeData.orderDate).format('dddd, MMMM D, YYYY h:mm A');
        } else {
          return dayjs(new Date()).format('dddd, MMMM D, YYYY 12:00 A');
        }
      },
      getOrderDateIso() {
        if (this.storeData.orderDate) {
          return dayjs(this.storeData.orderDate).toISOString();
        } else {
          return dayjs(new Date()).toISOString();
        }
      },
      getCustomers() {
        return _.map(this.storeData.customers, function(item) {
          return {
            name: item.name,
            email: item.email,
            phone: item.phone,
          }
        });
      },
      getPanels() {
        return _.map(this.storeData.panels, function(item) {
          return {
            panelId: item.panelId,
            panelType: item.panelType,
          }
        });
      },
      createOrder() {
        const payload = {
          companyName:  this.form.companyName,
          companySiren: this.form.companySiren,
          orderAddress: this.form.orderAddress,
          orderDate: this.getOrderDateIso(),
          customers: JSON.stringify(this.getCustomers()),
          panels: JSON.stringify(this.getPanels()),
        };
        createOrder(_.assign({ apollo: this.$apollo }, payload))
          .then((response) => _.get(response, 'data.createOrder', {}))
          .then(response => {
            if (response.success) {
              this.setStoreData({
                'createOrderBackend': response,
              });
              this.$toast.info(this.$t('orders.success.create'));
              this.$router.push({
                name: 'order_show',
                params: {
                  id: this.storeData.createOrderBackend.order.itemId,
                }
              });
            } else {
              this.$toast.warning(this.$t('orders.error.create'));
              this.errors = JSON.parse(response.errors);
            }
          });
      },
    },
  };
</script>
