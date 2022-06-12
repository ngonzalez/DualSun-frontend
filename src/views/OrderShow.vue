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
          {{ this.storeData.getOrderBackend }}
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
            name: 'order_new_redirect'
          },
        });
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
      }
    },
  };
</script>
