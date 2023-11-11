<script setup lang="ts">
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      class="bg-black"
    >
      <q-toolbar>
        <q-toolbar-title>
          Vorarlberg MAP
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
