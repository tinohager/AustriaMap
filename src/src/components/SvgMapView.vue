<script setup lang="ts">
import { ref, computed } from 'vue'

import { mathHelper } from 'src/helpers/mathHelper'

import { MapItem, MapItemPoint } from 'src/models/MapItem'
import { MapDataProvider } from 'src/models/MapDataProvider'

const emit = defineEmits(['selectionchanged', 'zoomchanged'])

const debugRef = ref(true)

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

  const padding = 0

  const width = xMax - xMin + padding
  const height = yMax - yMin + padding
  const x = mathHelper.roundTo(xMin - padding - currentPosition.value.x, 3)
  const y = mathHelper.roundTo(yMin - padding - currentPosition.value.y, 3)

  return `${x} ${y} ${width} ${height}`
}

const mousePosition = ref({
  x: 0,
  y: 0
})
const currentPosition = ref({
  x: 0,
  y: 0
})
const startPosition = {
  x: 0,
  y: 0
}

const transformStyle = computed(() => {
  return `scale(${tempZoom.value})`
})

let isMouseDown = false
function mousedown (e: MouseEvent) {
  isMouseDown = true
  startPosition.x = e.clientX - currentPosition.value.x
  startPosition.y = e.clientY - currentPosition.value.y

  const matrix = svgRef.value?.getScreenCTM()
  if (!matrix) {
    return
  }
  startPosition.x = e.clientX - matrix?.e
  startPosition.y = e.clientY - matrix?.f
//   startPosition.x = matrix?.e
//   startPosition.y = matrix?.f
}

const circle = ref()
circle.value = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

const circleGreen = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

let appendedCircle = false
function mousemove (e: MouseEvent) {
  const matrix = svgRef.value?.getScreenCTM()
  if (!matrix) {
    return
  }
  const point = {}
  point.x = e.clientX - matrix?.e
  point.y = e.clientY - matrix?.f
  mousePosition.value = { x: e.clientX, y: e.clientY }
  //   mousePosition.value = point

  // Calculate the SVG coordinates
  const svgPoint = svgRef.value.createSVGPoint()
  svgPoint.x = e.clientX
  svgPoint.y = e.clientY
  const svgCoords = svgPoint.matrixTransform(matrix.inverse())

  // Create the circle
  circle.value.setAttribute('cx', svgCoords.x)
  circle.value.setAttribute('cy', svgCoords.y)
  circle.value.setAttribute('r', 10)
  circle.value.setAttribute('fill', 'blue')

  // Create the circle
  circleGreen.setAttribute('cx', svgCoords.x)
  circleGreen.setAttribute('cy', svgCoords.y)
  circleGreen.setAttribute('r', 10)
  circleGreen.setAttribute('fill', 'green')

  if (!appendedCircle) {
    // Append the circle to the SVG
    svgRef.value.appendChild(circle.value)
    svgRef.value.appendChild(circleGreen)
    appendedCircle = true
  }

  if (isMouseDown) {
    currentPosition.value.x += point.x - startPosition.x
    currentPosition.value.y += point.y - startPosition.y
  }

  /** ************** */

  const svgPoint2 = svgRef.value.createSVGPoint()
  svgPoint2.x = e.clientX
  svgPoint2.y = e.clientY
  const svgCoords2 = svgPoint2.matrixTransform(matrix.inverse())

  svgCoords2.x = svgCoords.x - (svgCoords.x * 0)
  svgCoords2.y = svgCoords.y - (svgCoords.y * 0)

  const newScreenCoords = svgCoords2.matrixTransform(matrix)

//   console.log({ x: e.clientX, y: e.clientY }, { x: newScreenCoords.x, ny: newScreenCoords.y })
}

document.addEventListener('mouseup', () => {
  isMouseDown = false
})

const ZOOM_SPEED = 0.2

const tempZoom = ref(props.zoom || 1)

function wheel4 (e: WheelEvent) {
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

function wheelBetter (e: WheelEvent) {
  e.preventDefault()
  e.stopPropagation()

  const matrix = svgRef.value?.getScreenCTM()
  if (!matrix) {
    return
  }
  const svgPoint = svgRef.value.createSVGPoint()
  svgPoint.x = e.clientX
  svgPoint.y = e.clientY
  const svgCoords = svgPoint.matrixTransform(matrix.inverse())
  const oldZoom = tempZoom.value
  //   if (e.deltaY <= 0) {
  //     tempZoom.value += ZOOM_SPEED
  //   } else {
  //     tempZoom.value -= ZOOM_SPEED
  //   }
  //   tempZoom.value = Math.min(Math.max(tempZoom.value, 1), 10)

  //   const point = {}
  //   point.x = e.clientX - matrix?.e
  //   point.y = e.clientY - matrix?.f
  //   point.x = matrix?.e
  //   point.y = matrix?.f

  //   const deltaNew = {
  //     x: (point.x * (tempZoom.value / oldZoom)) - point.x,
  //     y: (point.y * (tempZoom.value / oldZoom)) - point.y
  //   }

  //   currentPosition.value.x -= deltaNew.x
  //   currentPosition.value.y -= deltaNew.y

  //   const deltaNew = svgRef.value.createSVGPoint()
  //   //   deltaNew.x = svgCoords.x
  //   //   deltaNew.y = svgCoords.y
  //   deltaNew.x = svgCoords.x - (svgCoords.x * (tempZoom.value / oldZoom))
  //   deltaNew.y = svgCoords.y - (svgCoords.y * (tempZoom.value / oldZoom))
  //   console.log({ x: deltaNew.x, y: deltaNew.y }, { x: svgCoords.x, ny: svgCoords.y })

  const svgPointAfterZoom = svgRef.value.createSVGPoint()
  svgPointAfterZoom.x = e.clientX
  svgPointAfterZoom.y = e.clientY
  const svgCoordsAfterZoom = svgPointAfterZoom.matrixTransform(matrix.inverse())

  const coordsBeforeZoom = svgPoint.matrixTransform(matrix)

  console.log({ x: e.clientX, y: e.clientY }, { x: coordsBeforeZoom.x, ny: coordsBeforeZoom.y })

  //   const newScreenCoords = deltaNew.matrixTransform(matrix)

  //   currentPosition.value.x = newScreenCoords.x
  //   currentPosition.value.y = newScreenCoords.y

  currentPosition.value.x += e.clientX - coordsBeforeZoom.x
  currentPosition.value.y += e.clientY - coordsBeforeZoom.y

  circleGreen.setAttribute('cx', svgPointAfterZoom.x)
  circleGreen.setAttribute('cy', svgPointAfterZoom.y)

  const deltaNew = svgRef.value.createSVGPoint()
  deltaNew.x = svgPointAfterZoom.x - svgPoint.x
  deltaNew.y = svgPointAfterZoom.y - svgPoint.y

  console.log(deltaNew)

//   currentPosition.value.x += point.x - startPosition.x
//   currentPosition.value.y += point.y - startPosition.y
}
function wheelBetter1 (e: WheelEvent) {
  e.preventDefault()
  e.stopPropagation()
  const oldZoom = tempZoom.value
  if (e.deltaY <= 0) {
    tempZoom.value += ZOOM_SPEED
  } else {
    tempZoom.value -= ZOOM_SPEED
  }
  tempZoom.value = Math.min(Math.max(tempZoom.value, 1), 10)

  const matrix = svgRef.value?.getScreenCTM()
  if (!matrix) {
    return
  }
  const point = {}
  point.x = e.clientX - matrix?.e
  point.y = e.clientY - matrix?.f
  point.x = matrix?.e
  point.y = matrix?.f

  const deltaNew = {
    x: (point.x * (tempZoom.value / oldZoom)) - point.x,
    y: (point.y * (tempZoom.value / oldZoom)) - point.y
  }

  currentPosition.value.x -= deltaNew.x
  currentPosition.value.y -= deltaNew.y

//   currentPosition.value.x += point.x - startPosition.x
//   currentPosition.value.y += point.y - startPosition.y
}
</script>

<template>
  <div
    v-if="debugRef"
  >
    CP:{{ currentPosition }}<br>
    SP:{{ startPosition }}<br>
    VB:{{ calculateViewBox() }}<br>
    Zoom: {{ props.zoom }} | {{ tempZoom }}<br>
    {{ transformStyle }}<br>
    WEP:{{ point2.x }}/{{ point2.y }}<br>
    WEP:{{ point1?.x }}/{{ point1?.y }}<br>
    Mouse:{{ mousePosition }}
  </div>
  <!-- <div
    ref="svgHomeRef"
    style="width: 2000px; overflow: hidden;"
  > -->
  <svg
    id="SvgMap"
    ref="svgRef"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="calculateViewBox()"
    style="background-color: brown; transform-origin: 0 0;"
    :style="{transform: transformStyle}"
    @mousedown="mousedown"
    @mousemove="mousemove"
    @wheel.prevent="wheelBetter"
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
  <!-- </div> -->
</template>

<style scoped>
 svg text {
  user-select: none;
  pointer-events: none;
}
</style>
