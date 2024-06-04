<script setup lang="ts">
import { ref } from 'vue'

import VorarlbergMapView from 'components/VorarlbergMapView.vue'
import AustriaMapView from 'components/AustriaMapView.vue'

const selectedCity = ref('')

function cityChanged (name : string) {
  selectedCity.value = name
}
</script>

<template>
  <q-page class="row">
    <div class="col-9 bg-grey-1">
      <VorarlbergMapView @selectionchanged="cityChanged" />
      <AustriaMapView />
    </div>
    <div class="col-3">
      <h1>{{ selectedCity }}</h1>
    </div>
  </q-page>
</template>
