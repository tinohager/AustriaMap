<script setup lang="ts">
import { ref, inject } from 'vue'

import { dataProvider as austriaDataProvider } from '../dataProviders/austriaDataProvider'
import { dataProvider as vorarlbergDataProvider } from '../dataProviders/vorarlbergDataProvider'
import { dataProvider as testDataProvider } from '../dataProviders/testDataProvider'

import { DataItem } from 'src/models/DataItem'
import { MapConfiguration } from 'src/models/MapConfiguration'

import SvgMapView from 'components/SvgMapView.vue'
import SelectionGrid from 'components/SelectionGrid.vue'

const splitterModel = ref(20)
const tab = ref('austria')

const dataItems = ref<DataItem[]>([
  {
    key: 'Burgenland',
    value: 8
  },
  {
    key: 'Kärnten',
    value: 60
  },
  {
    key: 'Niederösterreich',
    value: 60
  },
  {
    key: 'Oberösterreich',
    value: 60
  },
  {
    key: 'Salzburg',
    value: 60
  },
  {
    key: 'Steiermark',
    value: 30
  },
  {
    key: 'Tirol',
    value: 100
  },
  {
    key: 'Vorarlberg',
    value: 200
  },
  {
    key: 'Wien',
    value: 30
  }
])

const mapConfiguration = inject<MapConfiguration>('mapConfiguration')

function newItemAdded (item: DataItem) {
  dataItems.value.push(item)
}

</script>

<template>
  <q-page>
    <q-splitter v-model="splitterModel">
      <template #before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-grey-8"
        >
          <q-tab
            name="austria"
            icon="map"
            label="Austria"
          />
          <q-tab
            name="vorarlberg"
            icon="map"
            label="Vorarlberg"
          />
          <q-tab
            name="test"
            icon="map"
            label="Test"
          />
        </q-tabs>

        <SelectionGrid
          :data-items="dataItems"
          @new-item-added="newItemAdded"
        />
      </template>

      <template #after>
        <q-tab-panels
          v-model="tab"
          vertical
        >
          <q-tab-panel
            name="vorarlberg"
            class="q-pa-none"
          >
            <SvgMapView
              :map-data-provider="vorarlbergDataProvider"
              :zoom="1"
              :map-configuration="mapConfiguration"
              :data-items="dataItems"
            />
          </q-tab-panel>

          <q-tab-panel
            name="austria"
            class="q-pa-none"
          >
            <SvgMapView
              :map-data-provider="austriaDataProvider"
              :zoom="1"
              :map-configuration="mapConfiguration"
              :data-items="dataItems"
            />
          </q-tab-panel>

          <q-tab-panel
            name="test"
            class="q-pa-none"
          >
            <SvgMapView
              :map-data-provider="testDataProvider"
              :zoom="1"
              :map-configuration="mapConfiguration"
            />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>
