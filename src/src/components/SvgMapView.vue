<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

import { mathHelper } from 'src/helpers/mathHelper'

import { MapItem, MapItemPoint } from 'src/models/MapItem'
import { MapDataProvider } from 'src/models/MapDataProvider'
import { DataItem } from 'src/models/DataItem'

const emit = defineEmits(['selectionchanged', 'zoomchanged'])

export interface Props {
  mapDataProvider: MapDataProvider
  zoom?: number
  heatmapData?: Map<string, number>
  dataItems?: DataItem[]
}

const props = defineProps<Props>()

const selected = ref<string | undefined>(undefined)
const hover = ref<string | undefined>(undefined)
const svgRef = ref<SVGSVGElement>()
const isMouseDown = ref(false)
const viewBox = ref('')

const mousePosition = ref({ x: 0, y: 0 })

const tempZoom = ref(props.zoom || 1)

const currentPosition = ref({
  x: 0,
  y: 0
})
const startPosition = ref({
  x: 0,
  y: 0
})

onMounted(() => {
  document.addEventListener('mouseup', mouseUp)
  calculateViewBox()
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', mouseUp)
})

const minMaxValues = ref(getMinAndMaxValues(props.dataItems))
// Watch for changes in dataItems and update minMaxValues
watch(() => props.dataItems, (newDataItems) => {
  minMaxValues.value = getMinAndMaxValues(newDataItems)
}, { deep: true })

// Function to get the min and max values
function getMinAndMaxValues (items: DataItem[] | undefined) {
  if (!Array.isArray(items) || items.length === 0 || !items[0]) {
    return { min: null, max: null }
  }

  const values = items.filter(o => o.value).map(o => o.value ?? 0)

  const min = Math.min(...values) - 10
  const max = Math.max(...values) + 10

  return { min, max }
}

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
  if (isMouseDown.value) {
    return false
  }

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

  //   console.log('FILL', item.name)
  const dataItem = props.dataItems?.find(o => o.key === item.name)
  if (dataItem?.value && minMaxValues?.value?.min) {
    return valueToHexColor(dataItem.value, minMaxValues.value.min, minMaxValues.value.max)
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

  const padding = 0
  const precision = 3

  const width = mathHelper.roundTo(xMax - xMin + padding, precision)
  const height = mathHelper.roundTo(yMax - yMin + padding, precision)
  const x = mathHelper.roundTo(xMin - padding - currentPosition.value.x, precision)
  const y = mathHelper.roundTo(yMin - padding - currentPosition.value.y, precision)

  viewBox.value = `${x} ${y} ${width} ${height}`
}

const transformStyle = computed(() => {
  return `scale(${tempZoom.value})`
})

function mouseDown (e: MouseEvent) {
  isMouseDown.value = true

  const svgPosition = convertScreenPosition(e.clientX, e.clientY)
  startPosition.value.x = svgPosition.x
  startPosition.value.y = svgPosition.y
}

function mouseUp () {
  isMouseDown.value = false
}

function mouseMove (e: MouseEvent) {
  setMousePosition(e.clientX, e.clientY)

  if (!isMouseDown.value) {
    return
  }

  const differenceX = mousePosition.value.x - startPosition.value.x
  const differenceY = mousePosition.value.y - startPosition.value.y

  const smoothingFactor = 10
  currentPosition.value.x += mathHelper.roundTo(differenceX / smoothingFactor, 4)
  currentPosition.value.y += mathHelper.roundTo(differenceY / smoothingFactor, 4)

  calculateViewBox()

  nextTick(() => {
    setMousePosition(e.clientX, e.clientY)
  })
}

function wheelChanged (e: WheelEvent) {
  setMousePosition(e.clientX, e.clientY)

  const currentMousePositionX = mousePosition.value.x
  const currentMousePositionY = mousePosition.value.y

  // set the scaling factor (and make sure it's at least 10%)
  let scale = tempZoom.value + (e.deltaY / 1000)
  scale = Math.abs(scale) < 0.1 ? 0.1 : scale

  tempZoom.value = scale // (e.deltaY / 1000) * -1

  setMousePosition(e.clientX, e.clientY)

  const diffX = (currentMousePositionX - mousePosition.value.x) * tempZoom.value
  const diffY = (currentMousePositionY - mousePosition.value.y) * tempZoom.value

  currentPosition.value.x -= diffX
  currentPosition.value.y -= diffY

  calculateViewBox()

  nextTick(() => {
    setMousePosition(e.clientX, e.clientY)
  })
}

function convertScreenPosition (screenX: number, screenY: number) {
  const svgMatrix = svgRef.value?.getScreenCTM()?.inverse()
  if (!svgMatrix) {
    console.log('failure')
    return { x: 0, y: 0 }
  }

  const svgPoint = svgRef.value?.createSVGPoint()
  if (!svgPoint) {
    console.log('failure')
    return { x: 0, y: 0 }
  }

  svgPoint.x = screenX
  svgPoint.y = screenY
  const svgCoords = svgPoint.matrixTransform(svgMatrix)

  const x1 = mathHelper.roundTo(svgCoords.x / tempZoom.value, 3)
  const y1 = mathHelper.roundTo(svgCoords.y / tempZoom.value, 3)

  return { x: x1, y: y1 }
}

function setMousePosition (x: number, y: number) {
  const position = convertScreenPosition(x, y)

  mousePosition.value.x = position.x
  mousePosition.value.y = position.y
}

function valueToHexColor (value: number, min: number, max: number) {
  const scaleValue = scaleConversion(value, min, max)
  return percentToHex(100 - scaleValue)
}

function componentToHex (c : number) {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

function percentToHex (percent : number) {
  if (percent === 100) {
    percent = 99
  }

  let r, g

  if (percent < 50) {
    // green to yellow
    r = Math.floor(255 * (percent / 50))
    g = 255
  } else {
    // yellow to red
    r = 255
    g = Math.floor(255 * ((50 - percent % 50) / 50))
  }
  return `#${componentToHex(r)}${componentToHex(g)}00`
}
function scaleConversion (value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100
}

</script>

<template>
  <svg
    v-if="viewBox"

    ref="svgRef"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    style="background-color: grey; border:2px solid #ddd;"

    width="100%"
    height="100%"
    preserveAspectRatio="xMinYMin meet"

    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @wheel.prevent="wheelChanged"
  >
    <g :transform="transformStyle">
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

      <circle
        :r="5"
        :cx="mousePosition.x"
        :cy="mousePosition.y"
        fill="black"
      />
    </g>

  </svg>

  <div
    class="row"
    style="height: 50px;"
  >
    <div class="col-3">
      CurrentPosition<br>{{ currentPosition.x }} / {{ currentPosition.y }}
    </div>
    <div class="col-3">
      Mouse Position<br>
      {{ mousePosition.x }} / {{ mousePosition.y }}
    </div>
    <div class="col-2">
      ViewBox<br>{{ viewBox }}
    </div>
    <div class="col-2">
      Zoom<br>{{ tempZoom }}
    </div>
  </div>
</template>

<style scoped>
 svg text {
  user-select: none;
  pointer-events: none;
}
</style>
