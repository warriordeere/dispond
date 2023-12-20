import { LngLatLike } from "@tomtom-international/web-sdk-maps"
import { Geometry, GeometrySearchResponse } from "@tomtom-international/web-sdk-services"
import { DBSchema } from "idb"
import React from "react"

export interface savegameInterface {
    auth: {
        game_id: string
        session_id?: string
    }
    game?: {
        name: string
    }
}

export type sidebarRenderTypes = {
    data: {
        renderCallsButton: boolean,
        renderLocationButton: boolean,
        renderManageButton: boolean,
        extended_menu?: extendedSidebarMenuOptions
    }
}

export type extendedSidebarContent = {
    data: {
        extended_menu: extendedSidebarMenuOptions
    }
}

export type extendedSidebar = {
    data: {
        title: string
        icon: React.JSX.Element
        content: React.JSX.Element | string
    }
}

export type extendedSidebarMenuOptions = 'MENU_CALLS' | 'MENU_MAP' | 'MENU_MANAGE_FLEET' | 'MENU_MANAGE_BUILDINGS' | 'MENU_NEW_BUILDING' | 'MENU_NEW_VEHICLE'

export interface savegame {
    id: string,
    name: string
}

export interface callInterface {
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

export interface configFile {
    savegame: {
        id: string
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

export interface ttSearchboxResult {
    type: string,
    id: string,
    score: number,
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
    position: LngLatLike
    viewport: {
        topLeftPoint: LngLatLike
        btmRightPoint: LngLatLike
    }
    __resultListIdx__: number
}

export type localDataParams = {
    file_name: string,
    file_path: string,
    file_data: buildingObject
}

export interface buildingFile {
    created_at: Date | number
    last_modified: Date | number
    items: buildingObject[]
}

export interface buildingObject {
    id: string
    name?: string
    position?: LngLatLike
    type?: buildingTypes
    mission_area?: GeometryData
}

export type buildingTypes = 'FIREBRIGADE' | 'VOLUNTEER_FIREBRIGADE'

export interface BuildingSchema extends DBSchema {
    'buildings': {
        key: string
        value: buildingObject
        indexes: { 'by-id': string, 'by-name': string }
    };
}

export interface BuildingEvents {
    on(eventName: 'set_name', handler: (data: { id: string, name: string }) => void): void
    emit(eventName: 'set_name', data: { id: string, name: string }): void

    on(eventName: 'set_position', handler: (data: { id: string, position: LngLatLike }) => void): void
    emit(eventName: 'set_position', data: { id: string, position: LngLatLike }): void

    on(eventName: 'set_type', handler: (data: { id: string, type: buildingTypes }) => void): void
    emit(eventName: 'set_type', data: { id: string, type: buildingTypes }): void

    on(eventName: 'set_mission_area', handler: (data: { id: string, mission_area: GeometryData }) => void): void
    emit(eventName: 'set_mission_area', data: { id: string, mission_area: GeometryData }): void
}

export interface GeometryData {
    type: string,
    features: [
        {
            type: string,
            geometry: {
                type: 'Polygon',
                coordinates: number[][][]
            },
            id: string
        }
    ]
}

export interface GameEvents {
    on(eventName: 'start', handler: (savegame_id: string) => void): void
    emit(eventName: 'start', savegame_id: string): void
}

export type MissionAreaObject = {
    type: 'Municipality' | 'CountrySecondarySubdivision' | 'CountrySubdivision'
    name: string
}

export interface cst_readInterface {
    file: {
        path: string
        name?: string
    }
}