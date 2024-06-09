import { LngLatLike } from "@tomtom-international/web-sdk-maps"
import { DBSchema } from "idb"
import React from "react"

export interface savegameInterface {
    created: Number
    modified: Number
    game: {
        name: string
        spawn: LngLatLike
    }
}

export type SidebarData = React.JSX.Element

export type SidemenuOptions = 'MENU_CALLS' | 'MENU_MAP' | 'MENU_FLEET' | 'MENU_MANAGE_FLEET' | 'MENU_MANAGE_BUILDINGS' | 'MENU_NEW_BUILDING' | 'MENU_NEW_VEHICLE' | 'MENU_MISSION'

export interface SidemenuInterface {
    type: SidemenuOptions
}

export interface SidemenuContentInterface {
    title: string
    icon: React.JSX.Element
    content: React.JSX.Element | string
}


export interface savegame {
    id: string,
    name: string
}

export interface MissionInterface {
    id: string,
    caller: callerObject,
    location: locationObject,
    mission: missionObject,
    time: number
}

export type callerObject = {
    last_name: string,
    first_name: string
}

export type locationObject = {
    coords: LngLatLike
    free_address: string
    postal_code: string
    municapality: string
    street_n_number: string
}

export type missionObject = {
    type: missionTypes,
    specific: string
}

export type missionTypes = 'B1' | 'B2' | 'B2-MiG' | 'B3'

export type missionTypesEqv = {
    'B1': [
        'Kleinbrand'
    ],
    'B2': [
        'Feuer 2'
    ],
    'B2-MiG': [
        'Feuer MiG'
    ],
    'B3': [
        'Großbrand'
    ]
}

export interface gameConfigFile {
    savegame: {
        name: string
        created: number
        last_modifed: number
    }
    config_version: 1
    mods: boolean
}

export interface namesFile {
    first_names: string[]
    last_names: string[]
}

export interface ttSearchboxResult extends ReverseGeocodeResult {
    type: string,
    id: string,
    score: number,
    position: LngLatLike
    viewport: {
        topLeftPoint: LngLatLike
        btmRightPoint: LngLatLike
    }
    __resultListIdx__: number
}

export interface ReverseGeocodeResult {
    address: {
        streetName: string,
        municipalitySubdivision: string,
        municipality: string,
        countrySecondarySubdivision: string,
        countrySubdivision: string,
        countrySubdivisionName: string,
        countrySubdivisionCode: string,
        postalCode: number,
        countryCode: string,
        country: string,
        countryCodeISO3: string,
        freeformAddress: string,
        localName: string
    }
}

export type localDataParams = {
    file_name: string,
    file_path: string,
    file_data: BuildingInterface
}

export interface buildingFile {
    created_at: Date | number
    last_modified: Date | number
    items: BuildingInterface[]
}

export interface ReadFileInterface {
    file_path: string
    base_dir: 'document_dir'
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

export interface SavegameDataSchema extends DBSchema {
    'DB_STORE_BUILDINGS': {
        key: string
        value: BuildingInterface
        indexes: { 'by-id': string }
    },
    'DB_STORE_ACTIVE_MISSIONS': {
        key: string
        value: MissionInterface
        indexes: { 'by-id': string }
    },
    'DB_STORE_PURCHASED_ITEMS': {
        key: string
        value: ShopItemData
        indexes: { 'by-id': string }
    },
}

export type DatabaseStores = 'DB_STORE_BUILDINGS' | 'DB_STORE_ACTIVE_MISSIONS' | 'DB_STORE_PURCHASED_ITEMS'

export interface DatabaseOptions {
    database: 'DB_SAVEGAME_DATA'
    store: DatabaseStores
    schema: 'SCHEMA_SAVEGAME_DATA'
}

export interface DatabasePostOptions extends DatabaseOptions {
    data: BuildingInterface | MissionInterface | ShopItemData
}


export interface GeometryData {
    type: 'FeatureCollection'
    features: FeatureArray[]
}

export interface FeatureArray {
    type: 'Feature'
    geometry: {
        type: 'Polygon' | 'LineString'
        coordinates: number[][][]
    }
    properties: any
}

export interface BuildingEvents {
    on(eventName: 'EVENT_BUILDING_CREATE', handler: (data: BuildingInterface) => void): void
    emit(eventName: 'EVENT_BUILDING_CREATE', data: BuildingInterface): void
}

export interface GameEvents {
    on(eventName: 'EVENT_GAME_START', handler: (data: savegameInterface) => void): void
    emit(eventName: 'EVENT_GAME_START', data: savegameInterface): void
}

export interface VehicleEvents {
    on(eventName: 'EVENT_VEHICLE_PURCHASE', handler: (data: ShopItemData) => void): void
    emit(eventName: 'EVENT_VEHICLE_PURCHASE', data: savegameInterface): void
}

export type MissionEventTypes = "EVENT_MISSION_CREATE" | "EVENT_MISSION_ITEM_TOGGLE" | "EVENT_MISSION_CANCEL" | "EVENT_MISSION_START" | "EVENT_MISSION_RESPOND" | "EVENT_MISSION_REMOVE"

export interface MissionEvents {
    on(eventName: MissionEventTypes, handler: (data: MissionInterface) => void): void
    emit(eventName: MissionEventTypes, data: MissionInterface): void

    on(eventName: "EVENT_MISSION_RESPOND", handler: (data: MissionRespondData) => void): void
    emit(eventName: "EVENT_MISSION_RESPOND", data: MissionRespondData): void

    on(eventName: "EVENT_MISSION_START", handler: (mission_location: LngLatLike) => void): void
    emit(eventName: "EVENT_MISSION_START", mission_location: LngLatLike): void
}

export type MissionRespondData = {
    mission: MissionInterface
    responding: ShopItemData[]
}

export type MissionAreaObject = {
    type: 'Municipality' | 'CountrySecondarySubdivision' | 'CountrySubdivision'
    name: string
}

export interface PresenceInterface {
    action: "EVENT_RPC_SET"
    data: PresenceData
}

export interface PresenceData {
    state: String | ""
    details: String | ""
    image_large: String | ""
    text_large: String | ""
    image_small: String | ""
    text_small: String | ""
}

export interface ShopItemData {
    item_type: "SHOP_ITEM_TYPE_VEHICLE"
    id: string
    item_secondary_type: VehicleTypes
    item_cost: number
    item_owner: string
    item_position: {
        lng: number
        lat: number
    }
}

export type VehicleTypes = "VEHICLE_TYPE_HLF"

export interface DBVersionInterface {
    ltvs: string
    crvs: string
}

export interface ToolboxButtonTypes { type: "TB_BTN_BUILDING_MENU" | "TB_BTN_VEHICLE_MENU" }

export interface ItemRadioInterface {
    id: string
    label: string
    state: number // 0 - 9; See https://de.wikipedia.org/wiki/Funkmeldesystem
}

export enum MenuModuleContentTypes {
    "MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU" = "type_dispatch_menu",
    "MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW" = "type_unit_overview"
}

export type MenuModuleTypes = "MENU_MODULE_TYPE_PRIMARY" | "MENU_MODULE_TYPE_SECONDARY"