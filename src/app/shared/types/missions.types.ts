import { VehicleTypeOptions } from "./vehicle.types"

export enum DispatchTypeOptions {
    "DISPATCH_TYPE_FIRE_A" = 'fire_a',
    "DISPATCH_TYPE_FIRE_B" = 'fire_b',
    "DISPATCH_TYPE_FIRE_C" = 'fire_c',
    "DISPATCH_TYPE_FIRE_D" = 'fire_d',
    "DISPATCH_TYPE_FIRE_E" = 'fire_e',
    "DISPATCH_TYPE_TECHNICAL_A" = 'tech_a',
    "DISPATCH_TYPE_TECHNICAL_B" = 'tech_b',
    "DISPATCH_TYPE_TECHNICAL_C" = 'tech_c',
}

export interface MissionFileObject {
    file_type: "dispatch/mission",
    type: DispatchTypeOptions,
    category: {
        de_DE: string,
        en_US: string
    },
    desc: {
        de_DE: string,
        en_US: string
    },
    attachable_units: VehicleTypeOptions[]
}