<script setup lang="ts">
import { DataItem } from 'src/models/DataItem'
import { ref } from 'vue'

const emit = defineEmits(['new-item-added'])

export interface Props {
  dataItems: DataItem[]
}

const props = defineProps<Props>()

const newItem = ref({
  key: undefined,
  value: 0
})

// Prepare values
props.dataItems.forEach(item => {
  item.active = !!item.active
})

function onClick () {
  if (!newItem.value.key || (!newItem.value.value && +newItem.value.value !== 0)) {
    return
  }

  if (props.dataItems.find(i => i.key.toUpperCase() === newItem.value.key.toUpperCase())) {
    return
  }

  const item : DataItem = {
    key: newItem.value.key,
    value: newItem.value.value
  }
  //   props.dataItems.push(item)

  emit('new-item-added', item)
  newItem.value.key = undefined
  newItem.value.value = 0
}

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
              type="text"
            />
          </q-item-section>
          <q-input
            v-model="item.value"
            filled
            type="number"
            style="width: 80px"
          />
        </q-item>
      </template>
    </q-list>
    <q-list
      dense
      bordered
      padding
      class="rounded-borders"
      style="margin-top: 50px"
    >
      <q-item
        v-ripple
        clickable
      >
        <q-input
          v-model="newItem.key"
          filled
          type="text"
        />
        <q-input
          v-model="newItem.value"
          filled
          type="number"
          style="width: 80px"
        />
      </q-item>
    </q-list>
    <q-btn
      color="grey-8"
      unelevated
      label="Hinzufügen"
      icon-right="add"
      class="q-mt-sm full-width"
      @click="onClick"
    />
  </div>
</template>

<style scoped />
