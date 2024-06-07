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

const zoom = ref(1)
</script>

<template>
  <q-page class="row">
    <div class="col-9 bg-grey-1">
      <!-- <VorarlbergMapView @selectionchanged="cityChanged" /> -->
      <h2>Vorarlberg</h2>
      <div class="bg-grey-10">
        <SvgMapView
          :map-data-provider="vorarlbergDataProvider"
          :zoom="zoom"
        />
      </div>
      <h2>Austria</h2>
      <div class="bg-grey-10">
        <SvgMapView :map-data-provider="austriaDataProvider" />
      </div>
    </div>
    <div class="col-3">
      <!-- <h1>{{ selectedCity }}</h1> -->
    </div>
  </q-page>
</template>
