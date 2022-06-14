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
        <v-col cols="6" v-if="this.hasOrder()">
          <h5 class="subtitle">{{ $t('orders.orderTitle') }} #{{ this.storeData.getOrderBackend.order.itemId }}</h5>
          <v-container fluid class="align-left">
            <hr />
            <v-row>
              <v-col cols="6">
                {{ $t('orders.companyName') }}
              </v-col>
              <v-col cols="6">
                {{ this.storeData.getOrderBackend.order.companyName }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('orders.companySiren') }}
              </v-col>
              <v-col cols="6">
                {{ this.storeData.getOrderBackend.order.companySiren }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('orders.orderAddress') }}
              </v-col>
              <v-col cols="6">
                {{ this.storeData.getOrderBackend.order.orderAddress }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('orders.orderDate') }}
              </v-col>
              <v-col cols="6">
                {{ this.storeData.getOrderBackend.order.orderDate }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                {{ $t('orders.panelsTitle') }}
              </v-col>
              <v-col cols="6">
                <v-table v-for="item in this.displayPanels()" class="pa-5">
                  <v-row>
                    <v-col>{{ $t('orders.panels.panelId') }}</v-col>
                    <v-col>{{ item.panelId }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col>{{ $t('orders.panels.panelType') }}</v-col>
                    <v-col>{{ item.panelType }}</v-col>
                  </v-row>
                </v-table>
              </v-col>
            </v-row>
            <hr />
            <v-card v-for="customer in this.storeData.getOrderBackend.customers">
              <v-row>
                <v-col cols="6">
                  {{ $t('orders.customers.name') }}
                </v-col>
                <v-col cols="6">
                  {{ customer.name }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  {{ $t('orders.customers.email') }}
                </v-col>
                <v-col cols="6">
                  {{ customer.email }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  {{ $t('orders.customers.phone') }}
                </v-col>
                <v-col cols="6">
                  {{ customer.phone }}
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import getOrder from '../mutations/getOrder';
  import _ from 'lodash';

  export default {
    name: 'OrderShow',
    components: { },
    data() {
      return {
        breadcrumbs: [],
        form: {},
      };
    },
    watch: {
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {

            // /orders/:id
            case 'order_show': {
              this.loadOrder(parseInt(this.$route.params.id));
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
        this.breadcrumbs.push({
          disabled: false,
          text: this.$t('orders.orderTitle'),
          to: {
            name: 'order_show',
            id: this.$route.params.id,
          },
        });
      },
      hasOrder() {
        return this.storeData && this.storeData.getOrderBackend && this.storeData.getOrderBackend.order;
      },
      loadOrder(orderId) {
        getOrder(_.assign({ apollo: this.$apollo }, { orderId: orderId }))
          .then((response) => _.get(response, 'data.getOrder', {}))
          .then(response => {
            if (response.success) {
              this.setStoreData({
                'getOrderBackend': response,
              });
            } else {
              this.$toast.warning(this.$t('orders.error.show'));
            }
          });
      },
      displayPanels() {
        return JSON.parse(this.storeData.getOrderBackend.order.panels);
      },
    },
  };
</script>
