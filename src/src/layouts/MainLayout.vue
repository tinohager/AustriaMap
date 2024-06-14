<script setup lang="ts">
import { ref, provide } from 'vue'

import { MapConfiguration } from 'src/models/MapConfiguration'

import MapConfigurator from 'src/components/MapConfigurator.vue'

const leftDrawerOpen = ref(false)
const mapConfiguration = ref<MapConfiguration>({
  areaNameVisible: true,
  areaNameFontSize: 30
})

provide('mapConfiguration', mapConfiguration)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-black">
      <q-toolbar>
        <q-toolbar-title shrink>
          Austria Map
        </q-toolbar-title>

        <q-btn
          stretch
          label="Config"
          unelevated
          @click="toggleLeftDrawer"
        />

        <q-space />

        <q-btn
          stretch
          unelevated
          href="https://github.com/tinohager/AustriaMap"
          icon="code"
          label="GitHub"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      v-close-popup
      bordered
      :overlay="true"
    >
      <div class="text-right">
        <q-btn
          icon="close"
          flat
          @click.capture="leftDrawerOpen = false"
        />
      </div>
      <MapConfigurator :configuration="mapConfiguration" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
