<script setup lang="ts">
import { ref } from 'vue'

import { dataProvider as austriaDataProvider } from '../dataProviders/austriaDataProvider'
import { dataProvider as vorarlbergDataProvider } from '../dataProviders/vorarlbergDataProvider'
import { dataProvider as testDataProvider } from '../dataProviders/testDataProvider'

import SvgMapView from 'components/SvgMapView.vue'
// import VorarlbergMapView from 'components/VorarlbergMapView.vue'

// const selectedCity = ref('')

// function cityChanged (name : string) {
//   selectedCity.value = name
// }

const splitterModel = ref(20)
const tab = ref('vorarlberg')
const zoom = ref(1)
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
          <q-tab
            name="test"
            icon="map"
            label="Test"
          />
        </q-tabs>
      </template>

      <template #after>
        <q-tab-panels
          v-model="tab"
          vertical
          class="bg-light-blue"
        >
          <q-tab-panel name="vorarlberg">
            <SvgMapView
              :map-data-provider="vorarlbergDataProvider"
              :zoom="zoom"
            />
          </q-tab-panel>

          <q-tab-panel name="austria">
            <SvgMapView :map-data-provider="austriaDataProvider" />
          </q-tab-panel>

          <q-tab-panel name="test">
            <SvgMapView :map-data-provider="testDataProvider" />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>
