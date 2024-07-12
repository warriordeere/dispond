import { LanguageString } from "./types"

export type VehicleTypeOptions =
    "vehicle_type_lf" |
    "vehicle_type_hlf" |
    "vehicle_type_tlf" |
    "vehicle_type_dlk" |
    "vehicle_type_elw" |
    "vehicle_type_kdow" |
    "vehicle_type_rw" |
    "vehicle_type_gwl" |
    "vehicle_type_gwa" |
    "vehicle_type_gwdecon" |
    "vehicle_type_gwmess" |
    "vehicle_type_sw"


export interface VehicleFileObject {
    file_type: "vehicle/vehicle",
    type: VehicleTypeOptions,
    category: {
        [LanguageString.LANGUAGE_STRING_DE_DE]: string,
        [LanguageString.LANGUAGE_STRING_EN_US]: string
    },
    desc: {
        [LanguageString.LANGUAGE_STRING_DE_DE]: string,
        [LanguageString.LANGUAGE_STRING_EN_US]: string
    },
    clothing: ClothingTypes[]
    perks: VehiclePerksObject
}

export interface VehiclePerksObject {
    units: number
    extinguishing_cap: number
    loadout_cap: number
    loadout_items: LoadoutItems
}

export interface LoadoutItems {
    item_fire_fighting: ItemFireFightingTypes[]
    item_assistance: ItemAssistanceTypes[]
    item_misc: ItemMiscTypes[]
}

export type ClothingTypes = "CLOTHING_SCBA" | "CLOTHING_HAZMAT"

export type ItemFireFightingTypes = "LOADOUT_ITEM_FOAM_PIPE" | "LOADOUT_ITEM_FIRE_HOSE"

export type ItemAssistanceTypes = "LOADOUT_ITEM_TECHKIT" | "LOADOUT_ITEM_LEAKKIT_SMALL" | "LOADOUT_ITEM_LEAKKIT_BIG" | "LOADOUT_ITEM_DOORKIT"

export type ItemMiscTypes = "LOADOUT_ITEM_LIGHTKIT" | "LOADOUT_ITEM_HAZMATKIT"

export type LoadoutOptions = ItemFireFightingTypes | ItemAssistanceTypes | ItemMiscTypes