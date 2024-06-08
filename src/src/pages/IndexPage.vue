<script setup lang="ts">
import { ref } from 'vue'

import { dataProvider as austriaDataProvider } from '../dataProviders/austriaDataProvider'
import { dataProvider as vorarlbergDataProvider } from '../dataProviders/vorarlbergDataProvider'
import { dataProvider as testDataProvider } from '../dataProviders/testDataProvider'

import SvgMapView from 'components/SvgMapView.vue'
import SelectionGrid from 'components/SelectionGrid.vue'
import { DataItem } from 'src/models/DataItem'

const splitterModel = ref(20)
const tab = ref('vorarlberg')

const dataItems: DataItem[] = ref([
  {
    key: 'Kennelbach',
    value: 1,
    active: true
  },
  {
    key: 'Dornbirn',
    value: 5
  },

  {
    key: 'Bregenz',
    value: 60
  }
])

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
        <SelectionGrid :data-items="dataItems" />
      </template>

      <template #after>
        <q-tab-panels
          v-model="tab"
          vertical
        >
          <q-tab-panel name="vorarlberg">
            <SvgMapView
              :map-data-provider="vorarlbergDataProvider"
              :zoom="0.8"
              :data-items="dataItems"
            />
          </q-tab-panel>

          <q-tab-panel name="austria">
            <SvgMapView
              :map-data-provider="austriaDataProvider"
              :zoom="0.7"
            />
          </q-tab-panel>

          <q-tab-panel name="test">
            <SvgMapView
              :map-data-provider="testDataProvider"
              :zoom="0.7"
            />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>
