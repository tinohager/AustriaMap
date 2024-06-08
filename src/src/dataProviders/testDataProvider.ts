import { MapDataProvider } from 'src/models/MapDataProvider'
import { MapItem } from 'src/models/MapItem'

import { drawRasterMap } from 'src/helpers/mapDataHelper'

const mapItems : MapItem[] = []
mapItems.push(...drawRasterMap())

export const dataProvider : MapDataProvider = { mapItems }
