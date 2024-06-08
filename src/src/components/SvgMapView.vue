<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

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

const pointCircle2 = ref({ x: 0, y: 0 })

const tempZoom = ref(props.zoom || 1)

const currentPosition = ref({
  x: 0,
  y: 0
})
const startPosition = ref({
  x: 0,
  y: 0
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

  let min = +(items[0].value || 0)
  let max = +(items[0].value || 0)

  for (let i = 1; i < items.length; i++) {
    if (items[i]) {
      items[i].value = items[i].value || 0
      if (items[i]?.value < min) {
        min = +items[i].value || 0
      }
      if (items[i].value > max) {
        max = +items[i].value || 0
      }
    }
  }

  min -= 10
  max += 10
  console.log(min, max)

  return { min, max }
}

// const

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

  return `${x} ${y} ${width} ${height}`
}

const transformStyle = computed(() => {
  return `scale(${tempZoom.value})`
})

function mousedown (e: MouseEvent) {
  isMouseDown.value = true

  const svgPosition = convertScreenPosition(e.clientX, e.clientY)

  startPosition.value.x = svgPosition.x
  startPosition.value.y = svgPosition.y
}

function convertScreenPosition (x: number, y: number) {
  const matrix = svgRef.value?.getScreenCTM()
  if (!matrix) {
    return { x: 0, y: 0 }
  }

  const svgPoint1 = svgRef.value?.createSVGPoint()
  if (svgPoint1) {
    svgPoint1.x = x
    svgPoint1.y = y
    const svgCoords = svgPoint1.matrixTransform(matrix.inverse())

    const x1 = svgCoords.x / tempZoom.value
    const y1 = svgCoords.y / tempZoom.value

    return { x: x1, y: y1 }
  }

  return { x: 0, y: 0 }
}

function setCirclePositions (x: number, y: number) {
  const position = convertScreenPosition(x, y)

  pointCircle2.value.x = position.x
  pointCircle2.value.y = position.y
}

function mousemove (e: MouseEvent) {
  setCirclePositions(e.clientX, e.clientY)

  if (isMouseDown.value) {
    currentPosition.value.x += pointCircle2.value.x - startPosition.value.x
    currentPosition.value.y += pointCircle2.value.y - startPosition.value.y
  }
}

function wheelChanged (e: WheelEvent) {
  setCirclePositions(e.clientX, e.clientY)

  tempZoom.value += (e.deltaY / 1000) * -1
  const testX = pointCircle2.value.x
  const testY = pointCircle2.value.y

  nextTick(() => {
    setCirclePositions(e.clientX, e.clientY)

    const diffX = (testX - pointCircle2.value.x) * tempZoom.value
    const diffY = (testY - pointCircle2.value.y) * tempZoom.value

    currentPosition.value.x -= diffX
    currentPosition.value.y -= diffY

    nextTick(() => {
      setCirclePositions(e.clientX, e.clientY)
    })
  })
}

document.addEventListener('mouseup', () => {
  isMouseDown.value = false
})

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
    ref="svgRef"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="calculateViewBox()"
    style="background-color: grey; border:2px solid #ddd;"

    width="100%"
    height="100%"
    preserveAspectRatio="xMinYMin meet"

    @mousedown="mousedown"
    @mousemove="mousemove"
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
        :cx="pointCircle2.x"
        :cy="pointCircle2.y"
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
      {{ pointCircle2.x }} / {{ pointCircle2.y }}
    </div>
    <div class="col-2">
      ViewBox<br>{{ calculateViewBox() }}
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
