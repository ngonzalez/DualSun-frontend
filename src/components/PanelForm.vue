<template>
  #{{ this.id }}
  <v-card color="#212121" outlined>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <div class="form-group">
            <v-select
              v-bind:label="$t('orders.panels.panelType')"
              v-bind:items="selectOptions"
              v-bind:input="panelTypeChanged(this.form)"
              item-text="name"
              item-value="value"
              v-model="this.form[this.id]"
              class="pa-1 ma-1"
              color="white darken-2"
              outlined
              variant="outlined">
            </v-select>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="form-group">
            <v-text-field
              v-bind:label="$t('orders.panels.panelId')"
              class="pa-1 ma-1"
              color="white darken-2"
              outlined
              variant="outlined"
              @change="this.panelIdChanged($event)"
              v-model="form.panelId">
            </v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <div class="pa-5 ma-5">
    <v-btn
      @click.prevent="removePanel">
      {{ $t('orders.actions.removePanel') }}
    </v-btn>
  </div>
  <hr />
</template>

<script>
  import _ from 'lodash';
  import { mapMutations } from 'vuex';

  export default {
    name: 'PanelForm',
    data: () => ({
      form: {},
      selectOptions: [
        { title: "Photovoltaic", value: "photovoltaic" },
        { title: "Hybrid", value: "hybrid" },
      ],
    }),
    props: {
      id: String,
    },
    emits: ['panelFormClear'],
    methods: {
      ...mapMutations(['setStoreData']),
      removePanel(event) {
        this.$emit('panelFormClear', { id: this.id });
      },
      panelTypeChanged(event) {
        console.log('panelTypeChanged')
        console.log(event);
      },
      panelIdChanged(event) {
        console.log('panelIdChanged')
        console.log(event);
      },
    },
  };
</script>
  