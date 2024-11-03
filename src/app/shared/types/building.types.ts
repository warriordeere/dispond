import { DispatchInterface } from "./dispatches.types"
import { GeometryData } from "./ttcst.types"
import { locationObject } from "./types"
import { VehicleInterface } from "./vehicle.types"

export interface buildingFile {
    created_at: Date | number
    last_modified: Date | number
    items: BuildingInterface[]
}

export interface BuildingInterface {
    id: string
    name: string
    location: locationObject,
    type: BuildingTypeOptions
    mission_area: GeometryData
}

export type BuildingTypeOptions =
    'BUILDING_TYPE_FIREBRIGADE' |
    'BUILDING_TYPE_VOLUNTEER_FIREBRIGADE' |
    'BUILDING_TYPE_POLICE' |
    'BUILDING_TYPE_HWY_POLICE' |
    'BUILDING_TYPE_EMS' |
    'BUILDING_TYPE_HOSPITAL'


export type MissionRespondData = {
    mission: DispatchInterface
    responding: VehicleInterface[]
}

export type MissionAreaObject = {
    type: 'Municipality' | 'CountrySecondarySubdivision' | 'CountrySubdivision'
    name: string
}