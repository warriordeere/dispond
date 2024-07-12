import { LngLatLike } from "@tomtom-international/web-sdk-maps"
import { savegameInterface } from "./savegame.types"
import { ShopItemData } from "./types"
import { BuildingInterface, MissionRespondData } from "./building.types"
import { DispatchInterface } from "./dispatches.types"

export interface BuildingEvents {
    on(eventName: 'EVENT_BUILDING_CREATE', handler: (data: BuildingInterface) => void): void
    emit(eventName: 'EVENT_BUILDING_CREATE', data: BuildingInterface): void
}

export interface GameEvents {
    on(eventName: 'EVENT_GAME_START', handler: (data: savegameInterface) => void): void
    emit(eventName: 'EVENT_GAME_START', data: savegameInterface): void

    on(eventName: 'EVENT_GAME_OPEN_MODULE_DIALOG', handler: () => void): void
    emit(eventName: 'EVENT_GAME_OPEN_MODULE_DIALOG'): void
}

export interface VehicleEvents {
    on(eventName: 'EVENT_VEHICLE_PURCHASE', handler: (data: ShopItemData) => void): void
    emit(eventName: 'EVENT_VEHICLE_PURCHASE', data: savegameInterface): void
}

export type MissionEventTypes = "EVENT_MISSION_CREATE" | "EVENT_MISSION_ITEM_TOGGLE" | "EVENT_MISSION_CANCEL" | "EVENT_MISSION_START" | "EVENT_MISSION_RESPOND" | "EVENT_MISSION_REMOVE"

export interface MissionEvents {
    on(eventName: MissionEventTypes, handler: (data: DispatchInterface) => void): void
    emit(eventName: MissionEventTypes, data: DispatchInterface): void

    on(eventName: "EVENT_MISSION_RESPOND", handler: (data: MissionRespondData) => void): void
    emit(eventName: "EVENT_MISSION_RESPOND", data: MissionRespondData): void

    on(eventName: "EVENT_MISSION_START", handler: (mission_location: LngLatLike) => void): void
    emit(eventName: "EVENT_MISSION_START", mission_location: LngLatLike): void
}