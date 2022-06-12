<template>
  <v-card color="#212121" outlined>
    <v-container fluid>
      <h5 class="subtitle">{{ $t('orders.panels.panelTitle') }}</h5>
      {{ this.form }}
      <v-row>
        <v-col cols="12">
          <div class="form-group">
            <v-select
              v-bind:label="$t('orders.panels.panelType')"
              v-bind:items="selectOptions"
              v-bind:input="panelTypeChanged(this.form)"
              v-model="form.panelType"
              item-text="name"
              item-value="value"
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
    <div class="pa-5 ma-5">
      <v-btn
        @click.prevent="removePanel">
        {{ $t('orders.actions.removePanel') }}
      </v-btn>
    </div>
  </v-card>
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
    emits: ['panelFormClear', 'panelFormUpdate'],
    created() {
      const formId = this.id;
      this.form = _.find(this.storeData.panels, function(item) {
        if (formId == item.id) {
          return item;
        }
      });
    },
    methods: {
      ...mapMutations(['setStoreData']),
      removePanel(event) {
        const formId = this.id;
        this.$emit('panelFormClear', {
          id: formId,
        });
      },
      panelTypeChanged(event) {
        if (typeof event == 'undefined') return;
        const formId = this.id;
        this.$emit('panelFormUpdate', {
          id: formId,
          panelType: event.panelType,
        });
      },
      panelIdChanged(event) {
        const formId = this.id;
        this.$emit('panelFormUpdate', {
          id: formId,
          panelId: event.target.value,
        });
      },
    },
  };
</script>
  