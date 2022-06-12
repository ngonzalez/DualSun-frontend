<template>
  <v-card color="#212121" outlined>
    <v-container fluid>
      <h5 class="subtitle">
        {{ $t('orders.customers.customerTitle') }}
      </h5>
      <v-row>
        <v-col cols="12">
          <div class="form-group">
            <v-text-field
              v-bind:label="$t('orders.customers.name')"
              class="pa-1 ma-1"
              color="white darken-2"
              outlined
              variant="outlined"
              @change="this.nameChanged($event)"
              v-model="form.name">
            </v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="form-group">
            <v-text-field
              v-bind:label="$t('orders.customers.email')"
              class="pa-1 ma-1"
              color="white darken-2"
              outlined
              variant="outlined"
              @change="this.emailChanged($event)"
              v-model="form.email">
            </v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="form-group">
            <v-text-field
              v-bind:label="$t('orders.customers.phone')"
              class="pa-1 ma-1"
              color="white darken-2"
              outlined
              variant="outlined"
              @change="this.phoneChanged($event)"
              v-model="form.phone">
            </v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="pa-5 ma-5">
      <v-btn
        @click.prevent="removeCustomer">
        {{ $t('orders.actions.removeCustomer') }}
      </v-btn>
    </div>
  </v-card>
  <hr />
</template>

<script>
  import _ from 'lodash';
  import { mapMutations } from 'vuex';

  export default {
    name: 'CustomerForm',
    data: () => ({
      form: {},
    }),
    props: {
      id: String,
    },
    emits: ['customerFormClear', 'customerFormUpdate'],
    created() {
      const formId = this.id;
      this.form = _.find(this.storeData.customers, function(item) {
        if (formId == item.id) {
          return item;
        }
      });
    },
    methods: {
      ...mapMutations(['setStoreData']),
      removeCustomer(event) {
        const formId = this.id;
        this.$emit('customerFormClear', {
          id: formId,
        });
      },
      nameChanged(event) {
        const formId = this.id;
        this.$emit('customerFormUpdate', {
          id: formId,
          name: event.target.value,
        });
      },
      emailChanged(event) {
        const formId = this.id;
        this.$emit('customerFormUpdate', {
          id: formId,
          email: event.target.value,
        });
      },
      phoneChanged(event) {
        const formId = this.id;
        this.$emit('customerFormUpdate', {
          id: formId,
          phone: event.target.value,
        });
      },
    },
  };
</script>
