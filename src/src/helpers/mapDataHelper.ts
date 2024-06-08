import { MapItem } from 'src/models/MapItem'

function roundTo (n : number, digits : number) {
  if (digits === undefined) {
    digits = 0
  }

  const multiplicator = Math.pow(10, digits)
  n = parseFloat((n * multiplicator).toFixed(11))
  const test = (Math.round(n) / multiplicator)
  return +(test.toFixed(digits))
}

export function optimizeMapStructure (mapItems : MapItem[]) {
  const multiplier = 1.6
  const shiftX = 0
  const shiftY = 0

  return mapItems.map(o => ({
    name: o
      .name,
    points: o
      .points.map(p => ({ x: roundTo((p.x + shiftX) * multiplier, 2), y: roundTo((p.y + shiftY) * multiplier, 2) }))
  }))
}

export function drawRasterMap (rasterCountHorizont = 20, rasterCountVertical = 20, squareSize = 100) {
  const mapItems: MapItem[] = []

  for (let x = 0; x < rasterCountHorizont; x++) {
    for (let y = 0; y < rasterCountVertical; y++) {
      const calculatedX = squareSize * x
      const calculatedY = squareSize * y

      const x1 = calculatedX
      const x2 = calculatedX + squareSize
      const x3 = calculatedX + squareSize
      const x4 = calculatedX

      const y1 = calculatedY
      const y2 = calculatedY
      const y3 = calculatedY + squareSize
      const y4 = calculatedY + squareSize

      mapItems.push({

        name: `R${y + 1}/${x + 1}`,

        points: [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }, { x: x4, y: y4 }]
      })
    }
  }

  return mapItems
}
