<script setup lang="ts">
import { ref } from 'vue'

import { MapItem, MapItemPoint } from 'src/models/MapItem'

const emit = defineEmits(['selectionchanged'])

export interface Props {
  mapItems: MapItem[]
}

const props = defineProps<Props>()

const selected = ref<string | undefined>(undefined)
const hover = ref<string | undefined>(undefined)

function createPolygon (points: MapItemPoint[]) {
  if (!points.length) {
    return ''
  }

  let result = ''
  for (let index = 0; index < points.length; index++) {
    result = `${result} ${points[index].x},${points[index].y}`
  }
  return result
}

function mouseOver (item: MapItem) {
  hover.value = item.name
}

function mouseOut () {
  hover.value = undefined
}

function selectItem (name: string) {
  if (selected.value === name) {
    selected.value = undefined
    emit('selectionchanged', undefined)
    return
  }
  selected.value = name
  emit('selectionchanged', name)
}

function isHover (item: MapItem) {
  if (item.name === hover.value) {
    return true
  }

  return false
}

function isSelected (item: MapItem) {
  if (item.name === selected.value) {
    return true
  }

  return false
}

function getFillColor (item: MapItem) {
  if (isSelected(item)) {
    return '#ffeb3b'
  }

  if (isHover(item)) {
    return '#dddddd'
  }

  if (item.active) {
    return '#fff'
  }
  return 'transparent'
}

function getStrokeColor (item: MapItem) {
  if (isSelected(item)) {
    return '#000000'
  }

  return '#dddddd'
}

function getCenterPoint (points: MapItemPoint[]) {
  if (points && !points.length) {
    return { x: 0, y: 0 }
  }

  let x = 0
  let y = 0

  points.forEach(point => {
    x += point.x
    y += point.y
  })

  const centroid = { x: x / points.length, y: y / points.length }
  return centroid
}

function calculateViewBox () {
  const xMin = Math.min(...props.mapItems.map(mapItem => Math.min(...mapItem.points.map(point => point.x))))
  const xMax = Math.max(...props.mapItems.map(mapItem => Math.max(...mapItem.points.map(point => point.x))))
  const yMin = Math.min(...props.mapItems.map(mapItem => Math.min(...mapItem.points.map(point => point.y))))
  const yMax = Math.max(...props.mapItems.map(mapItem => Math.max(...mapItem.points.map(point => point.y))))

  const width = xMax - xMin
  const height = yMax - yMin

  return `${xMin} ${yMin} ${width} ${height}`
}

</script>

<template>
  <svg
    id="SvgMap"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="calculateViewBox()"
    width="800"
    height="650"
  >
    <template v-for="(item, index) in mapItems">
      <polygon
        v-if="!isSelected(item)"
        :key="`polygon${index}`"
        :points="createPolygon(item.points)"
        :stroke-width="`0.5px`"
        :stroke="getStrokeColor(item)"
        :fill="getFillColor(item)"
      />
      <polygon
        v-else
        :key="`polygon-selected${index}`"
        :points="createPolygon(item.points)"
        :stroke-width="`0.5px`"
        :stroke="getStrokeColor(item)"
        :fill="getFillColor(item)"
      />
    </template>

    <g
      v-for="(item, index) in mapItems"
      :key="`group${index}`"
    >
      <text
        v-if="item.active || isSelected(item)"
        :x="getCenterPoint(item.points).x"
        :y="getCenterPoint(item.points).y"
        dominant-baseline="middle"
        text-anchor="middle"
        :font-size="hover ? '0.8em' : '1.0em'"
        :fill="isSelected(item) ? '#000000' : '#bbbbbb'"
      >{{ item.name }}
      </text>

      <text
        v-if="isHover(item)"
        :x="getCenterPoint(item.points).x"
        :y="getCenterPoint(item.points).y"
        dominant-baseline="middle"
        text-anchor="middle"
        font-size="1.5em"
        fill="#000000"
      >{{ item.name }}
      </text>

      <polygon
        :points="createPolygon(item.points)"
        :stroke="'transparent'"
        :fill="'transparent'"
        @click="selectItem(item.name)"
        @mouseover="mouseOver(item)"
        @mouseout="mouseOut()"
      />
    </g>

  </svg>
</template>

<style scoped>
 svg text {
  user-select: none;
  pointer-events: none;
}
</style>
