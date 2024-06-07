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
const svgRef = ref<SVGSVGElement>()
const svgHomeRef = ref<HTMLDivElement>()
const point1 = ref()
const point2 = ref({ x: 0, y: 0 })

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

  const padding = 0

  return `${xMin - padding} ${yMin - padding} ${width + padding} ${height + padding}`
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
  e.preventDefault()
  e.stopPropagation()
  const oldZoom = tempZoom.value
  if (e.deltaY <= 0) {
    tempZoom.value += ZOOM_SPEED
  } else {
    tempZoom.value -= ZOOM_SPEED
  }
  tempZoom.value = Math.min(Math.max(Math.round(tempZoom.value), 1), 10)

  console.log(e)

  point2.value.x = e.clientX
  point2.value.y = e.clientY

  let point = svgRef.value?.createSVGPoint()
  if (!point) {
    return
  }

  const matrix = svgRef.value?.getScreenCTM()
  if (!matrix) {
    return
  }
  console.log(svgRef.value?.getScreenCTM())

  point.x = e.clientX - matrix?.e
  point.y = e.clientY - matrix?.f
  point = point.matrixTransform(svgRef.value.getCTM())
  console.log(point)

  point1.value = point

  const deltaNew = {
    x: (point.x * (tempZoom.value / oldZoom)) - point.x,
    y: (point.y * (tempZoom.value / oldZoom)) - point.y
  }

  currentPosition.value.x -= deltaNew.x
  currentPosition.value.y -= deltaNew.y

  emit('zoomchanged', tempZoom.value)
}
</script>

<template>
  CP:{{ currentPosition }}<br>
  SP:{{ startPosition }}<br>
  VB:{{ calculateViewBox() }}<br>
  Zoom: {{ zoom }} | {{ tempZoom }}}<br>
  {{ transformStyle }}<br>
  WEP:{{ point2.x }}/{{ point2.y }}<br>
  WEP:{{ point1?.x }}/{{ point1?.y }}
  <div
    ref="svgHomeRef"
    style="width: 2000px; overflow: hidden;"
    @mousedown="mousedown"
    @mousemove="mousemove"
    @wheel.prevent="wheel"
  >
    <svg
      id="SvgMap"
      ref="svgRef"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="calculateViewBox()"
      style="background-color: brown; transform-origin: 0 0;"
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
