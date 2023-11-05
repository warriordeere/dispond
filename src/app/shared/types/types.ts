import { LngLatLike } from "@tomtom-international/web-sdk-maps"
import React from "react"

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