import { LngLatLike } from "@tomtom-international/web-sdk-maps"

export type sidebarRenderTypes = {
    data: {
        renderCallsButton: boolean,
        renderLocationButton: boolean,
        extended_menu?: {
            extended: boolean,
            initiator: 'TYPE_CALLS'
        }
    }
}

export interface savegame {
    id: string,
    name: string
}

export interface callInterface {
    id: string,
    caller: callerObject,
    location: locationObject,
    mission: missionObject
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

export type missionTypes = 'B1' | 'B2' | 'B3'