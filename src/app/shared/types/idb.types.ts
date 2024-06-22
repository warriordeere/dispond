import { DBSchema } from "idb"
import { ShopItemData, } from "./types"
import { BuildingInterface } from "./building.types"
import { MissionInterface } from "./missions.types"


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

export interface DatabaseGetOptions extends DatabaseOptions {
    key: string[] | 'DB_GET_REQUEST_OPTION_ALL'
}

export interface DBVersionInterface {
    ltvs: string
    crvs: string
}