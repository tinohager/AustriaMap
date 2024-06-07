import { MapDataProvider } from 'src/models/MapDataProvider'
import { MapItem } from 'src/models/MapItem'

const mapItems : MapItem[] = [
  {
    name: 'Test 1',
    points: [{ x: 10, y: 10 }, { x: 20, y: 10 }, { x: 20, y: 20 }, { x: 10, y: 20 }]
  },
  {
    name: 'Test 2',
    points: [{ x: 20, y: 10 }, { x: 30, y: 10 }, { x: 30, y: 20 }, { x: 20, y: 20 }]
  },
  {
    name: 'Test 3',
    points: [{ x: 10, y: 20 }, { x: 20, y: 20 }, { x: 20, y: 30 }, { x: 10, y: 30 }]
  },
  {
    name: 'Test 4',
    points: [{ x: 20, y: 20 }, { x: 30, y: 20 }, { x: 30, y: 30 }, { x: 20, y: 30 }]
  }

]

export const dataProvider : MapDataProvider = { mapItems }
