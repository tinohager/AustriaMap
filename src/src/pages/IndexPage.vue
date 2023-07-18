<script setup lang="ts">
import { ref } from 'vue'

import MapView from 'components/MapView.vue'

const selectedCity = ref('')

function cityChanged (name : string) {
  selectedCity.value = name
}
</script>

<template>
  <q-page class="row">
    <div class="col-6">
      <MapView @selectionchanged="cityChanged" />
    </div>
    <div class="col-6">
      <h1>{{ selectedCity }}</h1>
    </div>
  </q-page>
</template>
