import { MissionInterface } from "./missions.types"
import { GeometryData } from "./ttcst.types"
import { ShopItemData } from "./types"

export interface buildingFile {
    created_at: Date | number
    last_modified: Date | number
    items: BuildingInterface[]
}

export interface BuildingInterface {
    id: string
    name: string
    position: {
        lng: number
        lat: number
    }
    type: buildingTypes
    mission_area: GeometryData
}

export type buildingTypes = 'FIREBRIGADE' | 'VOLUNTEER_FIREBRIGADE'


export type MissionRespondData = {
    mission: MissionInterface
    responding: ShopItemData[]
}

export type MissionAreaObject = {
    type: 'Municipality' | 'CountrySecondarySubdivision' | 'CountrySubdivision'
    name: string
}