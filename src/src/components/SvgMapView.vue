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

const svgRef = ref<SVGSVGElement>()

const isMouseDown = ref(false)
const viewBox = ref('')
const isMapDownload = ref(false)

const selected = ref<string | undefined>(undefined)
const hover = ref<string | undefined>(undefined)

const tempZoom = ref(props.zoom || 1)

const mousePosition = ref({ x: 0, y: 0 })
const currentPosition = ref({ x: 0, y: 0 })
const startPosition = ref({ x: 0, y: 0 })

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
  const points = props.mapDataProvider.mapItems.flatMap(mapItem => mapItem.points)
  const xPoints = points.map(point => point.x)
  const yPoints = points.map(point => point.y)

  const xMin = Math.min(...xPoints)
  const xMax = Math.max(...xPoints)
  const yMin = Math.min(...yPoints)
  const yMax = Math.max(...yPoints)

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

  const smoothingFactor = 5 / tempZoom.value
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
  let scale = tempZoom.value + (e.deltaY / -1000)
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

function resetZoom () {
  tempZoom.value = 1
  currentPosition.value.x = 0
  currentPosition.value.y = 0
  calculateViewBox()
}

async function download () {
  isMapDownload.value = true

  resetZoom()
  await nextTick(async () => {
    await prepareImage()
    isMapDownload.value = false
  })

  return true
}

async function prepareImage () {
  if (!svgRef.value) {
    return
  }

  const imageScale = 5

  const width = svgRef.value.width.baseVal.value * imageScale
  const height = svgRef.value.height.baseVal.value * imageScale

  const serializer = new XMLSerializer()
  const svgString = serializer.serializeToString(svgRef.value)

  const svgBlob = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8'
  })

  const DOMURL = window.URL || window.webkitURL || window
  const url = DOMURL.createObjectURL(svgBlob)

  const image = new Image()
  image.width = width
  image.height = height
  image.src = url

  await new Promise((resolve) => {
    image.onload = resolve
  })

  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  ctx.drawImage(image, 0, 0)
  DOMURL.revokeObjectURL(url)

  const imgURI = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream')

  triggerDownload(imgURI)
}

function triggerDownload (imgURI : string) {
  const a = document.createElement('a')
  a.download = 'MapImage.png' // filename
  a.target = '_blank'
  a.href = imgURI

  a.click()
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
  <div class="bg-grey-1">
    <svg
      v-if="viewBox"
      ref="svgRef"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
      style="width: 100%; height: 80vh;"

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

        <circle
          :r="5"
          :cx="mousePosition.x"
          :cy="mousePosition.y"
          :fill="isMapDownload ? 'transparent' : 'black'"
        />

        <g
          v-for="(item, index) in mapDataProvider.mapItems"
          :key="`group${index}`"
        >

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

          <!-- Top level elements required for mouseover/mouseout work -->
          <polygon
            :points="createPolygon(item.points)"
            :stroke="'transparent'"
            :fill="'transparent'"
            @click="selectItem(item.name)"
            @mouseover="mouseOver(item)"
            @mouseout="mouseOut()"
          />
        </g>

      </g>

    </svg>
  </div>

  <div class="q-mt-sm q-ml-sm q-gutter-sm">
    <q-btn
      color="grey-8"
      unelevated
      label="Reset Zoom"
      @click="resetZoom()"
    />

    <q-btn
      v-show="!isMapDownload"
      color="secondary"
      unelevated
      label="Download"
      :loading="isMapDownload"
      @click="download()"
    />
  </div>

  <div
    class="q-mt-sm q-ml-sm row"
    style="height: 50px;"
  >
    <div class="col-3">
      <div class="text-caption">
        Current Position
      </div>
      {{ currentPosition.x }} / {{ currentPosition.y }}
    </div>
    <div class="col-3">
      <div class="text-caption">
        Mouse Position
      </div>
      {{ mousePosition.x }} / {{ mousePosition.y }}
    </div>
    <div class="col-2">
      <div class="text-caption">
        ViewBox
      </div>
      {{ viewBox }}
    </div>
    <div class="col-2">
      <div class="text-caption">
        Zoom
      </div>
      {{ tempZoom }}
    </div>
  </div>
</template>

<style scoped>
 svg text {
  user-select: none;
  pointer-events: none;
}
</style>
