import { MapDataProvider } from 'src/models/MapDataProvider'
import { MapItem } from 'src/models/MapItem'

const mapItems : MapItem[] = []

const rasterSize = 20
const rectangleSize = 10

for (let x = 1; x <= rasterSize; x++) {
  for (let y = 1; y <= rasterSize; y++) {
    const calculatedX = 10 * x
    const calculatedY = 10 * y

    const x1 = calculatedX
    const x2 = calculatedX + rectangleSize
    const x3 = calculatedX + rectangleSize
    const x4 = calculatedX

    const y1 = calculatedY
    const y2 = calculatedY
    const y3 = calculatedY + rectangleSize
    const y4 = calculatedY + rectangleSize

    mapItems.push({
      name: `R${y}/${x}`,
      points: [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }, { x: x4, y: y4 }]
    })
  }
}

export const dataProvider : MapDataProvider = { mapItems }
