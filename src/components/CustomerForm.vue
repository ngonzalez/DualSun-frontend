<template>
  #{{ this.id }}
  <v-card color="#212121" outlined>
    <v-container fluid>
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
  </v-card>
  <div class="pa-5 ma-5">
    <v-btn
      @click.prevent="removeCustomer">
      {{ $t('orders.actions.removeCustomer') }}
    </v-btn>
  </div>
  <hr />
</template>

<script>
  import _ from 'lodash';
  import { mapMutations } from 'vuex';

  export default {
    name: 'CustomerForm',
    data: () => ({
      form: {},
      selectOptions: [],
    }),
    props: {
      id: String,
    },
    emits: ['clearclicked'],
    methods: {
      ...mapMutations(['setStoreData']),
      removeCustomer(event) {
        this.$emit('clearclicked', { id: this.id });
      },
      nameChanged(event) {
        console.log('nameChanged')
        console.log(event);
      },
      emailChanged(event) {
        console.log('nameChanged')
        console.log(event);
      },
      phoneChanged(event) {
        console.log('phoneChanged')
        console.log(event);
      },
    },
  };
</script>
  