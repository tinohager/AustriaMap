<script setup lang="ts">
import { ref, computed } from 'vue'

import { MapItem, MapItemPoint } from 'src/models/MapItem'
import { MapDataProvider } from 'src/models/MapDataProvider'

const emit = defineEmits(['selectionchanged', 'zoomchanged'])

export interface Props {
  mapDataProvider: MapDataProvider
  zoom?: number
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

  // if (item.active) {
  //   return '#fff'
  // }
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
  const xMin = Math.min(...props.mapDataProvider.mapItems.map(mapItem => Math.min(...mapItem.points.map(point => point.x))))
  const xMax = Math.max(...props.mapDataProvider.mapItems.map(mapItem => Math.max(...mapItem.points.map(point => point.x))))
  const yMin = Math.min(...props.mapDataProvider.mapItems.map(mapItem => Math.min(...mapItem.points.map(point => point.y))))
  const yMax = Math.max(...props.mapDataProvider.mapItems.map(mapItem => Math.max(...mapItem.points.map(point => point.y))))

  const width = xMax - xMin
  const height = yMax - yMin

  return `${xMin - 10} ${yMin - 10} ${width + 10} ${height + 10}`
}

const currentPosition = ref({
  x: 0,
  y: 0
})
const startPosition = {
  x: 0,
  y: 0
}

const transformStyle = computed(() => {
  return `translate(${currentPosition.value.x}px, ${currentPosition.value.y}px) scale(${tempZoom.value}.0)`
})

let isMouseDown = false
function mousedown (e: MouseEvent) {
  isMouseDown = true
  startPosition.x = e.clientX - currentPosition.value.x
  startPosition.y = e.clientY - currentPosition.value.y
}
function mousemove (e: MouseEvent) {
  if (isMouseDown) {
    currentPosition.value.x = e.clientX - startPosition.x
    currentPosition.value.y = e.clientY - startPosition.y
  }
}

document.addEventListener('mouseup', () => {
  isMouseDown = false
})

const ZOOM_SPEED = 1

const tempZoom = ref(props.zoom || 1)

function wheel (e: WheelEvent) {
  if (e.deltaY <= 0) {
    tempZoom.value += ZOOM_SPEED
  } else {
    tempZoom.value -= ZOOM_SPEED
  }
  tempZoom.value = Math.min(Math.max(Math.round(tempZoom.value), 1), 10)
  emit('zoomchanged', tempZoom.value)
  e.preventDefault()
  e.stopPropagation()
}
</script>

<template>
  <div
    style="width: 100%; height: 100%; overflow: hidden;"
    @mousedown="mousedown"
    @mousemove="mousemove"
    @wheel="wheel"
  >
    <svg
      id="SvgMap"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="calculateViewBox()"
      width="800"
      height="650"
      :style="{transform: transformStyle}"
    >
      <template v-for="(item, index) in mapDataProvider.mapItems">
        <polygon
          v-if="!isSelected(item)"
          :key="`polygon${index}`"
          :points="createPolygon(item.points)"
          vector-effect="non-scaling-stroke"
          :stroke-width="`0.1vw`"
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
        v-for="(item, index) in mapDataProvider.mapItems"
        :key="`group${index}`"
      >
        <!-- <text
                v-if="item.active || isSelected(item)"
                :x="getCenterPoint(item.points).x"
                :y="getCenterPoint(item.points).y"
                dominant-baseline="middle"
                text-anchor="middle"
                :font-size="hover ? '0.8em' : '1.0em'"
                :fill="isSelected(item) ? '#000000' : '#bbbbbb'"
            >{{ item.name }}
            </text> -->

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
  </div>
</template>

<style scoped>
 svg text {
  user-select: none;
  pointer-events: none;
}
</style>
