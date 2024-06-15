export enum VehicleTypeOptions {
    "VEHICLE_TYPE_ENGINE_A" = "vehicle_type_lf",
    "VEHICLE_TYPE_ENGINE_B" = "vehicle_type_hlf",
    "VEHICLE_TYPE_ENGINE_C" = "vehicle_type_tlf",
    "VEHICLE_TYPE_LADDER_A" = "vehicle_type_dlk",
    "VEHICLE_TYPE_TECH_A" = "vehicle_type_rw",
    "VEHICLE_TYPE_LOGISTIC_A" = "vehicle_type_gwl",
    "VEHICLE_TYPE_LOGISTIC_B" = "vehicle_type_gwa",
    "VEHICLE_TYPE_LOGISTIC_C" = "vehicle_type_gwd",
    "VEHICLE_TYPE_TACTICAL_A" = "vehicle_type_elw",
    "VEHICLE_TYPE_TACTICAL_B" = "vehicle_type_kdow",
    "VEHICLE_TYPE_SUPPLY_A" = "vehicle_type_sw"
}

export interface VehicleFileObject {
    file_type: "vehicle/vehicle",
    type: VehicleTypeOptions,
    category: {
        de_DE: string,
        en_US: string
    },
    desc: {
        de_DE: string,
        en_US: string
    },
    perks: any
}