import { DBSchema } from "idb"
import { BuildingInterface } from "./building.types"
import { DispatchInterface } from "./dispatches.types"
import { VehicleInterface } from "./vehicle.types"

export interface SavegameDataSchema extends DBSchema {
    'DB_STORE_BUILDINGS': {
        key: string
        value: BuildingInterface
        indexes: { 'by-id': string }
    },
    'DB_STORE_ACTIVE_MISSIONS': {
        key: string
        value: DispatchInterface
        indexes: { 'by-id': string }
    },
    'DB_STORE_OWNED_VEHICLES': {
        key: string
        value: VehicleInterface
        indexes: { 'by-id': string }
    },
}

export type DatabaseStores = 'DB_STORE_BUILDINGS' | 'DB_STORE_ACTIVE_MISSIONS' | 'DB_STORE_OWNED_VEHICLES'

export interface DatabaseOptions {
    database: 'DB_SAVEGAME_DATA'
    store: DatabaseStores
    schema: 'SCHEMA_SAVEGAME_DATA'
}

export interface DatabasePostOptions extends DatabaseOptions {
    data: BuildingInterface | DispatchInterface | VehicleInterface
}

export interface DatabaseGetOptions extends DatabaseOptions {
    key: string[] | 'DB_GET_REQUEST_OPTION_ALL'
}

export interface DBVersionInterface {
    ltvs: string
    crvs: string
}