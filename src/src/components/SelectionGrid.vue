<script setup lang="ts">
import { DataItem } from 'src/models/DataItem'

export interface Props {
  dataItems: DataItem[]
}

const props = defineProps<Props>()

// Prepare values
props.dataItems.forEach(item => {
  item.active = !!item.active
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
      <template
        v-for="(item,index) in props.dataItems"
        :key="`list-${index}`"
      >
        <q-item
          v-ripple
          clickable
        >
          <!-- <q-checkbox v-model="item.active" /> -->
          <q-item-section>
            <q-input
              v-model="item.key "
              filled
              label="Filled"
              type="text"
            />
          </q-item-section>
          <q-input
            v-model="item.value"
            filled
            label="Filled"
            type="number"
            style="width: 80px"
          />
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<style scoped />
