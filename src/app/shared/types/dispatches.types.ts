import { LanguageString, locationObject } from "./types"
import { LoadoutOptions, VehicleTypeOptions } from "./vehicle.types"

export type DispatchTypeOptions =
    'fire_a' |
    'fire_b' |
    'fire_c' |
    'fire_d' |
    'fire_e' |
    'tech_a' |
    'tech_b' |
    'tech_c'

export interface DispatchFileObject {
    file_type: "dispatch/mission",
    type: DispatchTypeOptions,
    category: {
        [LanguageString.LANGUAGE_STRING_DE_DE]: string,
        [LanguageString.LANGUAGE_STRING_EN_US]: string
    },
    desc: {
        de_DE: string,
        en_US: string
    },
    recommended_unit_set: VehicleTypeOptions[][],
    required_loadout: LoadoutOptions[]
}

export interface DispatchInterface {
    id: string,
    caller: ClientObject,
    location: locationObject,
    type: DispatchTypeOptions,
    time: number
}

export type ClientObject = {
    last_name: string,
    first_name: string
}