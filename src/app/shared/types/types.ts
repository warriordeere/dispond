import { LngLatLike } from "@tomtom-international/web-sdk-maps"
import { VehicleTypeOptions } from "./vehicle.types"

export interface ShopItemData {
    item_type: GeneralItemTypes
    id: string
    item_secondary_type: VehicleTypeOptions
    item_cost: number
    item_owner: string
    item_position: {
        lng: number
        lat: number
    }
}

export type locationObject = {
    coords: LngLatLike
    free_address: string
    postal_code: string
    municapality: string
    street_n_number: string
}

export type GeneralItemTypes = "SHOP_ITEM_TYPE_VEHICLE" | "SHOP_ITEM_TYPE_BUILDING"