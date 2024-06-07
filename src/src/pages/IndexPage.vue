<script setup lang="ts">
import { ref } from 'vue'

import { dataProvider as austriaDataProvider } from '../dataProviders/austriaDataProvider'
import { dataProvider as vorarlbergDataProvider } from '../dataProviders/vorarlbergDataProvider'

import SvgMapView from 'components/SvgMapView.vue'
// import VorarlbergMapView from 'components/VorarlbergMapView.vue'

// const selectedCity = ref('')

// function cityChanged (name : string) {
//   selectedCity.value = name
// }

const splitterModel = ref(20)
const tab = ref('austria')
</script>

<template>
  <q-page>
    <q-splitter
      v-model="splitterModel"
    >
      <template #before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-grey-8"
        >
          <q-tab
            name="vorarlberg"
            icon="map"
            label="Vorarlberg"
          />
          <q-tab
            name="austria"
            icon="map"
            label="Austria"
          />
        </q-tabs>
      </template>

      <template #after>
        <q-tab-panels
          v-model="tab"
          vertical
          class="bg-grey"
        >
          <q-tab-panel name="vorarlberg">
            <SvgMapView :map-data-provider="vorarlbergDataProvider" />
          </q-tab-panel>

          <q-tab-panel name="austria">
            <SvgMapView :map-data-provider="austriaDataProvider" />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>
