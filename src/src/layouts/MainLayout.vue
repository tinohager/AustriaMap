<script setup lang="ts">
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-black">
      <q-toolbar>
        <q-toolbar-title>
          Austria Map
        </q-toolbar-title>

        <q-btn
          stretch
          unelevated
          href="https://github.com/tinohager/AustriaMap"
          icon="code"
          label="GitHub"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
