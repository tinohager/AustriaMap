<script setup lang="ts">
import { computed } from 'vue'

import { MapConfiguration } from 'src/models/MapConfiguration'

export interface Props {
  configuration: MapConfiguration
}

const emit = defineEmits<{(e: 'update-configuration', value: MapConfiguration): void }>()

const props = defineProps<Props>()

const configuration = computed<MapConfiguration>({
  get: () => props.configuration,
  set: value => emit('update-configuration', value)
})

</script>

<template>
  <div
    class="q-pa-md"
    style="max-width: 350px"
  >
    <q-list
      dense
      bordered
      padding
      class="rounded-borders"
    >
      <q-item
        v-ripple
        clickable
      >
        <q-checkbox
          v-model="configuration.areaNameVisible"
          label="Show Area Names"
        />
      </q-item>
      <q-item
        v-ripple
        clickable
      >
        <q-item-section side>
          <q-icon
            color="primary"
            name="format_size"
          />
        </q-item-section>
        <q-item-section>
          <q-slider
            v-model="configuration.areaNameFontSize"
            :min="20"
            :max="200"
            thumb-size="35px"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
