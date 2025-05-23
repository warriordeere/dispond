import { LngLatLike } from "@tomtom-international/web-sdk-maps"
import { VehicleTypeOptions } from "./vehicle.types"

export type locationObject = {
    coords: LngLatLike
    free_address: string
    postal_code: string
    municapality: string
    street_n_number: string
}

export type ItemDisplayTypes = "ITEM_DISPLAY_TYPE_VEHICLE" | "ITEM_DISPLAY_TYPE_BUILDING" | "ITEM_DISPLAY_TYPE_DISPATCH";

export type VersionString = `${number}.${number}.${number}` | `pre-${number}.${number}.${number}` | `beta-${number}.${number}.${number}`

export enum LanguageString {
    LANGUAGE_STRING_DE_DE = 'de_DE',
    LANGUAGE_STRING_EN_US = 'en_US'
}