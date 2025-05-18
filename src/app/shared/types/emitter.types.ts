import { LngLatLike } from "@tomtom-international/web-sdk-maps"
import { savegameInterface } from "./savegame.types"
import { BuildingInterface, MissionRespondData } from "./building.types"
import { DispatchInterface } from "./dispatches.types"
import { VehicleInterface } from "./vehicle.types"
import { ItemDisplayTypes } from "./types"

export type MenuEventTypes =
    "EVENT_MENU_BUILDING_OPEN" | "EVENT_MENU_VEHICLE_OPEN" | "EVENT_MENU_SHOP_OPEN" | "EVENT_MENU_UNIT_OPEN"

export interface MenuEvents {
    on(eventName: MenuEventTypes, handler: () => void): void
    emit(eventName: MenuEventTypes): void

    on(eventName: "EVENT_MENU_ITEM_DISPLAY_OPEN", handler: (item_id: string, item_display_type: ItemDisplayTypes) => void): void
    emit(eventName: "EVENT_MENU_ITEM_DISPLAY_OPEN", item_id: string): void
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
    on(eventName: 'EVENT_VEHICLE_PURCHASE', handler: (data: VehicleInterface) => void): void
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