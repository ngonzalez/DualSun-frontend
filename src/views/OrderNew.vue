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
            </div>
            <div class="form-group">
              <h5>{{ $t('orders.customersTitle') }}</h5>
              <hr />
              <CustomerForm
                v-for="item in this.form.customers"
                :id="item.id"
                @clearclicked="clearCustomerFormClicked">
              </CustomerForm>
              <div class="pa-5 ma-5">
                <v-btn
                  color="white darken-2"
                  @click.prevent="addCustomer">
                  {{ $t('orders.actions.addCustomer') }}
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
  import createOrder from '../mutations/createOrder';
  import dayjs from 'dayjs';
  import _ from 'lodash';

  export default {
    name: 'OrderNew',
    components: { CustomerForm },
    data() {
      return {
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        breadcrumbs: [],
        form: {
          customers: [],
          panels: [],
        },
      };
    },
    created() {
      this.addCustomer();
    },
    watch: {
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {

            // /orders/new
            case 'order_new': {
              // this.setFormValues();
              this.loadBreadCrumbs();
              break;
            }

            // /orders/new
            case 'order_new_redirect': {
              // this.clearFormValues();
              this.loadBreadCrumbs();
              break;
            }

            // /orders
            case 'orders': {
              // create order
              break;
            }
          }
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      ...mapMutations(['setStoreData']),
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
      addCustomer() {
        this.form.customers.push({
          id: _.uniqueId('customer-')
        })
      },
      clearCustomerFormClicked(event) {
        _.remove(this.form.customers, function(item) { if (item.id == event.id) { return item } })
      },
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
          'orderDate': dayjs(event.$d).format('DD/MM/YYYY HH:mm'),
        });
      },
      handleClickSubmit() {
        console.log('handleClickSubmit');
      },
      createOrder() {
        const payload = {
          companyName:  this.form.companyName,
          companySiren: this.form.companySiren,
          orderAddress: this.form.orderAddress,
          orderDate: this.form.orderDate,
          // customers: JSON.stringify(this.getCustomers()),
          // panels: JSON.stringify(this.getPanels()),
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
                  id: this.storeData.createOrderBackend.order.id,
                }
              });
            } else {
              this.$toast.warning(this.$t('orders.error.create'));
            }
          });
      },
    },
  };
</script>
